// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";  // Import Firestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxpBjsmFFNvpFnYDEVqZ5cgZaFQipY8io",
  authDomain: "volunteerapp-cd291.firebaseapp.com",
  projectId: "volunteerapp-cd291",
  storageBucket: "volunteerapp-cd291.appspot.com",
  messagingSenderId: "1069814074455",
  appId: "1:1069814074455:web:af7b69031cbb83042d2712",
  measurementId: "G-PP7GLLPNDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});// Initialize authentication
const db = getFirestore(app);  // Initialize Firestore

export { app, auth, db }; // Export auth to use in other files