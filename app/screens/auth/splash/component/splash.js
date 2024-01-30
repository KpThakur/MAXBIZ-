import React from 'react';
import { View ,SafeAreaView, StatusBar} from 'react-native';
import { Logo } from '@components';
import style from './style';
import commomstyle from '../../../../common/styles';
import { GRADIENT_COLOR, LINEAR_GRAD_COLOR, WHITE_COLOR } from '@utils/constants';


const splash = () => {
    return (
        <SafeAreaView  style={style.splashContainer}>
         
            <Logo />
        </SafeAreaView>
    )
}
export default splash;