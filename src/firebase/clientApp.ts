import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PBULIC_FIREBASE_API_KEY || 'AIzaSyBbQXpAolLv2e-uSVMcE_bV2hGr5oklwRw',
  authDomain: process.env.NEXT_PBULIC_FIREBASE_AUTH_DOMAIN || 'reddit-clone-website.firebaseapp.com',
  projectId: process.env.NEXT_PBULIC_FIREBASE_PROJECT_ID || 'reddit-clone-website',
  storageBucket: process.env.NEXT_PBULIC_FIREBASE_STORAGE_BUCKET || 'reddit-clone-website.appspot.com',
  messagingSenderId: process.env.NEXT_PBULIC_FIREBASE_MESSAGING_SENDER_ID || '817866536396',
  appId: process.env.NEXT_PBULIC_FIREBASE_APP_ID || '1:817866536396:web:5ec46b88b7ffbfdf315969',
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app); //db
const auth = getAuth(app); //auth
const storage = getStorage(app);

export { app, firestore, auth, storage };
