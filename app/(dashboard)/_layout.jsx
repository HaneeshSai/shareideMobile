import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomtextInput from "../../components/textInput";
import { userStore } from "../../store/userStore";
import axios from "axios";

const DashboardLayout = () => {
  const { pickUp, setPickUp, user, setSearchDestination } = userStore();
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
        <Stack.Screen
          name="SearchInput"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Profile"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            headerTitle: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                className="bg-white rounded-full"
                onPress={() => router.push("/Profile")}
                style={{
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                }}
              >
                <Image
                  source={
                    user[0].gender === "male"
                      ? require("../../assets/icons/man.png")
                      : require("../../assets/icons/woman.png")
                  }
                  className="h-10 w-10"
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View className="flex flex-row items-center justify-center gap-4">
                <View className="bg-white rounded-full">
                  <TouchableOpacity
                    onPress={() => {
                      setSearchDestination(false);
                      router.push("(dashboard)/SearchInput");
                    }}
                    style={{
                      elevation: 5,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                    }}
                    className="w-[230px] flex flex-row items-center justify-between px-3 py-1 rounded-full bg-white"
                  >
                    <Text
                      numberOfLines={1}
                      className={`font-montSemi py-1 ${
                        pickUp === null ? "opacity-30" : "opacity-100"
                      } px-2 flex-1`}
                    >
                      {pickUp !== null
                        ? pickUp.display_address
                        : "Your Start Location"}
                    </Text>
                    <Image
                      source={require("../../assets/icons/searchPin.png")}
                      className="h-5 w-5"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity>
                  <Image
                    source={require("../../assets/icons/saved.png")}
                    className="h-6 w-6"
                  />
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
