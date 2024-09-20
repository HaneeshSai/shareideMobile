import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack, Tabs } from "expo-router";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{ tabBarActiveTintColor: "#E85F69" }}>
        <Tabs.Screen
          name="Registered"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../../assets/icons/homeicon.png")}
                className="h-6 w-6"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="FindRide"
          options={{
            title: "Find Ride",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" size={28} color="#E85F69" />
            ),
          }}
        />
        <Tabs.Screen
          name="AddRoute"
          options={{
            title: "Add Route",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../../assets/icons/add.png")}
                className="h-12 w-12 mb-7"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Message"
          options={{
            title: "Message",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../../assets/icons/msg.png")}
                className="h-6 w-6"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Sos"
          options={{
            title: "SOS",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Image
                source={require("../../../assets/icons/sos.png")}
                className="h-6 w-6"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
