import { ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "KaushanScript-Regular": require("../assets/fonts/KaushanScript-Regular.ttf"),
  });

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setIsFontLoaded(true);
      } else if (error) {
        console.error("Error loading fonts", error);
      }
    };

    loadFonts();
  }, [fontsLoaded, error]);

  if (!isFontLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(dashboard)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(registration)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
