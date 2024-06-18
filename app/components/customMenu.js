import React, { useEffect, useState } from "react";
import { AuthContext } from "../utils/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  FONT_FAMILY_SEMIBOLD,
  GRADIENT_COLOR_NEW3,
  WHITE_COLOR,
} from "../utils/constants";
import { scale } from "@utils/utils";
import { Avatar, Text } from "react-native-paper";
import home from "../assets/images/home.png";
import user from "../assets/images/join.png";
import category from "../assets/images/category.png";
import logOut from "../assets/images/logout.png";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import StringsOfLanguages from "../utils/translations";
import { ICONS } from "../utils/imagePath";

const customMenu = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const { signIn } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [loginStatus, setloginStatus] = useState(false);
  const [userData, setUserData] = useState({});

  // console.log("userdata:-", userData)

  /* const userToken =  JSON.parse(AsyncStorage.getItem('userToken')); */

  const getuserData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    if (userToken !== null) {
      const userData = await AsyncStorage.getItem("userData");
      setUserData(JSON.parse(userData));
      setloginStatus(true);
    }
  };
  useEffect(() => {
    getuserData();
  }, []);

  const logOut = () => {
    signOut();
  };
  return (
    <View style={{ flex: 1, backgroundColor: GRADIENT_COLOR_NEW3 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: GRADIENT_COLOR_NEW3 }}>
          <TouchableOpacity
            style={{ padding: scale(4) }}
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
            <Image
              //  source={require("../assets/images/Vector.png")}
              source={ICONS.close_New}
              style={{
                width: scale(28),
                height: scale(28),
                tintColor: WHITE_COLOR,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>

          {loginStatus ? (
            <View style={{ flexDirection: "row", padding: scale(10) }}>
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: scale(5),
                  marginTop: scale(5),
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: FONT_FAMILY_SEMIBOLD,
                    fontSize: scale(14),
                    fontWeight: "600",
                  }}
                >
                  {`Welcome! ${userData.firstname} ${userData.lastname}`}
                </Text>
              </View>
            </View>
          ) : (
            console.log()
          )}
        </View>

        <View style={{ marginLeft: scale(20), marginTop: scale(20) }}>
          {!loginStatus ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  // console.log("Navigate to home screen");
                  navigation.navigate("homeScreen");
                }}
              >
                <View style={{ flexDirection: "row", padding: scale(10) }}>
                  <Image
                    // source={home}
                    source={ICONS.homeIcon}
                    style={{
                      width: scale(20),
                      height: scale(20),
                      tintColor: WHITE_COLOR,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: scale(14),
                      fontWeight: "600",
                      marginLeft: scale(10),
                      color: "white",
                      fontFamily: FONT_FAMILY_SEMIBOLD,
                    }}
                  >
                    {StringsOfLanguages.HOME}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderStyle: "dashed",
                  borderWidth: 0.5,
                  borderColor: "white",
                  marginLeft: scale(10),
                  width: windowWidth / 1.7,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("loginScreen");
                }}
              >
                <View style={{ flexDirection: "row", padding: scale(10) }}>
                  <Image
                    // source={user}
                    source={ICONS.joinIcon}
                    style={{
                      width: scale(20),
                      height: scale(20),
                      tintColor: WHITE_COLOR,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: scale(14),
                      fontWeight: "600",
                      marginLeft: scale(10),
                      color: "white",
                      fontFamily: FONT_FAMILY_SEMIBOLD,
                    }}
                  >
                    {StringsOfLanguages.JOIN_US}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderStyle: "dashed",
                  borderWidth: 0.5,
                  borderColor: "white",
                  marginLeft: scale(10),
                  width: windowWidth / 1.7,
                }}
              />
            </>
          ) : (
            console.log()
          )}

          {loginStatus ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("profileDetailsScreen");
                }}
              >
                <View style={{ flexDirection: "row", padding: scale(10) }}>
                  <Image source={user} />
                  <Text
                    style={{
                      fontSize: scale(14),
                      fontWeight: "600",
                      marginLeft: scale(10),
                      color: "white",
                      fontFamily: FONT_FAMILY_SEMIBOLD,
                    }}
                  >
                    {StringsOfLanguages.BUSINESS_DETAIL}
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderStyle: "dashed",
                  borderWidth: 0.5,
                  borderColor: "white",
                  marginLeft: scale(10),
                  width: windowWidth / 1.7,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("accountScreen");
                }}
              >
                <View style={{ flexDirection: "row", padding: scale(10) }}>
                  <Image source={category} />
                  <Text
                    style={{
                      fontSize: scale(14),
                      fontWeight: "600",
                      marginLeft: scale(10),
                      color: "white",
                      fontFamily: FONT_FAMILY_SEMIBOLD,
                    }}
                  >
                    {StringsOfLanguages.PROFILE_DETAIL}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            console.log()
          )}
        </View>
      </DrawerContentScrollView>
      {loginStatus ? (
        <>
          <TouchableOpacity onPress={() => logOut()}>
            <View style={{ flexDirection: "row", padding: scale(30) }}>
              <Image source={logOut} />
              <Text
                style={{
                  fontSize: scale(14),
                  fontWeight: "600",
                  marginLeft: scale(5),
                  color: "white",
                  fontFamily: FONT_FAMILY_SEMIBOLD,
                }}
              >
                {StringsOfLanguages.LOGOUT}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        console.log()
      )}
    </View>
  );
};
const styles = StyleSheet.create({});
export default customMenu;
