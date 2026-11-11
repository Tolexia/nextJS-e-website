import Stripe from "stripe";
import { getAdminDatabase } from "@/lib/firebaseAdmin.mjs";
import { releaseReservedStock } from "@/lib/stockReserve.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) {
    return res.status(503).end();
  }

  let event;
  try {
    const stripe = new Stripe(key);
    const payload = await readRawBody(req);
    event = stripe.webhooks.constructEvent(payload, req.headers["stripe-signature"], secret);
  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }

  const session = event.data.object;
  const orderId = session.metadata?.orderId;
  const orderIdIsSafe = typeof orderId === "string" && /^[-A-Za-z0-9_]{1,128}$/.test(orderId);

  if (event.type === "checkout.session.expired" && orderIdIsSafe) {
    await releaseReservedStock(getAdminDatabase(), orderId);
  }

  if (event.type === "checkout.session.completed") {
    if (session.payment_status === "paid" && orderIdIsSafe && session.currency === "usd") {
      const orderRef = getAdminDatabase().ref(`orders/${orderId}`);
      const snapshot = await orderRef.get();
      if (snapshot.exists() && snapshot.val().totalCents === session.amount_total) {
        await orderRef.update({
          status: "payée",
          paidAt: new Date().toISOString(),
        });
      }
    }
  }

  return res.status(200).json({ received: true });
}
