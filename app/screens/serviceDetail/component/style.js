import { StyleSheet } from "react-native";
import {  FONT_FAMILY_SEMIBOLD, COMMON_COLOR, FONT_FAMILY_REGULAR, WHITE_COLOR, BLACK_COLOR,GRAY_COLOR,BORDERLINE_COLOR, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3} from './../../../utils/constants';
import { scale } from '../../../utils/utils';

const styles = StyleSheet.create({
    headerTxt:{
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontSize:scale(10)
     },
     leftImg:{
        width: scale(20), 
        height: scale(20),
        marginHorizontal:scale(10)
      },
      container:{
        //backgroundColor:'pink',
        padding:scale(15),
        marginBottom:scale(10),
        marginHorizontal:scale(10),
        marginTop:scale(15),
        marginBottom:scale(50),
        borderRadius:scale(10),
        backgroundColor: WHITE_COLOR,
        shadowColor: BLACK_COLOR,
        shadowOffset: { width: 0, height: 1},
        shadowOpacity:  0.3,
        shadowRadius: 11,
        elevation: 10,
    },
    top:{
        flexDirection:'row'
    },
    serviceImg:{
        height:100,
        width:100,
        borderRadius:10,
        marginTop:8
    },
    serviceImgicon:{
        height:20,
        width:20,
        
    },
    dataView:{
        marginLeft:scale(15),
        width : scale(200)
      
    },
    name:{
        fontSize:scale(18),
        fontFamily:FONT_FAMILY_SEMIBOLD,
        color:GRAY_COLOR
    },
    review:{
        fontFamily:FONT_FAMILY_REGULAR,
        fontSize:scale(13),
        color:GRAY_COLOR
    },
    hour:{
        fontSize:scale(15),
        fontFamily:FONT_FAMILY_SEMIBOLD,
        color:COMMON_COLOR
    },
    bottom:{
        marginVertical:scale(10)
    },
    addViewtext:{
        flex:2.4,
       // backgroundColor:'yellow',
    },
    addViewcontent:{
        flex:4,
        //backgroundColor:'red',
        marginLeft:scale(2)
    },
    addView:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:BORDERLINE_COLOR,
        marginBottom:scale(20),
        paddingBottom:10,
    },
    addViewicons:{
        flexDirection:'row',
       /*  borderBottomWidth:1,
        borderBottomColor:BORDERLINE_COLOR,*/
        marginBottom:scale(20),
        paddingBottom:10, 
    },
    contacttext:{
        fontFamily:FONT_FAMILY_SEMIBOLD,
        fontSize:scale(14),
        color: GRAY_COLOR,
        //alignSelf:'center',
        flex:1 
          
    },
    serveTxt:{
        fontFamily:FONT_FAMILY_SEMIBOLD,
        fontSize:scale(15),
        color: GRAY_COLOR, 
        marginBottom:scale(10),     
    },
    addrsTxtadd:{
        fontSize:scale(15),
        fontFamily:FONT_FAMILY_SEMIBOLD,
        color:GRAY_COLOR,
        marginTop : 3,
        marginLeft: 8,
    },
    addrsTxt:{
        fontSize:scale(15),
        fontFamily:FONT_FAMILY_REGULAR,
        color:GRAY_COLOR,
        //flex:1
    },
    bestReview:{
        fontFamily:FONT_FAMILY_REGULAR,
        color:GRAY_COLOR,
        fontSize:scale(13)
    },
    contactView:{
        flexDirection:'row',
        position:'absolute',
        bottom:scale(-20),
        left:scale(0),
        right:scale(0),
        alignItems:'center',
        justifyContent:'center' 
    },
    contact:{
        padding:scale(10),
        marginHorizontal:scale(10),
        borderRadius:scale(8),
        backgroundColor: GRADIENT_COLOR_NEW2,
        shadowColor: BLACK_COLOR,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity:  0.3,
        shadowRadius: 1,
        elevation: 10,
     },
  
     contactvideo:{
        flex:2,
        height:scale(100),
        padding:scale(25),
        marginHorizontal:scale(8),
        borderRadius:scale(8),
        backgroundColor: WHITE_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity:  0.3,
        shadowRadius: 1,
        elevation: 10,
        alignItems:'center',
        
     },
     contactImgvideo:{
        tintColor : GRADIENT_COLOR_NEW2,
        width: scale(24.7),
        height: scale(24.7) 
     },
     contactImg:{
        width:scale(20),
        height:scale(20),
        tintColor : WHITE_COLOR

     },
     activeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      activityIndicator: {
        position: 'absolute',
        zIndex: 1,
      },
      starStyle: {
        width:20,
        height:18,
      }
    
})


export default styles