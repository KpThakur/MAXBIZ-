import { StyleSheet } from "react-native";
import {
  WHITE_COLOR,
  BLACK_COLOR,
  PLACEHOLDER_COLOR,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_MEDIUM,
  COMMON_COLOR,
  GRADIENT_COLOR,
  GRADIENT_COLOR_NEW2,
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
    height: hp('40%'),
    backgroundColor: GRADIENT_COLOR_NEW2,

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
    elevation: 5,
  },
  topheading :{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
   /*  marginHorizontal:20,
    marginVertical:20, */
    paddingHorizontal:scale(20),
    paddingVertical:scale(15),
    fontWeight:"bold",
    fontSize:50,
    borderBottomColor:WHITE_COLOR,
    borderBottomWidth:1,
    marginBottom:scale(10)
    //backgroundColor:'red'
  },
  topheadingtext : {
    fontWeight:"700",
    fontSize:scale(20),
    color : WHITE_COLOR
  },
  confirmtxt : {
    fontWeight:"700",
    fontSize:scale(20),
    alignSelf:'center',
    color:COMMON_COLOR,
  },
  midelcontent :{
     flex:3,
     width:'90%',
     alignSelf:'center'
   },
  bottumbutton :{
    flex:3,
    padding:10,
    flexDirection:'row',
    alignSelf:'center'
  },
  buttonview:{
    width:wp('40%'),
    alignSelf:'center'
  },
  input: {
    marginVertical: scale(5),
  },


});
export default style;
