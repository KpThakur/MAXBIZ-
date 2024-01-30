import React, { Fragment, useEffect, useState } from 'react'
import  ProfileDetails  from './components/profileDetails'
import  CommingSoon  from './components/commingSoon'
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import Loader from '../../../components/loader';
const index = ({ navigation }) => {

    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

   /*  const getuserData = async () => {
        const userToken  = await AsyncStorage.getItem('userToken');
        console.log("🚀 ~ file: index.js:9 ~ getuserData ~ userToken:", userToken)
        if (userToken !== null) {
            const userData = await AsyncStorage.getItem('userData')
            console.log("🚀 ~ getuserData ~ userData:", userData)
          setUserData(JSON.parse(userData))
          getBusinessdetail()
          console.log("🚀 ~ file: index.js:12 ~ getuserData ~ JSON.parse(userData):", JSON.parse(userData))
        }
      }
   

     useFocusEffect(
        React.useCallback(() => {
            getuserData()
            
        }, [navigation])
    ); 

    const getBusinessdetail = async () => {
        try {  
            setIsLoading(true)
            const parms = {
                profileid : userData.profileid,
                businessid : userData.businessid
            }
            console.log("🚀 ~ file: index.js:40 ~ getBusinessdetail ~ parms:", parms)
            const response = await apiCall('POST', apiEndPoints.BUSINESSDETAIL, parms);
            console.log("🚀 ~ file: index.js:44 ~ getBusinessdetail ~ response:", response)
           
            if (response.status === 200) {
               
                setIsLoading(false)
            } else{
                setIsLoading(false)
                
                const msg =  (response.data.message)? response.data.message : "Somting Went Wrong!!"
                showMessage({
                    message: msg,
                    type: "danger",
                  });
            } 
        } catch (error) {
            console.log("🚀 ~ file: index.js:71 ~ toJoin ~ error:", error)
            setIsLoading(false)
            
        } 
    } */

    return (
       <Fragment>
        {isLoading && <Loader />}
           {/* <ProfileDetails/> */}
           <CommingSoon/>
       </Fragment>
    )
}
export default index