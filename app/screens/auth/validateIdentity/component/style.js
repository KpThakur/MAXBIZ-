import { StyleSheet } from 'react-native';
import { scale } from '@utils/utils';
import { BLACK_COLOR, GRAY_COLOR,FONT_FAMILY_SEMIBOLD,FONT_FAMILY_REGULAR } from '@utils/constants';

const style = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: scale(18),
        paddingVertical: scale(20)
    },
    containercenter:{
        flex:5.5,
       
    },
    firstInput: {
        paddingVertical: scale(9)
    },
    secondText: {
        paddingVertical: scale(12)
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
        flex:0.5,
      
       
    },
    firstInput: {
        paddingVertical: scale(9)
    },
    errorText:{
        fontSize: scale(11),
        color: "red",
        fontWeight: '400',
        fontFamily: FONT_FAMILY_REGULAR,
        alignSelf: 'flex-end'
    }
})
export default style;