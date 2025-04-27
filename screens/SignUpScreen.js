import * as React from "react"; // Import React library
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native"; // Import UI components from React Native
import { useNavigation } from '@react-navigation/native'; // Import navigation hook for screen transitions
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles"; // Import global styling variables
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication function
import {doc, setDoc} from 'firebase/firestore'; // Import Firestore functions for database operations
import { auth, db } from '../firebaseConfig'; // Import Firebase configuration

const SignUpScreen = () => {
  const navigation = useNavigation(); // Initialize navigation for navigating between screens

  // State variables for managing input fields and loading state
  const [email, setEmail] = React.useState(""); // Stores the email input
  const [password, setPassword] = React.useState(""); // Stores the password input
  const [confirmPassword, setConfirmPassword] = React.useState(""); // Stores the confirm password input
  const [role, setRole] = React.useState("volunteer"); // Stores the selected user role (e.g., "user", "admin")
  const [isLoading, setIsLoading] = React.useState(false); // Tracks loading state when signing up

  // Function to handle the sign-up process
  const handleSignUp = async () => {
    // Validate if all fields are filled
    if (!email || !password || !confirmPassword) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Your passwords do not match.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      // Create a new user account with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid; // Get the unique user ID from the created user
      console.log("User ID:", uid); // Log the user ID for debugging
      console.log("User created successfully:", userCredential.user);

      //Save user data to Firestore database
      await setDoc(doc(db, "users", uid), {
        email: email,
        role: role, // Save the selected role
        createdAt: new Date(), // Save the account creation date
      });

      // Navigate to the SignInScreen after successful sign-up
      console.log("User data saved to Firestore:", { email, role });
      Alert.alert("Success", "Account created successfully!"); // Show success alert to the user
      navigation.replace('SignInScreen'); 
    } catch (error) {
      console.error("Sign-up failed:", error.message); // Log the error in the console
      Alert.alert("Sign-up Failed", error.message); // Show error alert to the user
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole); // Update the selected role state
  };

  return (
    <View style={styles.signUpScreen}>
      {/* Sign-up screen title */}
      <Text style={styles.signUpTitle}>Create Account</Text>

      {/* Email Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={Color.colorGray_100}
        value={email}
        onChangeText={(text) => setEmail(text)} // Update state when text changes
        keyboardType="email-address" // Ensure keyboard is optimized for email input
      />

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={Color.colorGray_100}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry // Hide password input for security
      />

      {/* Confirm Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor={Color.colorGray_100}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry // Hide confirm password input for security
      />

       {/* Role Selection as TouchableOpacity buttons */}
       <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'volunteer' && styles.roleButtonActive]}
          onPress={() => handleRoleSelect('volunteer')}
        >
          <Text style={[styles.roleText, role === 'volunteer' && styles.roleTextActive]}>Volunteer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'organizer' && styles.roleButtonActive]}
          onPress={() => handleRoleSelect('organizer')}
        >
          <Text style={[styles.roleText, role === 'organizer' && styles.roleTextActive]}>Organizer</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity 
        style={styles.signUpButton} 
        onPress={handleSignUp} 
        disabled={isLoading} // Disable button when loading
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Creating Account...' : 'Sign Up'} {/* Show loading text when signing up */}
        </Text>
      </TouchableOpacity>

      {/* Navigate to Sign-In Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
        <Text style={styles.haveAccount}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for UI components
const styles = StyleSheet.create({
  signUpScreen: {
    flex: 1,
    backgroundColor: Color.colorWhite, // Set background color
    justifyContent: "center", // Center content vertically
    paddingHorizontal: 20, // Add padding on sides
  },
  signUpTitle: {
    fontSize: FontSize.size_3xl, // Set font size
    fontFamily: FontFamily.robotoBold, // Use custom font
    color: Color.colorBlack, // Set text color
    textAlign: "center", // Center the text
    marginBottom: 30, // Add bottom margin
  },
  input: {
    height: 50, // Set height for input fields
    backgroundColor: Color.colorGainsboro, // Background color
    borderRadius: Border.br_xl, // Rounded corners
    paddingHorizontal: 15, // Add padding inside input
    fontSize: FontSize.size_xl, // Set font size
    marginBottom: 20, // Space between input fields
    borderWidth: 1, // Add border
     // Set border color
      },
      roleContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center buttons horizontally
        alignItems: 'center', // Center buttons vertically
        marginBottom: 20,
      },
      roleButton: {
        backgroundColor: Color.colorGainsboro,
        borderRadius: Border.br_xl,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Color.colorGray_100,
        marginHorizontal: 10, // Add spacing between buttons
      },
      roleButtonActive: {
        backgroundColor: "rgba(85, 179, 237, 0.61)", // Highlighted color
    borderColor: "rgba(85, 179, 237, 0.61)",
  },
  roleText: {
    fontSize: FontSize.size_lg,
    color: Color.colorBlack,
  },
  roleTextActive: {
    color: Color.colorWhite,
  },
  signUpButton: {
    backgroundColor: "rgba(85, 179, 237, 0.61)", // Set button background color
    height: 48, // Set button height
    borderRadius: Border.br_xl, // Rounded button
    justifyContent: "center", // Center text inside button
    alignItems: "center", // Center text horizontally
    marginBottom: 20, // Space below button
  },
  buttonText: {
    color: Color.colorWhite, // Set text color
    fontSize: FontSize.size_3xl, // Set font size
    fontWeight: "700", // Make text bold
  },
  haveAccount: {
    color: "blue", // Set text color
    fontSize: 16, // Set font size
    textAlign: "center", // Center text
  },
});

export default SignUpScreen;
