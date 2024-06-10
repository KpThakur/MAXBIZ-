import { Platform, StyleSheet } from "react-native";
import {
  FONT_FAMILY_SEMIBOLD,
  COMMON_COLOR,
  PLACEHOLDER_COLOR,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_MEDIUM,
  BLACK_COLOR,
  WHITE_COLOR,
  GRADIENT_COLOR_NEW3,
  BORDERLINE_COLOR,
  GRAY_COLOR,
  GRADIENT_COLOR_NEW2,
} from "./../../../../utils/constants";
import { scale } from "@utils/utils";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const style = StyleSheet.create({
  container: {
    flex: 1,
    // padding: scale(20),
  },
  commingsooncon: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  commingsoonsec: {
    flex: 1,
    width: scale(500),
    height: scale(200),
    justifyContent: "center",
    alignItems: "center",
  },
  commingsoonImg: {
    width: scale(300),
    height: scale(200),
  },
  button: {
    width: scale(300),
  },
  section1: {
    paddingHorizontal: scale(12),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: WHITE_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 2,
    marginBottom: 5,
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
  checkboxContainer: {
    color: COMMON_COLOR,
    marginVertical: scale(10),
    flex: 1,
  },
  checkbox: {
    flexDirection: "row",
    paddingHorizontal:5,
  },
  checkboxText: {
    fontFamily: FONT_FAMILY_REGULAR,
    // color: PLACEHOLDER_COLOR,
    color: GRAY_COLOR,
    fontWeight: "400",
    fontSize: scale(15),
    paddingVertical: scale(5),
  },
  btnContainer: {
    height: 55,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    paddingHorizontal: scale(5),
    //backgroundColor:WHITE_COLOR
  },
  btnText: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: FONT_FAMILY_MEDIUM,
  },
  mainvideoview: {
    width: wp("14%"),
    height: hp("6%"),
    borderRadius: 10,
    backgroundColor: "white",
    marginLeft: 15,
    alignItems: "center",
    paddingTop: 6,
    shadowColor: BLACK_COLOR,
    shadowOffset: { width: 0, height: 1 },
    elevation: 5,
    alignSelf: "flex-end",
  },
  addView: {
    // flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: BORDERLINE_COLOR,
    marginBottom: scale(20),
    paddingBottom: 10,
  },
  addViewtext: {
    flex: 3.1,
    // backgroundColor:'yellow',
  },
  serveTxt: {
    // fontFamily:FONT_FAMILY_SEMIBOLD,
    // fontSize:scale(15),
    // color: GRAY_COLOR,
    // marginBottom:scale(10),
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
    // marginHorizontal: scale(9),
    marginHorizontal: Platform.OS === "ios" ? scale(3) : scale(6),
    fontSize: scale(15),
  },
  addViewcontent: {
    flex: 4,
    //backgroundColor:'red',
    marginLeft: scale(2),
  },
  addrsTxt: {
    fontSize: scale(15),
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
    //flex:1,
  },
  labelTxt: {
    // marginHorizontal: scale(3),
    top: scale(-7),
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: scale(15),
  },
  checkStyle: {
    tintColor: GRAY_COLOR,
    width: scale(27),
    height: scale(25),
    marginVertical: scale(20),
  },
  checkboxView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  errorText: {
    fontSize: scale(11),
    color: "red",
    fontWeight: "400",
    fontFamily: FONT_FAMILY_REGULAR,
    alignSelf: "flex-end",
  },
  TextInput: {
    height: 50,
  },
  dropdown: {
    marginBottom: scale(15),
    height: scale(45),
    borderBottomColor: BORDERLINE_COLOR,
    borderBottomWidth: scale(2),
},
placeholderStyle: {
  fontSize: scale(16),
  fontFamily: FONT_FAMILY_REGULAR,
  color: GRAY_COLOR,
  paddingHorizontal: 5
},
selectedTextStyle: {
  fontSize: scale(16),
  fontFamily: FONT_FAMILY_REGULAR,
  color: GRAY_COLOR,
  paddingHorizontal: scale(5)
},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
  borderColor  :GRAY_COLOR,
  borderRadius : 5
},
dropdownContener: {
  backgroundColor: WHITE_COLOR, 
  marginTop: -2, 
  borderBottomRightRadius: 5, 
  borderBottomLeftRadius: 5, 
  borderColor: WHITE_COLOR,
  borderWidth : 1,
  color: GRAY_COLOR
},
selectedTextStylemul: {
  fontSize: scale(12),
  fontFamily: FONT_FAMILY_REGULAR,
  color: WHITE_COLOR
},
selectedStyle: {
  borderRadius: 12,
  backgroundColor: GRADIENT_COLOR_NEW2,
  color:WHITE_COLOR,
  paddingHorizontal: 10
},
modalMainView:{
  flex:1,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:"rgba(0,0,0,0.6)"
},
modalContainView:{
  backgroundColor: WHITE_COLOR,
  paddingHorizontal: scale(15),
  paddingVertical: scale(20),
  borderRadius: scale(10)
},
modalTextHoldStyle:{
  color: COMMON_COLOR,
  fontFamily: FONT_FAMILY_SEMIBOLD,
  fontSize: scale(16),
  paddingLeft: scale(5),
  paddingTop: scale(3)
},
modalTextStyle:{
  color: BLACK_COLOR,
  fontFamily: FONT_FAMILY_REGULAR,
  fontSize: scale(14),
  paddingLeft: scale(5)
},
buttnView:{
 // backgroundColor:'red',
  display:'flex',
  flexDirection:'row',
  justifyContent:'flex-end',
  paddingTop: scale(25),
  paddingBottom: scale(3)
},
buttnText:{
  color: BLACK_COLOR,
  marginRight: scale(30),
  fontFamily: FONT_FAMILY_REGULAR,
  fontSize: scale(14)
},
});
export default style;
