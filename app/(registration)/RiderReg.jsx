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
import { insert } from "../../utils/dbServices";
import { userStore } from "../../store/userStore";
import SubmittedModal from "../../components/SubmittedModal";
import axios from "axios";
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
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [vehicle, setVehicle] = useState("");

  const { phone, setSubmittedModal } = userStore();

  const onSubmit = async () => {
    try {
      const params = {
        table: "user",
        data: {
          name: name,
          phone: phone,
          gender: gender,
          age: parseInt(age),
          type: "rider",
          contacts: `${contact1}+${contact2}`,
          vehicle: vehicle,
          status: "verfied",
        },
      };

      const response = await axios.post(
        `http://192.168.1.14:3000/auth/registerrider`,
        { data: params.data }
      );

      if (response.data.message === "ok") {
        await insert(params);
        setSubmittedModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="mt-14 ">
      <SubmittedModal />
      <ScrollView className="px-5">
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
          <Text className="text-xl mb-2 font-montSemi">Age</Text>
          <CustomtextInput
            onchange={setAge}
            value={age}
            placeholder={"Enter your age"}
          />
        </View>
        <View className="my-5">
          <Text className="font-montSemi text-xl mb-2">Gender</Text>
          <View className="flex flex-row justify-between mx-10">
            <TouchableOpacity
              onPress={() => setGender("male")}
              className={`${
                gender === "male" ? "bg-secondary" : "bg-white"
              } p-3 rounded-lg`}
            >
              <Image
                className="h-20 w-20"
                source={require("../../assets/images/boy.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setGender("female")}
              className={`${
                gender === "female" ? "bg-secondary" : "bg-white"
              } p-3 rounded-lg`}
            >
              <Image
                className="h-20 w-20"
                source={require("../../assets/images/girl.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex flex-col items-start mt-2 w-full">
          <Text className="text-xl font-montSemi">Trusted Contacts</Text>
          <Text className="text-[12px] font-montmed mb-2">
            For your every ride, your live location will be sent to to one of
            your trusted contact, Which you get to choose.
          </Text>
          <View className="mb-3 w-full">
            <CustomtextInput
              onchange={setContact1}
              value={contact1}
              placeholder="Contact #1"
            />
          </View>
          <CustomtextInput
            onchange={setContact2}
            value={contact2}
            placeholder="Contact #2"
          />
        </View>
        <Text className="mt-5 font-montSemi text-xl">Prefered Vehicle</Text>
        <View className="mx-6">
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={() => setVehicle("bike")}
              className={`${
                vehicle === "bike" ? "bg-secondary" : "bg-white"
              } mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl`}
            >
              <Image className="h-24 w-24" source={data[0].img} />
              <Text className="font-montSemi text-center w-full">
                {data[0].name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVehicle("scooty")}
              className={`${
                vehicle === "scooty" ? "bg-secondary" : "bg-white"
              } mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl`}
            >
              <Image className="h-20 w-24 mt-3 mr-1" source={data[1].img} />
              <Text className="font-montSemi text-center w-full">
                {data[1].name}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={() => setVehicle("sedan")}
              className={`${
                vehicle === "sedan" ? "bg-secondary" : "bg-white"
              } mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl`}
            >
              <Image className="h-24 w-24" source={data[2].img} />
              <Text className="font-montSemi text-center w-full">
                {data[2].name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setVehicle("suv")}
              className={`${
                vehicle === "suv" ? "bg-secondary" : "bg-white"
              } mt-4 flex pb-3 flex-col items-center justify-center w-28 h-28 rounded-xl`}
            >
              <Image className="h-20 w-24 mt-3 mr-1" source={data[3].img} />
              <Text className="font-montSemi text-center w-full">
                {data[3].name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full mb-5 flex flex-col mt-5 items-center">
          <TouchableOpacity
            onPress={() => onSubmit()}
            className="w-[90%] py-1 rounded-lg bg-primary"
          >
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
