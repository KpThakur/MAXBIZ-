import React, { useState } from 'react';
import ForgotVerifiedView from './component/forgotVerifiedView';
import StringsOfLanguages from '../../../utils/translations';

const ForgotVerified = ({ navigation,route }) => {

    const { email } = route.params;
    const [inputError , setInputError] = useState({})
     const [otp, setOtp] = useState('')
     

    const resendOTP = () => {
        //navigation.navigate('loginScreen')
    }
    const validationFrom = () => {
        let formerror = true
        let error = {}

        if(otp.length < 4){
            formerror = false
            error['otperror'] = StringsOfLanguages.OTP_SHOULD_BE4_CHARACTERS
        } 
        
       if(otp == ""){
            formerror = false
            error['otperror'] = StringsOfLanguages.PLEASE_ENTER_OTP
        }
        
        setInputError(error)
        return formerror
    }

    const verifiedOTP = () => {
        
        const validation = validationFrom()
        if(validation){
          navigation.navigate('updatePasswordScreen')
        }
    }

    return (
        <ForgotVerifiedView
            resendOTP={resendOTP}
            verifiedOTP={verifiedOTP}
            setOtp={setOtp}
            otp={otp}
            inputError={inputError}
            email={email}
        />
    )
}
export default ForgotVerified;