import React, { useState } from 'react';
import ThankyouView from './component/thankyouView';

const Thankyou = ({navigation}) => {
    const [loginData, setLoginData] = useState({
        "mobileNo": '',
        "emailaddr": ''
    })
    const OnSubmit = () => {
    navigation.navigate('loginScreen')
    }
    return (

        <ThankyouView
            loginData={loginData}
            setLoginData={setLoginData}
            OnSubmit={OnSubmit}
        />
    )
}
export default Thankyou;