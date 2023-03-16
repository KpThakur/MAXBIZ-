import { StyleSheet } from 'react-native';
import { WHITE_COLOR,FONT_FAMILY_REGULAR } from '@utils/constants';
import { scale } from '@utils/utils';


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR
    },
    shadowContainer: {
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowColor: WHITE_COLOR,
        shadowRadius: 50,
        elevation: 2,
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