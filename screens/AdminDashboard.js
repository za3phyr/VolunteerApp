import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // adjust path if needed
import { handleLogOut } from "../authService"; // adjust path if needed
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [pendingEvents, setPendingEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);

  const navigation = useNavigation();

  const tabs = ["events", "approved", "users", "assign"];

  const users = [
    { id: "u1", name: "Jane Doe", role: "volunteer" },
    { id: "u2", name: "Mark Lee", role: "organizer" },
  ];

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "events"),
      (snapshot) => {
        const allEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPendingEvents(allEvents.filter((e) => e.status === "pending"));
        setApprovedEvents(allEvents.filter((e) => e.status === "approved"));
      },
      (error) => console.error("Firestore error:", error)
    );

    return () => unsub();
  }, []);

  const updateEventStatus = async (id, status) => {
    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, { status });
    } catch (error) {
      console.error(`Failed to update event to ${status}:`, error);
    }
  };

  const logout = async () => {
    try {
      await handleLogOut();
      navigation.replace("SignInScreen");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderCard = (event, showActions = false) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{event.name}</Text>
      {showActions && (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveBtn]}
            onPress={() => updateEventStatus(event.id, "approved")}
          >
            <Text style={styles.actionButtonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectBtn]}
            onPress={() => updateEventStatus(event.id, "rejected")}
          >
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Admin Dashboard</Text>
        <Button title="Log Out" onPress={logout} />
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tabButton, activeTab === t && styles.activeTab]}
            onPress={() => setActiveTab(t)}
          >
            <Text
              style={[styles.tabText, activeTab === t && styles.activeTabText]}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {activeTab === "events" && (
          <FlatList
            data={pendingEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderCard(item, true)}
          />
        )}

        {activeTab === "approved" && (
          <FlatList
            data={approvedEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderCard(item)}
          />
        )}

        {activeTab === "users" && (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderCard({ name: item.name })}
          />
        )}

        {activeTab === "assign" &&
          renderCard({ name: "Volunteer Assignment" })}
      </View>
    </SafeAreaView>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.robotoBold,
    color: Color.colorBlack,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    backgroundColor: Color.colorGainsboro,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: Border.br_xl,
  },
  activeTab: {
    backgroundColor: "rgba(85, 179, 237, 0.61)",
  },
  tabText: {
    fontSize: FontSize.size_lg,
    color: Color.colorBlack,
  },
  activeTabText: {
    color: Color.colorWhite,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: Color.colorGainsboro,
    borderRadius: Border.br_xl,
    padding: 16,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.robotoBold,
    color: Color.colorBlack,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Border.br_xl,
    alignItems: "center",
    marginHorizontal: 5,
  },
  approveBtn: {
    backgroundColor: "rgba(85, 179, 237, 0.61)",
  },
  rejectBtn: {
    backgroundColor: "#FF6B6B",
  },
  actionButtonText: {
    color: Color.colorWhite,
    fontWeight: "700",
    fontSize: FontSize.size_lg,
  },
});
