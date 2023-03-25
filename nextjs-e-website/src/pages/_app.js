import '@/styles/globals.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase_app from "@/components/config"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default function App({ Component, pageProps }) {
  let analytics;
  // Initialize Firebase
  if (firebase_app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(firebase_app);
  }
  return <Component {...pageProps} />
}
