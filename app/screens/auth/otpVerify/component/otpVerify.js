import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";

import { ICONS } from "./../../../../utils/imagePath";

import styles from "./style";
import { Header, Button } from "@components";
import { COMMON_COLOR } from "../../../../utils/constants";
import { SafeAreaView } from 'react-native';
import commomstyle from '../../../../common/styles';
const OtpVerify = (props) => {
  return (
    <SafeAreaView style={commomstyle.container}>
      <Header
        rightImg={false}
        headerText={"OTP Verification"}
        headertxt={styles.headerTxt}
      />
      <View style={styles.container}>
        <View style={styles.containercenter}>
          <Text style={styles.enterOtptxt}>Enter Your Mobile OTP:</Text>
          <OTPTextInput
            containerStyle={styles.otpInputContainer}
            textInputStyle={styles.otpInputTxt}
            tintColor={COMMON_COLOR}
          ></OTPTextInput>

          <View style={styles.resendView}>
            <Text style={styles.resendTxt}>Didn't recieve a mobile code ? </Text>
            <View>
              <TouchableOpacity>
                <Text style={styles.resendTxtCommon}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.enterOtptxt}>Enter Your Email OTP:</Text>
          <OTPTextInput
            containerStyle={styles.otpInputContainer}
            textInputStyle={styles.otpInputTxt}
            tintColor={COMMON_COLOR}
          ></OTPTextInput>
          <View style={styles.resendView}>
            <Text style={styles.resendTxt}>Didn't recieve a email code ? </Text>
            <View>
              <TouchableOpacity>
                <Text style={styles.resendTxtCommon}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        <View style={styles.button}>
          <Button buttonText={"Verify"}  onPress={() => props.toNextPage()}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerify;
