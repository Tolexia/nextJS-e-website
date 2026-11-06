import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase_app from "./config";

export const auth = getAuth(firebase_app);

export const userIsAdmin = async (user) => {
  const cached = await user.getIdTokenResult();
  if (cached.claims.admin === true) return true;
  const refreshed = await user.getIdTokenResult(true);
  return refreshed.claims.admin === true;
};

export const ensureAdminAuth = async () => {
  const user = auth.currentUser;
  if (!user || !(await userIsAdmin(user))) {
    throw new Error("Compte non autorisé");
  }
  return user;
};

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