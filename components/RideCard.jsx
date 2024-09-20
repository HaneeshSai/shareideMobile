import { View, Text, Image } from "react-native";
import React from "react";

export default function RideCard({ e, i, len }) {
  return (
    <View
      key={i}
      style={{ elevation: 5 }}
      className={`flex gap-2 w-[96%] relative left-4 h-16 bg-white my-1 ${
        i === len - 1 ? "mb-3" : ""
      } rounded-xl items-center pb-2 flex-row`}
    >
      {e.gender ? (
        <Image
          source={
            e.gender === "male"
              ? require("../assets/images/boy.png")
              : require("../assets/images/girl.png")
          }
          className="h-10 w-10"
        />
      ) : (
        <Image
          source={require("../assets/icons/scootericon.png")}
          className="h-10 w-10"
        />
      )}

      <View className="flex w-[80%] justify-between flex-row">
        <View className="">
          <Text className="font-montmed">From</Text>
          <Text className="font-montSemi text-[15px]">{e.from}</Text>
        </View>
        <View className="-mt-1">
          <Text className="font-montBold text-[18px] text-center">
            ₹ {e.fare}
          </Text>
          <Text className="font-montmed text-[12px] text-center">
            {e.time ? `by ${e.time}` : `${e.via}`}
          </Text>
        </View>
        <View>
          <Text className="font-montmed text-right">To</Text>
          <Text className="font-montSemi text-[15px] text-right">{e.to}</Text>
        </View>
      </View>
    </View>
  );
}
