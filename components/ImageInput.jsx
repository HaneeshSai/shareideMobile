import { View, Text, Modal, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { userStore } from "../store/userStore";

const ImageInput = () => {
  const { imgModal, setImgModal } = userStore();
  return (
    <Modal
      visible={imgModal}
      animationType="slide"
      onRequestClose={() => setImgModal(false)}
      className="opacity-40"
      transparent={true}
    >
      <View className="bg-[#d4cbcb] w-full flex items-center justify-center opacity-90 h-screen">
        <View className="bg-white opacity-100">
          <Text>ImageInput</Text>
          <TouchableOpacity onPress={() => setImgModal(false)}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImageInput;
