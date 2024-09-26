import { initializeApp, getApps } from "firebase/app"; 

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//     databaseURL: process.env.NEXT_PUBLIC_DB_URL,
//     projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

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
// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
firebase_app.options.databaseURL = firebaseConfig.databaseURL

export default firebase_app;