import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomtextInput from "../../components/textInput";
const data = [
  {
    id: 1,
    name: "Bike",
    img: require("../../assets/images/bike.png"),
  },
  {
    id: 2,
    name: "Scooty",
    img: require("../../assets/images/scooty.png"),
  },
  {
    id: 3,
    name: "Sedan",
    img: require("../../assets/images/sedan.png"),
  },
  {
    id: 4,
    name: "Suv",
    img: require("../../assets/images/suv.png"),
  },
];

const RiderReg = () => {
  const [name, setName] = useState("");

  const renderItem = ({ item }) => (
    <View className="bg-white mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl">
      <Image
        className={item.id !== 2 ? "h-24 w-24" : "h-20 w-24 mt-3 mr-1"}
        source={item.img}
      />
      <Text className="font-montSemi text-center w-full">{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView className="mt-14 mx-6">
      <ScrollView>
        <Text className="font-montBold text-2xl">
          Finish Your Profile as a Rider
        </Text>

        <View className="flex flex-col items-start mt-2 w-full">
          <Text className="text-xl mb-2 font-montSemi">Name</Text>
          <CustomtextInput
            onchange={setName}
            value={name}
            placeholder={"Enter your name"}
          />
        </View>
        <View className="flex flex-col items-start mt-2 w-full">
          <Text className="text-xl font-montSemi">Trusted Contacts</Text>
          <Text className="text-[12px] font-montmed mb-2">
            For your every ride, your live location will be sent to to one of
            your trusted contact, Which you get to choose.
          </Text>
          <View className="mb-3 w-full">
            <CustomtextInput
              onchange={setName}
              value={name}
              placeholder="Contact #1"
            />
          </View>
          <CustomtextInput
            onchange={setName}
            value={name}
            placeholder="Contact #2"
          />
        </View>
        <View className="mx-6">
          <View className="flex flex-row justify-between">
            <View className="bg-white mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl">
              <Image className="h-24 w-24" source={data[0].img} />
              <Text className="font-montSemi text-center w-full">
                {data[0].name}
              </Text>
            </View>
            <View className="bg-white mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl">
              <Image className="h-20 w-24 mt-3 mr-1" source={data[1].img} />
              <Text className="font-montSemi text-center w-full">
                {data[1].name}
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-between">
            <View className="bg-white mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl">
              <Image className="h-24 w-24" source={data[0].img} />
              <Text className="font-montSemi text-center w-full">
                {data[0].name}
              </Text>
            </View>
            <View className="bg-white mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl">
              <Image className="h-20 w-24 mt-3 mr-1" source={data[1].img} />
              <Text className="font-montSemi text-center w-full">
                {data[1].name}
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full flex flex-col mt-5 items-center">
          <TouchableOpacity className="w-[90%] py-1 rounded-lg bg-primary">
            <Text className="text-center font-montSemi text-white text-xl">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RiderReg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    margin: 8,
    alignItems: "center",
  },
  image: {
    height: 128,
    width: 128,
    marginBottom: 8,
  },
});
