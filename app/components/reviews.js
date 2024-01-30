import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { scale } from "@utils/utils";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import tickMark from "../assets/images/tickMark.png";
import StringsOfLanguages from "../utils/translations";
import {
    FONT_FAMILY_LIGHT,
    FONT_FAMILY_SEMIBOLD,
    BORDERLINE_COLOR,
  } from "@utils/constants";

const reviews = (props) => {
  const { profileImage, userName, comment, date } = props;
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image style={styles.imageDesign} source={profileImage} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.section1}>
            <View style={styles.section2}>
              <Text style={styles.titileText}>{userName}</Text>
              <Rating
                type="custom"
                ratingColor="#EB9C25"
                ratingBackgroundColor="#c8c7c8"
                ratingCount={5}
                imageSize={20}
                style={styles.rating}
              />
            </View>
            <Text style={styles.detailText}>{comment}</Text>
            <View style={styles.section3}>
              <Text style={styles.dateText}>{date}</Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{StringsOfLanguages.VERIFIED}</Text>
                <Image style={styles.tickMark} source={tickMark} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.border}></View>
      </View>
  );
};
styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "row",
    flex: 1,
    marginBottom: scale(10),
  },
  leftContainer: {
    flex: 1.2,
    paddingHorizontal: 2,
    //backgroundColor:'red'
  },
  rightContainer: {
    flex: 5,
  },
  titileText: {
    fontSize: scale(16),
    fontWeight: "400",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: "#666666",
  },
  imageDesign: {
    width: scale(60),
    height: scale(60),
  },
  detailText: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: scale(12),
    fontWeight: "400",
    color: "#666666",
  },
  section1: {
    flexDirection: "column",
    paddingHorizontal: 5,
  },
  section2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontFamily: FONT_FAMILY_LIGHT,
    fontSize: scale(12),
    fontWeight: "400",
    color: "#666666",
  },
  button: {
    width: scale(96),
    height: scale(21),
    backgroundColor: "#2FBB4E",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tickMark: {
    width: scale(15),
    height: scale(15),
  },
  buttonText: {
    color: "white",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: scale(12),
    fontWeight: "600",
  },
  border: {
    borderWidth: 1,
    borderColor: BORDERLINE_COLOR,
    height: 1,
    marginRight: scale(3),
  },
});
export default reviews;
