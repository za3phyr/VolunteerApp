import * as React from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native'; // For navigation
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles"; // For styling
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'; // Firebase authentication
import { auth, db } from '../firebaseConfig'; // Your Firebase config file
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions

function SignInScreen() {
  const navigation = useNavigation(); // Navigation hook for screen transitions

  // State for email, password, and loading state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false); // Track login request state
  const [isResetting, setIsResetting] = React.useState(false); // Track password reset request state

  // Handle login action
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid; // Get the unique user ID from the logged-in user

      const userDoc = await getDoc(doc(db, "users", uid)); // Fetch user data from Firestore
      const userData = userDoc.data(); // Get the user data

      if (!userData || !userData.role) {
        Alert.alert("Login Error", "User data not found or role not assigned, Please Contact Support.");
        return;
      }

      const role = userData.role.toLowerCase(); // Get the user role from Firestore
      console.log("User role:", role); // Log the user ID for debugging

      //Navigate to the appropriate screen based on user role
      if (role === "admin") {
        navigation.replace("AdminDashboard"); // Navigate to Admin Dashboard
      } else if (role === "volunteer") {
        navigation.replace("HomeScreen"); // Navigate to Volunteer Dashboard
      } else if (role === "organizer") {
        navigation.replace("OrganizerDashboard"); // Navigate to Organizer Dashboard
      } else {
        Alert.alert("Login Error", "Invalid user role. Please contact support.");
      }

    } catch (error) {
      console.error("Login failed:", error.message); // Log the error in the console
      Alert.alert("Login Failed", error.message); // Show error alert to the user
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle forgot password action
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email to reset password.");
      return;
    }

    setIsResetting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Password Reset Email Sent",
        "Check your email for instructions to reset your password."
      );
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <View style={styles.signInScreen}>
      <Text style={styles.loginTitle}>Login</Text>

      {/* Email Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor={Color.colorGray_100}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor={Color.colorGray_100}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging In...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* Link to Sign-Up Screen */}
      <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
        <Text style={styles.createAccount}>Don’t have an account? Create one</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={handleForgotPassword} disabled={isResetting}>
        <Text style={styles.forgotPassword}>
          {isResetting ? "Sending Reset Email..." : "Forgot Password?"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for UI components
const styles = StyleSheet.create({
  signInScreen: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.robotoBold,
    color: Color.colorBlack,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: Color.colorGainsboro,
    borderRadius: Border.br_xl,
    paddingHorizontal: 15,
    fontSize: FontSize.size_xl,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
  },
  loginButton: {
    backgroundColor: "rgba(85, 179, 237, 0.61)",
    height: 48,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_3xl,
    fontWeight: "700",
  },
  createAccount: {
    color: "blue",
    fontSize: 16,
    textAlign: "center",
  },
  forgotPassword: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
});

export default SignInScreen;
