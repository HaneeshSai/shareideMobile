import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { userStore } from "../store/userStore";

const SelectModal = ({ typeFun, start, type }) => {
  const { picker, setPicker } = userStore();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    getDates();
  }, []);

  const getDates = () => {
    const today = new Date();
    const dates = Array(5)
      .fill()
      .map((_, i) => {
        const date = new Date(today.getTime() + i * 86400000);
        return `${date.getDate()} ${date.toLocaleString("en-US", {
          month: "short",
        })}`;
      });

    setDates(dates);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={picker}
      onRequestClose={() => setPicker(false)}
    >
      <View className="h-full bg-[#0000007a] w-full flex items-center justify-center">
        <View className="bg-white flex flex-col items-center">
          <Text className="text-xl font-montBold px-5 py-3">
            Pick a Date from
          </Text>
          {type === "start"
            ? dates.slice(0, 3).map((e, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    typeFun(e);
                    setPicker(false);
                  }}
                  className={`${
                    i !== 2 ? "border-b" : ""
                  } border-black  px-5 py-3`}
                >
                  <Text className="text-xl font-montSemi">{e}</Text>
                </TouchableOpacity>
              ))
            : dates
                .slice(dates.indexOf(start), dates.indexOf(start) + 2)
                .map((e, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      typeFun(e);
                      setPicker(false);
                    }}
                    className={`${
                      i !== dates.indexOf(start) + 1 ? "border-b" : ""
                    } border-black  px-5 py-3`}
                  >
                    <Text className="text-xl font-montSemi">{e}</Text>
                  </TouchableOpacity>
                ))}
        </View>
      </View>
    </Modal>
  );
};

export default SelectModal;
