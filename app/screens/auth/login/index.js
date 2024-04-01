import React, { useContext, useEffect, useRef, useState } from "react";
import Login from "./component/login";
import { AuthContext, UserContext } from "../../../utils/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiEndPoints from "../../../utils/apiEndPoints";
import { apiCall, setDefaultHeader } from "../../../utils/httpClient";
import Loader from "../../../components/loader";
import { showMessage, hideMessage } from "react-native-flash-message";
import StringsOfLanguages from "../../../utils/translations";
import { Alert } from "react-native";
//const AuthContext = React.createContext();
const LoginView = ({ route, navigation }) => {
  const { businessDetail } = route?.params || {};
  const { signIn } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState();
  const [inputError, setInputError] = useState({});
  const [profileid, setProfileid] = useState();
  const [BusinessRegisterDetail, setBusinessRegisterDetail] = useState("");
  const [otp, setOtp] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    token: "123",
  });

  const [handlelogin, setHandleLogin] = useState("");

  // console.log("check profileid", profileid);
  //const { signIn } = React.useContext(AuthContext);

   const {userData, setUserData} = useContext(AuthContext);

  
  console.log("find profileid>>>", profileid);
  

  const otpInputRef = useRef(null);

  const clearText = () => {
    otpInputRef.current.clear();
  };

  const Remember = () => {
    setCheck(!check);
  };

  /*  const curlang = StringsOfLanguages.getLanguage();
   */

  const validationFrom = () => {
    let formerror = true;
    let error = {};

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(loginData?.email)) {
      formerror = false;
      error["emailerror"] = StringsOfLanguages.CORRECT_EMAIL;
    }
    if (loginData?.email == "") {
      formerror = false;
      error["emailerror"] = StringsOfLanguages.PLEASE_ENTER_EMAIL;
    }

    if (loginData?.password.length <= 5) {
      formerror = false;
      error["passworderror"] =
        StringsOfLanguages.PASSWORD_SHOULD_BE_6_CHARACTERS;
    }
    if (loginData?.password == "") {
      formerror = false;
      error["passworderror"] = StringsOfLanguages.PLEASE_ENTER_YOUR_PASSWORD;
    }

    setInputError(error);
    return formerror;
  };

  const validationOtp = () => {
    if (!otp || otp.length === 0) {
      Alert.alert("Please enter OTP");
      return false;
    } else if (otp.length !== 4) {
      Alert.alert("Please enter a 4-digit OTP");
      return false;
    } else {
      return true;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const forgotPassword = () => {
    //navigation.navigate('forgotPasswordScreen')
  };
  const toRegistration = () => {
    //navigation.navigate('joinScreen')
    navigation.navigate("validateIdentityScreen");
  };

  // const toJoin = async () => {
  //   const validation = validationFrom();
  //   if (validation) {
  //     try {
  //       setIsLoading(true);
  //       const response = await apiCall(
  //         "POST",
  //         apiEndPoints.BUSINESSLOGIN,
  //         loginData
  //       );
  //       console.log("responce >>>>>>>", response.data);
  //       if (response.status === 200) {
  //         console.log(
  //           "check businessValidated  :---",
  //           response.data.data.businessValidated
  //         );
  //         if (response.data.data.businessValidated === 1) {
  //           console.log(
  //             "check subscriptionplan  :---",
  //             response.data.data.subscriptionplan
  //           );
  //           // if (response.data.data.subscriptionplan === 1) {
  //           console.log(
  //             "check two_factor_auth  :---",
  //             response.data.data.two_factor_auth
  //           );
  //           if (response.data.data.two_factor_auth === 1) {
  //            // setProfileid(response.data?.data.profileid);
  //             submitforgotform();
  //             setProfileid(response.data?.data.profileid);
  //             // await AsyncStorage.setItem("profile_id", String(response.data?.data.profileid ))
  //             // await AsyncStorage.setItem("businessid", String(response.data?.data.businessid) )
  //              await AsyncStorage.setItem("userToken", response.data.token);
  //              await AsyncStorage.setItem(
  //                "userData",
  //                JSON.stringify(response.data.data)
  //              );
  //              await setDefaultHeader("token", response.data.token);
  //              signIn(0, response.data.token, "business");
 
  //              await AsyncStorage.setItem(
  //                "allinformation",
  //                String(response.data.data.allinformation)
  //              );
 
  //              await AsyncStorage.setItem(
  //                "plan_type",
  //                String(response.data.data.plan_type)
  //              );
 
  //              setBusinessRegisterDetail(response.data.data);
  //              showMessage({
  //                message: response.data.message?.messageTost,
  //                type: "success",
  //                duration: 3000,
  //              });
  //              navigation.navigate("profileDetailsScreen");
  //              console.log(
  //                "navigate in two_factor_auth :---",
  //                response.data.data.two_factor_auth
  //              );
  //           } else {
  //             setProfileid(response.data?.data.profileid);
  //            // await AsyncStorage.setItem("profile_id", String(response.data?.data.profileid ))
  //            // await AsyncStorage.setItem("businessid", String(response.data?.data.businessid) )
  //             await AsyncStorage.setItem("userToken", response.data.token);
  //             await AsyncStorage.setItem(
  //               "userData",
  //               JSON.stringify(response.data.data)
  //             );
  //             await setDefaultHeader("token", response.data.token);
  //             signIn(0, response.data.token, "business");

  //             await AsyncStorage.setItem(
  //               "allinformation",
  //               String(response.data.data.allinformation)
  //             );

  //             await AsyncStorage.setItem(
  //               "plan_type",
  //               String(response.data.data.plan_type)
  //             );

  //             setBusinessRegisterDetail(response.data.data);
  //             showMessage({
  //               message: response.data.message?.messageTost,
  //               type: "success",
  //               duration: 3000,
  //             });
  //             navigation.navigate("profileDetailsScreen");
  //             console.log(
  //               "navigate in two_factor_auth else :---",
  //               response.data.data.two_factor_auth
  //             );
  //           }
  //           // } else {
  //           //
  //           //   AsyncStorage.setItem("profile_id", String(response.data?.data.profileid ));
  //           //   setBusinessRegisterDetail(response.data.data);
  //           //  // navigation.navigate("SubscriptionPlanScreen");
  //           //  console.log("navigate in subscriptionplan else :---", response.data.subscriptionplan);

  //           // }
  //         } else {
  //           setBusinessRegisterDetail(response.data.data);
  //           navigation.navigate("validateIdentityScreen");
  //           showMessage({
  //             message: response.data.message.messageTost,
  //             type: "warning",
  //             duration: 3000,
  //           });
  //         }
  //         console.log(
  //           "navigate in businessValidated else :---",
  //           response.data.data.businessValidated
  //         );
  //       } else {
  //         setIsLoading(false);
  //         var msg = response.data.message.email
  //           ? response.data.message.email
  //           : response.data.message.password
  //           ? response.data.message.password
  //           : response.data.message.messageTost;
  //         showMessage({
  //           message: msg,
  //           type: "danger",
  //         });
  //         console.log("responce in 200 else:---", response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const toJoin = async () => {
    const validation = validationFrom();
    if (validation) {
      try {
        setIsLoading(true);
        const response = await apiCall("POST", apiEndPoints.BUSINESSLOGIN, loginData);
  
        if (response.status === 200) {
          const responseData = response.data;
          console.log("Response data:", responseData);
  
          if (responseData.data.businessValidated === 1) {
            if (responseData.data.two_factor_auth === 1) {
              // Handle successful login with two-factor authentication
              await handleSuccessfulLogin(responseData);
              submitforgotform()
            } else {
              // Handle successful login without two-factor authentication
              await handleSuccessfulLogin(responseData);
            }
          } else {
            // Business validation failed, navigate to validateIdentityScreen
            navigation.navigate("validateIdentityScreen");
            showMessage({
              message: responseData.message.messageTost,
              type: "warning",
              duration: 3000,
            });
          }
        } else {
          // Handle other API response statuses (e.g., error messages)
          handleErrorResponse(response);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };
  
  const handleSuccessfulLogin = async (responseData) => {
    setProfileid(responseData.data.profileid);
    await AsyncStorage.setItem("userToken", responseData.token);
    await AsyncStorage.setItem("userData", JSON.stringify(responseData.data));
    await setDefaultHeader("token", responseData.token);
    signIn(0, responseData.token, "business");
  
    await AsyncStorage.setItem("allinformation", String(responseData.data.allinformation));
    await AsyncStorage.setItem("plan_type", String(responseData.data.plan_type));
  
    setBusinessRegisterDetail(responseData.data);
    showMessage({
      message: responseData.message?.messageTost,
      type: "success",
      duration: 3000,
    });
    navigation.navigate("profileDetailsScreen");
  };
  
  const handleErrorResponse = (response) => {
    setIsLoading(false);
    var msg =
      response.data.message.email ||
      response.data.message.password ||
      response.data.message.messageTost;
    showMessage({
      message: msg,
      type: "danger",
    });
  };
  
  

  const submitforgotform = async () => {
    try {
      setIsLoading(true);
      const params = {
        email: loginData?.email,
        type: "TFA",
      };
      console.log("responce:- ", response.data);
      const response = await apiCall(
        "POST",
        apiEndPoints.FORGOTPASSWORD,
        params
      );
      if (response.status === 200) {
        setIsLoading(false);
        showMessage({
          message: response.data.message?.messageTost,
          type: "danger",
          duration: 3000,
        });
        openModal();
      } else {
        setIsLoading(false);
        showMessage({
          message: response.data.message?.messageTost,
          type: "danger",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const twofacVerify = async () => {
    const validOtp = validationOtp();
    if (validOtp) {
      try {
        setIsLoading(true);
        const params = { otp: otp, email: loginData?.email };
        console.log("responce>>>", response.data);
        const response = await apiCall(
          "POST",
          apiEndPoints.VERIFYEDOTP,
          params
        );
        if (response.status === 200) {
          setIsLoading(false);
          showMessage({
            message: response.data.message?.messageTost,
            type: "success",
            duration: 3000,
          });
          clearText();
          setOtp("");
          reloginBusiness();
        } else {
          setIsLoading(false);
          showMessage({
            message: response.data.message?.messageTost,
            type: "warning",
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const reloginBusiness = async () => {
    try {
      setIsLoading(true);
      const parms = {
        profile_id: profileid,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.RELOGIN_BUSINESS,
        parms
      );
      if (response.status === 200) {
        setIsLoading(false);
        if (response.data.data.businessValidated === 1) {
          if (response.data.data.subscriptionplan === 1) {
            setUserData(response.data.data);
            setHandleLogin({
              username: response.data.first_name,
              userType: "business",
              token: response.data.token,
            });
            await AsyncStorage.setItem("userToken", response.data.token);
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(response.data.data)
            );
            await setDefaultHeader("token", response.data.token);
            signIn(0, response.data.token, "business");

            await AsyncStorage.setItem(
              "allinformation",
              String(response.data.data.allinformation)
            );

            await AsyncStorage.setItem(
              "plan_type",
              String(response.data.data.plan_type)
            );

            setBusinessRegisterDetail(response.data.data);
            showMessage({
              message: response.data.message?.messageTost,
              type: "success",
              duration: 3000,
            });
            navigation.navigate("profileDetailsScreen");
          } else {
            AsyncStorage.setItem("profile_id", response.data?.data.profileid);
            setBusinessRegisterDetail(response.data.data);
            // navigation.navigate("SubscriptionPlanScreen");
          }
        } else {
          showMessage({
            message: response.data.message?.messageTost,
            type: "danger",
            duration: 3000,
          });
          setBusinessRegisterDetail(response.data.data);
          navigation.navigate("validateIdentityScreen");
        }
      } else {
        setIsLoading(false);
        showMessage({
          message: response.data.message?.message,
          type: "danger",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResentOtp = async () => {
    try {
      setIsLoading(true);
      const params = { email: loginData?.email };
      const response = await apiCall("POST", apiEndPoints.RESENTOTP, params);
      if (response.status === 200) {
        setIsLoading(false);
        clearText();
        setOtp("");
        showMessage({
          message: response.data.message,
          type: "success",
          duration: 3000,
        });
      } else {
        setIsLoading(false);
        showMessage({
          message: response.data.message?.messageTost,
          type: "warning",
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Login
        check={!check}
        Remember={Remember}
        loginData={loginData}
        setLoginData={setLoginData}
        toJoin={toJoin}
        toRegistration={toRegistration}
        forgotPassword={forgotPassword}
        inputError={inputError}
        visible={modalVisible}
        onClose={closeModal}
        otp={otp}
        setOtp={setOtp}
        otpInputRef={otpInputRef}
        twofacVerify={twofacVerify}
        handleResentOtp={handleResentOtp}
      />
    </>
  );
};
export default LoginView;
