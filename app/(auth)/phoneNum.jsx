import {
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { userStore } from "../../store/userStore";

const PhoneNum = () => {
  const [phone, setPhone] = useState("");
  const [ready, setReady] = useState(false);
  const { setphone } = userStore();

  useEffect(() => {
    if (phone.length === 10) {
      setReady(true);
    }
  }, [phone]);

  const onSubmit = async () => {
    if (ready) {
      setphone(phone);
      router.push("Otp");
    }
  };

  return (
    <SafeAreaView className="px-5 flex flex-col py-5 h-full bg-main">
      <View>
        <Text className="mt-36 font-montBold text-2xl">
          Enter Phone Number for Verification
        </Text>
        <Text className="font-montmed">
          This number will be used for all ride-related communication. You shall
          receive an SMS with code for verification.
        </Text>
      </View>
      <View style={styles.container}>
        <Text className="font-montSemi border-r pr-2 border-black text-lg">
          🇮🇳 +91
        </Text>
        <TextInput
          maxLength={10}
          keyboardType="numeric"
          className="font-montSemi w-full flex-1  pl-2 text-lg"
          value={phone}
          onChangeText={setPhone}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8, // Equivalent to rounded-md in Tailwind
    backgroundColor: "white", // Needed for shadow to be visible
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 24, // Equivalent to top-6 in Tailwind (6 * 4)
  },
});
export default PhoneNum;
