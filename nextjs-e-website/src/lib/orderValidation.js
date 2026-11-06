const MAX_STRING = 200;
const MAX_ITEMS = 30;
const MAX_ITEM_QTY = 20;
const ALLOWED_PAYMENT_METHODS = new Set(['e-Money', 'Cash on Delivery']);

function asTrimmedString(value, max = MAX_STRING) {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) {
    return null;
  }
  return trimmed;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates a public checkout payload and returns a sanitized order.
 * Drops sensitive payment secrets (PIN) before persistence.
 */
export function validateAndSanitizePublicOrder(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, error: 'Payload invalide' };
  }

  // Honeypot: bots fill hidden fields; humans leave them empty.
  if (body.website) {
    return { ok: false, error: 'Requête rejetée', silent: true };
  }

  const name = asTrimmedString(body.name, 120);
  const email = asTrimmedString(body.email, 180);
  const phone = asTrimmedString(body.phone, 40);
  const address = asTrimmedString(body.address, 200);
  const zipcode = asTrimmedString(body.zipcode, 20);
  const city = asTrimmedString(body.city, 100);
  const country = asTrimmedString(body.country, 100);
  const paymentMethod = asTrimmedString(body.paymentMethod, 40);

  if (!name || !email || !phone || !address || !zipcode || !city || !country || !paymentMethod) {
    return { ok: false, error: 'Champs obligatoires manquants ou invalides' };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: 'Email invalide' };
  }

  if (!ALLOWED_PAYMENT_METHODS.has(paymentMethod)) {
    return { ok: false, error: 'Méthode de paiement invalide' };
  }

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > MAX_ITEMS) {
    return { ok: false, error: 'Panier invalide' };
  }

  const items = [];
  for (const item of body.items) {
    if (!item || typeof item !== 'object') {
      return { ok: false, error: 'Article de panier invalide' };
    }

    const itemName = asTrimmedString(item.name, 120);
    const price = Number(item.price);
    const quantity = Number(item.nb ?? item.quantity ?? item.qty ?? 1);

    if (!itemName || !Number.isFinite(price) || price < 0 || price > 1_000_000) {
      return { ok: false, error: 'Article de panier invalide' };
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QTY) {
      return { ok: false, error: 'Quantité invalide' };
    }

    items.push({
      id: asTrimmedString(String(item.id ?? ''), 80) || undefined,
      name: itemName,
      brand: asTrimmedString(String(item.brand ?? ''), 80) || undefined,
      price,
      nb: quantity,
    });
  }

  const order = {
    name,
    email,
    phone,
    address,
    zipcode,
    city,
    country,
    paymentMethod,
    items,
    date: new Date().toISOString(),
    status: 'en attente',
  };

  if (paymentMethod === 'e-Money') {
    const emoneyNumber = asTrimmedString(body.emoneynumber, 32);
    if (emoneyNumber) {
      // Keep a truncated reference only — never persist the PIN.
      order.emoneynumberLast4 = emoneyNumber.slice(-4);
    }
  }

  return { ok: true, order };
}
