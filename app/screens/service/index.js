import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import FindService from './component/findService';
import { apiCall } from '../../utils/httpClient';
import apiEndPoints from '../../utils/apiEndPoints';
import Loader from '../../components/loader'
/* const DATA = [
    {
      img: require("../../assets/dummy/no_image.png"),
      business_name: "Peter Wilson",
      hours: "Mon to Fri 10 Am to 9 PM",
      ranting: 3,
      dollar: 20,
      address: "Palm Beach Country FL",
      best: "Accountent | Accountent | Accountent | Accountent",
    },
    {
      img: require("../../assets/dummy/no_image.png"),
      name: "Garry hilrt",
      hours: "Mon to Fri 10 Am to 9 PM",
      rating: 3,
      dollar: 20,
      addrs: "Palm Beach Country FL",
      best: "Accountent | Accountent | Accountent | Accountent",
    },
    {
      img: require("../../assets/dummy/no_image.png"),
      name: "Garry hlbert",
      hours: "Mon to Fri 10 Am to 9 PM",
      rating: 3,
      dollar: 20,
      addrs: "Palm Beach Country FL",
      best: "Accountent | Accountent | Accountent | Accountent",
    },
    {
      img: require("../../assets/dummy/no_image.png"),
      name: "Garry hilbet",
      hours: "Mon to Fri 10 Am to 9 PM",
      rating: 3,
      dollar: 20,
      addrs: "Palm Beach Country FL",
      best: "Accountent | Accountent | Accountent | Accountent",
    },
  ]; */

const FindServiceView = ({ route, navigation }) => {

  const { serviceid, cityid, servicename, cityname } = route?.params
  console.log("🚀 ~ file: index.js:49 ~ FindServiceView ~ servicename:", servicename)
  const [showSearch, setShowSearch] = useState(false)
  const [isLoading, setIsLoadingh] = useState(false)
  const [allCity, setAllCity] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [allServices, setAllServices] = useState([])
  const [searchdata, setSearchdata] = useState({
    "serviceid": serviceid,
    "servicename": servicename,
    "cityid": cityid,
    "cityname": cityname
  })

  const [filteredData, setFilteredData] = useState([]);

  // useEffect(() => {
  //   setFilteredData(serviceList);
  // }, [serviceList]);
 

  const handlefilter = (text) => {
    
    const filteredResults = serviceList.filter(item =>
      item?.cityid?.toLowerCase()?.includes(text.toLowerCase())
      );
      console.log('cityyyyyyyyyyyyyyyyy',cityid )
      setFilteredData(filteredResults)
  }

 


  useEffect(() => {
    setSearchdata({
      ...searchdata,
      serviceid: serviceid,
      cityid: cityid,
      servicename: servicename,
      cityname: cityname,
    })
    getAllservices(serviceid, cityid)
  }, [serviceid, cityid]);

 

  useEffect(() => {
    getcitylist(cityname)
    searchServicebyname(servicename)

  }, [servicename, cityname]);

  /*  useFocusEffect(
       React.useCallback(() => {
         console.log("🚀 ~ file: index.js:66 ~ React.useCallback ~ serviceid:", serviceid)
         console.log("🚀 ~ file: index.js:67 ~ React.useCallback ~ cityid:", cityid)
           getAllservices(serviceid ,cityid)
       }, [navigation,getAllservices])
   ); */

  /*  useLayoutEffect(() => {
       if (serviceid > 0 && cityid > 0) {
           getAllservices()
       }
     }, [navigation]);
*/



  const getAllservices = async (serviceid, cityid) => {
    console.log('serviceid, cityid', serviceid, cityid)
    if (serviceid !== "" && cityid !== "") {
      const parms = {
        "serviceid": serviceid,
        "cityid": cityid,
        "limit": "30",
        "offset": "0",
      }
      try {

        console.log('====',parms)
        setIsLoadingh(true)
        const response = await apiCall("POST",apiEndPoints.GETALLSERVICES,parms);
        //console.log("🚀 ~ file: index.js:69 ~ getAllservices ~ response:", response.status)

        console.log("🚀 ~ getAllservices ~ response.data.data.services:", response)
        if (response.status === 200) {
          setIsLoadingh(false)
          setShowSearch(false)
          setServiceList(response.data.data.services)
        } else {
          setIsLoadingh(false)
          setShowSearch(false)
          setServiceList([]);

        }
      } catch (error) {
        console.log('errorerror',error)
        setIsLoadingh(false)
        setShowSearch(false)
      }
    }else{
      console.log('go to else')
    }
  }
  
  

  const searchServicebyname = async (val) => {
    if (val.length >= 3) {

      try {
        const parms = {
          servicename: val
        }
        const response = await apiCall('POST', apiEndPoints.GETSERVICENAME, parms);
        if (response.status === 200) {
          setAllServices(response.data.data)
        }
      } catch (error) {
        setIsLoadingh(false)
        setShowSearch(false)
      }
    }
  }
  const getcitylist = async (val = '') => {
    if (val.length >= 3) {
      try {
        const parms = {
          cityname: val
        }
        const response = await apiCall('POST', apiEndPoints.GETCITY, parms);
        if (response.status === 200) {
          const formattedCityData = response.data.data.map(city => ({
            ...city,
            formattedLabel: `${city.city || ''}, ${city.state_id || ''}`
        }));
         // setAllCity(response.data.data)
          setAllCity(formattedCityData);
        }

      } catch (error) {
        setIsLoadingh(false)
        setShowSearch(false)
      }
    }

  }


  const toggleShowSearch = () => {
    setShowSearch(!showSearch)
  }
  const drawerOpen = () => {
    navigation.navigate("drawerNavigation");
  }

  return (
    <>
      {isLoading && <Loader />}
      <FindService
        getAllservices={getAllservices}
        drawerOpen={drawerOpen}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        toggleShowSearch={toggleShowSearch}
        navigation={navigation}
        searchdata={searchdata}
        setSearchdata={setSearchdata}
        serviceList={serviceList}
        searchServicebyname={searchServicebyname}
        allServices={allServices}
        getcitylist={getcitylist}
        allCity={allCity}
        filteredData={filteredData}
        handlefilter={handlefilter}
        setServiceList={setServiceList}
      />
    </>
  )
}
export default FindServiceView;