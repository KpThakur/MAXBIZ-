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
  const { loginData, profileid } = route?.params || {};
  // console.log('logindata>>>>>>>>:-', loginData)
  const [otp, setOtp] = useState("");
  // const [emailotp, setEmailOtp] = useState();

  console.log("profilid check>>>:-", profileid);

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const otpInputRef = useRef(null);

  const clearText = () => {
    otpInputRef.current.clear();
  };

  const validationFrom = () => {
    if (!otp || otp.length === 0) {
      Alert.alert("Please enter OTP");
      return false;
    } else if (otp.length !== 4) {
      Alert.alert("Please enter a 4-digit OTP");
      return false;
    } else {
      return true;
    }

    // if (otp?.length === 0) {
    //   Alert.alert("Please enter  OTP");
    //   return false;
    // } else if (otp?.length <= 4) {
    //   Alert.alert("Please enter a valid 4-digit OTP");
    //   return false;
    // }

    // if (!emailotp || emailotp.length !== 4) {
    //   Alert.alert("Please enter a valid 4-digit Email OTP");
    //   return false;
    // }
    return true;
  };

  const toverifyOtp = async () => {
    // const valid = validationFrom();
    // if (valid) {
    //   navigation.navigate("registrationScreen");
    //   clearText();
    // }
    const valid = validationFrom();
    if (valid) {
      const parms = {
        email: loginData,
        email_otp: otp,
      };
      try {
        setIsLoading(true);
        const response = await apiCall(
          "POST",
          apiEndPoints.VERIFYEMAILMOBILE,
          parms
        );
        console.log("responce verify:-", response)
        if (response.data.status === 200) {
         // console.log("helllllooo");
          setIsLoading(false);
          setOtp(response.data.data);
          console.log("responce 200:-", response.data);
          // Alert.alert("Your verification is successful");
          navigation.navigate("registrationScreen", { profileid: profileid });
          setOtp("");
          clearText();
          showMessage({
            message: response.data.message?.messageTost,
            type: "warning",
            duration: 3000,
          });
        } else {
          setIsLoading(false);
          console.log("OTP verification failed:");
          //  Alert.alert('Please enter a valid 4-digit OTP')
          console.log("responce not 200:-", response.data);
          showMessage({
            message: response.data.message?.otpmail || response.data.message?.messageTost,
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
        clearText();
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
        otpInputRef={otpInputRef}
      />
    </>
  );
};

export default OtpVerifyView;
