import * as React from "react"; // Import React library
import { useState, useEffect } from "react"; // Import React hooks for state and effects
import { StyleSheet, Text, View, Button } from "react-native"; // Import UI components from React Native
import { NavigationContainer } from "@react-navigation/native"; // Import Navigation Container for app navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Import stack navigator for screen navigation
import { useFonts } from "expo-font"; // Import custom font loading function from Expo

// Import authentication screens
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import FIRSTSCREEN from "./screens/FIRSTSCREEN"; // Import the splash screen
import HomeScreen from "./screens/HomeScreen"; // Import the main app screen
import OrganizerDashboard from "./screens/OrganizerDashboard"; // Import the organizer dashboard
import AdminDashboard from "./screens/AdminDashboard"; // Import the admin dashboard


// Import authentication service functions
import { signUp, logIn, logOut } from "./authService";

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

export default function App() {
  // Load custom fonts using Expo Font
  const [fontsLoaded, error] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Inter-ExtraLight": require("./assets/fonts/Inter-ExtraLight.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
  });

  // State variables for handling user authentication and input fields
  const [email, setEmail] = useState(""); // Stores the user's email input
  const [password, setPassword] = useState(""); // Stores the user's password input
  const [user, setUser] = useState(null); // Stores the authenticated user object
  const [hideSplashScreen, setHideSplashScreen] = useState(false); // Controls the splash screen visibility

  // Simulate splash screen delay (3 seconds) before showing authentication screens
  useEffect(() => {
    const timer = setTimeout(() => {
      setHideSplashScreen(true); // Hide splash screen after 3 seconds
    }, 3000);
    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  // Handle user sign-up
  const handleSignUp = async () => {
    try {
      const newUser = await signUp(email, password); // Call signUp function from authService
      if (newUser) setUser(newUser); // Set user state if sign-up is successful
    } catch (error) {
      console.error("Sign-up error:", error.message); // Log error if sign-up fails
    }
  };

  // Handle user login
  const handleLogIn = async () => {
    try {
      const loggedInUser = await logIn(email, password); // Call logIn function from authService
      if (loggedInUser) setUser(loggedInUser); // Set user state if login is successful
    } catch (error) {
      console.error("Login error:", error.message); // Log error if login fails
    }
  };

  // Handle user logout
  const handleLogOut = async () => {
    await logOut(); // Call logOut function from authService
    setUser(null); // Reset user state to null after logging out
  };

  return (
    <NavigationContainer>
      {!fontsLoaded && !error ? (
        // Show loading screen while fonts are being loaded
        <View style={styles.container}>
          <Text>Loading fonts...</Text>
        </View>
      ) : !hideSplashScreen ? (
        // Show FIRSTSCREEN for 3 seconds before moving to authentication screens
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FIRSTSCREEN" component={FIRSTSCREEN} />
        </Stack.Navigator>
      ) : user ? (
        // Main app screen when the user is logged in
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        // Authentication screens if the user is not logged in
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="OrganizerDashboard" component={OrganizerDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="FIRSTSCREEN" component={FIRSTSCREEN} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

// Styles for UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  volunteerItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e0f7fa",
    borderRadius: 5,
  },
});