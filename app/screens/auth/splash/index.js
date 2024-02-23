import React from 'react';
import Splash from './component/splash';

const SplashView = ({ navigation }) => {
    setTimeout(() => {
        navigation.navigate('splashTwoScreen')
    }, 2000);
    return (
        <Splash />
    )
}
export default SplashView;