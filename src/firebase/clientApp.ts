import {getApp, getApps, initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PBULIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PBULIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PBULIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PBULIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PBULIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PBULIC_FIREBASE_APP_ID,
};

// Initialize Firebase for SSR
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
