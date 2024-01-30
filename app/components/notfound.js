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
import StringsOfLanguages from '../utils/translations';

import { FONT_FAMILY_SEMIBOLD, GRADIENT_COLOR_NEW3, WHITE_COLOR } from '../utils/constants'

const Notfound = (props) => {
    const {
        textnotfound = 'Data'
    } = props
 return (
  <View style={styles.containerStyle}>
    
       <Text style={styles.title}>{textnotfound} {StringsOfLanguages.NOT_FOUND}</Text>
   
  </View>
 )

};
const styles = StyleSheet.create({
    containerStyle: {
       
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: '70%'
         
      },
      title: {
        fontSize: 20,
        marginVertical: 2,
        fontFamily:FONT_FAMILY_SEMIBOLD,
        color:WHITE_COLOR
      },
      /* indicatorViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: normalize(5),
        height: normalizeHeight(75),
        width: normalizeWidth(200)
      }, */
  });
export default Notfound;
