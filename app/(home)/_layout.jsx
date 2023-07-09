
import React from "react";
import { Tabs } from "expo-router";

import { Fontisto } from "@expo/vector-icons";

import { R } from "../../config";
import AddExpensesButton from "../../components/atoms/addExpensesButton";

const Navs = [
  {
    route: "index",
    title: "Home",
    icon: ({ color }) => <Fontisto name="home" size={24} color={color} />,
  },
  {
    route: "history",
    title: "History",
    icon: ({ color }) => <Fontisto name="history" size={24} color={color} />,
  },
  {
    route: "scheduled",
    title: "Scheduled",
    icon: ({ color }) => <Fontisto name="calendar" size={24} color={color} />,
  },
  {
    route: "budjet",
    title: "Budjet",
    icon: ({ color }) => <Fontisto name="calculator" size={24} color={color} />,
  },
  {
    route: "more",
    title: "More",
    icon: ({ color }) => (
      <Fontisto name="player-settings" size={24} color={color} />
    ),
  },
];

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerTitle: "Home",
          headerShown: false,
          tabBarItemStyle: { padding: 15 },
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "#f5f5f5",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: R.Dim.navBarHeight,
          },
        }}
      >
        {Navs.map((item, key) => (
          <Tabs.Screen
            key={key}
            name={item.route}
            options={{
              tabBarActiveTintColor: R.Colors.accentText,
              tabBarInactiveTintColor: R.Colors.primartText,
              title: item.title,
              tabBarIcon: item.icon,
            }}
          />
        ))}
      </Tabs>
      <AddExpensesButton/>
    </>
  );
};

export default TabLayout;
