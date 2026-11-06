import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase_app from "./config";

const auth = getAuth(firebase_app);

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getFirebaseAuth = () => auth;

/**
 * Ensures the signed-in allowlisted user receives auth.token.admin,
 * then force-refreshes the ID token so RTDB rules see the claim.
 */
export const ensureAdminClaim = async (user = auth.currentUser) => {
  if (!user) {
    throw new Error("Utilisateur non connecté");
  }

  const idToken = await user.getIdToken();
  const response = await fetch("/api/admin/ensure-claim", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Compte non autorisé admin");
  }

  const payload = await response.json();
  if (payload.refreshed) {
    await user.getIdToken(true);
  }

  return payload;
};

export const isAdminUser = async (user = auth.currentUser) => {
  if (!user) {
    return false;
  }
  const token = await user.getIdTokenResult();
  return token.claims?.admin === true;
};

export const waitForAuthUser = () =>
  new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
