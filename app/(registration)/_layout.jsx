import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DashboardLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="RiderReg"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="DriverReg"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
      </Stack>
    </>
  );
};

export default DashboardLayout;
