import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "volunteerapp-cd291.firebaseapp.com",
  projectId: "volunteerapp-cd291",
  storageBucket: "volunteerapp-cd291.appspot.com",
  messagingSenderId: "1069814074455",
  appId: "1:1069814074455:web:af7b69031cbb83042d2712",
  measurementId: "G-PP7GLLPNDZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
