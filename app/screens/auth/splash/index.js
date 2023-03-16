import React from 'react';
import Splash from './component/splash';

const splashView = ({ navigation }) => {
    setTimeout(() => {
        navigation.navigate('splashTwoScreen')
    }, 2000);
    return (
        <Splash />
    )
}
export default splashView;