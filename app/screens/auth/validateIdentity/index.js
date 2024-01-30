import React, { useState } from 'react';
import ValidateIdentity from './component/validateIdentity';
import StringsOfLanguages from '../../../utils/translations';
const validtIdntyView = ({navigation}) => {
    const [inputError, setinputError] = useState({})
    const [loginData, setLoginData] = useState({
        "mobileNo": '',
        "emailaddr": '',
        "firstname": '',
        "lastname": ''
    })
    function validationFrom() {
        let mobileNoError = "";
        let emailaddrError = "";
        let firstnameError = "";
        let lastnameError = "";

        if (loginData.firstname == "") {
            firstnameError = StringsOfLanguages.PLEASE_ENTER_YOUR_FIRST_NAME
        }
        if (loginData.lastname == "") 
            lastnameError = StringsOfLanguages.PLEASE_ENTER_YOUR_LAST_NAME
        if (loginData.mobileNo.length <= 9) {
            mobileNoError = StringsOfLanguages.PLEASE_ENTER_MOBILE_NUMBER
        }
         let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (loginData.emailaddr == "") {
            emailaddrError =StringsOfLanguages.PLEASE_ENTER_EMAIL
        }
        if (reg.test(loginData.emailaddr) == "") {
            emailaddrError =StringsOfLanguages.PLEASE_ENTER_CORRECT_EMAIL
        }
        if(firstnameError || lastnameError || mobileNoError || emailaddrError){
            setinputError({
                ...inputError , mobileNoError , emailaddrError ,firstnameError , lastnameError
            });
            return false;
        }
        return true;
    }
    const toNextPage = () => {
        navigation.navigate('otpVerifyScreen')
        const valid = validationFrom();
        if (valid) {
               
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