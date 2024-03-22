import React, { useState } from "react";
import Login from "./component/login";
import { AuthContext } from "../../../utils/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiEndPoints from "../../../utils/apiEndPoints";
import { apiCall, setDefaultHeader } from "../../../utils/httpClient";
import Loader from "../../../components/loader";
import { showMessage, hideMessage } from "react-native-flash-message";
import StringsOfLanguages from "../../../utils/translations";
//const AuthContext = React.createContext();
const LoginView = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState();
  const [inputError, setInputError] = useState({});
  const [profileid, setProfileid] = useState();
  const [BusinessRegisterDetail, setBusinessRegisterDetail] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    token: "123",
  });
  //const { signIn } = React.useContext(AuthContext);
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
  
  const toJoin = async () => {
    const validation = validationFrom();
    if (validation) {
      try {
        setIsLoading(true);
        const response = await apiCall(
          "POST",
          apiEndPoints.BUSINESSLOGIN,
          loginData
        );
        // console.log("responce:---|||", response);
        if (response.status === 200) {
          if (response.data.businessValidated === 1) {
            // if(response.data.subscriptionplan === 1 ){

            if (response.data.two_factor_auth === 1) {
              setProfileid(response.data?.profileid);
              console.log(
                "find two_factor_auth >>>",
                response.data.two_factor_auth
              );
            } else {
              await AsyncStorage.setItem("userToken", response.data.token);
              await AsyncStorage.setItem(
                "userData",
                JSON.stringify(response.data.data)
              );
              await setDefaultHeader("token", response.data.token);
              signIn(response.data.data);
              setIsLoading(false);
            }
            // }else{
            // //  AsyncStorage.setItem("profileid", response.data.profileid)
            //   setBusinessRegisterDetail(response.data.data)
            // }
            console.log(
              "find businessValidated >>>",
              response.data.businessValidated
            );
          } else {
            navigation.navigate("profileDetailsScreen");
            // AsyncStorage.setItem("profileid", response.data.profileid);
            await AsyncStorage.setItem("userToken", response.data.token);
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(response.data.data)
            );
            await setDefaultHeader("token", response.data.token);
            setBusinessRegisterDetail(response.data.data);
            showMessage({
              message: response.data.message?.messageTost,
              type: "warning",
              duration: 3000,
            });
          }
          console.log("responce in 200:---", response.data);
        } else {
          setIsLoading(false);
          var msg = response.data.message.email
            ? response.data.message.email
            : response.data.message.password
            ? response.data.message.password
            : response.data.message.messageTost;
          showMessage({
            message: msg,
            type: "danger",
          });
          console.log("responce in 200:---", response.data);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const toJoinNew = async () => {
    const validation = validationFrom();
    if (validation) {
      try {
        setIsLoading(true);
        const response = await apiCall(
          "POST",
          apiEndPoints.BUSINESSLOGIN,
          loginData
        );
        if (response.status === 200) {
          if (response.data.businessValidated === 1) {
            setProfileid(response.data?.profileid);
            await AsyncStorage.setItem("userToken", response.data.token);
            await AsyncStorage.setItem(
              "userData",
              JSON.stringify(response.data.data)
            );
            await setDefaultHeader("token", response.data.token);
            signIn(response.data.data);
            navigation.navigate("profileDetailsScreen");
            console.log("responce in businessValidated:---", response.data);
          } else if (response.data.two_factor_auth === 1) {
            setProfileid(data.data?.profileid);
            // openTwoStepauth()
          } else if (response.data.subscriptionplan === 1) {
          } else {
            setIsLoading(false);
            // navigation.navigate("profileDetailsScreen");
            // signIn(response.data.data)
            // setProfileid(response.data?.profileid)
            // await AsyncStorage.setItem('userToken', response.data.token);
            // await AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
            // await setDefaultHeader('token', response.data.token);
            // console.log("responce in else businessValidated:---", response.data);
          }
        } else {
          setIsLoading(false);
          var msg = response.data.message.email
            ? response.data.message.email
            : response.data.message.password
            ? response.data.message.password
            : response.data.message.messageTost;
          showMessage({
            message: msg,
            type: "danger",
          });
          console.log("responce in 200 else:---", response.data);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      console.log("validation failed");
    }
  };

  async function handleAuth(params) {
    if (!formValidation()) {
      setIsLoading(true);

      var { data } = await apiCall("POST", ApiEndPoint.USERLOGIN, loginData);
      if (data.status == 200) {
        setFormError(data.message);
        setIsLoading(false);
        if (data.data.businessValidated === 1) {
          if (data.data.subscriptionplan === 1) {
            if (data.data.two_factor_auth === 1) {
              setProfileid(data.data?.profileid);
              submitforgotform();
            } else {
              dispatch(setUserAuthData(data.data));
              dispatch(
                handleLoginStatus({
                  username: data.data.first_name,
                  userType: "business",
                  token: data.token,
                })
              );
              // successToast(data.message)
              await localStorage.setItem("authToken", data.token);
              signIn(0, data.token, "business");
              await setDefaultHeader("token", data.token);
              await localStorage.setItem(
                "allinformation",
                data.data.allinformation
              );
              await localStorage.setItem("plan_type", data.data.plan_type);
              history.push("/");
            }
          } else {
            /* dispatch(setUserAuthData(data.data));
                  dispatch(handleLoginStatus({username: data.data.first_name, userType: 'business', token: data.token}));
                  // successToast(data.message)
                  await localStorage.setItem('authToken', data.token)
                  signIn(0, data.token, 'business')
                  await setDefaultHeader('token', data.token)
                  await localStorage.setItem('allinformation', data.data.allinformation)
                  await localStorage.setItem('plan_type', data.data.plan_type) */

            localStorage.setItem("profile_id", data.data?.profileid);
            dispatch(setBusinessRegisterDetail(data.data));
            history.push("/subscriptionplan");
          }
        } else {
          dispatch(setBusinessRegisterDetail(data.data));
          errorToast(data.message?.messageTost);
          history.push("/join_us");
        }
      } else {
        setFormError(data.message);
        setIsLoading(false);
        errorToast(data.message?.messageTost);
      }
    }
  }
  const forgotPassword = () => {
    //navigation.navigate('forgotPasswordScreen')
  };
  const toRegistration = () => {
    //navigation.navigate('joinScreen')
    navigation.navigate("validateIdentityScreen");
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
      />
    </>
  );
};
export default LoginView;
