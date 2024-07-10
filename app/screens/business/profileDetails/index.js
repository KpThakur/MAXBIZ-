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
import ImagePicker from "react-native-image-crop-picker";
import { Alert, Linking } from "react-native";
const Index = ({ route, navigation }) => {
  const { profileid } = route?.params || {};
  const [inputError, setinputError] = useState({});
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLists, setPaymentLists] = useState({});
  // console.log("paymentLists .. : ", paymentLists);
  const [showCall, setShowCall] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [isNonProfit, setIsNonProfit] = useState(false);
  const [isMinority, setIsMinority] = useState(false);
  const [paymentvalue, setPaymentValue] = useState("");
  // console.log("fin payment value......: ", paymentvalue);
  const [allCity, setAllCity] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  // console.log('selectedOption: ', selectedOption);
  const [industryList, setIndustryList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [videoListData, setVideoListData] = useState([]);
  const [photoListData, setPhotolistData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [documentListData, setDocumentListData] = useState([]);
  const [offerListData, setOfferListData] = useState([]);
  const [jobListData, setJobListData] = useState([]);

  const [bucketcertificate, setBucketcertificate] = useState("");
  const [extractedCertificate, setExtractedCertificate] = useState("");

  const [bucket_Img_url, setBucket_Img_url] = useState("");
  const [filepath, setfilepath] = useState("");

  // console.log('extractedCertificate: ', extractedCertificate);
  // console.log("bucketcertificate: ", bucketcertificate);
  //  console.log("bucket_Img_url: ", bucket_Img_url);
  //  console.log("filepath: ", filepath);

  const [baseUrl, setBaseUrl] = useState("");
  const [profileLoader, setProfileLoader] = useState("");
  const [ProfileModal, setProfileModal] = useState(false);

  const toggleShowCall = () => setShowCall(!showCall);
  const toggleShowText = () => setShowText(!showText);
  const toggleShowEmail = () => setShowEmail(!showEmail);
  const toggleIsNonProfit = () => setIsNonProfit(!isNonProfit);
  const toggleIsMinority = () => setIsMinority(!isMinority);

  const onLoadProfileStart = () => {
    setProfileLoader(true);
  };
  const onLoadProfileEnd = () => {
    setProfileLoader(false);
  };

  const openAlbum = () => {
    ImagePicker.openPicker({
      height: 50,
      width: 50,
    }).then((image) => {
      setProfileModal(false);
      setBucket_Img_url(image.path);
      setfilepath(image);
    });
  };
  const openMainCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setProfileModal(false);
      setBucket_Img_url(image.path);
      setfilepath(image);
      console.log(image);
    });
  };

  const [businessDetail, setBusinessDetail] = useState({
    fullname: "",
    address: "",
    cityid: "",
    city_name: "",
    services: "",
    serviceid: "",
    industry_name: "",
    head_count: "",
    hours: "",
    websiteurl: "",
    phone: "",
    email: "",
  });
  // console.log("find businessDetail.servicename #####...", businessDetail?.city_name)

  const [paymentMethod, setPaymentMethods] = useState({
    cash: 0,
    creditcard: 0,
    cashapp: 0,
    paypal: 0,
    zelle: 0,
  });

  // console.log("find paymentme......:..." ,JSON.stringify(paymentMethod))

  const handleCheckBoxChange = (method) => (newValue) => {
    setPaymentMethods((prevState) => {
      const updatedMethods = {
        ...prevState,
        [method]: newValue ? 1 : 0,
      };

      if (Object.values(updatedMethods).some((value) => value === 1)) {
        setinputError((prevState) => ({
          ...prevState,
          errorpaymentcheckbox: "",
        }));
      }

      return updatedMethods;
    });
  };

  const [contactoption, setContackOption] = useState({
    showcall: 0,
    showtext: 0,
    showemail: 0,
    is_nonprofit: 0,
    is_minority: 0,
  });

  // const handleContackCheckBoxChange = (method) => (newValue) => {
  //   setContackOption((prevState) => ({
  //     ...prevState,
  //     [method]: newValue ? 1 : 0,
  //   }));
  // };

  const handleContackCheckBoxChange = (method) => (newValue) => {
    setContackOption((prevState) => {
      const updatedOptions = {
        ...prevState,
        [method]: newValue ? 1 : 0,
      };

      if (Object.values(updatedOptions).some((value) => value === 1)) {
        setinputError((prevState) => ({
          ...prevState,
          contactOptionsError: "",
        }));
      }

      return updatedOptions;
    });
  };

  const setContactResponse = (response) => {
    setContackOption({
      showcall: response.data.data?.showcall,
      showtext: response.data.data?.showtext,
      showemail: response.data.data?.showemail,
      is_nonprofit: response.data.data?.is_nonprofit,
      is_minority: response.data.data?.is_minority,
    });
  };
  // console.log("find contactoption @@......:...:-", contactoption?.showemail);
  // console.log("check city id :-", allCity);
  // console.log("check contact  option :-", contactoption)

  const getuserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      // console.log("find userToken......: ", userToken);
      if (userToken !== null) {
        const userDataString = await AsyncStorage.getItem("userData");
        //  console.log("find userdata in asyn.....:: ", userDataString);
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getuserData();
    }, [])
  );

  useEffect(() => {
    if (userData) {
      getBusinessdetail(userData);
    }
  }, [userData]);

  useEffect(() => {
    const paydata = businessDetail?.payments
      ? JSON.parse(businessDetail?.payments)
      : {};
    setPaymentLists(paydata);
  }, [businessDetail]);

  useEffect(() => {
    paymentExtract();
  }, [paymentLists]);

  useEffect(() => {
    if (bucketcertificate) {
      const extracted = bucketcertificate.split("attachments/")[1];
      setExtractedCertificate(extracted);
    }
  }, [bucketcertificate]);

  const handlePress = () => {
    Linking.openURL(bucketcertificate).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const getBusinessdetail = async (userData) => {
    try {
      // setIsLoading(true);
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
      //  console.log(" Api responce:----", response.data.data);
      if (response.status === 200) {
        setIsLoading(false);
        setBusinessDetail(response.data.data);
        setPaymentMethods(JSON.parse(response.data.data?.payments));
        setContactResponse(response);
        // console.log("find bussiness data.....:", response.data.data);
        await AsyncStorage.setItem(
          "allinformation",
          String(response.data.data.allinformation)
        );
        if (response.data?.data?.certificate) {
          getImageCertificate(response.data?.data?.certificate);
        }
        if (response.data?.data?.photofile) {
          getImage(response.data?.data?.photofile);
        }
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
      setRefreshing(false);
    }, 2000);
  }, []);

  function validationFrom() {
    let errorfullname = "";
    let erroraddress = "";
    let errorphone = "";
    let erroremail = "";
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
      if (!businessDetail.phone) {
        errorphone = StringsOfLanguages.PLEASE_ENTER_MOBILE_NUMBER;
      } else if (!/^\d{10,15}$/.test(businessDetail.phone)) {
        errorphone = "Phone number length should be 10 to 15 digit!";
      }
      // if (!businessDetail.phone) {
      //   errorphone = StringsOfLanguages.PLEASE_ENTER_MOBILE_NUMBER;
      // }
      if (!businessDetail.email) {
        erroremail = StringsOfLanguages.PLEASE_ENTER_EMAIL;
      }
      if (!businessDetail.city_name) {
        errorcity_name = StringsOfLanguages.PLEASE_SELECT_CITY;
      }
      if (!businessDetail.services) {
        errorservices = StringsOfLanguages.PLEASE_ENTER_OCCUPTION;
      }
      if (!businessDetail.industry_name) {
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
        !paymentMethod.cash &&
        !paymentMethod.creditcard &&
        !paymentMethod.cashapp &&
        !paymentMethod.paypal &&
        !paymentMethod.zelle
      ) {
        errorpaymentcheckbox = "Please select at least one payment method";
      }
      // if (!selectedContactvalues.length) {
      //   contactOptionsError = "Please select at least one contact option";
      // }
      if (
        !contactoption.showcall &&
        !contactoption.showtext &&
        !contactoption.showemail &&
        !contactoption.is_nonprofit &&
        !contactoption.is_minority
      ) {
        contactOptionsError = "Please select at least one option";
      }
    } else {
      console.warn("businessDetail is undefined");
    }

    setinputError({
      errorfullname,
      erroraddress,
      errorphone,
      erroremail,
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
      !errorphone &&
      !erroremail &&
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

    setinputError((prevState) => ({
      ...prevState,
      [`error${field}`]: "", // Reset the error for the specific field
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

  const paymentExtract = () => {
    const paymentMethods = [];
    // console.log("paymentMethods in array....: ", paymentMethods);

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
    setPaymentValue(value);
  };

  // console.log("find userData in profileid>>>", businessDetail);
  // console.log("find userData in profileid>>>", userData.profileid);
  // console.log("find userData in businessid>>>", userData.businessid);

  const getImageCertificate = async (param) => {
    const authToken = await AsyncStorage.getItem("userToken");
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    try {
      const params = {
        fileName: param,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETIMAGE,
        params,
        headers
      );
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
    const authToken = await AsyncStorage.getItem("userToken");
    // console.log('authToken: ', authToken);

    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    if (param && param != "") {
      const params = {
        fileName: param,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETIMAGE,
        params,
        headers
      );
      if (response.status === 200) {
        setBucket_Img_url(response.data.url);
        setTimeout(() => {}, 1000);
      } else {
        console.log("getImage in else");
      }
    }
  };

  const getcitylist = async (val = "") => {
    console.log("search city", val);
    const authToken = await AsyncStorage.getItem("userToken");
    // console.log('authToken: ', authToken);
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    if (val.length >= 3) {
      try {
        const parms = {
          cityname: val,
        };
        const response = await apiCall(
          "POST",
          apiEndPoints.GETCITIESLIST,
          parms,
          headers
        );
        console.log("getcitylist API response:", response);
        if (response.status === 200) {
          if (Array.isArray(response.data.data)) {
            const formattedCityData = response.data.data.map((city) => ({
              ...city,
              formattedLabel: `${city.city || ""}, ${city.state_id || ""}`,
            }));
            setAllCity(formattedCityData);
          } else {
            console.error("Error: response.data.data is not an array");
            setAllCity([]); // Reset the city list in case of invalid data
          }
          console.log("response City:", response.data);
        } else {
          console.log("Response status not 200");
          setAllCity([]); // Reset the city list in case of an unsuccessful response
        }
      } catch (error) {
        console.error("Error in cityname:", error);
        setAllCity([]); // Reset the city list in case of an error
      }
    }
  };

  const searchService = async (item) => {
    // console.log("search occuption", item);
    const authToken = await AsyncStorage.getItem("userToken");
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    if (item.length >= 3) {
      try {
        const params = { servicename: item };
        console.log("param", params);
        const response = await apiCall(
          "POST",
          apiEndPoints.GETSERVICELIST,
          params,
          headers
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
    const authToken = await AsyncStorage.getItem("userToken");
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    if (service.length >= 3) {
      try {
        const params = { servicename: service };
        const response = await apiCall(
          "POST",
          apiEndPoints.GETINDUSTRYLIST,
          params,
          headers
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
    console.log("find plantype>>>", plantype);

    const result = [];
    selectedOption.map((item, index) => {
      serviceList.map((ite) => {
        if (ite.title === item) {
          result.push(ite.naicsid);
        }
      });
    });
    const stringData = result.join(",");
    console.log("The result ===>>", stringData);

    const authToken = await AsyncStorage.getItem("userToken");
    console.log("authtoken,,,,", authToken);

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
      businessData.append("payments", JSON.stringify(paymentMethod));
      businessData.append("phone", businessDetail?.phone);
      businessData.append("email", businessDetail?.email);
      businessData.append("websiteurl", businessDetail?.websiteurl);
      businessData.append("showcall", contactoption?.showcall);
      businessData.append("showtext", contactoption?.showtext);
      businessData.append("showemail", contactoption?.showemail);
      businessData.append("service_offer", businessDetail?.service_offer);
      businessData.append("service_area", businessDetail?.service_area);
      businessData.append("county", "1");
      businessData.append("state", "1");
      businessData.append("industry", businessDetail?.serviceid);
      businessData.append("industry_name", businessDetail?.industry_name);
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
      businessData.append("photofile", bucket_Img_url);
      businessData.append("certificate", businessDetail?.certificate);
      businessData.append("is_nonprofit", contactoption?.is_nonprofit);
      businessData.append("is_minority", contactoption?.is_minority);
      businessData.append("allinformation", 1);

      console.log("bussiness formdata:---", businessData);

      const headers = {
        Authorization: `Bearer ${authToken}`,
        "content-type": "multipart/form-data",
      };

      try {
        const response = await apiCall(
          "POST",
          apiEndPoints.BUSINESSDETAILUPDATE,
          businessData,
          headers
        );
        console.log("submit for update responce >>>>", response);
        if (response.status === 200) {
          setIsLoading(false);
          getBusinessdetail();
          showMessage({
            message: response.data.message,
            type: "success",
            duration: 3000,
          });
          console.log("submit for update 200>>>>", response.data);
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
        console.log("error in catch", error);
      }
    } else {
      console.log("validation failed");
    }
  };

  useEffect(() => {
    getVideoList(itemOffset);
    getPhotoList(itemOffset);
    getDocumentList(itemOffset);
    getOfferList(itemOffset);
    getJobList(itemOffset);
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
        //  console.log("find video item:-", response.data.data);
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
        // console.log("find photo item:-", response.data.data);
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

  const getDocumentList = async (offset) => {
    const authToken = await AsyncStorage.getItem("userToken");
    try {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      console.log("🚀 ~ getDocumentList ~ headers:", headers);
      const params = {
        filetype: "document",
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
        setDocumentListData(response.data.data);
        console.log("find document item:-", response.data.data);
        const pageCount = response.data.total_data / itemsPerPage;
        setPageCount(pageCount);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setDocumentListData([]);
        console.error(response.data.message);
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const getOfferList = async (offset) => {
    const authToken = await AsyncStorage.getItem("userToken");
    try {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const params = {
        limit: itemsPerPage,
        offset: offset,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETBUSINESSOFFERlIST,
        params,
        headers
      );
      if (response.status === 200) {
        setOfferListData(response.data.data);
        console.log("find offer item:-", response.data.data);
        const pageCount = response.data.total_data / itemsPerPage;
        setPageCount(pageCount);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setOfferListData([]);
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const getJobList = async (offset) => {
    const authToken = await AsyncStorage.getItem("userToken");
    try {
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const params = {
        limit: itemsPerPage,
        offset: offset,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETBUSINESSJOBLIST,
        params,
        headers
      );
      if (response.status === 200) {
        setJobListData(response.data.data);
        console.log("find job item:-", response.data.data);
        const pageCount = response.data.total_data / itemsPerPage;
        setPageCount(pageCount);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setJobListData([]);
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
        paymentvalue={paymentvalue}
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
        setBusinessDetail={setBusinessDetail}
        getcitylist={getcitylist}
        allCity={allCity}
        searchService={searchService}
        serviceList={serviceList}
        setSelectedOption={setSelectedOption}
        industryList={industryList}
        getServiceList={getServiceList}
        videoListData={videoListData}
        itemOffset={itemOffset}
        getVideoList={getVideoList}
        getPhotoList={getPhotoList}
        photoListData={photoListData}
        getDocumentList={getDocumentList}
        documentListData={documentListData}
        getOfferList={getOfferList}
        offerListData={offerListData}
        getJobList={getJobList}
        jobListData={jobListData}
        paymentMethods={paymentMethod}
        handleCheckBoxChange={handleCheckBoxChange}
        contactoption={contactoption}
        handleContackCheckBoxChange={handleContackCheckBoxChange}
        onLoadProfileStart={onLoadProfileStart}
        onLoadProfileEnd={onLoadProfileEnd}
        profileLoader={profileLoader}
        bucket_Img_url={bucket_Img_url}
        setProfileModal={setProfileModal}
        ProfileModal={ProfileModal}
        openAlbum={openAlbum}
        openMainCamera={openMainCamera}
        extractedCertificate={extractedCertificate}
        handlePress={handlePress}
      />
      {/* <CommingSoon /> */}
    </Fragment>
  );
};
export default Index;
