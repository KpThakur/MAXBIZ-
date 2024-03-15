import React from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";

import { ICONS } from "./../../../../utils/imagePath";

import styles from "./style";
import { Header, Button } from "@components";
import { COMMON_COLOR,GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3,GRADIENT_COLOR_NEW2, WHITE_COLOR } from "../../../../utils/constants";
import { SafeAreaView } from 'react-native';
import commomstyle from '../../../../common/styles';
import LinearGradient from "react-native-linear-gradient";
import StringsOfLanguages from "../../../../utils/translations";
const OtpVerify = (props) => {
  const { backscreen, otp, setOtp, toverifyOtp, resendOtp, otpInputRef } = props;

  
  return (
    <SafeAreaView style={commomstyle.container}>
      <StatusBar
          animated={true}
          backgroundColor={WHITE_COLOR}
          barStyle="dark-content"
        />
       {/* <LinearGradient 
             colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3,GRADIENT_COLOR_NEW2]}
             locations={[0.24, 0.63, 0.87, 0.99]}
             style = {{flexGrow : 1}}>  */}
      <Header
        rightImg={false}
        headerText={StringsOfLanguages.OTP_VERIFICATION}
        headertxt={styles.headerTxt}
        backscreen={backscreen}
        showFindServiceOnBack={true}
      />
       <ScrollView ontentContainerStyle={{ flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.containercenter}>
          {/* <Text style={styles.enterOtptxt}>{StringsOfLanguages.ENTER_YOUR_MOBILE_OTP}</Text>
          <OTPTextInput
            containerStyle={styles.otpInputContainer}
            textInputStyle={styles.otpInputTxt}
            tintColor={COMMON_COLOR}
            defaultValue={otp}
            handleTextChange={(text) => setOtp(text)}
          ></OTPTextInput> */}

          {/* <View style={styles.resendView}>
            <Text style={styles.resendTxt}>{StringsOfLanguages.DIDNT_RECIEVE_A_MOBILE_CODE}</Text>
            <View>
              <TouchableOpacity>
                <Text style={styles.resendTxtCommon}>{StringsOfLanguages.RESEND}</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          <Text style={styles.enterOtptxt}>{StringsOfLanguages.ENTER_YOUR_EMAIL_OTP}</Text>
          <OTPTextInput
            containerStyle={styles.otpInputContainer}
            textInputStyle={styles.otpInputTxt}
            tintColor={COMMON_COLOR}
           // defaultValue={otp}
            defaultValue={String(otp)}
            handleTextChange={(text) => setOtp(text)}
            ref={otpInputRef}
          ></OTPTextInput>

          <View style={styles.resendView}>
            <Text style={styles.resendTxt}>{StringsOfLanguages.DIDNT_RECIEVE_A_EMAIL_CODE}</Text>
            <View>
              <TouchableOpacity onPress={()=> resendOtp()}>
                <Text style={styles.resendTxtCommon}>{StringsOfLanguages.RESEND}</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
          
        <View style={styles.button}>
          <Button buttonText={StringsOfLanguages.VERIFY}  onPress={() => toverifyOtp()}/>
        </View>
      </View>
      </ScrollView>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export default OtpVerify;
