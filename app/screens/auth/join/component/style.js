import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/utils';
import {
    BLACK_COLOR, FONT_FAMILY_LIGHT, COMMON_COLOR,
    PLACEHOLDER_COLOR, WHITE_COLOR, FONT_FAMILY_SEMIBOLD,BORDERLINE_COLOR
} from '../../../../utils/constants';

const style = StyleSheet.create({
    firstContainer: {
        paddingHorizontal: scale(25),
        paddingVertical: scale(25)
    },
    inContainer: {
        paddingHorizontal: scale(24),
        paddingTop: scale(20),
        paddingBottom: scale(12)
    },
    firstText: {
        fontSize: scale(28),
        color: BLACK_COLOR,
        fontWeight: '600',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    buttons: {
        paddingTop: scale(15)
    },
    selectStyle: {
        height: scale(111),
        borderRadius: 21,
        backgroundColor: COMMON_COLOR
        // backgroundColor: "#847AF0"
    },
    tickImage: {
        alignItems: 'flex-end',
        paddingHorizontal: scale(9),
        paddingTop: scale(5)
    },
    selectItem: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(45),
        bottom: scale(9)
    },
    selectedTxt: {
        paddingLeft: scale(30),
        top: scale(5)
    },
    bottom: {
        bottom: scale(9)
    },
    selectText: {
        fontWeight: '300',
        fontSize: scale(21),
        fontFamily: FONT_FAMILY_LIGHT,
        color: WHITE_COLOR
    },
    nonSelect: {
        paddingHorizontal: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(111),
        borderRadius: 21,
        flexDirection: 'row',
        borderWidth:1,
        borderColor:BORDERLINE_COLOR
    },
    nonSelectdTxt: {
        paddingLeft: scale(30),
        paddingTop: scale(5),
        top: scale(5)
    },
    nonSelectText: {
        fontWeight: '300',
        fontSize: scale(21),
        fontFamily: FONT_FAMILY_LIGHT,
        color: PLACEHOLDER_COLOR
    },
})
export default style;