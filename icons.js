import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

const paymentCateggoriesIcons = {
  food: (color, dim) => <Ionicons name="fast-food" size={dim} color={color} />,
};
const wallets = {
  cash: ({ color, dim }) => (
    <MaterialCommunityIcons name="cash-multiple" size={dim} color={color} />
  ),
  card: ({ color, dim }) => (
    <FontAwesome5 name="credit-card" size={dim} color={color} />
  ),
  bank: ({ color, dim }) => (
    <FontAwesome name="bank" size={dim} color={color} />
  ),
};
export const Icons = {
  paymentCategories: paymentCateggoriesIcons,
  downCircleArrowHollow: ({ color, dim }) => (
    <AntDesign name="downcircleo" size={dim} color={color} />
  ),
  wallets: wallets,
};
