import { View, Text, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import CloseScreenButton from "../../components/atoms/closeScreenButton";

const AddStack = () => {
  const router = useRouter();
  const goToHome = () => router.replace("/");

  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add New Entry",
          headerShown: false,
          gestureDirection: "vertical",
          headerLeft: () => <CloseScreenButton handleClick={goToHome} />,
        }}
      />
      <Stack.Screen
        name="transfer"
        options={{
          headerTitle: "Transfer",
          headerLeft: () => <CloseScreenButton handleClick={goToHome} />,
        }}
      />
    </Stack>
  );
};

export default AddStack;
