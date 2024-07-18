import { View, StyleSheet } from "react-native";
import { scale } from "../../../../utils/utils";
import {
  COMMON_COLOR,
  FONT_FAMILY_SEMIBOLD,
  GRADIENT_COLOR_NEW3,
} from "../../../../utils/constants";

const style = StyleSheet.create({
  container: {
    flex: 1,
    // padding: scale(20),
  },
  section1: {
    paddingHorizontal: scale(20),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: GRADIENT_COLOR_NEW3,
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 2,
    marginBottom:5
  },
  input: {
    marginVertical: scale(15),
  },
  headingWrapper: {
    justifyContent: "space-between",
    paddingVertical: scale(10),
  },
  headerTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  headingTxt: {
    fontSize: scale(18),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: COMMON_COLOR,
  },
  dropDown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownImg: {
    resizeMode: "cover",
    // height: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  inputButtonWrap: {
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: scale(20),
  },
  buttonView: {
    width: scale(120),
  },
  saveButton: {
    marginVertical: scale(10),
    marginHorizontal: scale(40),
  },
});
export default style;
