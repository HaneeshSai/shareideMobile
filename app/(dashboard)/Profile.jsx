import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { userStore } from "../../store/userStore";
import { Feather } from "@expo/vector-icons";
const items = [
  {
    name: "Mobile",
    // image: require("../../assets/icons/phone.png"),
    value: "phone",
  },
  {
    name: "Age",
    image: require("../../assets/icons/age.png"),
    value: "age",
  },
  {
    name: "Gender",
    image: require("../../assets/icons/gender.png"),
    value: "gender",
  },
  {
    name: "Email",
    // image: require("../../assets/icons/email.png"),
    value: "email",
  },
  {
    name: "Preferred Vehicle",
    image: require("../../assets/icons/vehicle.png"),
    value: "vehicle",
  },
  {
    name: "Trusted Contacts",
    // image: require("../../assets/icons/contacts.png"),
    value: "contacts",
  },
  {
    name: "Verified Driver",
    image: require("../../assets/icons/type.png"),
    value: "type",
  },
];

const Pages = [
  {
    name: "Help",
    link: "",
    img: require("../../assets/icons/help.png"),
  },
  {
    name: "Ride History",
    link: "",
    img: require("../../assets/icons/history.png"),
  },
  {
    name: "Send Parcels",
    link: "",
    img: require("../../assets/icons/box.png"),
  },
  {
    name: "Rent Vehicle",
    link: "",
    img: require("../../assets/icons/rent.png"),
  },
  {
    name: "Log Out",
    link: "",
    img: require("../../assets/icons/logout.png"),
  },
];
const Profile = () => {
  const { user } = userStore();
  return (
    <SafeAreaView>
      <ScrollView
        className="h-full flex flex-col"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Image
          className="h-20 w-20 mt-10 mb-3"
          source={
            user.gender === "male"
              ? require("../../assets/icons/man.png")
              : require("../../assets/icons/woman.png")
          }
        />
        <Text className="text-xl font-montSemi">{user.name}</Text>

        <View
          className="rounded-xl bg-white mt-5  w-[90%] px-4 py-3"
          style={{
            elevation: 5,
          }}
        >
          {items.map((e, i) => (
            <View
              className={`flex flex-row py-3 ${
                i !== items.length - 1 ? "border-b" : ""
              } border-primary items-center`}
              key={i}
            >
              <View className="flex-[0.1] ">
                {i !== 0 && e.image ? (
                  <Image source={e.image} className="h-8 w-8" />
                ) : (
                  <Feather name="phone-call" size={24} color="#E96B74" />
                )}
              </View>
              <View className="flex-1 bg-[#fff0]">
                <Text className="text-[16px] font-montSemi ml-6">{e.name}</Text>
                <Text className="text-sm font-montmed ml-6">
                  {e.value === "contacts"
                    ? user[e.value].split("+").join(", ")
                    : !user[e.value]
                    ? "None"
                    : user[e.value] && isNaN(user[e.value])
                    ? user[e.value].charAt(0).toUpperCase() +
                      user[e.value].slice(1)
                    : user[e.value]}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View
          className="rounded-xl mb-5 bg-white mt-5  w-[90%] px-4 py-3"
          style={{
            elevation: 5,
          }}
        >
          {Pages.map((e, i) => (
            <View
              key={i}
              className={`flex items-center flex-row py-3 ${
                i !== Pages.length - 1 ? "border-b border-primary" : ""
              }`}
            >
              <Image className="w-8 h-8" source={e.img} />
              <Text className="font-montSemi ml-5 text-[16px]">{e.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
