import React from "react";
import { userStore } from "../store/userStore";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function SubmittedModal() {
  const { submittedModal, setSubmittedModal } = userStore();

  return (
    <Modal
      animationType="slide"
      onRequestClose={() => setSubmittedModal(false)}
      transparent={true}
      visible={submittedModal}
    >
      <View className="h-full bg-[#ffffffab]">
        <View className="bg-[#50AD6A] mx-1 flex flex-col items-center py-4 h-[80%] rounded-lg my-[40%] ">
          <View className="bg-white p-4 rounded-full my-10">
            <Image
              source={require("../assets/icons/greentick.png")}
              className="h-20 w-20 relative right-0.5"
            />
          </View>
          <Text className="text-white font-montSemi my-4 text-xl text-center">
            Your Details were Submitted Successfully
          </Text>
          <Text className="text-white font-montSemi my-4 text-2xl text-center px-5">
            Our Team will get back to you in 24 hours
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSubmittedModal(false);
              router.push("(tabs)/Registered");
            }}
            className="bg-white w-[80%] mt-10 rounded-lg py-1"
          >
            <Text className="text-center font-montBold text-xl">
              Go Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
