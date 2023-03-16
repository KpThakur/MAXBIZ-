import React from "react";
import OtpVerify from "./component/otpVerify";

const OtpVerifyView = ({navigation}) => {
  const toNextPage = () =>{
    navigation.navigate('registrationScreen')
  }
  return <OtpVerify 
  toNextPage={toNextPage}
  />;
};

export default OtpVerifyView;
