import { StyleSheet } from "react-native";
import {
  WHITE_COLOR,
  BLACK_COLOR,
  PLACEHOLDER_COLOR,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_MEDIUM,
  GRADIENT_COLOR,
  GRADIENT_COLOR_NEW2,
  COMMON_COLOR,
  GRAY_COLOR,
} from "./../../../utils/constants";
import { scale } from "@utils/utils";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const style = StyleSheet.create({
  //Remi
  modalContainermain: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: wp("100%"),
    height: hp("80%"),
    backgroundColor: WHITE_COLOR,

    // padding: scale(10),
    borderTopRightRadius: scale(30),
    borderTopLeftRadius: scale(30),
    shadowColor: BLACK_COLOR,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  topheading: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    /*  marginHorizontal:20,
    marginVertical:20, */
    paddingHorizontal: scale(15),
    paddingVertical: scale(15),
    fontWeight: "bold",
    fontSize: 50,
    borderBottomColor: WHITE_COLOR,
    borderBottomWidth: 1,
  },
  topheadingtext: {
    fontWeight: "700",
    fontSize: scale(20),
    color: COMMON_COLOR,
  },
  midelcontent: {
    flex: 4.5,
    //backgroundColor:'red'
    /* marginHorizontal:20,
    marginVertical:20, */
  },
  bottumbutton: {
    flex: 1,
    //padding:10
  },
  buttonview: {
    width: wp("70%"),
    alignSelf: "center",
  },
  input: {
    // marginVertical: scale(5),
  },
  errorText: {
    fontSize: scale(11),
    color: "red",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_REGULAR,
    alignSelf: "flex-end",
  },
  labelText: {
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,

    marginHorizontal: scale(25),
    fontSize: scale(15),
  },
  photoView: {
    flex: 3,
    marginBottom: scale(20),
  },
  mainvideoview: {
    width: wp("10%"),
    height: hp("5.0%"),
    borderRadius: 8,
    backgroundColor: WHITE_COLOR,
    marginLeft: 15,
    alignItems: "center",
    paddingTop: 4,
    shadowColor: BLACK_COLOR,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
  },
});
export default style;
