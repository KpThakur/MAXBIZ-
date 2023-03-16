import React from 'react';
import { Image, View } from 'react-native';
import { LOGOIMAGE } from '@utils/imagePath';

const logo = (props) => {
    const { style } = props
    return (
        <View>
            <Image style={style}
                source={LOGOIMAGE.LOGO} />
        </View>
    )
}
export default logo;