// eslint-disable-next-line react/default-props-deprecation
import {
  View,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userStore } from "../../../store/userStore";
import { router } from "expo-router";
import SelectModal from "../../../components/SelectModal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export default function AddRoute() {
  const [selected, setSelected] = useState(0);
  const {
    setSearchDestination,
    searchDestination,
    destination,
    pickUp,
    user,
    setPicker,
    setIsLoading,
  } = userStore();

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [reachTime, setReachTime] = useState(null);
  const [reachDate, setReachDate] = useState("");
  const [fare, setFare] = useState("");
  const [preferred, setPreferred] = useState("");
  const [datePickType, setDatePickType] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [via, setVia] = useState("");
  const [showSubmitModal, setSubmitModal] = useState(false);

  const handleTime = (e) => {
    // console.log(e);
    const time = new Date(e);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const x = new Date(
      new Date().getFullYear(),
      months.indexOf(startDate.split(" ")[1]),
      startDate.split(" ")[0],
      time.getHours(),
      time.getMinutes()
    );

    if (datePickType === "start") setStartTime(x);
    else setReachTime(x);
    setShowTimePicker(false);
  };

  const handleSubmit = async () => {
    try {
      if (!pickUp) {
        return ToastAndroid.show(
          "choose your Pick up location before Submitting",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else if (!destination) {
        return ToastAndroid.show(
          "choose your Destination location before Submitting",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else if (!startTime) {
        return ToastAndroid.show(
          "Pick your Starting time before Submitting",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else if (!reachTime) {
        return ToastAndroid.show(
          "Pick your Reaching time before Submitting",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else if (!fare) {
        return ToastAndroid.show(
          "Enter your Fare before Submitting",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      if (selected === 0) {
        if (!preferred) {
          return ToastAndroid.show(
            "Pick your Preferred Driver gender before Submitting",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        setIsLoading(true);

        const data = {
          start: [pickUp.lat, pickUp.lon],
          destination: [destination.lat, destination.lon],
          postedBy: "rider",
          startTime: startTime,
          byTime: reachTime,
          fare: parseInt(fare),
        };

        console.log(data, await SecureStore.getItemAsync("userToken"))

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/user/addroute`,
          {
            data,
            token: await SecureStore.getItemAsync("userToken"),
          }
        );

        if (response.data.message === "ok") {
          setSubmitModal(true);
          setIsLoading(false);
        }
      } else {
        const data = {
          start: [pickUp.lat, pickUp.lon],
          destination: [destination.lat, destination.lon],
          postedBy: "driver",
          via: via,
          startTime: startTime,
          byTime: reachTime,
          fare: parseInt(fare),
        };

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/user/addRoute`,
          {
            data,
            token: await SecureStore.getItemAsync("userToken"),
          }
        );

        if (response.data.message === "ok") {
          setSubmitModal(true);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return ToastAndroid.show(
        "Internal Server Error, Try again later",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <View className=" py-16 h-full bg-[#FFF5F5]">
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSubmitModal}
        onRequestClose={() => setSubmitModal(false)}
      >
        <View className="h-full bg-[#ffffffab]">
          <View className="bg-[#50AD6A] mx-2 flex flex-col items-center py-4 h-[80%] rounded-lg my-[40%] ">
            <View className="bg-white p-4 rounded-full my-10">
              <Image
                source={require("../../../assets/icons/greentick.png")}
                className="h-20 w-20 relative right-0.5"
              />
            </View>
            <Text className="text-white font-montSemi my-4 text-xl text-center">
              Your Ride has been Successfully posted
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSubmitModal(false);
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
      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleTime}
        onCancel={() => setShowTimePicker(false)}
      />
      <SelectModal
        typeFun={datePickType === "start" ? setStartDate : setReachDate}
        start={startDate}
        type={datePickType}
      />
      <View className="flex mx-7 px-7 py-2 mt-7 mb-2 flex-row justify-between">
        <TouchableOpacity
          onPress={() => {
            setSelected(0);
          }}
          className="flex flex-col items-center"
        >
          <Image
            source={require("../../../assets/images/boy.png")}
            className="h-12 w-12"
          />
          {selected === 0 ? (
            <View className="h-1 rounded-full bg-primary w-10"></View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // console.log(user);
            // if (user.userType === "rider") {
            //   ToastAndroid.show(
            //     "Verify as a Driver to Access.",
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER
            //   );
            // } else {
            setSelected(1);
            // }
          }}
          className="flex flex-col items-center"
        >
          <Image
            source={require("../../../assets/icons/scootericon.png")}
            className="h-12 w-12"
          />

          {selected === 1 ? (
            <View className="h-1 rounded-full bg-primary w-10"></View>
          ) : null}
        </TouchableOpacity>
      </View>
      <Text className="font-montSemi px-5 text-2xl mx-2 mt-4 mb-3">
        Add Route as {selected === 0 ? "Rider" : "Driver"}
      </Text>

      <View
        style={{
          elevation: 7,
        }}
        className="flex ml-6 mb-7 flex-row px-3 py-2 rounded-full items-center w-[85%] bg-white"
      >
        <TouchableOpacity
          onPress={() => {
            setSearchDestination(true);
            router.push("(dashboard)/SearchInput");
          }}
          className="flex flex-1 flex-row items-center gap-2"
        >
          <Image
            source={require("../../../assets/icons/rec.png")}
            className="h-5 w-5"
          />
          <Text
            numberOfLines={1}
            className={`font-montSemi w-[85%] ${
              destination ? "text-black" : "text-[#00000057]"
            } `}
          >
            {destination !== null && destination !== ""
              ? destination.display_address
              : "Destination Location"}
          </Text>
        </TouchableOpacity>
        <Image
          source={require("../../../assets/icons/searchPin.png")}
          className="h-5 w-5"
        />
      </View>

      {selected === 1 ? (
        <View className="mx-5 flex flex-row justif-between items-center">
          <Text className="font-montSemi mr-3 text-lg">Via:</Text>
          <TextInput
            style={{
              elevation: 5,
            }}
            onChangeText={setVia}
            value={via}
            className=" bg-white rounded-lg w-36 font-montSemi text-sm px-2"
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            placeholder="Via"
          />
        </View>
      ) : null}

      <View className="flex flex-row items-center mx-5 mt-5">
        <Text className="text-lg font-montSemi">Start By:</Text>
        <TouchableOpacity
          style={{
            elevation: 5,
          }}
          onPress={() => {
            setDatePickType("start");
            setPicker(true);
          }}
          className="bg-white flex-row justify-start px-1.5 py-0.5 mx-2 w-[80px] items-center rounded-lg"
        >
          <Text
            numberOfLines={1}
            className={`font-montSemi text-lg ${
              startDate.length < 2 ? "text-[#bbbbbb]" : "text-black"
            }`}
          >
            {startDate.length < 2 ? "Date" : startDate}
          </Text>
        </TouchableOpacity>
        <Text>-</Text>
        <TouchableOpacity
          style={{
            elevation: 5,
          }}
          className="bg-white flex-row justify-start px-1.5 py-0.5 w-[80px] mx-2 items-center rounded-lg"
          onPress={() => {
            setDatePickType("start");
            setShowTimePicker(true);
          }}
        >
          <Text
            numberOfLines={1}
            className={`font-montSemi w-full text-lg ${
              startTime === null ? "text-[#bbbbbb]" : "text-black"
            }`}
          >
            {startTime
              ? `${startTime.getHours()} : ${startTime.getMinutes()}`
              : "Time"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center mx-5 my-4">
        <Text className="text-lg font-montSemi">Arrive By:</Text>
        <TouchableOpacity
          style={{
            elevation: 5,
          }}
          onPress={() => {
            if (startDate === "") {
              ToastAndroid.show(
                "Pick a Start Date.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              return;
            }
            setDatePickType("reach");
            setPicker(true);
          }}
          className="bg-white flex-row justify-start px-1.5 py-0.5 mx-2 w-[80px] items-center rounded-lg"
        >
          <Text
            numberOfLines={1}
            className={`font-montSemi text-lg ${
              reachDate.length < 2 ? "text-[#bbbbbb]" : "text-black"
            }`}
          >
            {reachDate.length < 2 ? "Date" : reachDate}
          </Text>
        </TouchableOpacity>
        <Text>-</Text>
        <TouchableOpacity
          style={{
            elevation: 5,
          }}
          className="bg-white flex-row justify-start px-1.5 py-0.5 w-[80px] mx-2 items-center rounded-lg"
          onPress={() => {
            setDatePickType("reach");
            setShowTimePicker(true);
          }}
        >
          <Text
            numberOfLines={1}
            className={`font-montSemi w-full text-lg ${
              reachTime === null ? "text-[#bbbbbb]" : "text-black"
            }`}
          >
            {reachTime
              ? `${reachTime.getHours()} : ${reachTime.getMinutes()}`
              : "Time"}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex items-center flex-row mx-5">
        <Text className="text-lg font-montSemi ">Your Fare:</Text>
        <TextInput
          style={{
            elevation: 5,
          }}
          keyboardType="numeric"
          value={fare}
          onChangeText={setFare}
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
          className="text-lg font-montSemi ml-3 px-1.5 py-0.5 rounded-lg bg-white w-20"
          placeholder="₹40"
        />
        <Text className="text-[10px] ml-2 font-montmed">
          (Based on your Route ₹40)
        </Text>
      </View>
      {selected === 0 ? (
        <View className="mx-5 my-4">
          <Text className="text-lg font-montSemi">Preferred Driver:</Text>
          <View className="flex flex-row justify-between mx-4">
            <TouchableOpacity
              onPress={() => setPreferred("male")}
              style={{
                elevation: 5,
                backgroundColor: preferred === "male" ? "#F8DCDC" : "#fff",
              }}
              className="py-1 flex-1 mr-5 mt-5 bg-white rounded-lg px-4 "
            >
              <Text className="font-montSemi text-center text-lg">Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPreferred("female")}
              style={{
                elevation: 5,
                backgroundColor: preferred === "female" ? "#F8DCDC" : "#fff",
              }}
              className="py-1 ml-5 flex-1 mt-5 bg-white rounded-lg px-4 "
            >
              <Text className="font-montSemi text-center text-lg">Female</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-primary mt-5 mx-10 rounded-lg"
      >
        <Text className="font-montSemi text-lg text-center text-white my-1">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
