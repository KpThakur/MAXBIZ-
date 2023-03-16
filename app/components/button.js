import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { FONT_FAMILY_MEDIUM, GRADIENT_COLOR, LINEAR_GRAD_COLOR, WHITE_COLOR } from '../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from '@utils/utils';

const button = (props) => {
    const { buttonText, style, leftImg, rightImg, buttontxt, onPress } = props;
    const {
        container, btnText,
    } = styles;
    return (
        <TouchableOpacity onPress={onPress}
            style={{ paddingHorizontal: scale(5)}}>
            <LinearGradient colors={[LINEAR_GRAD_COLOR, GRADIENT_COLOR]}
                style={[container, style]}>
                <Image source={leftImg} />
                <Text style={[btnText, buttontxt]}>{buttonText}</Text>
                <Image source={rightImg} />
            </LinearGradient>
        </TouchableOpacity>
    )
}
button.defaultProps = {
    buttonText: "Button"
}
export default button;
const styles = StyleSheet.create({
    container: {
        height: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal:scale(5),
    },
    btnText: {
        color: WHITE_COLOR,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: FONT_FAMILY_MEDIUM
    }
})