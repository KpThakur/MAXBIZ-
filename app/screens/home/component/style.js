import { StyleSheet } from "react-native";
import {  FONT_FAMILY_SEMIBOLD, COMMON_COLOR, FONT_FAMILY_REGULAR, WHITE_COLOR} from './../../../utils/constants';
import { scale } from '@utils/utils';
import {
    normalize,
    normalizeHeight,
    normalizeSpacing,
    normalizeWidth,
  } from '../../../components/scaleFontSize';

const styles = StyleSheet.create({
    headerTxt:{
        fontFamily: FONT_FAMILY_SEMIBOLD,
     },
     leftImg:{
        width: scale(70), 
        height: scale(50),
        marginHorizontal:scale(10)
      },
      containerview:{
        //flex:1,
       /*  paddingHorizontal: scale(18),
        paddingVertical: scale(5), */
        //flexGrow:1,
        paddingVertical:scale(15),
        paddingHorizontal:scale(15)
       
      },
    regisView:{
       /*  marginVertical:scale(30),
        marginHorizontal:scale(20), */
        flex:1,
        
        
      },

      topview:{
        flex:2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity:  1,
        shadowRadius:4,
        elevation: 20,
        //marginVertical:scale(30), 
        borderRadius:20, 
        backgroundColor:WHITE_COLOR,
        marginTop:normalize(20)
        
        
    },
    topviewsecond:{
        flex:2,
        /*  shadowColor: '#000',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity:  1,
        shadowRadius:4,
        elevation: 20,
        borderRadius:20, 
        backgroundColor:WHITE_COLOR, */
        //marginTop:normalize(20)
        
        
    },
    texttop:{
        flex:1,
        alignItems:'center',
        marginTop:normalize(20)
    },
    button:{
        flex:1,
        paddingHorizontal:scale(20)
    },

    regisViewTxt:{
        fontFamily: FONT_FAMILY_SEMIBOLD,
        textAlign:'center',
        marginVertical:scale(10),
        fontSize:scale(20),
     },
     maskView:{
         alignItems:'center',
         flex:3.5,
         //backgroundColor:'red',
        
     },
     imgView:{
         alignItems:'center',
         //flex:2,
        // backgroundColor:'red',
        
     },
    maskImg:{        
        //alignItems:'center',
        width: scale(320),
        resizeMode:'contain',
        borderRadius:15
    },
    toggleView:{
        
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:scale(50),
        paddingHorizontal:scale(30),
        paddingVertical:scale(20),
        position:'absolute',
        top:normalizeSpacing(250),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity:  1,
        shadowRadius:5,
        elevation: 15,
    },
    toggleButton:{
        marginHorizontal:scale(18)
    },
    toggleTxt:{
        fontSize:scale(16),
 
    },
    enabled:{
        color:COMMON_COLOR,
    },
   
    input:{
        marginVertical:scale(10),
        marginHorizontal:scale(15)
    },
    inputWrapper:{
        paddingBottom:scale(5),
        backgroundColor: WHITE_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity:  1,
        shadowRadius:4.51,
        elevation: 20,

    },
   
    inputView:{
    },
       
    inputButton:{
        padding:scale(25)
    },
    inputButtonTxt:{
        textAlign:'center',
        fontSize:scale(20),
        fontFamily:FONT_FAMILY_SEMIBOLD
    },
})


export default styles