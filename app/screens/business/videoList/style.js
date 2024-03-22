import { StyleSheet } from "react-native";
import {
  FONT_FAMILY_SEMIBOLD,
  COMMON_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
  FONT_FAMILY_MEDIUM,
  GRADIENT_COLOR_NEW2,
} from "./../../../utils/constants";
import { scale } from "@utils/utils";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  //Remi
mainvideo :{
  flex:1,
  backgroundColor: WHITE_COLOR,
  borderRadius: 15,
  borderColor:BLACK_COLOR,
  marginLeft:scale(4),
  // borderWidth:1,
  paddingVertical: scale(20),
  paddingHorizontal: scale(20),
  width: '98%',
  height:hp('30%'),
  marginVertical: scale(20),
  marginBottom:scale(30),
  shadowColor: BLACK_COLOR,
  shadowOffset: {width: 0, height: 1},
  elevation: 5
},
mainvideotop :{
  flex:6,
  },
nametag:{
  flex:1,
  flexDirection:'row',
  height:hp('10%'),
},
namelable :{
 
  color: COMMON_COLOR,
  fontWeight:'700',
  fontSize:scale(18),
  
},
namevalue :{
  fontSize:scale(18),
  marginHorizontal: scale(30),  
  color  : COMMON_COLOR,
  height : scale(50)
},
namevaluedate : {
  
  marginHorizontal: scale(20),
  marginTop:10,
  fontSize: scale(18),
  fontFamily: FONT_FAMILY_SEMIBOLD,
  
},
mainvideobottum:{
 flex:0.1,
 flexDirection:'row',
 alignSelf:'center',
 
 
},
mainvideoview:{
  width:wp('15%'),
  height:hp('5.5%'),
  borderRadius:8,
  backgroundColor:WHITE_COLOR,
  marginLeft:15,
  alignItems:'center',
  paddingTop:6,
  shadowColor: BLACK_COLOR,
  shadowOffset: {width: 0, height: 1},
  elevation: 5
  
}


});
export default style;
