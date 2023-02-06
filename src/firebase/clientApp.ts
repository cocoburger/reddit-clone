import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PBULIC_FIREBASE_API_KEY || 'AIzaSyBbQXpAolLv2e-uSVMcE_bV2hGr5oklwRw',
  authDomain: process.env.NEXT_PBULIC_FIREBASE_AUTH_DOMAIN || 'reddit-clone-website.firebaseapp.com',
  projectId: process.env.NEXT_PBULIC_FIREBASE_PROJECT_ID || 'reddit-clone-website',
  storageBucket: process.env.NEXT_PBULIC_FIREBASE_STORAGE_BUCKET || 'reddit-clone-website.appspot.com',
  messagingSenderId: process.env.NEXT_PBULIC_FIREBASE_MESSAGING_SENDER_ID || '817866536396',
  appId: process.env.NEXT_PBULIC_FIREBASE_APP_ID || '1:817866536396:web:5ec46b88b7ffbfdf315969',
};

// Initialize Firebase for SSR
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
