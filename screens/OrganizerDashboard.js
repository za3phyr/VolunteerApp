import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleLogOut } from '../authService'; // Ensure the path to authService is correct

const OrganizerDashboard = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([
    { id: '1', name: 'Community Garden Build', status: 'pending' },
    { id: '2', name: 'Food Drive Support', status: 'approved' },
    // Add more sample events here
  ]);

  // Log out handler
  const logout = async () => {
    try {
      await handleLogOut();
      navigation.replace('SignInScreen'); // Navigate to the sign-in screen after logout
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally display an error message to the user
    }
  };

  // Handle creating a new event (you can customize this logic)
  const createEvent = () => {
    // For now, this just simulates creating a new event.
    const newEvent = {
      id: String(events.length + 1), // Simulate generating a new ID
      name: `New Event ${events.length + 1}`,
      status: 'pending',
    };
    setEvents([...events, newEvent]);
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>Status: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Organizer!</Text>

      {/* Button to create a new event */}
      <TouchableOpacity style={styles.createButton} onPress={createEvent}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>

      {/* List of events */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        style={styles.eventList}
      />

      {/* Log Out Button */}
      <Button title="Log Out" onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20, // Added padding for better UI spacing
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Space below the title
    color: '#333',
  },
  createButton: {
    backgroundColor: '#4CAF50', // Green color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20, // Add space below the button
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  eventList: {
    width: '100%',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default OrganizerDashboard;
