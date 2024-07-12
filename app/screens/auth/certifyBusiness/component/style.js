import { StyleSheet , Dimensions } from 'react-native';
import { scale } from '../../../../utils/utils';
import {
    BLACK_COLOR, FONT_FAMILY_REGULAR, GRADIENT_COLOR,
    FONT_FAMILY_SEMIBOLD, PLACEHOLDER_COLOR, COMMON_COLOR
} from '../../../../utils/constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const style = StyleSheet.create({
    
    container: {
        paddingHorizontal: scale(18),
        paddingVertical: scale(5)
    },
    firstText: {
        fontSize: scale(24),
        color: BLACK_COLOR,
        fontWeight: '600',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    secondText: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: PLACEHOLDER_COLOR,
        fontSize: scale(14),
        fontWeight: '400'
    },
    firstInput: {
        paddingVertical: scale(9),
        alignItems:"center"
    },
    secondInput: {
        paddingVertical: scale(9)
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
    orText: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: scale(14),
        fontFamily: FONT_FAMILY_REGULAR,
        color: PLACEHOLDER_COLOR,
        paddingTop: scale(9)
    },
    button: {
        paddingVertical: scale(25),
        marginRight: scale(9)
    },
    errorText:{
        fontSize: scale(11),
        color: "red",
        fontWeight: '400',
        fontFamily: FONT_FAMILY_REGULAR,
        alignSelf: 'flex-end'
    },
    images:{
        width:windowWidth/1.5,
        height:windowHeight/3,
        // borderRadius:10,
    }
})
export default style;