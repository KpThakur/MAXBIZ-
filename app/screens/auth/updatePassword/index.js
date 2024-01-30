import React, { useState } from 'react';
import UpdatePasswordView from './component/updatePasswordView';
import StringsOfLanguages from '../../../utils/translations';

const UpdatePassword = ({ navigation }) => {
    const [inputError , setInputError] = useState({})
    const [passwordData, setPasswordData] = useState({
        "newPassword": '',
        "confirmpassword": ''
    })

    const validationFrom = () => {
        let formerror = true
        let error = {}

        if(passwordData?.newPassword.length < 6){
            formerror = false
            error['newPassworderror'] = StringsOfLanguages.PASSWORD_SHOULD_BE_6_CHARACTERS 
        } 
        if(passwordData?.newPassword === ''){
            formerror = false
            error['newPassworderror'] = StringsOfLanguages.PLEASE_ENTER_NEW_PASSWORD
        } 

        if(passwordData?.confirmpassword !== passwordData?.newPassword){
            formerror = false
            error['cPassworderror'] = StringsOfLanguages.PASSWORD_AND_CONFIRM_NOT_MATCH
        }
        
        if(passwordData?.confirmpassword === ''){
            formerror = false
            error['cPassworderror'] = StringsOfLanguages.PLEASE_ENTER_CONFIRM_PASSWORD
        }
        
        setInputError(error)
        return formerror
    }


   
    const updatePassword = () => {

        const validation = validationFrom()
        if(validation){
           navigation.navigate('loginScreen')
        }
        
    }
    return (
        <UpdatePasswordView
            passwordData={passwordData}
            setPasswordData={setPasswordData}
            updatePassword={updatePassword}
            inputError={inputError}
        />
    )
}
export default UpdatePassword;