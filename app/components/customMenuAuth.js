import React from "react";
import { AuthContext } from "../utils/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  FONT_FAMILY_SEMIBOLD,
} from "../utils/constants";
import { scale } from "@utils/utils";
import {
  Avatar,
  Text,
 
} from "react-native-paper";
import home from "../assets/images/home.png";
import user from "../assets/images/join.png";
import category from "../assets/images/category.png";
import logOut from "../assets/images/logout.png";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { DrawerActions } from '@react-navigation/native';
import StringsOfLanguages from "../utils/translations";

const customMenuAuth =  (props) => {
  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;

  const logOut = () => {
    signOut()
  } 
  return (
    <View style={{ flex: 1, backgroundColor: "#847AF0" }}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: "#776EDF" }}>
          <TouchableOpacity style={{ padding: scale(10) }} onPress = {()=> {navigation.dispatch(DrawerActions.closeDrawer())}}>
            <Image source={require("../assets/images/Vector.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> {navigation.navigate("accountScreen")}}>
          <View style={{ flexDirection: "row", padding: scale(10) }}>
            <Avatar.Image
              source={require("../assets/images/review-img-01.png")}
              size={60}
            />
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
                {StringsOfLanguages.welcome}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: FONT_FAMILY_SEMIBOLD,
                  fontSize: scale(14),
                  fontWeight: "600",
                }}
              >
                {StringsOfLanguages.JOHN_D}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
        {/* <DrawerItemList {...props}/> */}
        <View style={{ marginLeft: scale(20), marginTop: scale(20) }}>
         
          <View
            style={{
              borderStyle: "dashed",
              borderWidth: 0.5,
              borderColor: "white",
              marginLeft: scale(10),
              width: windowWidth / 1.7,
            }}
          />
       
          <View
            style={{
              borderStyle:"dashed",
              borderWidth: 0.5,
              borderColor: "white",
              marginLeft: scale(10),
              width: windowWidth / 1.7,
            }}
          />
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
               {StringsOfLanguages.LOGIN}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              borderStyle:"dashed",
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
        </View>
      </DrawerContentScrollView>
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
    </View>
  );
};
const styles = StyleSheet.create({
  
})
export default customMenuAuth;
