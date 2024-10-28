import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
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