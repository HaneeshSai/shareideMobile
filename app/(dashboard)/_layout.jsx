import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DashboardLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="unRegistered"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity>
                <Ionicons name="menu" size={32} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View className="flex flex-row items-center justify-center gap-4">
                <TouchableOpacity>
                  <Ionicons name="search" size={32} color="black" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default DashboardLayout;
