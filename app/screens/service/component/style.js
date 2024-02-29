import { StyleSheet } from "react-native";
import {  WHITE_COLOR,FONT_FAMILY_SEMIBOLD, COMMON_COLOR, FONT_FAMILY_REGULAR, GRADIENT_COLOR_NEW3} from './../../../utils/constants';
import { scale } from '@utils/utils';

const styles = StyleSheet.create({
    headerTxt:{
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontSize:scale(16)
     },
     leftImg:{
        // width: scale(20), 
        // height: scale(20),
        // marginHorizontal:scale(10),
        width: scale(30), 
        height: scale(30),
        marginHorizontal:scale(10),        
      },
    container:{
        paddingHorizontal: scale(18),
        paddingVertical: scale(5),
        flexGrow:1,
      },
    regisView:{
        marginVertical:scale(25),
        marginHorizontal:scale(20),
      },
    regisViewTxt:{
        fontFamily: FONT_FAMILY_SEMIBOLD,
        textAlign:'center',
        marginVertical:scale(10),
        fontSize:scale(20),
     },
     maskView:{
         alignItems:'center',
     },
    maskImg:{        
        alignItems:'center',
        width: scale(320),
        resizeMode:'contain',
        borderRadius:15
    },
    toggleView:{
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:scale(100),
        paddingHorizontal:scale(25),
        paddingVertical:scale(20),
        position:'absolute',
        bottom:scale(20)
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
    top10View:{

    },
    top10Txt:{
        textAlign:'center',
        fontSize:scale(17),
        fontFamily:FONT_FAMILY_SEMIBOLD,
        color:COMMON_COLOR
    },
    serviceListView:{
    },
    service:{
        alignItems:'center',
        paddingVertical:scale(10),
        paddingHorizontal:scale(20)
    },
    serviceImg:{
        height:scale(25),
        width:scale(40),
        marginVertical:scale(1),
        resizeMode:'contain'
    },
    serviceTxt:{
        fontSize:scale(15),
        fontFamily:FONT_FAMILY_REGULAR
    },
    
    serviceItem:{         
        flexDirection: 'row', 
    }, 
    input:{
        marginVertical:scale(15),
        marginHorizontal:scale(20)
    },
    inputcity:{
       // marginVertical:scale(15),
        marginHorizontal:scale(20)
    },
    inputWrapper:{
        paddingBottom:scale(5),
        backgroundColor: WHITE_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity:  0.3,
        shadowRadius:4.51,
        elevation: 10,
        borderBottomLeftRadius : scale(20),
        borderBottomRightRadius : scale(20)
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