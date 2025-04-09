import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Import Firestore db

// Function to add a volunteer
export const addVolunteer = async (name, email, hours) => {
  try {
    const docRef = await addDoc(collection(db, "volunteers"), {
      name,
      email,
      hours,
    });
    console.log("Volunteer added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding volunteer:", error);
  }
};

// Function to get all volunteers
export const getVolunteers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "volunteers"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting volunteers:", error);
    return [];
  }
};
