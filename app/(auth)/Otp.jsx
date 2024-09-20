import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userStore } from "../../store/userStore";
import { insert, select, update } from "../../utils/dbServices";
import { OtpInput } from "react-native-otp-entry";
import { router } from "expo-router";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Otp = () => {
  const { phone, setIsLoading, setUser } = userStore();
  const [ready, setReady] = useState(false);
  const [otp, setOtp] = useState("");
  const [success, setSucces] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onSubmit = async () => {
    if (otp.length > 3) {
      setIsLoading(true);

      try {
        const response = await insert({
          table: "user",
          data: {
            phone: phone,
          },
        });
        if (response === "ok") {
          const axResponse = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
            {
              phone: phone,
            }
          );
          if (axResponse.data.message === "ok") {
            await SecureStore.setItemAsync("userToken", axResponse.data?.token);
            setIsLoading(false);
          }
          if (await axResponse.data.user.verified) {
            const params = {
              table: "user",
              data: {
                name: axResponse.data.user.name,
                gender: axResponse.data.user.gender,
                age: axResponse.data.user.age,
                userType: axResponse.data.user.userType,
                contacts: axResponse.data.user.contacts,
                vehicle: axResponse.data.user.vehicle,
                verified: axResponse.data.user.verified,
              },
              where: {
                phone: axResponse.data.user.phone,
              },
            };

            // console.log(params.where)
            const updateResponse = await update(params);
            if (updateResponse === "ok") {
              // console.log(axResponse.data.user)
              setUser(axResponse.data.user);
              router.push("/(dashboard)/(tabs)/Registered");
              
            }
            
          } else {
            router.push("/(dashboard)/unRegistered");
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView className="px-5 flex flex-col py-5 h-full bg-main">
      <Modal
        animationType="slide"
        transparent={true}
        visible={success}
        className="z-10"
        onRequestClose={() => setSucces(false)}
      >
        <View className="h-full z-10 bg-[#ffffffab]">
          <View className="bg-[#50AD6A] mx-1 flex flex-col items-center py-4 h-[80%] rounded-lg my-[40%] ">
            <View className="bg-white p-4 rounded-full my-10">
              <Image
                source={require("../../assets/icons/greentick.png")}
                className="h-20 w-20 relative right-0.5"
              />
            </View>
            <Text className="text-white font-montSemi my-4 text-xl text-center">
              Authenticated Successfully
            </Text>

            <TouchableOpacity>
              <Text className="text-white font-montSemi ">
                Redirecting to Home Page
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
