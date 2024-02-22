import React from 'react';
import SplashTwo from './component/splashTwo';

const SplashTwoView = ({ navigation }) => {
    setTimeout(() => {
        //navigation.navigate('findServiceScreen')
        navigation.navigate('customDrawer')
    }, 2000);
    return (
        <SplashTwo />
    )
}
export default SplashTwoView;