import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";
import Loader from "../../../components/loader";
import apiEndPoints from "../../../utils/apiEndPoints";
import { apiCall } from "../../../utils/httpClient";
import { LoadingContext } from "../../../utils/searchContext";
import StringsOfLanguages from "../../../utils/translations";
import OtpVerify from "./component/otpVerify";

const OtpVerifyView = ({ route, navigation }) => {
  const { loginData } = route?.params || {};
  // console.log('logindata>>>>>>>>:-', loginData)
  const [otp, setOtp] = useState();
  // const [emailotp, setEmailOtp] = useState();

  console.log("otp:-", otp);

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const otpInputRef = useRef(null);

  //   const clearText = () => {
  //     otpInputRef.current.clear();
  // }

  const validationFrom = () => {
    if (!otp || otp.length !== 4) {
      Alert.alert("Please enter a valid 4-digit OTP");
      return false;
    }
    // if (!emailotp || emailotp.length !== 4) {
    //   Alert.alert("Please enter a valid 4-digit Email OTP");
    //   return false;
    // }
    return true;
  };

  const toverifyOtp = async () => {
    // navigation.navigate("registrationScreen");

    // const valid = validationFrom();
    // if (valid) {
    // }
    const valid = validationFrom();
    if (valid) {
      const parms = {
        email: loginData,
        otp: otp,
      };
      try {
        setIsLoading(true);
        const response = await apiCall(
          "POST",
          apiEndPoints.VERIFYEMAILMOBILE,
          parms
        );
        if (response.data.status === 200) {
         // console.log("helllllooo");
          setIsLoading(false);
          setOtp(response.data.data);
         // console.log("responce otp:-", response);
          // Alert.alert("Your verification is successful");
          navigation.navigate("registrationScreen");
          setOtp("");
          // otpInputRef.current.clearText();
        } else {
          setIsLoading(false);
          console.log("OTP verification failed:");
          //  Alert.alert('Please enter a valid 4-digit OTP')
          console.log("verify responce:-", response);
          showMessage({
            message: response.data.message.otpmail,
            type: "warning",
            duration: 3000,
          });
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error:", error);
      }
    } else {
      console.log("Validation failed");
      
    }
  };

  const resendOtp = async () => {
    try {
      setIsLoading(true);
      const parms = {
        email: loginData,
      };
      const response = await apiCall("POST", apiEndPoints.RESENTOTP, parms);
      if (response.status === 200) {
        setIsLoading(false);
        setOtp(response.data.data);
       // console.log("resend responce:-", response);
        // Alert.alert("Your verification is successful");
        setOtp("");
        // otpInputRef.current.clearText();
        showMessage({
          message: response.data.message.messageSuccess,
          type: "success",
          duration: 3000,
        });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  const backscreen = () => {
    navigation.navigate("validateIdentityScreen");
  };

  return (
    <>
      {isLoading && <Loader />}
      <OtpVerify
        toverifyOtp={toverifyOtp}
        backscreen={backscreen}
        otp={otp}
        setOtp={setOtp}
        resendOtp={resendOtp}
        // otpInputRef={otpInputRef}
      />
    </>
  );
};

export default OtpVerifyView;
