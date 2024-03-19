import React, { useContext, useState } from "react";
import ValidateIdentity from "./component/validateIdentity";
import StringsOfLanguages from "../../../utils/translations";
import { LoadingContext } from "../../../utils/searchContext";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import Loader from "../../../components/loader";
import { showMessage } from "react-native-flash-message";
import { Alert, Modal } from "react-native";

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
        if (response.status === 200) {
          console.log("Response data:", response.data);
          setIsLoading(false);
          if (response.data.indentityValidated === 0) {
            navigation.navigate("otpVerifyScreen", {
              loginData: loginData?.email,
            });
            setLoginData(response.data.data);
            showMessage({
              message: response.data.message.messageSuccess,
              type: "success",
              duration: 3000,
            });
            console.log("navigate in otp:-", response.data.indentityValidated);
          } else {
            if (response.data.businessValidated === 1) {
              setIsLoading(false);
              openModal();
              // showMessage({
              //   message: "your bussiness already register",
              //   type: "success",
              //   duration: 3000,
              // });

              console.log("your bussiness already register:-", response.data);
            } else {
              setIsLoading(false);
              navigation.navigate("registrationScreen");
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

  // const toNextPage = async () => {
  //   const valid = validationFrom();
  //   if (valid) {
  //     const params = {
  //       email: loginData?.email,
  //     };
  //     try {
  //       setIsLoading(true);
  //       const response = await apiCall(
  //         "POST",
  //         apiEndPoints.USERREGISTER,
  //         params
  //       );
  //       if (response.status === 200) {
  //         console.log("Response data:", response.data);
  //         setIsLoading(false);
  //         if (response.data.indentityValidated === 0) {
  //           navigation.navigate("otpVerifyScreen", {
  //             loginData: loginData?.email,
  //           });
  //           setLoginData(response.data.data);
  //           showMessage({
  //             message: response.data.message.messageSuccess,
  //             type: "success",
  //             duration: 3000,
  //           });
  //           console.log("navigate in otp:-", response.data.indentityValidated);
  //         } else if (response.data.businessValidated === 1) {
  //           setIsLoading(false);
  //           openModal();
  //           console.log("your bussiness already register:-", response.data);
  //         } else if (response.data.businessValidated === 0) {
  //           setIsLoading(false);
  //           navigation.navigate("registrationScreen");
  //           showMessage({
  //             message: response.data.message.messageTost,
  //             type: "success",
  //             duration: 3000,
  //           });
  //         } else {
  //           setIsLoading(false);
  //         }
  //       } else {
  //         console.log("in else");
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       console.error("Error:", error);
  //     }
  //   } else {
  //     console.log("validation fieled");
  //   }
  // };


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
      />
    </>
  );
};
export default ValidtIdntyView;
