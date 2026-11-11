import Stripe from "stripe";
import { getAdminDatabase } from "@/lib/firebaseAdmin.mjs";
import { assertCheckoutInput, priceOrderLines } from "@/lib/orderPricing.mjs";
import { releaseProductStock, releaseReservedStock, reserveProductStock } from "@/lib/stockReserve.mjs";

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  let db = null;
  let orderRef = null;
  let sessionId = null;
  const reserved = [];

  try {
    const { customer, items } = assertCheckoutInput(req.body);
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return res.status(503).json({ message: "Paiement indisponible" });
    }

    db = getAdminDatabase();
    const shoesById = {};
    for (const line of items) {
      const snapshot = await db.ref(`shoes/${line.id}`).get();
      shoesById[line.id] = snapshot.exists() ? snapshot.val() : null;
    }

    const { lines, totalCents } = priceOrderLines(items, shoesById);
    for (const line of lines) {
      await reserveProductStock(db, line.id, line.quantity);
      reserved.push(line);
    }

    orderRef = db.ref("orders").push();
    await orderRef.set({
      ...customer,
      items: lines,
      totalCents,
      currency: "usd",
      date: new Date().toISOString(),
      status: "en attente de paiement",
    });

    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customer.email,
      client_reference_id: orderRef.key,
      metadata: { orderId: orderRef.key },
      line_items: lines.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: "usd",
          unit_amount: line.unitPriceCents,
          product_data: { name: line.name },
        },
      })),
      success_url: `${siteUrl()}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/checkout?canceled=1`,
    });

    sessionId = session.id;
    if (!session.url || !session.url.startsWith("https://checkout.stripe.com/")) {
      throw new Error("URL de paiement inattendue");
    }

    await orderRef.update({ stripeSessionId: session.id });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    if (sessionId) {
      await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.expire(sessionId).catch(() => {});
    }
    if (db && orderRef) {
      const existing = await orderRef.get().catch(() => null);
      if (existing?.exists()) {
        await releaseReservedStock(db, orderRef.key).catch((releaseError) => console.error(releaseError));
        await orderRef.remove().catch(() => {});
      } else {
        for (const line of reserved) {
          await releaseProductStock(db, line.id, line.quantity).catch((releaseError) => console.error(releaseError));
        }
      }
    } else if (db) {
      for (const line of reserved) {
        await releaseProductStock(db, line.id, line.quantity).catch((releaseError) => console.error(releaseError));
      }
    }
    const status = error.status || 500;
    if (status >= 500) {
      console.error(error);
    }
    return res.status(status).json({
      message: status >= 500 ? "Impossible de créer la commande" : error.message,
    });
  }
}
