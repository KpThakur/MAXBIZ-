/* import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
const Loader = (props) => {
  return (
    <View style={{
      position: "absolute",
      zIndex: 1,
      justifyContent: "center",
      width: '100%',
      opacity: 3,
      height: "100%",
    }}>
      <LottieView
        visible={true}
        style={{
          backgroundColor: "transparent",
          alignSelf: "center",
          width: 150,
        }}
        source={require('../assets/loader/loader.json')}
        autoPlay loop />
    </View>
  );
}
export default Loader; */

import React from 'react'
import { View ,Text,ActivityIndicator,StyleSheet} from 'react-native';
import {normalize, normalizeHeight, normalizeSpacing, normalizeWidth} from './scaleFontSize';

import { GRADIENT_COLOR_NEW3 } from '../utils/constants'

const Loader = () => {
 return (
  <View style={styles.containerStyle}>
    <View style={styles.indicatorViewStyle}>
      {<ActivityIndicator size={'large'} color={GRADIENT_COLOR_NEW3} />}
    </View>
  </View>
 )

};
const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 999,
        // elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      indicatorViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: normalize(5),
        height: normalizeHeight(75),
        width: normalizeWidth(75)
      },
  });
export default Loader;
