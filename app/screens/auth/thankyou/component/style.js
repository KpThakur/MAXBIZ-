import { StyleSheet, Dimensions } from "react-native";
import { scale } from "@utils/utils";
import {
  BLACK_COLOR,
  FONT_FAMILY_REGULAR,
  GRADIENT_COLOR,
  FONT_FAMILY_SEMIBOLD,
  PLACEHOLDER_COLOR,
  COMMON_COLOR,
} from "@utils/constants";
import { GRAY_COLOR, WHITE_COLOR } from "../../../../utils/constants";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE_COLOR,
  },

  imageview: {
    flex: 5,
  },
  showimageview: {
    flex: 3,
    alignItems: "center",
  },
  showimage: {
    width: 150,
    height: 150,
  },
  showtextviewfirst: {
    //flex: 1,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    color: GRAY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },

  showtextviewsecond: {
    //flex: 1,
    fontSize: 14,
    alignItems: "center",
    textAlign: "center",
    color: GRAY_COLOR,
    fontFamily: FONT_FAMILY_REGULAR,
  },
  showtextview: {
    flex: 3,
    alignItems: "center",
  },
  buttonview: {
    flex: 0.5,
  },
});
export default style;
