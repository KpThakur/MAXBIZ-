import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { Platform } from "react-native";
import DocumentPicker, { types } from "react-native-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

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

const RegistrationView = ({ route, navigation }) => {
  const { profileid } = route?.params || {};

//  console.log("check profile id:-----", profileid);

  const [inputError, setinputError] = useState({});
  const [imageData, setImageData] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [businessDetail, setbusinessDetail] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [pdfFileName, setPdfFileName] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [uripath, setUrilastpath] = useState("");
  const [selectedOption, setSelectedOption] = useState([]);

  const [isLoading, setIsLoading] = useContext(LoadingContext);

 
  // console.log("find businessDetail:-----", imageData);

 // console.log("servicelist:>>>>>>>>>>-", serviceList);
 // console.log("The selected option ===>>", selectedOption);

  const onSelectedItemsChange = (servicesData) => {
    //this.setState({ selectedItems });
    servicesData.length <= 3 ? setServicesData(servicesData) : "null";
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
    services: "",
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

  useFocusEffect(
    useCallback(() => {
      setRegister({
        ...register,
        businessusername:"",
        businessname: "",
        address:"",
        cityid:"",
        serviceid:"",
        servicename:"",
      });
     
    }, [])
  );

  // useEffect(()=> {
  //   setImageData({
  //     ...imageData,
  //      imageData: ""
  //   })
  // },[])

  // const uploaddocument = () => {
  // // const result =
  //  ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //     compressImageQuality: 1,
  //    // mediaType:'any',
  //    // multiple: true
  //   }).then((image) => {
  //     // console.log(image);
  //     setImageData(image);
  //     // const fileName = result.uri.split('/').pop();
  //     // const fileType = fileName.split('.').pop();

  //   });
  // };

  // const uploaddocument = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 400,
  //     cropping: false,
  //     compressImageQuality: 1,
  //     multiple: false, // Set to false if you only want to select one file at a time
  //     mediaType: 'any',
  //   }).then((image) => {
  //     if (Platform.OS === 'android' && image.mime === 'application/pdf') {
  //       setImageData(image);
  //     } else if (Platform.OS === 'ios' && image.path.toLowerCase().endsWith('.pdf')) {
  //       setImageData(image);
  //     } else {
  //       alert('Please select a PDF file.');
  //     }
  //   });
  // };

  const uploaddocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        // type: [DocumentPicker.types.pdf],
        type: [types.pdf, types.docx],
        // presentationStyle:'fullScreen'
      });
      // console.log("pdf", res)
      console.log(
        "URI: " + res[0].uri,
        "Type: " + res[0].type,
        "Name: " + res[0].name,
        "Size: " + res[0].size
      );
      setPdfFileName(res[0].name);
      setImageData(res[0]);
      // setRegister({ ...register?.certificate, certificate: res[0] });
      const uriSegments = res[0].uri.split("/");
      const lastSegment = uriSegments[uriSegments.length - 1];
      setUrilastpath(lastSegment);
      console.log("lastSegment>>>>", lastSegment);

      // const modifiedTimestamp = res[0].lastModified || "";
      // const modifiedDate = modifiedTimestamp ? new Date(parseInt(modifiedTimestamp, 10)) : "";
      // console.log("lastModified:", modifiedTimestamp);
      // console.log("lastModifiedDate:", modifiedDate);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        // Error occurred
        console.log("Error occurred:", err);
      }
    }
  };

  // console.log("lastSegment>>>>in object>>>", uripath);

  const extractFileName = (path) => {
    if (!path) return "";
    const uriParts = decodeURI(path).split("/");
    const fileName = uriParts.pop();
    console.log("find name", fileName);

    return fileName;
  };

  const getIpAddress = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    // console.log("find ipaddress:---", res);
    return res.data.IPv4;
  };

  // useEffect(() => {
  //  // getIpAddress();
  // },[])

  function validationFrom() {
    let errorbusinessusername = "";
    let errorbusinessname = "";
    let erroraddress = "";
    // let errorservices = "";
    let errorindustry = "";
    let errorcity = "";
    let erroroccuption = "";
    let errorbusiness_photo_url = "";

    if (
      register.businessusername == "" ||
      register.businessusername === undefined
    ) {
      errorbusinessusername = StringsOfLanguages.PLEASE_ENTER_BUSINESS_USERNAME;
    }
    if (register.businessname == "" || register.businessname === undefined) {
      errorbusinessname = StringsOfLanguages.PLEASE_ENTER_BUSINESS_NAME;
    }
    if (register.address == "" || register.address === undefined) {
      erroraddress = StringsOfLanguages.PLEASE_ENTER_ADDRESS;
    }
    if (register.cityname == "" || register.cityname === undefined) {
      errorcity = StringsOfLanguages.PLEASE_SELECT_CITY;
    }
    if (register.servicename == "" || register.servicename === undefined) {
      errorindustry = StringsOfLanguages.PLEASE_ENTER_INDUSTRY;
    }

    if (register.services == "" || register.services === undefined) {
      erroroccuption = StringsOfLanguages.PLEASE_ENTER_OCCUPTION;
    }
    if (!imageData) {
      errorbusiness_photo_url = StringsOfLanguages.PLEASE_SELECT_CERTIFICATE;
    }
    // console.log("check certi valid", register?.certificate)
    // if (register?.certificate === "" || register.certificate === undefined ) {
    //   errorbusiness_photo_url = StringsOfLanguages.PLEASE_SELECT_CERTIFICATE;
    // }

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
        console.log("param", params);
        const response = await apiCall(
          "POST",
          apiEndPoints.GETSERVICELIST,
          params
        );
        console.log("Response:", response.data);
        if (response.status === 200) {
          setServiceList(response.data.data);
          console.log("Response in 200:", response.data.data);
        } else {
          console.log("in else");
        }
      } catch (error) {
        console.error("Error fetching occupation list:", error);
      }
    }
  };

  //  console.log("find data<<<<<<||>>>>>>>>>>>:-", uripath);

  const submitForResig = async () => {
    const valid = validationFrom();
    
    const result = [];
    selectedOption.map((item, index) => {
      serviceList.map((ite) => {
        if (ite.title === item) {
          result.push(ite.naicsid);
        }
      });
    });
    const stringData = result.join(",");
   // console.log("The reuslt ===>>",typeof stringData,stringData);

    // const selectedValue = serviceList.filter((item,index)=> item.title===selectedOption[0])
    // const value = selectedValue[0].naicsid;
    // console.log("The selectedValue ===>>",value);

    console.log("check valid", valid);
    if (valid) {
      try {
        setIsLoading(true);
        // console.log("find image data<<<<<<||>>>>>>>>>>>:-", imageData);

        const formData = new FormData();
        formData.append("profileid", profileid);
        formData.append("businessusername", register?.businessusername);
        formData.append("fullname", register?.businessname);
        formData.append("address", register?.address);
        formData.append("naicsid", stringData);
        // formData.append("naicsid", "");
        formData.append("cityid", register?.cityid);
        formData.append("certificate", imageData);
        // formData.append("certificate", {
        //   lastModified: "",
        //   lastModifiedDate: "",
        //   name: imageData?.name,
        //   size: imageData?.size,
        //   type: imageData?.type,
        //   webkitRelativePath: uripath,
        //  // uri: uripath,
        // });
        formData.append("ipaddress", await getIpAddress());
        formData.append("is_nonprofit", register?.is_non_profit);
        formData.append("photofile", register?.business_url);
        formData.append("instagramurl", register?.instagramurl);
        formData.append("youtubeurl", register?.youtubeurl);
        formData.append("twitterurl", register?.twitterurl);
        formData.append("linkedInurl", register?.linkedInurl);
        formData.append("facebookurl", register?.facebookurl);
        formData.append("business_validation", 1);
        formData.append("year_revenue", "");
        formData.append("industry", register?.serviceid);
        formData.append("service_area", register?.servicing_areas);
        formData.append("service_offer", register?.service_offer);
        formData.append("showemail", 1);
        formData.append("showtext", 1);
        formData.append("showcall", 1);
        formData.append("websiteurl", register?.website);
        formData.append("email", register?.phone);
        formData.append("phone", register?.phone);
        formData.append("payments", register?.payment_method);
        formData.append("hours", register?.hours_operation);
        formData.append("pricehour", 0);
        formData.append("about", register?.introduction);
        formData.append("annualgrossrevenue", 2000);
        formData.append("numemps", register?.numemps);
        formData.append("county", 0);
        formData.append("state", 0);

        // const params = {
        //   profileid: 1,
        //   businessusername: register?.businessusername,
        //   fullname: register?.businessname,
        //   address: register?.address,
        //  // naicsid: register?.services,
        //   naicsid: "" ,
        //   cityid: register?.cityid,
        //  // certificate: imageData,
        //   ipaddress: await getIpAddress(),
        //   is_nonprofit: register?.is_non_profit,
        //   photofile: register?.business_url,
        //   instagramurl: register?.instagramurl,
        //   youtubeurl: register?.youtubeurl,
        //   twitterurl: register?.twitterurl,
        //   linkedInurl: register?.linkedInurl,
        //   facebookurl: register?.facebookurl,
        //   business_validation: 1,
        //   year_revenue: "",
        //   industry: register?.serviceid,
        //   service_area: register?.servicing_areas,
        //   service_offer: register?.service_offer,
        //   showemail: 1,
        //   showtext: 1,
        //   showcall: 1,
        //   websiteurl: register?.website,
        //   email: register?.phone,
        //   phone: register?.phone,
        //   payments: register?.payment_method,
        //   hours: register?.hours_operation,
        //   pricehour: 0,
        //   about: register?.introduction,
        //   annualgrossrevenue: 2000,
        //   numemps: register?.numemps,
        //   county: 0,
        //   state: 0
        // };

        //   const formData = new FormData();
        //   formData.append('params', JSON.stringify(params));
        //  // formData.append('params', params)
        //   formData.append('certificate', {
        //     lastModified: "" ,
        //     lastModifiedDate: "" ,
        //     name: imageData?.name,
        //     size: imageData?.size ,
        //     type: imageData?.type ,
        //     webkitRelativePath: uripath,
        //    // uri: uripath
        //   })

        const userToken = await AsyncStorage.getItem("userToken");

        console.log("send userToken...:", userToken);

        console.log("formData>>>>>>>>>>>", formData);
        const header = { "content-type": "multipart/form-data" };
        const response = await apiCall(
          "POST",
          apiEndPoints.REGISTERBUSINESSDETAIL,
          formData,
          header
        );

        console.log("response>>>>>>>>>>>>>>>>>>>>>>>>>:", response);
        // console.log("response status:", response.status);
        if (response.data.status === 200) {
          setbusinessDetail(response.data.data);
          setIsLoading(false);
          navigation.navigate("thankyouScreen", {businessDetail: businessDetail});
          showMessage({
            message: response.data.message,
            type: "success",
            duration: 3000,
          });
          console.log("response in 200:", response.data.data);
        } else {
          setIsLoading(false);
          if (response.status == 401) {
            showMessage({
              message: response.data.message,
              type: "warning",
              duration: 3000,
            });
            console.log("response in 401:", response.data.data);
          }
          showMessage({
            message: response.data.message,
            type: "danger",
            duration: 3000,
          });
        }
      } catch (error) {
        setIsLoading(false);
        console.log("error in catch", error);
        
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
        pdfFileName={pdfFileName}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </>
  );
};
export default RegistrationView;
