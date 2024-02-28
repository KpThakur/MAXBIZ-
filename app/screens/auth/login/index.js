import React, { useState } from 'react';
import Login from './component/login';
import { AuthContext } from "../../../utils/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall, setDefaultHeader } from '../../../utils/httpClient';
import Loader from '../../../components/loader';
import { showMessage, hideMessage } from "react-native-flash-message";
import StringsOfLanguages from '../../../utils/translations';
//const AuthContext = React.createContext();
const LoginView = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false)
    const [check, setCheck] = useState()
    const [inputError, setInputError] = useState({})
    const [loginData, setLoginData] = useState({
        "email": '',
        "password": '',
        "token": '123'
    })
    //const { signIn } = React.useContext(AuthContext);
    const Remember = () => {
        setCheck(!check)
    }

   /*  const curlang = StringsOfLanguages.getLanguage();
 */

    const validationFrom = () => {
        let formerror = true
        let error = {}

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(loginData?.email)) {
            formerror = false
            error['emailerror'] = StringsOfLanguages.CORRECT_EMAIL
        }
        if (loginData?.email == "") {
            formerror = false
            error['emailerror'] = StringsOfLanguages.PLEASE_ENTER_EMAIL
        }

        if (loginData?.password.length <= 5) {
            formerror = false
            error['passworderror'] = StringsOfLanguages.PASSWORD_SHOULD_BE_6_CHARACTERS
        }
        if (loginData?.password == "") {
            formerror = false
            error['passworderror'] = StringsOfLanguages.PLEASE_ENTER_YOUR_PASSWORD
        }

        setInputError(error)
        return formerror
    }
    const toJoin = async () => {

        const validation = validationFrom()
        if (validation) {
            try {
                setIsLoading(true)
                const response = await apiCall('POST', apiEndPoints.BUSINESSLOGIN, loginData);

                if (response.status === 200) {
                    await AsyncStorage.setItem('userToken', response.data.token);
                    await AsyncStorage.setItem('userData', JSON.stringify(response.data.data));
                    await setDefaultHeader('token', response.data.token);
                    signIn(response.data.data)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    
                   var msg = (response.data.message.email) ? 
                     response.data.message.email : 
                    (response.data.message.password) ?  
                    response.data.message.password :  
                    response.data.message.messageTost
                     showMessage({
                        message: msg,
                        type: "danger",
                    }); 
                }
            } catch (error) {
                setIsLoading(false)

            }


        }

    }
    const forgotPassword = () => {
        //navigation.navigate('forgotPasswordScreen')
    }
    const toRegistration = () => {
        //navigation.navigate('joinScreen')
        navigation.navigate('validateIdentityScreen')
    }
    return (<>
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
    )
}
export default LoginView;