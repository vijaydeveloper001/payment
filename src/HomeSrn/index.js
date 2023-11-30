import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { image } from "../../assets";
import { Screens } from "../Navigation/AppNavigation/AppNavigation";

const data = [
  {
    id: 1,
    title: "Potbelly",
    img: image.Pot,
  },
  {
    id: 1,
    title: "Conviction Chicken And Wings",
    img: image.con,
  },
];

import { getRestHome } from "../../api/apiService";
import Loader from "../Loder/Loder";

export function HomeScreens({ navigation }) {
  const [apidata, setapidata] = useState();
  const [loader, setloader] = useState(false);
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={{ ...styles.FlatCon }}
        onPress={() => navigation.navigate(Screens.RestMenu, { id: item?._id })}
      >
        <Image
          source={{ uri: item?.logo_photos[0] }}
          style={{ ...styles.ImageStyle, shadowOpacity: 0.5 }}
        />
        <Text style={styles.TextData}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const getdata = async () => {
    setloader(true);
    await getRestHome(
      "https://api.mealme.ai/search/store/v3?latitude=41.889&longitude=-87.798"
    )
      .then((data) => {
        setloader(false);
        console.log(data);
        setapidata(data?.data?.stores);
        // console.log(JSON.stringify(data?.data?.stores))
      })
      .catch((e) => {
        setloader(false);
        console.log(e);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {loader && <Loader loading={loader} />}
      <ScrollView>
        <Text style={styles.MenuMain}>MealMe</Text>
        <FlatList
          data={apidata}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ImageStyle: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    elevation: 20,
  },
  FlatCon: {
    flex: 1,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 5,
  },
  TextData: {
    fontSize: 25,
    flex: 1,
    alignSelf: "flex-start",
    // paddingHorizontal:2,
    fontWeight: "600",
    marginTop: 5,
  },
  MenuMain: {
    fontSize: 30,
    color: "black",
    fontWeight: "700",
    paddingHorizontal: 30,
    marginTop: 23,
  },
});
