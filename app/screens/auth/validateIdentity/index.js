import React, { useState } from 'react';
import ValidateIdentity from './component/validateIdentity';
const validtIdntyView = ({navigation}) => {
    const [inputError, setinputError] = useState({})
    const [loginData, setLoginData] = useState({
        "mobileNo": '',
        "emailaddr": ''
    })
    function validationFrom() {
        let mobileNoError = "";
        let emailaddrError = "";

        if (loginData.mobileNo.length <= 9) {
            mobileNoError = 'Please enter mobile number'
        }
         let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (loginData.emailaddr == "") {
            emailaddrError ="Please enter Email"
        }
        if (reg.test(loginData.emailaddr) == "") {
            emailaddrError ="Please enter Correct Email"
        }
        if(mobileNoError|| emailaddrError){
            setinputError({
                ...inputError , mobileNoError ,emailaddrError
            });
            return false;
        }
        return true;
    }
    const toNextPage = () => {
        const valid = validationFrom();
        if (valid) {
                navigation.navigate('otpVerifyScreen')
            }
    }
    return (
        <ValidateIdentity
            loginData={loginData}
            setLoginData={setLoginData}
            toNextPage={toNextPage}
            inputError={inputError}
        />
    )
}
export default validtIdntyView;