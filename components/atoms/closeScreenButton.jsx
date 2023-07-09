import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const CloseScreenButton = ({handleClick}) => {
  return (
    <Pressable onPress={handleClick}>
      <Ionicons
        style={{ paddingRight: 10 }}
        name="close"
        size={30}
        color="black"
      />
    </Pressable>
  );
};

export default CloseScreenButton;
