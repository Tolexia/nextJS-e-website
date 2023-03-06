import '@/styles/globals.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default function App({ Component, pageProps }) {
  const firebaseConfig = {
    apiKey: "AIzaSyCGIARWqNieo45Bkni9THq4duor3JwcpQU",
    authDomain: "nextjs-e-website.firebaseapp.com",
    databaseURL: "https://nextjs-e-website-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nextjs-e-website",
    storageBucket: "nextjs-e-website.appspot.com",
    messagingSenderId: "218373834438",
    appId: "1:218373834438:web:c98f0e1f0c63c32985f9c7",
    measurementId: "G-P35WYNB4PN"
  };
  pageProps.firebaseConfig = firebaseConfig;
  let analytics;
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  return <Component {...pageProps} />
}
