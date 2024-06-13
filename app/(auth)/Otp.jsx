import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userStore } from "../../store/userStore";
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";

const Otp = () => {
  const { phone } = userStore();
  const [ready, setReady] = useState(false);
  const [otp, setOtp] = useState("");

  const onSubmit = async () => {
    if (otp.length > 3) {
      router.push("(dashboard)/unRegistered");
    }
  };

  return (
    <SafeAreaView className="px-5 flex flex-col py-5 h-full bg-main">
      <Text className="mt-36 text-2xl font-montBold">Verify Number</Text>
      <Text className="font-montmed ">
        We have just send an OTP to the mobile Number
      </Text>
      <View className="flex  items-end flex-row gap-5">
        <Text className="font-montSemi text-xl">+91 {phone}</Text>
        <TouchableOpacity>
          <Text className="font-montmed text-primary underline">Edit?</Text>
        </TouchableOpacity>
      </View>
      <Text className="font-montSemi text-xl my-2">Enter the OTP.</Text>
      <View className="px-10 my-5">
        <OtpInput
          numberOfDigits={4}
          focusColor="red"
          focusStickBlinkingDuration={500}
          onTextChange={(e) => setOtp(e)}
          onFilled={(e) => setReady(true)}
        />
      </View>
      <View className="flex-1 justify-end items-center">
        <TouchableOpacity
          onPress={onSubmit}
          className={`${
            ready ? "bg-primary" : "bg-[#eaa3a3]"
          } w-full rounded-md h-8 flex items-center justify-center`}
        >
          <Text className="font-montSemi text-lg text-white">Send OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
