import React from 'react';
import { View,SafeAreaView, StatusBar } from 'react-native';
import commomstyle from '../../../../common/styles';
import style from './style';
import { Logo } from '@components';
import { BLACK_COLOR,GRADIENT_COLOR, LINEAR_GRAD_COLOR, WHITE_COLOR,GRADIENT_COLOR_NEW,LINEAR_GRAD_COLOR_NEW } from '@utils/constants';
import LinearGradient from 'react-native-linear-gradient';



const splashTwo = () => {
    return (
        <SafeAreaView  style={commomstyle.container}>
          
            
                <Logo style={{ tintColor: WHITE_COLOR }} />
           
        </SafeAreaView>
    )
}
export default splashTwo;