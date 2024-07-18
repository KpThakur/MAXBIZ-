import { StyleSheet } from "react-native";
import {
  FONT_FAMILY_SEMIBOLD,
  COMMON_COLOR,
  FONT_FAMILY_REGULAR,
  WHITE_COLOR,
  BLACK_COLOR,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW2,
  GRAY_COLOR,
  BORDERLINE_COLOR,
  FONT_FAMILY_MEDIUM,
} from "./../../../utils/constants";
import { scale } from "../../../utils/utils";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../../../components/scaleFontSize";

const styles = StyleSheet.create({
  headerTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
  },
  leftImg: {
    width: scale(70),
    height: scale(50),
    marginHorizontal: scale(10),
   
  },
  containerview: {
    //flex:1,
    /*  paddingHorizontal: scale(18),
        paddingVertical: scale(5), */
    //flexGrow:1,
    //paddingVertical: scale(15),
    paddingHorizontal: scale(15),
   
  },
  regisView: {
    /*  marginVertical:scale(25),
        marginHorizontal:scale(20), */
    flex: 1,
  },

  topview: {
    flex: 2.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    //marginVertical:scale(25),
    borderRadius: 20,
   // backgroundColor:GRADIENT_COLOR_NEW3,
    backgroundColor: WHITE_COLOR,
    marginTop: normalize(20),

    /* flex:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity:  1,
    shadowRadius:4,
    elevation: 20,
    //marginVertical:scale(25), 
    borderRadius:20, 
    backgroundColor:WHITE_COLOR,
    marginTop:normalize(20) */
    
  },
  topviewsecond: {
    flex: 3,

    /*  shadowColor: '#000',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity:  1,
        shadowRadius:4,
        elevation: 20,
        borderRadius:20, 
        backgroundColor:WHITE_COLOR, */
    //marginTop:normalize(20)
  },
  texttop: {
    flex: 1,
    alignItems: "center",
    marginTop: normalize(20),
  },
  button: {
    flex: 1,
    paddingHorizontal: scale(20),
  },

  regisViewTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    textAlign: "center",
    marginVertical: scale(10),
    fontSize: scale(20),
    color: GRAY_COLOR,
  },
  maskView: {
    alignItems: "center",
    flex: 3.5,
    //backgroundColor:'red',
  },
  imgView: {
    width:'100%',
    height:200,
    alignItems: "center",
    marginTop: normalize(20),
    marginBottom: normalize(50),
    //flex:2,
    //backgroundColor:'red',
  },
  maskImg: {
    //alignItems:'center',
    width: scale(320),
    resizeMode:'cover',
    borderRadius: 15,
  },
  toggleView: {
    flexDirection: "row",
    backgroundColor: WHITE_COLOR,
    borderRadius: scale(50),
    paddingHorizontal: scale(25),
    paddingVertical: scale(20),
    position: "absolute",
    top: normalizeSpacing(250),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 15,
  },
  toggleButton: {
    marginHorizontal: scale(18),
  },
  toggleTxt: {
    fontSize: scale(16),
  },
  enabled: {
    color: GRADIENT_COLOR_NEW3,
  },

  input: {
    marginVertical: scale(10),
    marginHorizontal: scale(15),
  },
  inputWrapper: {
    paddingBottom: scale(5),
    backgroundColor: WHITE_COLOR,
    shadowColor: BLACK_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4.51,
    elevation: 10,
  },

  inputView: {},

  inputButton: {
    padding: scale(25),
  },
  inputButtonTxt: {
    textAlign: "center",
    fontSize: scale(20),
    fontFamily: FONT_FAMILY_SEMIBOLD,
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
   backgroundVideo: {
    width : '100%',
    height:'98%'
    /* position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0, */
  }, 
  imageDesignplayicon:{
    position:'absolute',
    alignSelf:'center',
   // top:scale(100),
    width:scale(50),
    height:scale(50),
    bottom: scale(70)
    
  },
  timeView:{
    display:'flex',
    flexDirection:'row',
    position:'absolute',
    bottom: scale(15),
  },
  timeStyle:{
   color:WHITE_COLOR,
   alignSelf:'flex-start',
   marginRight: scale(220),
   fontFamily: FONT_FAMILY_REGULAR
  },
  muteICON:{
    tintColor: WHITE_COLOR,
  },
  sliderStyle:{
   position:'absolute',
   width: '100%',
   bottom: scale(-11)
  },
  thumbStyle:{
    width: scale(10),
    height: scale(10),
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

export default styles;
