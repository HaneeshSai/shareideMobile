import { View, Text, Modal, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { userStore } from "../store/userStore";

export default function Loading() {
  const { isLoading } = userStore();
  return (
    <Modal
      animationType="slide"
      className="z-50"
      transparent={true}
      visible={isLoading}
    >
      <View className="w-full z-50 h-full bg-[#ffffff79] flex items-center justify-center flex-row">
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    </Modal>
  );
}
