import { StyleSheet } from 'react-native';
import { scale } from '../../../../utils/utils';
import {
    BLACK_COLOR, FONT_FAMILY_REGULAR, GRADIENT_COLOR,
    FONT_FAMILY_MEDIUM, PLACEHOLDER_COLOR, COMMON_COLOR
} from '../../../../utils/constants';


const style = StyleSheet.create({
    firstFlex: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    secondFlex: {
        flex: 3
    },
    topContainer: {
        paddingHorizontal: scale(25)
    },
    secondInput: {
        paddingTop: scale(18)
    },
    Items: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: scale(25),
    },
    horizontalCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberText: {
        color: PLACEHOLDER_COLOR,
        paddingHorizontal: 9,
        fontFamily: FONT_FAMILY_MEDIUM,
        fontSize: scale(12),
        fontWeight: '500'
    },
    forgotText: {
        color: COMMON_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
        fontSize: scale(12),
        fontWeight: '500',
    },
    button: {
        paddingTop: scale(25),
        paddingHorizontal: scale(25)
    },
    lastItem: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 5
    },
    newUserText: {
        color: BLACK_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
        fontWeight: '500',
        fontSize: scale(14)
    },
    registerText: {
        color: COMMON_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
        fontWeight: '500',
        fontSize: scale(14)
    },
    errorText:{
        fontSize: scale(11),
        color: "red",
        fontWeight: '400',
        fontFamily: FONT_FAMILY_REGULAR,
        alignSelf: 'flex-end'
    },
})
export default style;