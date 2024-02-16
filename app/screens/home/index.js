import React, { useEffect, useState } from "react";
import Homeview from "./component/Homeview";
import apiEndPoints from "../../utils/apiEndPoints";
import StringsOfLanguages from "../../utils/translations";
import { apiCall } from "../../utils/httpClient";
import Loader from "../../components/loader";
import { showMessage, hideMessage } from "react-native-flash-message";
const Home = ({ navigation }) => {
  const [currLang, setCurrLang] = useState("EN");
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allCity, setAllCity] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [searchdata, setSearchdata] = useState({
    serviceid: "",
    servicename: "",
    cityid: "",
    cityname: "",
  });

  const searchServicebyname = async (val) => {
    if (val.length >= 3) {
      try {
        setIsLoading(true);
        const parms = {
          servicename: val,
        };
        const response = await apiCall(
          "POST",
          apiEndPoints.GETSERVICENAME,
          parms
        );
        if (response.status === 200) {
          setAllServices(response.data.data);
          setIsLoading(false);
        }else {
            setIsLoading(false);
        }
    
      } catch (error) {
        setIsLoading(false);
        setShowSearch(false);
        console.error("Error in searchServicebyname:", error);
      }
    }
  };

  const getcitylist = async (val = "") => {
    if (val.length >= 3) {
      try {
        setIsLoading(true);
        const parms = {
          cityname: val,
        };
        const response = await apiCall("POST", apiEndPoints.GETCITY, parms);
        if (response.status === 200) {
          const formattedCityData = response.data.data.map((city) => ({
            ...city,
            formattedLabel: `${city.city || ""}, ${city.state_id || ""}`,
          }));
          // setAllCity(response.data.data)
          setAllCity(formattedCityData);
          setIsLoading(false);
          // console.log('response_City===========<<<<>>>>>>', formattedCityData)
        }else {
            setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setShowSearch(false);
      }
    }
  };

  const toggleLanguage = (val) => {
    setCurrLang(val);
    StringsOfLanguages.setLanguage(val);
  };
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  

  const searchService = () => {
    setShowSearch(!showSearch);
    if (searchdata.serviceid != "" && searchdata.cityid != "") {
      navigation.navigate(
        "findServiceScreen",
         searchdata
      );
      console.log("enter in home>>>>>>>", searchdata);
    } else {
      showMessage({
        message: StringsOfLanguages.PLEASE_SELECT_SERVICE_CITY,
        //description: "Pls Select Service and City",
        type: "warning",
      });
    }
  };
  const loginScreen = () => {
    navigation.navigate("loginScreen");
  };
  const drawerOpen = () => {
    navigation.navigate("drawerNavigation");
  };
  return (
    <>
      {isLoading && <Loader isHomeDesign={true} />}

      <Homeview
        currLang={currLang}
        showSearch={showSearch}
        allCity={allCity}
        allServices={allServices}
        searchService={searchService}
        toggleLanguage={toggleLanguage}
        toggleShowSearch={toggleShowSearch}
        searchServicebyname={searchServicebyname}
        getcitylist={getcitylist}
        loginScreen={loginScreen}
        drawerOpen={drawerOpen}
        searchdata={searchdata}
        setSearchdata={setSearchdata}
      />
    </>
  );
};
export default Home;
