import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomtextInput from "../../components/textInput";
import { userStore } from "../../store/userStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const DriverReg = () => {
  const [name, setName] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [adhaarImgFront, setAdhaarImgFront] = useState(null);
  const [adhaarImgBack, setAdhaarImgBack] = useState(null);
  const [license, setLicense] = useState("");
  const [licenseImgFront, setLicenseImgFront] = useState("");
  const [licenseImgBack, setLicenseImgBack] = useState("");
  const [rc, setRc] = useState("");
  const [rcImgFront, setRcImgFront] = useState("");
  const [rcImgBack, setRcImgBack] = useState("");

  const takePhoto = async (setTo) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    else {
      switch (setTo) {
        case "AF":
          setAdhaarImgFront(result.assets[0].uri);
          break;
        case "AB":
          setAdhaarImgBack(result.assets[0].uri);
          break;
        case "LF":
          setLicenseImgFront(result.assets[0].uri);
          break;
        case "LB":
          setLicenseImgBack(result.assets[0].uri);
          break;
        case "RF":
          setRcImgFront(result.assets[0].uri);
          break;
        case "RB":
          setRcImgBack(result.assets[0].uri);
          break;

        default:
          break;
      }
    }
  };

  const pickImage = async (setTo) => {
    console.log(setTo);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    else {
      switch (setTo) {
        case "AF":
          setAdhaarImgFront(result.assets.uri);
          break;

        default:
          break;
      }
    }
  };

  return (
    <SafeAreaView className="mt-14">
      <ScrollView className="px-6 ">
        <Text className="font-montBold text-2xl">
          Finish Your Profile as a Driver
        </Text>
        <View className="flex flex-col items-start mt-2 w-full">
          <Text className="text-xl mb-2 font-montSemi">
            Name <Text className="text-sm">(as per Adhaar Card)</Text>
          </Text>
          <CustomtextInput
            onchange={setName}
            value={name}
            placeholder={"Enter your name"}
          />
        </View>
        <View className="flex flex-col items-start mt-2 w-full">
          <Text className="text-xl mb-2 font-montSemi">Adhaar Number</Text>
          <CustomtextInput
            onchange={adhaar}
            value={setAdhaar}
            placeholder={"Enter your name"}
          />
        </View>
        <View>
          <Text className="text-xl mb-2  font-montSemi mt-5">
            Uplod Images of Your Adhaar
          </Text>
          <View className="bg-[#FFE2E2] w-full h-[200px] rounded-lg flex-col gap-0 pb-3 mt-3 border border-primary justify-center items-center">
            {adhaarImgFront === null ? (
              <View className="flex flex-col items-center">
                <Text className="font-montSemi text-lg my-2">Front</Text>
                <View className="flex flex-row ">
                  <TouchableOpacity
                    onPress={() => {
                      takePhoto("AF");
                    }}
                    className="bg-[#ff00002d] mr-5 rounded-full p-2"
                  >
                    <Ionicons name="camera" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage("AF");
                    }}
                    className="bg-[#ff00002d] ml-5 rounded-full p-2"
                  >
                    <Ionicons name="document-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Image
                className="h-full w-full relative top-1.5 rounded-lg"
                source={{ uri: adhaarImgFront }}
              />
            )}
          </View>
          <View className="bg-[#FFE2E2] w-full h-[200px] rounded-lg flex-col gap-0 pb-3 mt-3 border border-primary justify-center items-center">
            {adhaarImgBack === null ? (
              <View className="flex flex-col items-center">
                <Text className="font-montSemi text-lg my-2">Back</Text>
                <View className="flex flex-row ">
                  <TouchableOpacity
                    onPress={() => {
                      takePhoto("AB");
                    }}
                    className="bg-[#ff00002d] mr-5 rounded-full p-2"
                  >
                    <Ionicons name="camera" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      pickImage("AB");
                    }}
                    className="bg-[#ff00002d] ml-5 rounded-full p-2"
                  >
                    <Ionicons name="document-outline" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Image
                className="h-full w-full relative top-1.5 rounded-lg"
                source={{ uri: adhaarImgBack }}
              />
            )}
          </View>
        </View>
        <Text className="text-xl mb-2  font-montSemi mt-5">
          Driving License Number
        </Text>
        <CustomtextInput
          onchange={setLicense}
          value={license}
          placeholder={"Enter Your DL Number"}
        />
        <View>
          <Text className="text-xl mb-2  font-montSemi mt-5">
            Uplod Images of Your Driving License
          </Text>
          <View className="bg-[#FFE2E2] w-full h-32 rounded-lg flex-col gap-0 pb-3 mt-3 border border-primary justify-center items-center">
            <Text className="font-montSemi text-lg my-2">Back</Text>
            <View className="flex flex-row ">
              <TouchableOpacity
                onPress={() => {
                  takePhoto("LF");
                }}
                className="bg-[#ff00002d] mr-5 rounded-full p-2"
              >
                <Ionicons name="camera" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  takePhoto("LF");
                }}
                className="bg-[#ff00002d] ml-5 rounded-full p-2"
              >
                <Ionicons name="document-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-[#FFE2E2] w-full h-32 rounded-lg flex-col gap-0 pb-3 mt-3 border border-primary justify-center items-center">
            <Text className="font-montSemi text-lg my-2">Front</Text>
            <View className="flex flex-row ">
              <TouchableOpacity
                onPress={() => {
                  takePhoto("LB");
                }}
                className="bg-[#ff00002d] mr-5 rounded-full p-2"
              >
                <Ionicons name="camera" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  pickImage("LB");
                }}
                className="bg-[#ff00002d] ml-5 rounded-full p-2"
              >
                <Ionicons name="document-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text className="text-xl mb-2  font-montSemi mt-5">Vehicle RC</Text>
        <CustomtextInput
          onchange={rc}
          value={setRc}
          placeholder={"Enter Your Vehicle RC"}
        />
        <View className="mb-10">
          <Text className="text-xl mb-2  font-montSemi mt-5">
            Uplod Images of Your Vehicle RC
          </Text>
          <View className="bg-[#FFE2E2] w-full h-32 rounded-lg flex-col gap-0 pb-3 mt-3 border border-primary justify-center items-center">
            <Text className="font-montSemi text-lg my-2">Back</Text>
            <View className="flex flex-row ">
              <TouchableOpacity
                onPress={() => {
                  takePhoto("RF");
                }}
                className="bg-[#ff00002d] mr-5 rounded-full p-2"
              >
                <Ionicons name="camera" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  pickImage("RF");
                }}
                className="bg-[#ff00002d] ml-5 rounded-full p-2"
              >
                <Ionicons name="document-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-[#FFE2E2] w-full h-32 rounded-lg flex-col gap-0 pb-3 mt-3 border border-primary justify-center items-center">
            <Text className="font-montSemi text-lg my-2">Front</Text>
            <View className="flex flex-row ">
              <TouchableOpacity
                onPress={() => {
                  takePhoto("RB");
                }}
                className="bg-[#ff00002d] mr-5 rounded-full p-2"
              >
                <Ionicons name="camera" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  pickImage("RB");
                }}
                className="bg-[#ff00002d] ml-5 rounded-full p-2"
              >
                <Ionicons name="document-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverReg;
