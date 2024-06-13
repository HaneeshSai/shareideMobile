import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const UnRegistered = () => {
  return (
    <SafeAreaView className="pt-16 flex h-full flex-col gap-3 px-5 pb-5">
      <View
        style={{
          elevation: 7,
        }}
        className=" rounded-lg  bg-secondary items-center flex px-3 py-1 flex-row "
      >
        <View className="flex-1">
          <Text className="text-xl font-montBold">
            Finish Your Profile as a Rider
          </Text>
          <Text className="font-montSemi text-[10px] w-[300px] text-nowrap">
            Match with Drivers going on your Route.
          </Text>
          <View className="w-full flex flex-row justify-center">
            <TouchableOpacity
              onPress={() => {
                router.push("(registration)/RiderReg");
              }}
              className="bg-primary w-32 mt-3 py-1 rounded-full"
            >
              <Text className="font-montBold text-sm text-center text-white">
                GET A RIDE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-[0.6]">
          <Image
            className=" h-[130px] w-[130px] "
            source={require("../../assets/images/unRegRider.png")}
          />
        </View>
      </View>
      <View
        style={{
          elevation: 7,
        }}
        className=" rounded-lg mt-20 bg-white items-center px-2 flex flex-row py-3"
      >
        <View className="">
          <Image
            className=" h-[100px] w-[100px] "
            source={require("../../assets/images/unRegDriver.png")}
          />
        </View>
        <View className="flex-1 px-3">
          <Text className="text-xl text-right font-montBold">
            Finish Your Profile as a Driver
          </Text>
          <Text className="font-montSemi text-[10px] text-right w-[200px] relative right-5">
            Match with Riders going on your Route.
          </Text>
          <View className="w-full flex flex-row justify-center">
            <TouchableOpacity
              onPress={() => {
                router.push("(registration)/DriverReg");
              }}
              className="bg-primary w-32 mt-3 py-1 rounded-full"
            >
              <Text className="font-montBold text-sm text-center text-white">
                GET A RIDE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          elevation: 7,
        }}
        className=" rounded-lg flex-1 mb-5 bg-white flex px-3 py-3 flex-col items-start "
      >
        <Text className="font-montBold text-lg">You can also</Text>
        <View className="flex flex-row items-center gap-2">
          <Image
            className="h-[120px] w-[95px]"
            source={require("../../assets/images/unRegPackage.png")}
          />
          <View>
            <Text className="font-montBold text-xl">Send Packages</Text>
            <Text className="font-montSemi ">Send Packages with Drivers</Text>
          </View>
        </View>
        <View className="flex flex-1 flex-row items-center gap-2">
          <Image
            className="h-[120px] w-[95px]"
            source={require("../../assets/images/unRegRent.png")}
          />
          <View>
            <Text className="font-montBold text-xl">Rent a Vehicle</Text>
            <Text className="font-montSemi ">Rent Vehicles of your choice</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UnRegistered;
