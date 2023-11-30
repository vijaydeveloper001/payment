import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { HomeScreens } from "../../HomeSrn/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Restmenu from "../../RestaurantMenu";
import Home from "../../Home";
import Splash from "../../Splash";
const Stack = createNativeStackNavigator();

export const Screens = {
  Home: "Home",
  RestMenu: "RestMenu",
  Splash: "Splash",
};

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.Splash}
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Screens.Home}
        component={HomeScreens}
        options={{
          title: "Restaurant for you",
          headerStyle: {
            backgroundColor: "white",
          },

          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "700",
          },
          headerBackVisible: false,

          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={Screens.RestMenu}
        component={Restmenu}
        options={{
          title: "Restaurant menu",
          headerStyle: {
            backgroundColor: "white",
          },

          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "700",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
