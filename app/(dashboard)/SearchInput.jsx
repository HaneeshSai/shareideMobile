import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { userStore } from "../../store/userStore";

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const SearchInput = () => {
  const [searchResults, setSeachResults] = useState([]);
  const [search, setSearch] = useState("");
  const { pickUp, setPickUp } = userStore();

  const autoComplete = useCallback(async (query) => {
    try {
      const response = await axios.get(
        `https://api.locationiq.com/v1/autocomplete?key=pk.01d00380bf78099702d0e45211664b82&q=${query}&limit=5&dedupe=1&`
      );
      setSeachResults(response.data);
    } catch (error) {
      console.log("Error fetching autocomplete results", error);
      // setError("Failed to fetch autocomplete results. Please try again later.");
    }
  }, []);

  const debouncedAutoComplete = useCallback(
    debounce((query) => {
      autoComplete(query);
    }, 300),
    [autoComplete]
  );

  useEffect(() => {
    if (search.length > 3) {
      // setIsSearching(true);
      debouncedAutoComplete(search);
    }
  }, [search, debouncedAutoComplete]);

  return (
    <SafeAreaView className="px-5 py-10 h-full bg-[#FFF5F5]">
      <Text className="font-montSemi text-2xl mx-2 my-5">Pickup</Text>
      <View
        style={{
          elevation: 6,
        }}
        className="flex flex-row bg-white px-3 py-1 rounded-3xl items-center justify-between mx-2"
      >
        <View className="flex flex-row gap-2 items-center ">
          <Image
            source={require("../../assets/icons/rec.png")}
            className="h-5 w-5"
          />
          {pickUp !== null && pickUp !== "" ? (
            <Text
              numberOfLines={1}
              className="font-montSemi py-[5px] px-0.5 w-[80%]"
            >
              {pickUp.display_address}
            </Text>
          ) : (
            <TextInput
              value={search}
              onChangeText={(e) => setSearch(e)}
              className="font-montSemi w-[80%]"
              placeholder="Your Pickup Location"
              placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
          )}
        </View>
        <Image
          source={require("../../assets/icons/searchPin.png")}
          className="h-5 w-5"
        />
      </View>
      <View className="flex flex-row">
        <TouchableOpacity className="mx-2 bg-primary px-3 py-1 rounded-lg my-4">
          <Text className="text-lg font-montSemi text-white text-center">
            Select on Map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            elevation: 8,
          }}
          onPress={() => {
            setPickUp(null);
            setSearch("");
          }}
          className="mx-2 border-[1px] border-slate-500 bg-white px-3 py-1 rounded-lg my-4"
        >
          <Text className="text-lg font-montSemi text-black text-center">
            Clear Pickup
          </Text>
        </TouchableOpacity>
      </View>

      <View className="border-t border-primary">
        {search.length > 1 && searchResults.length > 1
          ? searchResults.map((e, i) => (
              <TouchableOpacity
                onPress={() => setPickUp(e)}
                key={i}
                style={{ elevation: 7 }}
                className="bg-white rounded-lg px-3 py-2 my-1.5"
              >
                <Text className="font-montSemi">{e.display_place}</Text>
                <Text numberOfLines={1} className="text-sm font-montreg">
                  {e.display_address}
                </Text>
              </TouchableOpacity>
            ))
          : null}
      </View>
    </SafeAreaView>
  );
};

export default SearchInput;
