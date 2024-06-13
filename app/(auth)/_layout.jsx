import React from "react";
import { SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

const authLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="phoneNum"
          options={{
            headerTitle: "",
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Otp"
          options={{
            headerTitle: "",
            headerTransparent: true,
          }}
        />
      </Stack>
    </>
  );
};

export default authLayout;
