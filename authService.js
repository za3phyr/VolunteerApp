import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import Firebase auth

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returns the signed-up user
  } catch (error) {
    console.error("Sign Up Error:", error.message);
    return null;
  }
};

// Login Function
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returns the logged-in user
  } catch (error) {
    console.error("Login Error:", error.message);
    return null;
  }
};

// Logout Function
export const handleLogOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};
