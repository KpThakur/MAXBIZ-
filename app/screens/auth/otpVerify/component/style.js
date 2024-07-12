import { StyleSheet } from "react-native";
import {
  BLACK_COLOR,
  COMMON_COLOR,
  FONT_FAMILY_BOLD,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  GRADIENT_COLOR_NEW2,
  GRAY_COLOR,
  WHITE_COLOR,
} from "../../../../utils/constants";
import { scale } from "../../../../utils/utils";

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: scale(18),
    paddingVertical: scale(20),
    
  },

  containercenter:{
    flex:5.5,
   
},

button: {
  flex:0.5,
  paddingVertical: scale(24),
  marginRight: scale(9)
},

  headerTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  otpInputContainer: {
    // marginHorizontal: scale(60),
    paddingHorizontal: scale(25),
    paddingVertical: scale(10),
   
  },
  otpInputTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: scale(20),
    borderWidth: scale(2),
    borderRadius: scale(8),
    alignItems:"center"
  },
  enterOtptxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: scale(18),
    color : GRAY_COLOR
  },
  resendView: {
    flexDirection: "row",
    padding: scale(10),
    justifyContent: "flex-end",
  },
  resendTxt: {
    fontSize: scale(15),
    color : GRAY_COLOR
  },
  resendTxtCommon: {
    fontSize: scale(14),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: COMMON_COLOR,
  },
});

export default styles;
