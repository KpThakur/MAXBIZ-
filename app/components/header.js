import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { BLACK_COLOR, FONT_FAMILY_REGULAR, GRADIENT_COLOR, LINEAR_GRAD_COLOR, WHITE_COLOR, THEME_GRAD_COLOR, FONT_FAMILY_SEMIBOLD } from '../utils/constants';
import { scale } from '@utils/utils';
import { ICONS } from '@utils/imagePath';
import { useNavigation } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native'

const header = (props) => {
    const navigation = useNavigation()
    const { headerText, style, leftImg, rightImg, headertxt , leftImgStyl, rightImgStyl, headerType , onPressLeft, onPressRight } = props;
    const {
        container, hdrText, drawerStyle
    } = styles;
    return (
        <View style={[container, style]}>
            {headerType == "other" ?
                <TouchableOpacity onPress={onPressLeft}>
                    <Image
                        source={leftImg}
                        style={leftImgStyl} resizeMode="contain"
                    />
                </TouchableOpacity>
                : headerType == "none" ?
                <TouchableOpacity onPress={onPressLeft}>
                    <Image
                        source={leftImg}
                        style={leftImgStyl} resizeMode="contain"
                    />
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={ICONS.backIcon}
                    style={{ width: scale(24), height: scale(24) }} resizeMode="contain"
                />
               </TouchableOpacity>
            }
            <Text style={[hdrText, headertxt]}>{headerText}</Text>
            <TouchableOpacity onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())}}>
                <Image
                    source={rightImg ? ICONS.drawerIcon : rightImg}
                    style={[drawerStyle, rightImgStyl]} resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}
header.defaultProps = {
    headerText: "",
    headerType: true
}
export default header;
const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(12),
        justifyContent: 'space-between',
        backgroundColor:WHITE_COLOR,
        /* borderBottomColor:THEME_GRAD_COLOR,
        borderBottomWidth:1 */
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity:  1,
        shadowRadius:3,
        elevation: 10,
    },
    hdrText: {
        color: BLACK_COLOR,
        fontSize: scale(21),
        fontWeight: '600',
        fontFamily: FONT_FAMILY_SEMIBOLD
    },
    drawerStyle: {
        width: scale(25),
        height: scale(14),
        marginHorizontal: scale(9)
    },
})