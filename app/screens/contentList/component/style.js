import { View, StyleSheet } from "react-native";
import { scale } from "@utils/utils";
import { FONT_FAMILY_SEMIBOLD, FONT_FAMILY_LIGHT, BORDERLINE_COLOR, GRAY_COLOR, WHITE_COLOR } from "../../../utils/constants";

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
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity:  1,
        shadowRadius:4.51,
        elevation: 20,
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
        marginLeft:scale(20)
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
      }
});
export default style;
