import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleLogOut } from '../authService';// Import your logout function

const HomeScreen = () => {
  const navigation = useNavigation();

  const logout = async () => {
    await handleLogOut();
    navigation.replace('SignInScreen'); // Navigates back to sign-in screen
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Log Out" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
