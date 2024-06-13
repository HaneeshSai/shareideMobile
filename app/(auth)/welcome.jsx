import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome = () => {
  return (
    <>
      <SafeAreaView className="px-5 py-5  h-full bg-main">
        <Text className="font-kaushan text-[#fe5d68] text-2xl">Shareide</Text>
        <Image
          source={require("../../assets/images/welc.png")}
          className="h-[380px] top-10 relative right-5  w-[350px] "
        />
        <View className="mt-20">
          <Text className="font-montSemi text-xl">
            Share the Ride. Share the Joy {"\n"}with Shareide
          </Text>
          <TouchableOpacity
            onPress={() => router.push("phoneNum")}
            className="w-full bg-primary rounded-lg flex items-center justify-center h-8 my-2"
          >
            <Text className="font-montSemi text-center text-white text-[18px]">
              Continue with Phone Number
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="mt-1">
          By Continuing, you agree that you have read and accept our{" "}
          <Text className="underline text-blue-600">
            T&Cs and Privacy Policy
          </Text>
        </Text>
      </SafeAreaView>
    </>
  );
};

export default Welcome;
