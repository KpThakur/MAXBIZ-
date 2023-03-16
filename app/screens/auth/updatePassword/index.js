import React, { useState } from 'react';
import UpdatePasswordView from './component/updatePasswordView';

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
            error['newPassworderror'] = "Password should be 6 characters" 
        } 
        if(passwordData?.newPassword === ''){
            formerror = false
            error['newPassworderror'] = "Please enter new password" 
        } 

        if(passwordData?.confirmpassword !== passwordData?.newPassword){
            formerror = false
            error['cPassworderror'] = "Password and confirm not match!" 
        }
        
        if(passwordData?.confirmpassword === ''){
            formerror = false
            error['cPassworderror'] = "Please enter confirm password" 
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