import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ProfileDetails from "./components/profileDetails";
import CommingSoon from "./components/commingSoon";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiEndPoints from "../../../utils/apiEndPoints";
import { apiCall } from "../../../utils/httpClient";
import { showMessage, hideMessage } from "react-native-flash-message";
import Loader from "../../../components/loader";
import { RegisterDataContext } from "../../../utils/searchContext";
import StringsOfLanguages from "../../../utils/translations";
import { Alert } from "react-native";
const Index = ({ route, navigation }) => {
  const { profileid } = route?.params || {};
  const [inputError, setinputError] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLists, setPaymentLists] = useState({});
  const [paymentmethod, setPaymentMethod] = useState({});
  const [showCall, setShowCall] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [isNonProfit, setIsNonProfit] = useState(false);
  const [isMinority, setIsMinority] = useState(false);
  const [value, setValue] = useState({});
  const [allCity, setAllCity] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [videoListData, setVideoListData] = useState([]);
  const [photoListData, setPhotolistData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [bucketcertificate, setBucketcertificate] = useState("");
  const [bucket_Img_url, setBucket_Img_url] = useState("images/no_image.png");
  const [baseUrl, setBaseUrl] = useState("");

  const toggleShowCall = () => setShowCall(!showCall);
  const toggleShowText = () => setShowText(!showText);
  const toggleShowEmail = () => setShowEmail(!showEmail);
  const toggleIsNonProfit = () => setIsNonProfit(!isNonProfit);
  const toggleIsMinority = () => setIsMinority(!isMinority);

  const [businessDetail, setBusinessDetail] = useState({
    fullname: "",
    address: "",
    cityid: "",
    city_name: "",
    services: "",
    serviceid: "",
    servicename: "",
    head_count: "",
    hours: "",
    websiteurl: "",

    showcall: "",
    showtext: "",
    showemail: "",
    is_nonprofit: "",
    is_minority: "",

    cash: "",
    creditcard: "",
    cashapp: "",
    paypal: "",
    zelle: "",
  });

  // console.log("check city id :-", allCity);
  // console.log("check city name :-", businessDetail?.servicename)

  const getuserData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken !== null) {
      const userData = await AsyncStorage.getItem("userData");
      setUserData(JSON.parse(userData));
      getBusinessdetail();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getuserData();
    }, [navigation])
  );

  useEffect(() => {
    const paydata = businessDetail?.payments
      ? JSON.parse(businessDetail?.payments)
      : {};
    setPaymentLists(paydata);
    paymentExtract();
    getuserData();
  }, []);

  const getBusinessdetail = async () => {
    try {
      setIsLoading(true);
      const parms = {
        profileid: userData?.profileid,
        businessid: userData?.businessid,
      };
      const authToken = await AsyncStorage.getItem("userToken");
      // console.log("authtoken>>>>", authToken)
      const header = {
        Authorization: `Bearer ${authToken}`,
      };
      // console.log(" Api responce:----", response);

      const response = await apiCall(
        "POST",
        apiEndPoints.BUSINESSDETAIL,
        parms,
        header
      );
      // console.log(" Api responce:----", response.data);
      if (response.status === 200) {
        setIsLoading(false);
        setBusinessDetail(response.data.data);
        await AsyncStorage.setItem(
          "allinformation",
          String(response.data.data.allinformation)
        );
        setPaymentMethod(JSON.parse(response.data.data.payments));
        response.data.data?.certificate != ""
          ? getImageCertificate(response.data.data?.certificate)
          : console.log("");

        response.data.data?.photofile != ""
          ? getImage(response.data.data?.photofile)
          : console.log("");
        setBaseUrl(response.data.base_url);
        //  console.log(" Api responce in 200 :----", response.data.data);
      } else {
        setIsLoading(false);
        showMessage({
          message: response.data.message,
          type: "danger",
          duration: 3000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log("catch error", error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getuserData();
      getBusinessdetail();
      setRefreshing(false);
    }, 2000);
  }, []);

  const userSelectPayment = {
    cash: businessDetail?.cash,
    creditcard: businessDetail?.creditcard,
    cashapp: businessDetail?.cashapp,
    paypal: businessDetail?.paypal,
    zelle: businessDetail?.zelle,
  };

  // console.log("find  value:",  userSelectPayment )

  function validationFrom() {
    let errorfullname = "";
    let erroraddress = "";
    let errorcity_name = "";
    let errorservices = "";
    let errorindustry_name = "";
    // let errorhead_count = "";
    let errorhours = "";
    let errorwebsiteurl = "";
    let errorpaymentcheckbox = "";
    let contactOptionsError = "";

    if (businessDetail) {
      if (!businessDetail.fullname) {
        errorfullname = StringsOfLanguages.PLEASE_ENTER_BUSINESS_NAME;
      }
      if (!businessDetail.address) {
        erroraddress = StringsOfLanguages.PLEASE_ENTER_ADDRESS;
      }
      if (!businessDetail.city_name) {
        errorcity_name = StringsOfLanguages.PLEASE_SELECT_CITY;
      }
      if (!businessDetail.services) {
        errorservices = StringsOfLanguages.PLEASE_ENTER_OCCUPTION;
      }
      if (!businessDetail.servicename) {
        errorindustry_name = StringsOfLanguages.PLEASE_SELECT_INDUSTRY;
      }
      if (!businessDetail.hours) {
        errorhours = StringsOfLanguages.PLEASE_ENTER_HOURS;
      }
      if (!businessDetail.websiteurl) {
        errorwebsiteurl = StringsOfLanguages.PLEASE_ENTER_WEBSITE;
      }
      // if (!selectedValues.length) {
      //   errorpaymentcheckbox = "Please select at least one payment method";
      // }
      if (
        !businessDetail.cash &&
        !businessDetail.creditcard &&
        !businessDetail.cashapp &&
        !businessDetail.paypal &&
        !businessDetail.zelle
      ) {
        errorpaymentcheckbox = "Please select at least one payment method";
      }
      // if (!selectedContactvalues.length) {
      //   contactOptionsError = "Please select at least one contact option";
      // }
      if (
        !businessDetail.showcall &&
        !businessDetail.showtext &&
        !businessDetail.showemail &&
        !businessDetail.is_nonprofit &&
        !businessDetail.is_minority
      ) {
        contactOptionsError = "Please select at least one option";
      }
    } else {
      console.warn("businessDetail is undefined");
    }

    setinputError({
      errorfullname,
      erroraddress,
      errorcity_name,
      errorservices,
      errorindustry_name,
      // errorhead_count,
      errorhours,
      errorwebsiteurl,
      errorpaymentcheckbox,
      contactOptionsError,
    });

    return (
      !errorfullname &&
      !erroraddress &&
      !errorcity_name &&
      !errorservices &&
      !errorindustry_name &&
      !errorhours &&
      !errorwebsiteurl &&
      !errorpaymentcheckbox &&
      !contactOptionsError
    );
  }

  // console.log("find naics |||>>>", businessDetail?.naics);

  const handleChange = (field, value) => {
    setBusinessDetail((prevbusinessDetail) => ({
      ...prevbusinessDetail,
      [field]: value,
    }));
  };

  const handleChangenaics = (index, field, value) => {
    setBusinessDetail((prevBusinessDetail) => {
      const updatedNaics = [...prevBusinessDetail.naics];
      updatedNaics[index] = { ...updatedNaics[index], [field]: value };
      // console.log(updatedNaics);
      return { ...prevBusinessDetail, naics: updatedNaics };
    });
  };

  const handleShowPaymentCheckbox = (key) => {
    setBusinessDetail((prevState) => ({
      ...prevState,
      [key]: prevState[key] === 0 ? 1 : 0,
    }));
  };

  const handleShowTextCheckbox = (key) => {
    setBusinessDetail((prevState) => ({
      ...prevState,
      [key]: prevState[key] === 0 ? 1 : 0,
    }));
  };

  const paymentExtract = () => {
    const paymentMethods = [];

    if (paymentLists?.cash === 1) {
      paymentMethods.push("Cash");
    }
    if (paymentLists?.creditcard === 1) {
      paymentMethods.push("Card");
    }
    if (paymentLists?.cashapp === 1) {
      paymentMethods.push("Check");
    }
    if (paymentLists?.paypal === 1) {
      paymentMethods.push("Paypal");
    }
    if (paymentLists?.zelle === 1) {
      paymentMethods.push("Zelle");
    }

    const value = paymentMethods.join(", ");
    setValue(value);
  };

  // console.log("find userData in profileid>>>", businessDetail);
  // console.log("find userData in profileid>>>", userData.profileid);
  // console.log("find userData in businessid>>>", userData.businessid);

  const getImageCertificate = async (param) => {
    try {
      const params = {
        fileName: param,
      };
      const response = await apiCall("POST", apiEndPoints.GETIMAGE, params);
      if (response.status === 200) {
        setBucketcertificate(response.data.url);
        setTimeout(() => {}, 1000);
      } else {
        console.log("getImageCertificate in else");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = async (param) => {
    if (param && param != "") {
      const params = {
        fileName: param,
      };
      const response = await apiCall("POST", apiEndPoints.GETIMAGE, params);
      if (response.status === 200) {
        setBucket_Img_url(response.data.url);
        setTimeout(() => {}, 1000);
      } else {
        console.log("getImage in else");
      }
    }
  };

  const [paymentCheckbox, setPaymentCheckbox] = useState([
    { label: "Cash", isSelected: false },
    { label: "Card", isSelected: false },
    { label: "Check", isSelected: false },
    { label: "PayPal", isSelected: false },
    { label: "Zelle", isSelected: false },
  ]);

  const toggleCheckbox = (index) => {
    const updatedOptions = [...paymentCheckbox];
    updatedOptions[index].isSelected = !updatedOptions[index].isSelected;
    setPaymentCheckbox(updatedOptions);
  };

  const selectedValues = paymentCheckbox.filter(
    (item) => item.isSelected === true
  );
  const selectedLabels = selectedValues.map((item) => item.label);

  // console.log("Selected payments labels:", selectedLabels);

  const [contactCheckbox, setContactCheckbox] = useState([
    { label: "Show Call Button", isSelected: false },
    { label: "Show Text Button", isSelected: false },
    { label: "Show Email Button", isSelected: false },
    { label: "Non-Profit", isSelected: false },
    { label: "Minority", isSelected: false },
  ]);

  const toggleContactCheckbox = (index) => {
    const updatedOptions = [...contactCheckbox];
    updatedOptions[index].isSelected = !updatedOptions[index].isSelected;
    setContactCheckbox(updatedOptions);
  };

  const selectedContactvalues = contactCheckbox.filter(
    (item) => item.isSelected === true
  );
  const selectedLabelsContact = selectedContactvalues.map((item) => item.label);
  // console.log("Selected contacts labels:", selectedLabelsContact);

  const getcitylist = async (val = "") => {
    console.log("search city", val);
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
          console.log("responce City:-", response.data);
          setAllCity(formattedCityData);
          console.log("city find:-", response.data);
        } else {
          console.log("in else");
        }
      } catch (error) {
        console.error("Error in cityname:", error);
      }
    }
  };

  const searchService = async (item) => {
    // console.log("search occuption", item);
    if (item.length >= 3) {
      try {
        const params = { servicename: item };
        console.log("param", params);
        const response = await apiCall(
          "POST",
          apiEndPoints.GETSERVICELIST,
          params
        );
        // console.log("Response:", response.data);
        if (response.status === 200) {
          setServiceList(response.data.data);
          //  console.log("Response in 200:", response.data.data);
        } else {
          console.log("in else");
        }
      } catch (error) {
        console.error("Error fetching occupation list:", error);
      }
    }
  };

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

  const bussinessFormUpdate = async () => {
    const valid = validationFrom();

    const plantype = await AsyncStorage.getItem("plan_type");
    // console.log("find plantype>>>", plantype);

    const result = [];
    selectedOption.map((item, index) => {
      serviceList.map((ite) => {
        if (ite.title === item) {
          result.push(ite.naicsid);
        }
      });
    });
    const stringData = result.join(",");
    // console.log("The result ===>>", stringData);

    const authToken = await AsyncStorage.getItem("userToken");
    // console.log("authtoken,,,,", authToken);

    if (valid) {
      setIsLoading(true);
      let businessData = new FormData();
      businessData.append("businessid", businessDetail?.businessid);
      businessData.append("profileid", businessDetail?.profileid);
      businessData.append("status", businessDetail?.status);
      businessData.append("fullname", businessDetail?.fullname);
      businessData.append("address", businessDetail?.address);
      businessData.append("cityid", businessDetail?.cityid);
      businessData.append("city_name", businessDetail?.city_name);
      businessData.append("numemps", businessDetail?.numemps);
      businessData.append(
        "annualgrossrevenue",
        businessDetail?.annualgrossrevenue
      );
      businessData.append("about", businessDetail?.about);
      businessData.append("pricehour", businessDetail?.pricehour);
      businessData.append("pricemodel", businessDetail?.pricemodel);
      businessData.append("hours", businessDetail?.hours);
      businessData.append("payments", JSON.stringify(userSelectPayment));
      businessData.append("phone", businessDetail?.phone);
      businessData.append("email", businessDetail?.email);
      businessData.append("websiteurl", businessDetail?.websiteurl);
      businessData.append("showcall", businessDetail?.showcall);
      businessData.append("showtext", businessDetail?.showtext);
      businessData.append("showemail", businessDetail?.showemail);
      businessData.append("service_offer", businessDetail?.service_offer);
      businessData.append("service_area", businessDetail?.service_area);
      businessData.append("county", "1");
      businessData.append("state", "1");
      businessData.append("industry", businessDetail?.serviceid);
      businessData.append("industry_name", businessDetail?.servicename);
      businessData.append("year_revenue", businessDetail?.year_revenue);
      businessData.append("plan_type", plantype);
      businessData.append(
        "business_validation",
        businessDetail?.business_validation
      );
      businessData.append("naicsid", stringData);
      businessData.append("facebookurl", businessDetail?.facebookurl);
      businessData.append("linkedInurl", businessDetail?.linkedInurl);
      businessData.append("twitterurl", businessDetail?.twitterurl);
      businessData.append("youtubeurl", businessDetail?.youtubeurl);
      businessData.append("instagramurl", businessDetail?.instagramurl);
      businessData.append("photofile", businessDetail?.photofile);
      businessData.append("certificate", businessDetail?.certificate);
      businessData.append("is_nonprofit", businessDetail?.is_nonprofit);
      businessData.append("is_minority", businessDetail?.is_minority);
      businessData.append("allinformation", 1);

      console.log("bussiness formdata:---", businessData);

      const headers = {
        Authorization: `Bearer ${authToken}`,
        "content-type": "multipart/form-data",
      };

      try {
        const responce = await apiCall(
          "POST",
          apiEndPoints.BUSINESSDETAILUPDATE,
          businessData,
          headers
        );

        if (responce.status === 200) {
          setIsLoading(false);
          getBusinessdetail();
          showMessage({
            message: responce.data.message,
            type: "success",
            duration: 3000,
          });
          console.log("submit for update >>>>", responce.data);
        } else {
          setIsLoading(false);
          showMessage({
            message: responce.data.message,
            type: "danger",
            duration: 3000,
          });
        }
      } catch (error) {
        setIsLoading(false);
        console.log("error in catch", error);
      }
    } else {
      console.log("validation failed");
    }
  };

  useEffect(() => {
    getVideoList(itemOffset);
    getPhotoList(itemOffset)
  }, []);

  const getVideoList = async (offSet) => {
    const authToken = await AsyncStorage.getItem("userToken");
    try {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const params = {
        filetype: "video",
        limit: itemsPerPage,
        offset: offSet,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETVIDEODOCUMENTDATA,
        params,
        headers
      );
      if (response.status === 200) {
        setVideoListData(response.data.data);
        console.log("find video item:-", response.data.data)
        const pageCount = response.data.total_data / itemsPerPage;
        setPageCount(pageCount);
        setBaseUrl(response.data.base_url);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setVideoListData([]);
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const getPhotoList = async (offset) => {
    const authToken = await AsyncStorage.getItem("userToken");
    try {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const params = {
        filetype: "photo",
        limit: itemsPerPage,
        offset: offset,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETVIDEODOCUMENTDATA,
        params,
        headers
      );
      if (response.status === 200) {
        setPhotolistData(response.data.data);
        console.log("find photo item:-", response.data.data)
        const pageCount = response.data.total_data / itemsPerPage;
        setPageCount(pageCount);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setPhotolistData([]);
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  

  return (
    <Fragment>
      {isLoading && <Loader />}
      <ProfileDetails
        businessDetail={businessDetail}
        inputError={inputError}
        refreshing={refreshing}
        onRefresh={onRefresh}
        handleChange={handleChange}
        value={value}
        paymentCheckbox={paymentCheckbox}
        toggleCheckbox={toggleCheckbox}
        contactCheckbox={contactCheckbox}
        toggleContactCheckbox={toggleContactCheckbox}
        handleChangenaics={handleChangenaics}
        bussinessFormUpdate={bussinessFormUpdate}
        showCall={showCall}
        showText={showText}
        showEmail={showEmail}
        isNonProfit={isNonProfit}
        isMinority={isMinority}
        toggleShowCall={toggleShowCall}
        toggleShowText={toggleShowText}
        toggleShowEmail={toggleShowEmail}
        toggleIsNonProfit={toggleIsNonProfit}
        toggleIsMinority={toggleIsMinority}
        handleShowTextCheckbox={handleShowTextCheckbox}
        handleShowPaymentCheckbox={handleShowPaymentCheckbox}
        paymentmethod={paymentmethod}
        setBusinessDetail={setBusinessDetail}
        getcitylist={getcitylist}
        allCity={allCity}
        searchService={searchService}
        serviceList={serviceList}
        setSelectedOption={setSelectedOption}
        industryList={industryList}
        getServiceList={getServiceList}
        videoListData={videoListData}
        getVideoList={getVideoList}
        getPhotoList={getPhotoList}
        photoListData={photoListData}
      />
      {/* <CommingSoon /> */}
    </Fragment>
  );
};
export default Index;
