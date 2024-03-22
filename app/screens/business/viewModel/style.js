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
} from "./../../../utils/constants";
import { scale } from "@utils/utils";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const style = StyleSheet.create({
  //Remi
  modalContainermain : {
  backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  modalContainer: {
    width: wp('100%'),
    height: hp('75%'),
    backgroundColor: WHITE_COLOR,

    //padding: scale(10),
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
  topheading :{
    flex:0.5,
    flexDirection:'row',
    justifyContent:'space-between',
   /*  marginHorizontal:20,
    marginVertical:20, */
    paddingHorizontal:scale(15),
    paddingVertical:scale(15),
    fontWeight:"bold",
    fontSize:50,
    borderBottomColor:WHITE_COLOR,
    borderBottomWidth:1
    
  },
  topheadingtext : {
    fontWeight:"700",
    fontSize:scale(20),
    color  : COMMON_COLOR
  },
  midelcontent :{
    flex:4.5,
    //backgroundColor:'red'
    /* marginHorizontal:20,
    marginVertical:20, */
   
  },
  bottumbutton :{
    flex:1,
    //padding:10
  },
  buttonview:{
    width:wp('70%'),
    alignSelf:'center'
  },
  input: {
    marginVertical: scale(10),
  },


});
export default style;
