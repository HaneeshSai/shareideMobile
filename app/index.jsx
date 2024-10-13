import { StatusBar } from "expo-status-bar";
import {
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, Redirect, router } from "expo-router";
import Swiper from "react-native-swiper";
import { select, createDb, update } from "../utils/dbServices";
import { useEffect } from "react";
import { userStore } from "../store/userStore";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const data = [
  {
    img: require("../assets/images/one.png"),
    h: "Set your own destination and fare.",
    l: "Name your price, and we will find you the best match.",
  },
  {
    img: require("../assets/images/two.png"),
    h: "Connect with reliable drivers.",
    l: "We will match you with drivers based on your preferences.",
  },
  {
    img: require("../assets/images/three.png"),
    h: "Choose a driver you're comfortable with.",
    l: "Compare driver profiles, ratings, vehicles, and fares to make your selection.",
  },

  {
    img: require("../assets/images/four.png"),
    h: "Ride confidently. Track your ride in real-time.",
    l: "Enjoy safe rides every time. Track and share your location easily with an SOS feature.",
  },
];

export default function App() {
  const { user, setUser, setphone } = userStore();

  const fetchUser = async () => {
    try {
      const dbCreation = await createDb();
      if (dbCreation !== "ok") {
        return ToastAndroid.show(
          "Internal Error Occured, Please Try again later",
          ToastAndroid.SHORT
        );
      }

      const fetchedUser = await select({
        table: "user",
      });
      // console.log(fetchedUser);
      if (fetchedUser.length > 0) {
        const User = fetchedUser[0];
        if (User.gender) {
          User.contacts = JSON.parse(fetchedUser[0].contacts);
          console.log(User, "main");
          setUser(User);
          return router.push("/(dashboard)/(tabs)/Registered");
        } else {
          getUserFromDb(User.phone);
          setphone(User.phone);
        }
      } else setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFromDb = async (phone) => {
    try {
      const axResponse = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        {
          phone: phone,
        }
      );
      if (axResponse.data.message === "ok") {
        await SecureStore.setItemAsync("userToken", axResponse.data?.token);
      }
      if (await axResponse.data.user.verified) {
        const params = {
          table: "user",
          data: {
            name: axResponse.data.user.name,
            gender: axResponse.data.user.gender,
            age: axResponse.data.user.age,
            userType: axResponse.data.user.userType,
            contacts: axResponse.data.user.contacts,
            vehicle: axResponse.data.user.vehicle,
            verified: axResponse.data.user.verified,
          },
          where: {
            phone: axResponse.data.user.phone,
          },
        };

        // console.log(params.where)
        const updateResponse = await update(params);
        if (updateResponse === "ok") {
          // console.log(axResponse.data.user)
          setUser(axResponse.data.user);
          router.push("/(dashboard)/(tabs)/Registered");
        }
      } else {
        router.push("/(dashboard)/unRegistered");
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-main">
      <Toast />
      <Swiper
        loop={false}
        autoplay={true}
        showsButtons={true}
        dot={
          <View
            style={{
              backgroundColor: "#E4D8D8",
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: "#E47272",
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 8,
              marginRight: 8,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
      >
        {data.map((e, i) => (
          <View
            key={i}
            className="flex flex-col gap-1 items-center justify-center mx-5 h-full"
          >
            <Image source={e.img} className="h-72  w-72" />
            <Text className="text-2xl font-montSemi text-center">{e.h}</Text>
            <Text className="text-[14px] font-montmed text-center">{e.l}</Text>
            {i === data.length - 1 ? (
              <TouchableOpacity
                onPress={() => {
                  if (user) {
                    if (!user.gender) {
                      router.push("(dashboard)/unRegistered");
                    } else {
                      router.push("(dashboard)/(tabs)/Registered");
                    }
                  } else {
                    router.push("welcome");
                  }
                }}
                className="bg-primary h-10 w-full  flex items-center relative top-5 justify-center rounded-full"
              >
                <Text className="text-white font-montSemi text-[20px]">
                  Start your ride Now
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </Swiper>
    </View>
  );
}
