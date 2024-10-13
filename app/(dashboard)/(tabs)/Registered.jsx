import React, { useEffect, useCallback, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { userStore } from "../../../store/userStore";
import axios from "axios";
import RideCard from "../../../components/RideCard";

const drivers = [
  { longitude: 78.51, latitude: 17.4163 },
  { longitude: 78.512, latitude: 17.4163 },
  { longitude: 78.513, latitude: 17.4163 },
  { longitude: 78.514, latitude: 17.4163 },
];

const riderrs = [
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
    gender: "female",
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
    from: "Parsigutta",
    to: "Ghatkesar",
    fare: 150,
    time: "3:40pm",
    gender: "male",
  },
];

const Registered = () => {
  const [location, setLocation] = useState(null);
  const { user } = userStore();
  const deviceHeight = Dimensions.get("window").height;
  const topHeight = useRef(new Animated.Value(0.4 * deviceHeight)).current;
  const bottomHeight = useRef(new Animated.Value(0.6 * deviceHeight)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDividerClicked, setIsDividerClicked] = useState(false);
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    getInitRides();
  }, []);

  const getInitRides = async () => {
    const coords = [17.41628932449812, 78.50900937535476];
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/getInitRides`,
        { coords }
      );
      setRiders(response.data.rides);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        setIsDividerClicked(true);
      },
      onPanResponderMove: (e, gestureState) => {
        const newTopHeight = gestureState.moveY;
        const newBottomHeight = deviceHeight - gestureState.moveY;
        if (newTopHeight >= 40 && newBottomHeight >= 40) {
          topHeight.setValue(newTopHeight);
          bottomHeight.setValue(newBottomHeight);
        }
      },
      onPanResponderRelease: () => {
        setIsDividerClicked(false);
      },
    })
  ).current;

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
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.topPane, { height: topHeight }]}>
        {location?.coords ? (
          <MapView
            style={styles.map}
            region={{
              longitude: location?.coords.longitude,
              latitude: location?.coords.latitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                longitude: location?.coords.longitude,
                latitude: location?.coords.latitude,
              }}
              title="Your Location"
              onPress={() => console.log("clicked")}
            >
              <Image
                source={require("../../../assets/icons/searchPin.png")}
                style={styles.markerImage}
              />
            </Marker>
            {riders
              .filter((e) => e.postedBy === "driver")
              .map((e, i) => (
                <Marker
                  key={i}
                  coordinate={{
                    longitude: Number(e.start[1]),
                    latitude: Number(e.start[0]),
                  }}
                  title=""
                  onPress={() => console.log("clicked on driver")}
                >
                  <Image
                    style={styles.markerImage}
                    source={require("../../../assets/icons/scooter.png")}
                  />
                </Marker>
              ))}
          </MapView>
        ) : null}
      </Animated.View>

      <Animated.View
        style={{
          height: bottomHeight,
          borderRadius: 100,
          zIndex: 20,
        }}
      >
        <View className="h-full bg-[#FBEDED] rounded-tl-3xl z-20 rounded-tr-3xl">
          <View
            style={[
              styles.divider,
              isDividerClicked ? styles.dividerActive : null,
            ]}
            {...panResponder.panHandlers}
          ></View>
          <Text className="font-montSemi ml-4 text-xl">Riders Near You</Text>
          <View className="relative flex items-center flex-col">
            <ScrollView className="w-full mb-[110px]">
              {riders.map((e, i) => (
                <RideCard key={i} e={e} i={i} len={riders.length} />
              ))}
            </ScrollView>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topPane: {
    backgroundColor: "white",
    minHeight: 40,
    zIndex: 10,
  },
  divider: {
    height: 10,
    marginVertical: 10,
    borderRadius: 50,
    width: 100,
    marginLeft: "37%",
    backgroundColor: "#e2e2e2",
  },
  dividerActive: {
    backgroundColor: "#e67070",
  },

  map: {
    width: "100%",
    height: "100%",
  },
  markerImage: {
    height: 40,
    width: 40,
  },
});

export default Registered;
