import { getAdminAuth } from '@/lib/firebaseAdmin';
import { isAllowlistedAdminEmail } from '@/lib/adminEmails';

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return null;
  }
  return token;
}

/**
 * Grants auth.token.admin === true for allowlisted emails.
 * Call after login; client must then force-refresh the ID token.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const idToken = getBearerToken(req);
  if (!idToken) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const auth = getAdminAuth();
    const decoded = await auth.verifyIdToken(idToken);

    if (!decoded.email) {
      return res.status(403).json({ message: 'Email requis' });
    }

    // Admin bootstrap is allowlist-based (ADMIN_EMAILS). Prefer verified emails
    // when Firebase has marked them as such; unverified allowlisted emails are
    // still accepted so a single operator can bootstrap without SMTP setup.
    if (!isAllowlistedAdminEmail(decoded.email)) {
      return res.status(403).json({ message: 'Compte non autorisé admin' });
    }

    const user = await auth.getUser(decoded.uid);
    const alreadyAdmin = user.customClaims?.admin === true;

    if (!alreadyAdmin) {
      await auth.setCustomUserClaims(decoded.uid, {
        ...(user.customClaims || {}),
        admin: true,
      });
    }

    return res.status(200).json({ ok: true, admin: true, refreshed: !alreadyAdmin });
  } catch (error) {
    console.error('Erreur ensure-claim:', error);
    return res.status(401).json({ message: 'Token invalide' });
  }
}
