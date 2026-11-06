import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

function parseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT manquant. Fournis le JSON du compte de service Firebase.'
    );
  }

  try {
    return JSON.parse(raw);
  } catch {
    // Support base64-encoded JSON (handy for CI / host secrets).
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  }
}

export function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccount = parseServiceAccount();
  const databaseURL =
    process.env.FIREBASE_DATABASE_URL ||
    'https://nextjs-e-website-default-rtdb.europe-west1.firebasedatabase.app';

  return initializeApp({
    credential: cert(serviceAccount),
    databaseURL,
  });
}

export function getAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}

export function getAdminDatabase() {
  return getDatabase(getFirebaseAdminApp());
}
