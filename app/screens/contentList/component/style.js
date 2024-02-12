import { View, StyleSheet, Dimensions } from "react-native";
import { scale } from "@utils/utils";
import { FONT_FAMILY_SEMIBOLD, FONT_FAMILY_LIGHT, BORDERLINE_COLOR, GRAY_COLOR, WHITE_COLOR, BLACK_COLOR, COMMON_COLOR, GRADIENT_COLOR_NEW1 } from "../../../utils/constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const style = StyleSheet.create({
    container: {
        padding: 15,
        //flexDirection: "column",
        flex: 1,
        marginBottom: scale(10),
        
      },
      leftContainer: {
        flex:1,
        paddingHorizontal: 2,
       
      },
      containerjob: {
        padding: 10,
        //marginBottom:10,
        //flexDirection: "column",
        flex: 1,
        paddingBottom:scale(5),
        backgroundColor: WHITE_COLOR,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity:  0.3,
        shadowRadius:4.51,
        elevation: 10,
        borderRadius : scale(10),
        
        
      },
      leftContainerjob: {
        flex:1,
        //paddingHorizontal: 2,
        alignItems:'flex-start',
        
       
      },
      offerimgcont: {
        flex:1,
        //paddingHorizontal: 2,
        alignItems:'center',
        marginBottom:scale(20)
        
       
      },
      jobcont:{
        width:scale(232),
        flex:1,
        flexDirection:'row',
        marginBottom:10},
      jobtxt:{
        fontSize:15,
        fontWeight:'bold',
        color : GRAY_COLOR
      },
      rightContainer: {
        flex: 5,
      },
      titileText: {
        fontSize: scale(16),
        fontWeight: "400",
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: "#666666",
      },
      imageDesign: {
        width: scale(285),
        height: scale(350),
        borderRadius:10,
       // marginLeft:scale(20),
       alignSelf:'center',
        //resizeMode: 'center',
      },
      imageDesignphoto: {
        width: wp('86%'),
        height: hp('77%'),
        borderRadius:10,
       // marginLeft:scale(10)
        resizeMode : 'cover',
      },
      imageDesignVideo: {
        width: scale(325),
        height: scale(350),
        borderRadius:10,
        marginLeft:scale(0)
        //resizeMode: 'center',
      },
      imageDesignoffer: {
        width: scale(100),
        height: scale(100),
        borderRadius:200,
        //marginLeft:scale(20),
        resizeMode: 'center',
      },
      
      border: {
        borderWidth: 1,
        borderColor: BORDERLINE_COLOR,
        height: 1,
        marginRight: scale(3),
      },
      imageDesignplayicon:{
        position:'absolute',
        alignSelf:'center',
        top:scale(150),
        width:scale(50),
        height:scale(50)
      },

      modalContainermain : {
        backgroundColor:'rgba(0, 0, 0, 0.7)',
        
        },
      modalContainer: {
        width: wp('100%'),
        height: hp('40%'),
        backgroundColor: WHITE_COLOR,
        padding: scale(5),
        
       /*  borderTopRightRadius: scale(30),
        borderTopLeftRadius: scale(30), */
        /* shadowColor: BLACK_COLOR,
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, */
      },
      modalContainerphoto: {
        width: wp('90%'),
        height: hp('85%'),
        backgroundColor: WHITE_COLOR,
        padding: scale(5),
        marginTop:20,
        marginLeft : 20,
        borderRadius:5
        //marginRight:5
        
        
     
      },
      topheading :{
       
        flexDirection:'row',
        justifyContent:'space-between',
       /*  marginHorizontal:20,
        marginVertical:20, */
        paddingHorizontal:scale(5),
        paddingVertical:scale(5),
        fontWeight:"bold",
        fontSize:50,
        borderBottomColor:GRADIENT_COLOR_NEW1,
        borderBottomWidth:1,
        marginBottom:scale(10)
        //backgroundColor:'red'
      },
      topheadingtext : {
        fontWeight:"700",
        fontSize:scale(20),
        color : GRAY_COLOR
      },
      confirmtxt : {
        fontWeight:"700",
        fontSize:scale(20),
        alignSelf:'center',
        color:COMMON_COLOR,
      },
      midelcontent :{
         flex:3,
         //width:'90%',
         alignSelf:'center'
       },
       container_Document: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    activityIndicator: {
      position: 'absolute',
      zIndex: 1,
      top: scale(25)
    
    },

});
export default style;
