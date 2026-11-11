import { priceToCents } from "./money.mjs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ID = /^[-A-Za-z0-9_]{1,128}$/;

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function clean(value, max) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, max);
}

export function assertCheckoutInput(body) {
  if (!body || typeof body !== "object") {
    throw badRequest("Corps invalide");
  }

  const customer = {
    name: clean(body.name, 200),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    address: clean(body.address, 300),
    zipcode: clean(body.zipcode, 20),
    city: clean(body.city, 100),
    country: clean(body.country, 100),
  };

  for (const [key, value] of Object.entries(customer)) {
    if (!value) {
      throw badRequest(`Champ manquant : ${key}`);
    }
  }

  if (!EMAIL.test(customer.email)) {
    throw badRequest("E-mail invalide");
  }

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    throw badRequest("Panier invalide");
  }

  const quantities = new Map();
  for (const line of body.items) {
    if (!line || typeof line.id !== "string" || !ID.test(line.id)) {
      throw badRequest("Article inconnu");
    }
    const quantity = Number(line.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw badRequest("Quantité invalide");
    }
    quantities.set(line.id, (quantities.get(line.id) || 0) + quantity);
  }

  const items = [...quantities.entries()].map(([id, quantity]) => {
    if (quantity > 10) {
      throw badRequest("Quantité invalide");
    }
    return { id, quantity };
  });

  return { customer, items };
}

export function priceOrderLines(requested, shoesById) {
  const lines = requested.map((line) => {
    const product = shoesById[line.id];
    if (!product || typeof product !== "object") {
      throw badRequest("Un article n'est plus disponible");
    }
    const unitPriceCents = priceToCents(product.price);
    if (unitPriceCents <= 0) {
      throw badRequest("Prix article invalide");
    }
    return {
      id: line.id,
      name: String(product.name || "Article").slice(0, 200),
      quantity: line.quantity,
      unitPriceCents,
    };
  });

  const totalCents = lines.reduce((sum, line) => sum + line.unitPriceCents * line.quantity, 0);
  if (totalCents < 50) {
    throw badRequest("Montant trop faible pour le paiement");
  }

  return { lines, totalCents };
}
