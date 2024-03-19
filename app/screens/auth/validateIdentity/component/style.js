import { StyleSheet } from 'react-native';
import { scale } from '@utils/utils';
import { BLACK_COLOR, GRAY_COLOR,FONT_FAMILY_SEMIBOLD,FONT_FAMILY_REGULAR } from '@utils/constants';
import { COMMON_COLOR, FONT_FAMILY_MEDIUM, WHITE_COLOR } from '../../../../utils/constants';

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
    },
    modalMainView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"rgba(0,0,0,0.6)"
      },
      modalContainView:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: WHITE_COLOR,
        paddingHorizontal: scale(15),
        paddingVertical: scale(20),
        borderRadius: scale(10),
        
      },
      modalTextHoldStyle:{
        color: COMMON_COLOR,
        fontFamily: FONT_FAMILY_SEMIBOLD,
        fontSize: scale(16),
        paddingLeft: scale(5),
        paddingTop: scale(3)
      },
      modalTextStyle:{
        color: COMMON_COLOR,
        fontFamily: FONT_FAMILY_MEDIUM,
        fontSize: scale(14),
        paddingLeft: scale(5),
       // top: scale(5)
      },
      buttnView:{
        // backgroundColor:'red',
         display:'flex',
         flexDirection:'row',
         justifyContent:'flex-end',
         paddingTop: scale(25),
         paddingBottom: scale(3)
       },
       closeIcon:{
        width: scale(22),
        height: scale(22),
        tintColor:BLACK_COLOR,
        bottom: scale(10),
        left: scale(5)
       },
})
export default style;