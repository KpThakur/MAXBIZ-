import React from 'react';
import { View,SafeAreaView, StatusBar } from 'react-native';
import commomstyle from '../../../../common/styles';
import style from './style';
import { Logo } from '@components';
import { GRADIENT_COLOR, LINEAR_GRAD_COLOR, WHITE_COLOR } from '@utils/constants';
import LinearGradient from 'react-native-linear-gradient';



const splashTwo = () => {
    return (
        <SafeAreaView  style={commomstyle.container}>
          <StatusBar
            animated={true}
            backgroundColor={GRADIENT_COLOR}
             barStyle='light-content'
            /*showHideTransition={statusBarTransition}
            hidden={hidden}  */
            />
            <LinearGradient colors={[GRADIENT_COLOR, LINEAR_GRAD_COLOR]}
                style={style.splashContainer}>
                <Logo style={{ tintColor: WHITE_COLOR }} />
            </LinearGradient>
        </SafeAreaView>
    )
}
export default splashTwo;