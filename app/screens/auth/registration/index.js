import React, { useContext, useEffect, useState } from "react";
import Registration from "./component/registration";
import ImagePicker from "react-native-image-crop-picker";

import MultiSelect from "react-native-multiple-select";
import StringsOfLanguages from "../../../utils/translations";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import { showMessage } from "react-native-flash-message";
import { LoadingContext } from "../../../utils/searchContext";
import Loader from "../../../components/loader";
import axios from "axios";

const items = [
  {
    id: "92iijs7yta",
    name: "Ondo",
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun",
  },
  {
    id: "16hbajsabsd",
    name: "Calabar",
  },
  {
    id: "nahs75a5sg",
    name: "Lagos",
  },
  {
    id: "667atsas",
    name: "Maiduguri",
  },
  {
    id: "hsyasajs",
    name: "Anambra",
  },
  {
    id: "djsjudksjd",
    name: "Benue",
  },
  {
    id: "sdhyaysdj",
    name: "Kaduna",
  },
  {
    id: "suudydjsjd",
    name: "Abuja",
  },
];

const RegistrationView = ({ navigation }) => {
  const [inputError, setinputError] = useState({});
  const [imageData, setimageData] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [businessDetail, setbusinessDetail] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [isLoading, setIsLoading] = useContext(LoadingContext);

  const onSelectedItemsChange = (servicesData) => {
    //this.setState({ selectedItems });
    servicesData.length <= 3 ? setServicesData(servicesData) : "null";
  };

  

  const uploaddocument = () => {
  // const result =  
   ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 1,
    }).then((image) => {
      // console.log(image);
      setimageData(image);
      // const fileName = result.uri.split('/').pop();
      // const fileType = fileName.split('.').pop();
    
      // console.log(fileName, fileType);
    });
  };



  const extractFileName = (path) => {
    if (!path) return "";
    const uriParts = decodeURI(path).split("/");
    const fileName = uriParts.pop();
    return fileName;
  };

  const [register, setRegister] = useState({
    businessusername: "",
    businessname: "",
    address: "",
    industry: "",
    occupationid: "",
    occupation: "",
    about_us: "",
    /*areas: "",
    mainservice: "", */
    operation_hours: "",
    payment: "",
    phone_no: "",
    website_url: "",
    services: [],
    cityid: "",
    cityname: "",
    servicename: "",
    head_count: "",
    business_photo_url: "",
    certificate: "",
    serviceid: "",
    payment_method: "",
    phone: "",
    business_url: "",
    lastModifiedDate: "",
    facebookurl: "",
    // head_count: "",
    hours_operation: "",
    introduction: "",
    linkedInurl: "",
    numemps: "",
    pricehour: "",
    revenue: "",
    servicing_areas: "",
    servicing_offer: "",
    twitterurl: "",
    website: "",
    youtubeurl: "",
    service_offer: "",
    instagramurl: "",
    is_non_profit: 0,
  });

  const getIpAddress = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log('ipadd', res)
    return res.data.IPv4;
    
  };
 


  function validationFrom() {
    let errorbusinessusername = "";
    let errorbusinessname = "";
    let erroraddress = "";
    // let errorservices = "";
    let errorindustry = "";
    let errorcity = "";
    let erroroccuption = "";
    let errorbusiness_photo_url = "";

    if (register.businessusername == "") {
      errorbusinessusername = StringsOfLanguages.PLEASE_ENTER_BUSINESS_USERNAME;
    }
    if (register.businessname == "") {
      errorbusinessname = StringsOfLanguages.PLEASE_ENTER_BUSINESS_NAME;
    }
    if (register.address == "") {
      erroraddress = StringsOfLanguages.PLEASE_ENTER_ADDRESS;
    }
    if (register.cityname == "") {
      errorcity = StringsOfLanguages.PLEASE_SELECT_CITY;
    }
    if (register.servicename == "") {
      errorindustry = StringsOfLanguages.PLEASE_ENTER_INDUSTRY;
    }
    if (register.occupation == "") {
      erroroccuption = StringsOfLanguages.PLEASE_ENTER_OCCUPTION;
    }
    if (!imageData) {
      errorbusiness_photo_url = StringsOfLanguages.PLEASE_SELECT_CERTIFICATE;
    }

    // if (servicesData.length == 0) {
    //   errorservices = StringsOfLanguages.PLEASE_ENTER_SERVICES;
    // }
    /* if (register.industry == "") {
      errorindustry = "Please enter Industry";
    } */
    if (
      errorbusinessusername ||
      errorbusinessname ||
      erroraddress ||
      // errorservices ||
      errorindustry ||
      errorcity ||
      erroroccuption ||
      errorbusiness_photo_url
    ) {
      setinputError({
        ...inputError,
        errorbusinessusername,
        errorbusinessname,
        erroraddress,
        // errorservices,
        errorindustry,
        errorcity,
        erroroccuption,
        errorbusiness_photo_url,
      });
      return false;
    }
    return true;
  }



  const getServiceList = async (service) => {
    // console.log("search name", service);
    if (service.length >= 3) {
      try {
        const params = { servicename: service };
        const response = await apiCall(
          "POST",
          apiEndPoints.GETINDUSTRYLIST,
          params
        );
        // console.log("Response status:", response.data);
        if (response.status === 200) {
          if (
            response.data &&
            response.data.data &&
            Array.isArray(response.data.data)
          ) {
            setIndustryList(response.data.data);
          }
          setIndustryList(response.data.data);
          //  console.log("responce industry:-", response);
        } else {
          console.log("in else");
        }
      } catch (error) {
        console.error("Error in searchServicebyname:", error);
      }
    }
  };

  const getcitylist = async (val = "") => {
    // console.log("search city", val);
    if (val.length >= 3) {
      try {
        const parms = {
          cityname: val,
        };
        const response = await apiCall(
          "POST",
          apiEndPoints.GETCITIESLIST,
          parms
        );
        if (response.status === 200) {
          const formattedCityData = response.data.data.map((city) => ({
            ...city,
            formattedLabel: `${city.city || ""}, ${city.state_id || ""}`,
          }));
          // setAllCity(response.data.data)
         // console.log("responce City:-", response.data);
          setAllCity(formattedCityData);
          // console.log("city find:-", response.data)
        } else {
          console.log("in else");
        }
      } catch (error) {
        console.error("Error in cityname:", error);
      }
    }
  };

  const searchOccupation = async (item) => {
     console.log("search occuption", item);
    if (item.length >= 3) {
      try {
        const params = { servicename: item };
         console.log('param', params)
        const response = await apiCall(
          "POST",
          apiEndPoints.GETSERVICELIST,
          params
        );
         console.log("Response:", response.data);
        if (response.status === 200) {
          setServiceList(response.data.data);
           console.log("Response in 200:", response.data);
        } else {
          console.log("in else");
        }
      } catch (error) {
        console.error("Error fetching occupation list:", error);
      }
    }
  };

  // const submitForResig = async () => {
  //   // console.log("submit call>>>>>>>>>>>")
  //   const valid = validationFrom();
  //   if (valid) {
  //     try {
  //       setIsLoading(true);
  //       const params = {
  //         businessusername: register?.businessusername,
  //         businessname: register?.businessname,
  //         address: register?.address,
  //        // cityid: register?.city,
  //         servicename: register?.services,
  //         occupation: register?.occupation,
  //        // certificate: imageData
  //       };
  //       const response = await apiCall(
  //         "POST",
  //         apiEndPoints.REGISTERBUSINESSDETAIL,
  //         params
  //       );
  //       console.log('responce:->>>>>', response)
  //       if (response.status === 200) {
  //         setbusinessDetail(response.data.data);
  //         console.log('responce in 200 :-', response.data)
  //         setIsLoading(false);
  //         navigation.navigate("thankyouScreen");
  //       }
  //       if (response.status == 401) {
  //         console.log('responce in 400 :-', response.data)
  //         showMessage({
  //           message: response.message,
  //           type: "warning",
  //           duration: 3000,
  //         });
  //       } else {
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //   }
  // };

 // console.log("ocupation find:---------", imageData);

  const submitForResig = async () => {
    const valid = validationFrom();
    if (valid) {
      try {
        setIsLoading(true);

         const formData = new FormData();
        formData.append("profileid", null);
        formData.append("businessusername", register?.businessusername);
        formData.append("fullname", register?.businessname);
        formData.append("address", register?.address);
        formData.append("naicsid", register?.occupation);
        formData.append("cityid", register?.cityname);
       // formData.append("occupation", register?.occupation);
        formData.append("certificate", imageData);
        formData.append("ipaddress", await getIpAddress());
        formData.append("is_nonprofit", register?.is_non_profit );
        formData.append("photofile", register?.business_url );
        formData.append("instagramurl", register?.instagramurl );
        formData.append("youtubeurl", register?.youtubeurl );
        formData.append("twitterurl", register?.twitterurl );
        formData.append("linkedInurl", register?.linkedInurl );
        formData.append("facebookurl", register?.facebookurl );
        formData.append("business_validation", 1 );
        formData.append("year_revenue", "" );
        formData.append("industry", register?.servicename );
        formData.append("service_area", register?.servicing_areas );
        formData.append("service_offer", register?.service_offer );
        formData.append("showemail", 1 );
        formData.append("showtext", 1 );
        formData.append("showcall", 1 );
        formData.append("websiteurl", register?.website );
        formData.append("email", register?.phone );
        formData.append("phone", register?.phone );
        formData.append("payments", register?.payment_method );
        formData.append("hours", register?.hours_operation );
        formData.append("pricehour", 0);
        formData.append("about", register?.introduction );
        formData.append("annualgrossrevenue", 2000 );
        formData.append("numemps", register?.numemps );
        formData.append("county", 0 );
        formData.append("state", 0 );




         console.log("formData", formData);

        const response = await apiCall(
          "POST",
          apiEndPoints.REGISTERBUSINESSDETAIL,
          formData
        );

        console.log("response:", response.data);

        if (response.status === 200) {
          setbusinessDetail(response.data.data);
          setIsLoading(false);
          navigation.navigate("thankyouScreen");
        } else if (response.status === 401) {
          showMessage({
            message: response.message,
            type: "warning",
            duration: 3000,
          });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error:", error);
      }
    }
  };

  const backscreen = () => {
    navigation.navigate("validateIdentityScreen");
  };

  /*   const uploaddocument = () => {
    
  }; */
  return (
    <>
      {isLoading && <Loader />}
      <Registration
        register={register}
        setRegister={setRegister}
        submitForResig={submitForResig}
        uploaddocument={uploaddocument}
        inputError={inputError}
        servicesData={servicesData}
        setServicesData={setServicesData}
        onSelectedItemsChange={onSelectedItemsChange}
        items={items}
        backscreen={backscreen}
        allCity={allCity}
        getcitylist={getcitylist}
        industryList={industryList}
        getServiceList={getServiceList}
        imageData={imageData}
        extractFileName={extractFileName}
        searchOccupation={searchOccupation}
        serviceList={serviceList}
        setSelectedItems={setSelectedItems}
        selectedItems={selectedItems}
       
      />
    </>
  );
};
export default RegistrationView;
