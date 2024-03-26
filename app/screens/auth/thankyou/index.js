import React, { useState } from 'react';
import ThankyouView from './component/thankyouView';

const Thankyou = ({route, navigation }) => {
    const { businessDetail } = route?.params || {};
    const [loginData, setLoginData] = useState({
        "mobileNo": '',
        "emailaddr": ''
    })
    const OnSubmit = () => {
    navigation.navigate('loginScreen', businessDetail)
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