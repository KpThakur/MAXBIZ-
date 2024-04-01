import { StyleSheet } from "react-native";
import { scale } from "@utils/utils";
import {
  BLACK_COLOR,
  FONT_FAMILY_REGULAR,
  GRADIENT_COLOR,
  FONT_FAMILY_MEDIUM,
  PLACEHOLDER_COLOR,
  COMMON_COLOR,
} from "@utils/constants";
import {
  FONT_FAMILY_SEMIBOLD,
  GRAY_COLOR,
  WHITE_COLOR,
} from "../../../../utils/constants";

const style = StyleSheet.create({
  containernew: {
    flex: 1,
  },
  firstFlex: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    //backgroundColor : "red"
  },
  leftImg: {
    width: scale(70),
    height: scale(50),
    marginHorizontal: scale(10),
  },
  secondFlex: {
    flex: 4,
    // backgroundColor : "black"
  },
  thiredFlex: {
    flex: 0.8,
    // backgroundColor : "yellow"
  },
  topContainer: {
    paddingHorizontal: scale(25),
  },
  secondInput: {
    paddingTop: scale(18),
  },
  Items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: scale(25),
  },
  horizontalCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    color: PLACEHOLDER_COLOR,
    paddingHorizontal: 9,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: scale(12),
    fontWeight: "500",
  },
  forgotText: {
    color: COMMON_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: scale(12),
    fontWeight: "500",
  },
  button: {
    paddingTop: scale(25),
    paddingHorizontal: scale(25),
  },
  lastItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  newUserText: {
    color: BLACK_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontWeight: "500",
    fontSize: scale(14),
  },
  registerText: {
    color: COMMON_COLOR,
    fontFamily: FONT_FAMILY_MEDIUM,
    fontWeight: "500",
    fontSize: scale(14),
  },
  errorText: {
    fontSize: scale(11),
    color: "red",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_REGULAR,
    alignSelf: "flex-end",
  },
  modalMainView: {
    flex: 1,
    justifyContent: "center",
    // alignItems:'center',
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainView: {
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    borderRadius: scale(10),
  },
  modalMainViewText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: WHITE_COLOR,
    //  paddingHorizontal: scale(15),
    paddingVertical: scale(10),
  },
  closeIcon: {
    width: scale(22),
    height: scale(22),
    tintColor: BLACK_COLOR,
    bottom: scale(5),
    left: scale(5),
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
    alignItems: "center",
  },
  enterOtptxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: scale(14),
    color: GRAY_COLOR,
  },
  resendText: {
    textAlign: "right",
    fontFamily: FONT_FAMILY_REGULAR,
    color: COMMON_COLOR,
    fontSize: scale(12),
    paddingVertical: scale(5),
  },
  buttonView: {
    paddingVertical: scale(10),
  },
  submitTouch: {
    backgroundColor: GRADIENT_COLOR,
    width: scale(90),
    alignSelf: "center",
    borderRadius: scale(10),
  },
  submitText: {
    textAlign: "center",
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: WHITE_COLOR,
    fontSize: scale(16),
    paddingVertical: scale(5),
  },
  newUserView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scale(10),
  },
});
export default style;
