import * as React from "react";
import { useState, useEffect } from "react"; // Importing useState and useEffect
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { FontFamily } from "../GlobalStyles";

const FIRSTSCREEN = ({ navigation }) => {
  useEffect(() => {
    // Set a timer to change the screen after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace("SignUpScreen"); // Navigate to HomeScreen after 5 seconds
    }, 3000);

    // Clear the timer if the component is unmounted to prevent memory leaks
    return () => clearTimeout(timer);
  }, [navigation]); // Adding navigation as dependency

  return (
    <View style={styles.firstScreen}>
      <Image
        style={styles.image1Icon}
        contentFit="cover"
        source={require("../assets/logo.png")}
      />
      <Text style={styles.volunteerhub}>VolunteerHub</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image1Icon: {
    top: 222,
    left: 69,
    width: 255,
    height: 241,
    position: "absolute",
  },
  volunteerhub: {
    marginLeft: -137.5,
    top: 485,
    left: "50%",
    fontSize: 40,
    letterSpacing: 0.4,
    fontFamily: FontFamily.poetsenOne,
    color: "#55b3ed",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    width: 272,
    height: 92,
    position: "absolute",
  },
  firstScreen: {
    borderRadius: 15,
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 804,
    overflow: "hidden",
  },
});

export default FIRSTSCREEN;
// Compare this snippet from App.js:
// import FIRSTSCREEN from "./screens/FIRSTSCREEN";