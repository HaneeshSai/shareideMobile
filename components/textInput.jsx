import { View, Text, TextInput } from "react-native";
import React from "react";

const CustomtextInput = ({ onchange, value, placeholder }) => {
  const handleChange = (text) => {
    onchange(text);
  };

  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderColor: "black",
        borderWidth: 0.5,
        // marginHorizontal: 35,
        borderRadius: 8, // Equivalent to rounded-md in Tailwind
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <TextInput
        onChangeText={handleChange}
        value={value}
        placeholder={placeholder}
        className="font-montSemi text-black w-full text-lg"
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
      />
    </View>
  );
};

export default CustomtextInput;
