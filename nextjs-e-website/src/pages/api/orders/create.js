import { getAdminDatabase } from '@/lib/firebaseAdmin';
import { validateAndSanitizePublicOrder } from '@/lib/orderValidation';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(`orders:create:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rate.allowed) {
    res.setHeader('Retry-After', Math.ceil(rate.retryAfterMs / 1000));
    return res.status(429).json({ message: 'Trop de tentatives. Réessaie plus tard.' });
  }

  const result = validateAndSanitizePublicOrder(req.body);
  if (!result.ok) {
    if (result.silent) {
      // Pretend success to avoid honeypot feedback for bots.
      return res.status(201).json({ ok: true });
    }
    return res.status(400).json({ message: result.error });
  }

  try {
    const db = getAdminDatabase();
    const orderRef = db.ref('orders').push();
    await orderRef.set(result.order);
    return res.status(201).json({ ok: true, id: orderRef.key });
  } catch (error) {
    console.error('Erreur création commande:', error);
    return res.status(500).json({ message: 'Impossible de créer la commande' });
  }
}
