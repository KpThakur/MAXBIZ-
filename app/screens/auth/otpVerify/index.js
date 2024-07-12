import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import { Alert } from "react-native";
import Loader from "../../../components/loader";
import apiEndPoints from "../../../utils/apiEndPoints";
import { apiCall } from "../../../utils/httpClient";
import { LoadingContext } from "../../../utils/searchContext";
import OtpVerify from "./component/otpVerify";

const OtpVerifyView = ({ navigation }) => {
  const [otp, setOtp] = useState();
  // const [emailotp, setEmailOtp] = useState();

 // const [isLoading, setIsLoading] = useContext(LoadingContext);

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



 

  const toNextPage =  () => {
    navigation.navigate("registrationScreen");

    const valid = validationFrom();
    if (valid) {
      
    } 
  };

  const backscreen = () => {
    navigation.navigate("validateIdentityScreen");
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <OtpVerify
        toNextPage={toNextPage}
        backscreen={backscreen}
        otp={otp}
        setOtp={setOtp}
        // emailotp={emailotp}
        // setEmailOtp={setEmailOtp}
      />
    </>
  );
};

export default OtpVerifyView;
