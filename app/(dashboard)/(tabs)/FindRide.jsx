import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import RideCard from "../../../components/RideCard";

const riders = [
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    time: "3:40pm",
    gender: "male",
  },
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    time: "3:40pm",
    gender: "male",
  },
  {
    from: "warsaiguda",
    to: "Ghatkesar",
    fare: 150,
    time: "3:40pm",
    gender: "male",
  },
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    time: "3:40pm",
    gender: "male",
  },
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    time: "3:40pm",
    gender: "male",
  },
  {
    from: "warsaiguda",
    to: "Ghatkesar",
    fare: 150,
    time: "3:40pm",
    gender: "male",
  },
];

const drivers = [
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    via: "tarnaka",
  },
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    via: "tarnaka",
  },
  {
    from: "warsaiguda",
    to: "Ghatkesar",
    fare: 150,
    via: "tarnaka",
  },
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    via: "tarnaka",
  },
  {
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    via: "tarnaka",
  },
  {
    from: "warsaiguda",
    to: "Ghatkesar",
    fare: 150,
    via: "tarnaka",
  },
];

const FindRide = () => {
  const [selected, setSelected] = useState(0);
  const height = useBottomTabBarHeight();

  
  const fetchInitialRides = async() => {
    
  }

  return (
    <SafeAreaView className="pt-20 ">
      <View
        style={{
          elevation: 7,
        }}
        className="flex ml-9 flex-row px-3 py-1.5 rounded-full items-center w-[80%] bg-white"
      >
        <View className="flex flex-1 flex-row items-center gap-2">
          <Image
            source={require("../../../assets/icons/redDot.png")}
            className="h-5 w-5"
          />
          <TextInput
            placeholderTextColor="rgba(0, 0, 0, 0.3)"
            className="font-montSemi w-[85%]"
            placeholder="Destination Location"
          />
        </View>
        <Image
          source={require("../../../assets/icons/searchPin.png")}
          className="h-6 w-6"
        />
      </View>

      <View className="flex mx-14 my-4 flex-row justify-between">
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
        <ScrollView
          style={{
            paddingBottom: height,
          }}
          className="h-[78%]"
        >
          {selected === 0
            ? riders.map((e, i) => (
                <RideCard key={i} e={e} i={i} len={riders.length} />
              ))
            : drivers.map((e, i) => (
                <RideCard e={e} key={i} i={i} len={drivers.length} />
              ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FindRide;
