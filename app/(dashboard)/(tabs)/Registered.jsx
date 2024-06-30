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
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { userStore } from "../../../store/userStore";
import axios from "axios";

const drivers = [
  { longitude: 78.51, latitude: 17.4163 },
  { longitude: 78.512, latitude: 17.4163 },
  { longitude: 78.513, latitude: 17.4163 },
  { longitude: 78.514, latitude: 17.4163 },
];

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
  const deviceHeight = Dimensions.get("window").height;
  const topHeight = useRef(new Animated.Value(0.4 * deviceHeight)).current;
  const bottomHeight = useRef(new Animated.Value(0.6 * deviceHeight)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDividerClicked, setIsDividerClicked] = useState(false);

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
  }, []);

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
            {drivers.map((e, i) => (
              <Marker
                key={i}
                coordinate={{
                  longitude: e.longitude,
                  latitude: e.latitude,
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
        <View className="h-full bg-[#FBEDED] rounded-tl-3xl z-20 -mt-2 rounded-tr-3xl">
          <View
            style={[
              styles.divider,
              isDividerClicked ? styles.dividerActive : null,
            ]}
            {...panResponder.panHandlers}
          ></View>
          <Text className="font-montSemi ml-4 mb-2 text-xl">
            Riders Near You
          </Text>
          <View className="relative flex items-center flex-col">
            <ScrollView className="w-full mb-[145px]">
              {riders.map((e, i) => (
                <View
                  key={i}
                  style={{ elevation: 5 }}
                  className="flex w-[96%] relative left-4 gap-2 h-16 bg-white my-1 rounded-xl items-center pb-2 flex-row"
                >
                  <Image
                    source={
                      e.gender === "male"
                        ? require("../../../assets/images/boy.png")
                        : require("../../../assets/images/girl.png")
                    }
                    className="h-10 w-10"
                  />
                  <View className="flex w-[80%] justify-between flex-row">
                    <View className="">
                      <Text className="font-montmed">From</Text>
                      <Text className="font-montSemi text-[15px]">
                        {e.from}
                      </Text>
                    </View>
                    <View className="-mt-1">
                      <Text className="font-montBold text-[18px] text-center">
                        ₹ {e.fare}
                      </Text>
                      <Text className="font-montmed">by {e.time}</Text>
                    </View>
                    <View>
                      <Text className="font-montmed text-right">To</Text>
                      <Text className="font-montSemi text-[15px] text-right">
                        {e.to}
                      </Text>
                    </View>
                  </View>
                </View>
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
