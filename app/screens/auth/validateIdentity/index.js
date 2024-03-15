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
    if (
      loginData.email === "" ||
      loginData.email === undefined ||
      loginData.email.trim() === ""
    ) {
      emailaddrError = StringsOfLanguages.PLEASE_ENTER_EMAIL;
      // return false;
    } else if (reg.test(loginData.email) === false) {
      emailaddrError = StringsOfLanguages.PLEASE_ENTER_CORRECT_EMAIL;
      // return false;
    }

    if (
      // firstnameError ||
      // lastnameError ||
      //  mobileNoError ||
      emailaddrError
    ) {
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
          console.log("Response data:", response.data);
          setIsLoading(false);
          if (response.data.indentityValidated === 0) {
            setLoginData(response.data.data);
            navigation.navigate("otpVerifyScreen", {
              loginData: loginData?.email,
            });
            showMessage({
              message: response.data.message.messageSuccess,
              type: "success",
              duration: 3000,
            });
            console.log("navigate in otp:-", response.data.indentityValidated);
          } else {
            if (response.data.businessValidated === 1) {
              setIsLoading(false);
              showMessage({
                message: "your bussiness already register",
                type: "success",
                duration: 3000,
              });
              console.log("your bussiness already register:-", response.data);

            } else {
              setIsLoading(false);
              navigation.navigate("registrationScreen");
              showMessage({
                message: response.data.message.messageTost,
                type: "success",
                duration: 3000,
              });
              console.log("navigate to registration ", response.data.indentityValidated);
            }
          }

        } else {
          setIsLoading(false);
          console.log("api not successfull");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error:", error);
      }
    } else {
      console.log("Validation failed");
    }
  };

 

  async function handleVaildateIdentity() {
    if (!formValidation()) {
      setIsLoader(true);

      const param = {
        email: formVaildate.email,
        // mobile: formVaildate.mobile,
        // countrycode: formVaildate.countrycode,
      };

      const { data } = await apiCall("POST", ApiEndPoint.USERREGISTER, param);
      if (data.status == 200) {
        setIsLoader(false);
        if (data.data.indentityValidated == 0) {
          setOtpShow(true);
          console.log("primer if");
        } else {
          if (data.data.businessValidated == 1) {
            console.log("segundo if");
            setIsLoader(false);
            //setbusinessRegiDataStatus(true);
            document.getElementById("businessRegiMdlClose").click();
            otpVarify();
          } else {
            console.log("tercero else");
            setIsLoader(false);
            otpVarify();
          }
        }
        successToast(data.message?.messageTost);
        dispatch(setBusinessRegisterDetail(data.data));
        // dispatch(setBusinessRegisterDetail(formVaildate))

        // setOtpShow(true)
        // successToast(data.message)
        // dispatch(setBusinessRegisterDetail(formVaildate))
        // setFormVaildateStatus(true);
        // document.getElementById('vaildateIdentityModel').click()
      } else {
        console.log("cuarto if");
        setIsLoader(false);
        setFormError(data.message);
        errorToast(data.message?.messageTost);
      }
    }
  }

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
