import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import RideCard from "../../../components/RideCard";
import axios from "axios";
import Toast from "react-native-toast-message";
import { userStore } from "../../../store/userStore";
import { router } from "expo-router";

const FindRide = () => {
  const [selected, setSelected] = useState(0);
  const height = useBottomTabBarHeight();
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [initRides, setInitRides] = useState([]);
  const {
    setSearchDestination,
    searchDestination,
    refresh,
    destination,
    pickUp,
  } = userStore();

  const getInitRides = async () => {
    const coords = [pickUp.lat, pickUp.lon];
    setSearching(false);
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/getInitRides`,
        { coords }
      );
      setInitRides(response.data.rides);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT);
    }
  };

  const handleSearch = async () => {
    if (!pickUp || !destination) return;

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/get-searched-rides`,
        {
          start: [pickUp.lat, pickUp.lon],
          destination: [destination.lat, destination.lon],
        }
      );
      setSearching(true);
      setResults(response.data.result);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (destination) handleSearch();
    else getInitRides();
  }, [destination, refresh]);

  useEffect(() => {
    getInitRides();
  }, [refresh]);

  return (
    <SafeAreaView className="pt-20 bg-[#FFF5F5] ">
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
              ? destination.display_place
              : "Destination Location"}
          </Text>
        </TouchableOpacity>
        <Image
          source={require("../../../assets/icons/searchPin.png")}
          className="h-5 w-5"
        />
      </View>

      <View className="flex mx-14 mb-4 flex-row justify-between">
        <TouchableOpacity
          onPress={() => setSelected(1)}
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
        <TouchableOpacity
          onPress={() => setSelected(0)}
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
      </View>
      <View>
        {!searching ? (
          <Text className="text-center text-lg font-montSemi">
            Nearest Rides from your Pick up
          </Text>
        ) : null}
        <ScrollView
          style={{
            paddingBottom: height,
          }}
          className="h-[72%]"
        >
          {!searching && selected === 1
            ? initRides
                .filter((e) => e.postedBy === "driver")
                .map((e, i) => <RideCard key={i} e={e} i={i} />)
            : !searching && selected === 0
            ? initRides
                .filter((e) => e.postedBy !== "driver")
                .map((e, i) => <RideCard key={i} e={e} i={i} />)
            : searching && selected === 1
            ? results
                .filter((e) => e.postedBy === "driver")
                .map((e, i) => <RideCard key={i} e={e} i={i} />)
            : searching && selected === 0
            ? results
                .filter((e) => e.postedBy !== "driver")
                .map((e, i) => <RideCard e={e} key={i} i={i} />)
            : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FindRide;
