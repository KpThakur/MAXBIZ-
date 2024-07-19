import React, { Fragment, useEffect, useState } from 'react'
import  ProfileDetails  from './components/profileDetails'
import  CommingSoon  from './components/commingSoon'
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiEndPoints from '../../../utils/apiEndPoints';
import { apiCall } from '../../../utils/httpClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import Loader from '../../../components/loader';
const Index = ({ navigation }) => {

    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

   /*  const getuserData = async () => {
        const userToken  = await AsyncStorage.getItem('userToken');
        if (userToken !== null) {
            const userData = await AsyncStorage.getItem('userData')
          setUserData(JSON.parse(userData))
          getBusinessdetail()
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
            const response = await apiCall('POST', apiEndPoints.BUSINESSDETAIL, parms);
           
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
export default Index