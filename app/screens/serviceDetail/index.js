import React, { useEffect, useLayoutEffect, useState } from 'react';
import ServiceDetailView from './component/serviceDetailView';
import apiEndPoints from '../../utils/apiEndPoints';
import Loader from '../../components/loader'
import { apiCall } from '../../utils/httpClient';
import { useFocusEffect } from "@react-navigation/native";
const ServiceDetail = ({ route, navigation }) => {
    const { serviceDetaildata ,searchdata } = route?.params || {};
    const [showSearch, setShowSearch] = useState(true)
    const [serviceDetail, setServiceDetail] = useState([])
    const [isLoading, setIsLoadingh] = useState(false)
    const toggleShowSearch = () => {
        setShowSearch(!showSearch)
    }
   /*  const [searchdata, setSearchdata] = useState({
        "businessid": serviceDetaildata.businessid,
    }) */

    /* useLayoutEffect(() => {
        if (serviceDetaildata?.businessid) {
            getServicesDetails(serviceDetaildata?.businessid)
        }
      }, [navigation]); */

   useFocusEffect(
        React.useCallback(() => {
            getServicesDetails(serviceDetaildata?.businessid)
        }, [navigation,serviceDetaildata])
    ); 

    /* useEffect(() => {
        getServicesDetails()
    }, []); */

    const getServicesDetails = async (businessid) => {

        if (businessid > 0) {
            try {
                setIsLoadingh(true)
                const response = await apiCall(
                    "POST",
                    apiEndPoints.GETSERVICEDETAIL,
                    { "businessid": businessid }
                );

                if (response.status === 200) {
                    console.log("🚀 ~ getServicesDetails ~ response.data.data:", response.data.data)
                    setIsLoadingh(false)
                    setServiceDetail(response.data.data)
                   
                } else {
                    setIsLoadingh(false)
                    setServiceDetail([]);

                }
                    
            } catch (error) {
                console.log("🚀 ~ file: index.js:43 ~ getServicesDetails ~ error:", error)
                setIsLoadingh(false)
            }
        }
    }

   
    const backscreen = () => {
        navigation.navigate("findServiceScreen", searchdata);
    }
    const drawerOpen = () => {
        //navigation.navigate("drawerNavigation");
    }
    const showDetailContent = (screenName, type = '', data) => {
        console.log("🚀 ~ file: index.js:58 ~ showDetailContent ~ data:", data)
        navigation.navigate(screenName, { type: type, contentdata: data });
    }
    return (
        <>
            {isLoading && <Loader />}
            <ServiceDetailView
                drawerOpen={drawerOpen}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                toggleShowSearch={toggleShowSearch}
                serviceDetail={serviceDetail}
                setServiceDetail={setServiceDetail}
                showDetailContent={(screenName, type, data) => showDetailContent(screenName, type, data)}
                backscreen={backscreen}
            />
        </>
    )
}
export default ServiceDetail;