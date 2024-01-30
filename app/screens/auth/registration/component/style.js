import { StyleSheet } from 'react-native';
import { scale } from '@utils/utils';
import {
    GRAY_COLOR, FONT_FAMILY_LIGHT, COMMON_COLOR,
    PLACEHOLDER_COLOR, WHITE_COLOR, FONT_FAMILY_SEMIBOLD, FONT_FAMILY_REGULAR,
} from '@utils/constants';
import { BORDERLINE_COLOR, GRADIENT_COLOR_NEW2 } from '../../../../utils/constants';


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(18),
        paddingVertical: scale(20),
        //backgroundColor : "red",
        paddingBottom : scale(50),

    },
    labelText: {
        fontFamily: FONT_FAMILY_REGULAR,
        color: PLACEHOLDER_COLOR,
        fontWeight: '400',
        marginHorizontal: scale(9),
        fontSize: scale(15),

    },
    firstInput: {
        paddingVertical: scale(9)
    },
    secondText: {
        paddingVertical: scale(12),

    },
    firstText: {
        fontSize: scale(24),
        color: GRAY_COLOR,
        fontWeight: '600',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    inputContainer: {
        marginRight: scale(0)
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
    thirdText: {
        paddingVertical: scale(12),
        marginHorizontal: scale(3)
    },
    smallText: {
        fontSize: scale(8),
        color: PLACEHOLDER_COLOR,
        fontWeight: '400',
        fontFamily: FONT_FAMILY_REGULAR,
        alignSelf: 'flex-end'
    },
    errorText: {
        fontSize: scale(11),
        color: "red",
        fontWeight: '400',
        fontFamily: FONT_FAMILY_REGULAR,
        alignSelf: 'flex-end'
    },


   
   
    icon: {
        marginRight: scale(5),
    },
    dropdownContener: {
        backgroundColor: GRADIENT_COLOR_NEW2, 
        marginTop: -2, 
        borderBottomRightRadius: 5, 
        borderBottomLeftRadius: 5, 
        borderColor: GRAY_COLOR,
        borderWidth : 1,
        color: GRAY_COLOR
    },
    dropdown: {
        marginBottom: scale(15),
        height: scale(45),
        borderBottomColor: GRAY_COLOR,
        borderBottomWidth: scale(2),
    },

    placeholderStyle: {
        fontSize: scale(16),
        fontFamily: FONT_FAMILY_REGULAR,
        color: GRAY_COLOR
    },
    selectedTextStylemul: {
        fontSize: scale(12),
        fontFamily: FONT_FAMILY_REGULAR,
        color: GRAY_COLOR
    },
    selectedTextStyle: {
        fontSize: scale(16),
        fontFamily: FONT_FAMILY_REGULAR,
        color: GRAY_COLOR,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderColor  :GRAY_COLOR,
        borderRadius : 5
      },
    selectedStyle: {
        borderRadius: 12,
        backgroundColor: GRADIENT_COLOR_NEW2
    },
    /* iconStyle: {
      width: 20,
      height: 20,
    }, */
   

})
export default style;