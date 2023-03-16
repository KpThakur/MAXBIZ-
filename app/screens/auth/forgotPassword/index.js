import React, { useState } from 'react';
import ForgotPasswordView from './component/forgotPasswordView';

const ForgotPassword = ({ navigation }) => {
    const [inputError , setInputError] = useState({})
     const [loginData, setLoginData] = useState({
        "emailId": '',
    })

    const toLogin = () => {
        navigation.navigate('loginScreen')
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
        setInputError(error)
        return formerror
    }


    const sendOTP = () => {

        const validation = validationFrom()
        if(validation){
            navigation.navigate('forgotVerifiedScreen',{'email': loginData?.emailId})
        }

        
    }

    return (
        <ForgotPasswordView
            loginData={loginData}
            setLoginData={setLoginData}
            toLogin={toLogin}
            sendOTP={sendOTP}
            inputError={inputError}
        />
    )
}
export default ForgotPassword;