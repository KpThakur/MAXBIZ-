import React, { useCallback, useContext, useState } from "react";
import ValidateIdentity from "./component/validateIdentity";
import StringsOfLanguages from "../../../utils/translations";
import { LoadingContext } from "../../../utils/searchContext";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../components/loader";
import { showMessage } from "react-native-flash-message";
import { Alert, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const ValidtIdntyView = ({ navigation }) => {
  const [inputError, setinputError] = useState({});
  const [loginData, setLoginData] = useState({
    mobileNo: "",
    email: "",
    firstname: "",
    lastname: "",
  });
   const [message, setMessage] = useState();

  // console.log("emailadd:-", loginData?.email)

  useFocusEffect(
    useCallback(() => {
      setLoginData({
        ...loginData,
        email: "",
      });
    }, [])
  );

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
    // navigation.navigate("registrationScreen");
    // navigation.navigate("otpVerifyScreen", {
    //   loginData: loginData?.email,
    // });
    // const valid = validationFrom();
    // if (valid) {

    // }
    // console.log("email>>>", email);
    const valid = validationFrom();
    if (valid) {
      const params = {
        email: loginData?.email,
      };
      try {
        setIsLoading(true);
        const response = await apiCall(
          "POST",
          apiEndPoints.USERREGISTER,
          params
        );
       // console.log('responce:---', response)
        if (response.status === 200) {
          console.log("Response data:", response.data);
          setIsLoading(false);
          console.log("find validate:-",response.data.data.indentityValidated )
          if (response.data.data.indentityValidated === 0) {
            navigation.navigate("otpVerifyScreen", {
              loginData: loginData?.email,
              profileid:  response?.data?.data.profileid
            });
            setLoginData(response.data.data);
            showMessage({
              message: response.data.message.messageSuccess,
              type: "success",
              duration: 3000,
            });
            console.log("navigate in otp:-", response.data.indentityValidated);
          } else {
            console.log("find businessValidated>>>>>>", response.data.data.businessValidated )
            if (response.data.data.businessValidated === 1) {
              setIsLoading(false);
              openModal();
              // showMessage({
              //   message: response.data.message.messageTost,
              //   type: "success",
              //   duration: 3000,
              // });
              setMessage(response.data.message.messageTost)
              console.log("your bussiness already register:-", response.data);
            } else {
              setIsLoading(false);
              navigation.navigate("registrationScreen", {  profileid:  response?.data?.data.profileid });
              showMessage({
                message: response.data.message.messageTost,
                type: "success",
                duration: 3000,
              });
              console.log(
                "navigate to registration ",
                response.data.indentityValidated
              );
            }
          }
        } else {
          setIsLoading(false);
          console.log("api in account success");
          showMessage({
            message: response.data.message.messageSuccess,
            type:'success',
            duration: 3000
          })
          // openModal();
          // setMessage(response.data.message.messageSuccess)
          console.log("success>>>>>|||", response.data)
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

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
        visible={modalVisible}
        onClose={closeModal}
        message={message}
      />
    </>
  );
};
export default ValidtIdntyView;
