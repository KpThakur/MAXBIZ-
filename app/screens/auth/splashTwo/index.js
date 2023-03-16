import React from 'react';
import SplashTwo from './component/splashTwo';

const splashTwoView = ({ navigation }) => {
    setTimeout(() => {
        //navigation.navigate('findServiceScreen')
        navigation.navigate('homeScreen')
    }, 2000);
    return (
        <SplashTwo />
    )
}
export default splashTwoView;