import {  Pressable, Text } from "react-native";
import {useState} from "react";
import { R } from "../../config";
import * as Haptics from 'expo-haptics';

const NumberKey = ({label,color,onPress}) => {
    const handlePress = () => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);onPress()}
    return (
        <Pressable
            onPress={handlePress}
            style={{
                width: "25%",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                margin : 1,
                borderRadius : 5,
                backgroundColor : '#fff'
            }}
        >
            <Text
                style={{
                fontSize: 28,
                color : color
                }}
            >
                {label}
            </Text>
        </Pressable>
    );
};

export default NumberKey;
