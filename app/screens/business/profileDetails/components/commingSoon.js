import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from "react-native";
// import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from "react-native-safe-area-context";
import commomstyle from "../../../../common/styles";
import { AuthContext } from "../../../../utils/UserContext";
import styles from "./style";
import { Button, Input, Header } from "../../../../components";
import StringsOfLanguages from "../../../../utils/translations";
import { WHITE_COLOR } from "../../../../utils/constants";


const commingSoon = () => {
  const { signOut } = React.useContext(AuthContext);
  
  const logOut = () => {
    signOut()
  } 
  return (
    
    <SafeAreaView style={commomstyle.container}>
     <StatusBar
          animated={true}
          backgroundColor={WHITE_COLOR}
          barStyle="dark-content"
        />
      <Header
        headertxt={styles.headerTxt}
        headerType='none'
        rightImg={true}
        headerText={StringsOfLanguages.PROFILE_DETAIL}
        rightImgStyl={{ tintColor: WHITE_COLOR }}
      />
      
        <View style={styles.commingsooncon}>
          
          <View style={styles.commingsoonsec}>
           <Image source={require("../../../../assets/images/commingsoon.jpeg")} style={styles.commingsoonImg} />

          
          </View>
          <View style={styles.button}>
            <Button
                buttonText={StringsOfLanguages.LOGOUT}
                onPress={() => logOut()}
            />
        </View>
        </View>
     
    </SafeAreaView>
  );
};
export default commingSoon;
