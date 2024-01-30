import { View, StyleSheet } from "react-native";
import { scale } from "@utils/utils";
import { FONT_FAMILY_SEMIBOLD, FONT_FAMILY_LIGHT, BORDERLINE_COLOR, GRAY_COLOR, WHITE_COLOR } from "../../../utils/constants";

const style = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: "row",
        flex: 1,
        marginBottom: scale(10),
      },
      leftContainer: {
        flex: 1.2,
        paddingHorizontal: 2,
      },
      rightContainer: {
        flex: 5,
      },
      titileText: {
        fontSize: scale(16),
        fontWeight: "400",
        fontFamily: FONT_FAMILY_SEMIBOLD,
        color: GRAY_COLOR,
      },
      imageDesign: {
        width: scale(65),
        height: scale(65),
        borderRadius:32
      },
      detailText: {
        fontFamily: FONT_FAMILY_LIGHT,
        fontSize: scale(12),
        fontWeight: "400",
        color: GRAY_COLOR,
      },
      section1: {
        flexDirection: "column",
        paddingHorizontal: 5,
      },
      section2: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      section3: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      dateText: {
        fontFamily: FONT_FAMILY_LIGHT,
        fontSize: scale(12),
        fontWeight: "400",
        color: GRAY_COLOR,
      },
      button: {
        width: scale(96),
        height: scale(21),
        backgroundColor: "#2FBB4E",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      tickMark: {
        width: scale(15),
        height: scale(15),
      },
      buttonText: {
        color: WHITE_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontSize: scale(12),
        fontWeight: "600",
      },
      border: {
        borderWidth: 1,
        borderColor: BORDERLINE_COLOR,
        height: 1,
        marginRight: scale(10),
        marginLeft: scale(10),
      },
});
export default style;
