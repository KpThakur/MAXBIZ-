import { View, StyleSheet } from "react-native";
import { scale } from "@utils/utils";
import { FONT_FAMILY_SEMIBOLD, FONT_FAMILY_LIGHT, BORDERLINE_COLOR } from "../../../utils/constants";

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
        width: scale(325),
        height: scale(250),
        borderRadius:10
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
        top:scale(95),
        width:scale(50),
        height:scale(50)
      }
});
export default style;
