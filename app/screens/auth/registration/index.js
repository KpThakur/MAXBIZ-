import React, { useContext, useState } from "react";
import Registration from "./component/registration";
import ImagePicker from "react-native-image-crop-picker";

import MultiSelect from "react-native-multiple-select";
import StringsOfLanguages from "../../../utils/translations";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import { showMessage } from "react-native-flash-message";
import { LoadingContext } from "../../../utils/searchContext";
import Loader from "../../../components/loader";

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

  const [isLoading, setIsLoading] = useContext(LoadingContext);


  const onSelectedItemsChange = (servicesData) => {
    //this.setState({ selectedItems });
    servicesData.length <= 3 ? setServicesData(servicesData) : "null";
  };

 // console.log("certificate data:-", imageData);

  const uploaddocument = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.5,
    }).then((image) => {
      const originalPath = image?.path;
      const originalImageDirectory = originalPath.substring(
        0,
        originalPath.lastIndexOf("/")
      );
      setimageData(image);
      const fileName = "markedImage_" + new Date().getTime() + ".jpg";
      const destinationImagePath = originalImageDirectory + "/" + fileName;
    });
  };

  // const extractFileName = (path) => {
  //   if (!path) return "";
  //   const parts = path.split("/");
  //   return parts[parts.length - 1];
  // };

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
    occupation: "",
    about_us: "",
    /*areas: "",
    mainservice: "", */
    operation_hours: "",
    payment: "",
    phone_no: "",
    website_url: "",
    services: [],
    city: "",
    cityid: "",
    servicename: "",
    head_count: "",
    business_photo_url: "",
    certificate: "",
  });


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
    if (register.city == "") {
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
        } else {
          console.log("in else");
        }
      } catch (error) {
        console.error("Error in cityname:", error);
      }
    }
  };

  const submitForResig = async () => {
    // console.log("submit call>>>>>>>>>>>")
    const valid = validationFrom();
    if (valid) {
      try {
        setIsLoading(true);
        const parms = {
          businessusername: register?.businessusername,
          businessname: register?.businessname,
          address: register?.address,
          city: register?.city,
          servicename: register?.services,
          occupation: register?.occupation,
          certificate: imageData
        };
        const response = await apiCall(
          "POST",
          apiEndPoints.REGISTERBUSINESSDETAIL,
          parms
        );
        console.log('responce:-', response.data)
        if (response.status === 200) {
          setbusinessDetail(response.data.data);
          console.log('responce in 200 :-', response.data)
          setIsLoading(false);
          navigation.navigate("thankyouScreen");
        }
        if (response.status == 401) {
          console.log('responce in 400 :-', response.data)
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
    />
    </>
  );
};
export default RegistrationView;
