import {  Pressable, Text } from "react-native";
import {useState} from "react";
import { R } from "../../config";


const NumberKey = ({label}) => {
    const [pressed,setPressed] = useState(false)
    const handlePressIn = () => setPressed(true)
    const handlePressOut = () => setPressed(false)
    return (
        <Pressable
            onPressIn= {handlePressIn}
            onPressOut={handlePressOut}
            style={{
                width: "30%",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 4,
                backgroundColor: pressed ? R.Colors.accentSuccess :'#fefefe',
                borderRadius: 1000,
                marginVertical: 5,
                marginHorizontal: "1%",
            }}
        >
            <Text
                style={{
                fontSize: 40,
                }}
            >
                {label}
            </Text>
        </Pressable>
    );
};

export default NumberKey;
