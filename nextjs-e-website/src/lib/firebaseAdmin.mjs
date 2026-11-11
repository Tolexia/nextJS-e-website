import admin from "firebase-admin";

const databaseURL = "https://nextjs-e-website-default-rtdb.europe-west1.firebasedatabase.app";

export function getAdminApp() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    const error = new Error("FIREBASE_SERVICE_ACCOUNT_JSON manquant");
    error.status = 503;
    throw error;
  }

  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    const error = new Error("FIREBASE_SERVICE_ACCOUNT_JSON illisible");
    error.status = 503;
    throw error;
  }

  return admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL,
  });
}

export function getAdminDatabase() {
  getAdminApp();
  return admin.database();
}

export async function verifyAdminToken(authorization) {
  const match = /^Bearer (.+)$/.exec(authorization || "");
  if (!match) {
    const error = new Error("Authentification requise");
    error.status = 401;
    throw error;
  }

  getAdminApp();
  const decoded = await admin.auth().verifyIdToken(match[1]);
  if (decoded.admin !== true) {
    const error = new Error("Compte non autorisé");
    error.status = 403;
    throw error;
  }
  return decoded;
}
