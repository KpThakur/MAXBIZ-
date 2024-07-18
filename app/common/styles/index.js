import { StyleSheet } from "react-native";
import {
  WHITE_COLOR,
  FONT_FAMILY_REGULAR,
  BLACK_COLOR,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW2,
  GRAY_COLOR,
} from "../../utils/constants";
import { scale } from "../../utils/utils";
import { BORDERLINE_COLOR } from "../../utils/constants";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
  gradientstyle: {
    paddingBottom: scale(50),
    flexGrow: 1,
  },
  shadowContainer: {
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowColor: WHITE_COLOR,
    shadowRadius: 50,
    elevation: 2,
  },
  errorText: {
    fontSize: scale(11),
    color: "red",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_REGULAR,
    alignSelf: "flex-end",
  },
  dropdownContener: {
    backgroundColor: WHITE_COLOR,
    marginTop: -2,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: BORDERLINE_COLOR,
    borderWidth: 0,
    color: WHITE_COLOR,
  },
  dropdown: {
    marginBottom: scale(15),
    height: scale(45),
    borderBottomColor: BORDERLINE_COLOR,
    borderBottomWidth: scale(2),
    color: WHITE_COLOR,
  },

  placeholderStyle: {
    fontSize: scale(14),
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
   // color: BLACK_COLOR
  },
  selectedTextStyle: {
    fontSize: scale(16),
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
  },
  selectedTextSortlong: {
    fontSize: scale(16),
    height : 50,
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
  },
  selectedTextStylelong: {
    fontSize: scale(12),
    height : 55,
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    //borderColor: GRADIENT_COLOR_NEW3,
    borderRadius: 5,

    //color  :WHITE_COLOR
  },
  selectedStyle: {
    borderRadius: 12,
    backgroundColor: GRADIENT_COLOR_NEW2,
  },
});
export default style;
