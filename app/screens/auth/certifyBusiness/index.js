import React, { useState } from 'react';
import CertifyBusiness from './component/certifyBusiness';

const crtfyBusinessView = ({navigation}) => {
    const [loginData, setLoginData] = useState({
        "mobileNo": '',
        "emailaddr": ''
    })
    const OnSubmit = () => {
    navigation.navigate('thankyouScreen')
    }
    return (

        <CertifyBusiness
            loginData={loginData}
            setLoginData={setLoginData}
            OnSubmit={OnSubmit}
        />
    )
}
export default crtfyBusinessView;