import React, { useContext, useState } from "react";
import ValidateIdentity from "./component/validateIdentity";
import StringsOfLanguages from "../../../utils/translations";
import { LoadingContext } from "../../../utils/searchContext";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../components/loader";
import { showMessage } from "react-native-flash-message";
import { Alert } from "react-native";

const ValidtIdntyView = ({ navigation }) => {
  const [inputError, setinputError] = useState({});
  const [loginData, setLoginData] = useState({
    mobileNo: "",
    email: "",
    firstname: "",
    lastname: "",
  });

  // console.log("emailadd:-", loginData?.email)

  function validationFrom() {
   // let mobileNoError = "";
    let emailaddrError = "";
   // let firstnameError = "";
   // let lastnameError = "";

    // if (loginData.firstname == "") {
    //   firstnameError = StringsOfLanguages.PLEASE_ENTER_YOUR_FIRST_NAME;
    // }
    // if (loginData.lastname == "")
    //   lastnameError = StringsOfLanguages.PLEASE_ENTER_YOUR_LAST_NAME;
    // if (loginData.mobileNo.length <= 9) {
    //   mobileNoError = StringsOfLanguages.PLEASE_ENTER_MOBILE_NUMBER;
    // }

    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let reg = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
    if (loginData.email == "" || loginData.email.trim() === "") {
      emailaddrError = StringsOfLanguages.PLEASE_ENTER_EMAIL;
    }
    if (reg.test(loginData.email) == "") {
      emailaddrError = StringsOfLanguages.PLEASE_ENTER_CORRECT_EMAIL;
    }
    if (
     // firstnameError || 
     // lastnameError ||
     //  mobileNoError ||
      emailaddrError
        ){
      setinputError({
        ...inputError,
      //  mobileNoError,
        emailaddrError,
       // firstnameError,
       // lastnameError,
      });
      return false;
    }
    return true;
  }

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const toNextPage = async () => {
    // navigation.navigate("otpVerifyScreen", {
    //   loginData: loginData?.email,
    // });
    // const valid = validationFrom();
    // if (valid) {

    // }
   // console.log("email>>>", email);
    const valid = validationFrom();
    if (valid) {
      const parms = {
        email: loginData?.email,
      };
      try {
        setIsLoading(true);
        const response = await apiCall(
          "POST",
          apiEndPoints.USERREGISTER,
          parms
        );
        if (response.status === 200) {
          setIsLoading(false);
          setLoginData(response.data.data);
          // console.log("responce:-",response)
          navigation.navigate("otpVerifyScreen", {
            loginData: loginData?.email,
          });
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
    } else {
      console.log("Validation failed");
    }
  };

  const backscreen = () => {
    navigation.navigate("loginScreen");
  };

  return (
    <>
      {isLoading && <Loader />}
      <ValidateIdentity
        loginData={loginData}
        setLoginData={setLoginData}
        toNextPage={toNextPage}
        inputError={inputError}
        backscreen={backscreen}
      />
    </>
  );
};
export default ValidtIdntyView;
