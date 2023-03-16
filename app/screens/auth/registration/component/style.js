import { StyleSheet } from 'react-native';
import { scale } from '@utils/utils';
import {
    BLACK_COLOR, FONT_FAMILY_LIGHT, COMMON_COLOR,
    PLACEHOLDER_COLOR, WHITE_COLOR, FONT_FAMILY_SEMIBOLD,FONT_FAMILY_REGULAR,
} from '@utils/constants';

const style = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: scale(18),
        paddingVertical: scale(20),
        
    },
    firstInput: {
        paddingVertical: scale(9)
    },
    secondText: {
        paddingVertical: scale(12),
        
    },
    firstText: {
        fontSize: scale(24),
        color: BLACK_COLOR,
        fontWeight: '600',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    inputContainer: {
        marginRight: scale(12)
    },
    inputDesign: {
        left: scale(0),
        marginHorizontal: scale(0)
    },
    labelTxt: {
        marginHorizontal: scale(3)
    },
    button: {
        paddingVertical: scale(24),
        marginRight: scale(9)
    },
    firstInput: {
        paddingVertical: scale(9)
    },
    thirdText:{
        paddingVertical: scale(12),
        marginHorizontal: scale(3)
    },
    smallText:{
        fontSize: scale(8),
        color: PLACEHOLDER_COLOR,
        fontWeight: '400',
        fontFamily: FONT_FAMILY_REGULAR,
        alignSelf: 'flex-end'
    },
    errorText:{
        fontSize: scale(11),
        color: "red",
        fontWeight: '400',
        fontFamily: FONT_FAMILY_REGULAR,
        alignSelf: 'flex-end'
    },
    btnstyle:{
        backgroundColor:'red'
    },

})
export default style;