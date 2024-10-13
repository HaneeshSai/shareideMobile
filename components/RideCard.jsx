import { View, Text, Image } from "react-native";
import React from "react";

export default function RideCard({ e, i, len }) {
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    let hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${month}-${day}, ${hours}:${minutes} ${ampm}`;
  }
  return (
    <View
      key={i}
      style={{ elevation: 5 }}
      className={`flex gap-2 w-[96%] relative left-4 h-16 bg-white my-1 ${
        i === len - 1 ? "mb-3" : ""
      } rounded-xl items-center pb-2 flex-row`}
    >
      <Image
        source={
          e.postedBy === "driver"
            ? require("../assets/icons/scootericon.png")
            : require("../assets/images/girl.png")
        }
        className="h-10 w-10"
      />

      <View className="flex w-[80%] justify-between flex-row">
        <View className="">
          <Text className="font-montmed">From</Text>
          <Text numberOfLines={1} className="font-montSemi w-20 text-[15px]">
            {e.start[2]}
          </Text>
        </View>
        <View className="-mt-1">
          <Text className="font-montBold text-[18px] text-center">
            ₹ {e.fare}
          </Text>
          <Text className="font-montmed text-[12px] text-center">
            {formatDate(e.byTime)}
          </Text>
        </View>
        <View>
          <Text className="font-montmed text-right">To</Text>
          <Text
            numberOfLines={1}
            className="font-montSemi text-[15px] w-20 text-right"
          >
            {e.destination[2]}
          </Text>
        </View>
      </View>
    </View>
  );
}
