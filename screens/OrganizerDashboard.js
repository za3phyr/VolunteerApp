import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleLogOut } from '../authService'; // Ensure the path to authService is correct

const OrganizerDashboard = () => {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await handleLogOut();
      navigation.replace('SignInScreen'); // Navigate to the sign-in screen after logout
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally display an error message to the user
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Organizer!</Text>
      {/* Add admin features here */}
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Add some space below the title
  },
});

export default OrganizerDashboard;