import React, { useState } from 'react';
import Login from './component/login';
import { AuthContext } from "../../../utils/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
//const AuthContext = React.createContext();
const LoginView = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
    const [check, setCheck] = useState()
    const [inputError , setInputError] = useState({})
    const [loginData, setLoginData] = useState({
        "emailId": '',
        "password": '',
        "token": '123'
    })
    //const { signIn } = React.useContext(AuthContext);
    const Remember = () => {
        setCheck(!check)
    }

    const validationFrom = () => {
        let formerror = true
        let error = {}
        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(loginData?.emailId)) {
            formerror = false
            error['emailerror'] = "Please enter correct email address" 
        }
        if(loginData?.emailId == ""){
            formerror = false
            error['emailerror'] = "Please enter email address" 
        }
       
        if(loginData?.password.length <= 5){
            formerror = false
            error['passworderror'] = "Password should be 6 characters" 
        }
        if(loginData?.password == ""){
            formerror = false
            error['passworderror'] = "Please enter your password" 
        }

        
        setInputError(error)
        return formerror
    }
    const toJoin =  async() => {

        const validation = validationFrom()
        if(validation){
            alert('Success!')

            /* await AsyncStorage.setItem('userToken',loginData.emailId);
         signIn(loginData) */
        }
        

        //signIn(loginData)
        //navigation.navigate('forgotPasswordScreen')
    }
    const forgotPassword = () => {
        navigation.navigate('forgotPasswordScreen')
    }
    const toRegistration = () => {
        //navigation.navigate('joinScreen')
        navigation.navigate('validateIdentityScreen')
    }
    return (
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
    )
}
export default LoginView;