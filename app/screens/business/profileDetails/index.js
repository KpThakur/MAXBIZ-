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
  const [paymentshow, setPaymentShow] = useState({});

  const [businessDetail, setBusinessDetail] = useState({
    fullname: "",
    address: "",
    city_name: "",
    naics: [{ title: "" }],
    industry_name: "",
    head_count: "",
    hours: "",
    websiteurl: "",
  });

  function validationFrom() {
    let errorfullname = "";
    let erroraddress = "";
    let errorcity_name = "";
    let errornaics = "";
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
        errorcity_name = StringsOfLanguages.PLEASE_ENTER_CITY;
      }
      if (!businessDetail.naics[0]?.title) {
        errornaics = StringsOfLanguages.PLEASE_ENTER_SERVICES;
      }
      if (!businessDetail.industry_name) {
        errorindustry_name = StringsOfLanguages.PLEASE_ENTER_INDUSTRY_;
      }
      if (!businessDetail.hours) {
        errorhours = StringsOfLanguages.PLEASE_ENTER_HOURS;
      }
      if (!businessDetail.websiteurl) {
        errorwebsiteurl = StringsOfLanguages.PLEASE_ENTER_WEBSITE;
      }
      if (!selectedValues.length) {
        errorpaymentcheckbox = "Please select at least one payment method";
      }
      if (!selectedContactvalues.length) {
        contactOptionsError = "Please select at least one contact option";
      }
    } else {
      console.warn("businessDetail is undefined");
    }

    setinputError({
      errorfullname,
      erroraddress,
      errorcity_name,
      errornaics,
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
      !errornaics &&
      !errorindustry_name &&
      !errorhours &&
      !errorwebsiteurl &&
      !errorpaymentcheckbox &&
      !contactOptionsError
    );
  }

  console.log("find naics |||>>>", businessDetail?.naics);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getuserData();
      //  getBusinessdetail();
      setRefreshing(false);
    }, 2000);
  }, []);

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
      // paymentExtract();
    }, [navigation])
  );

  useEffect(() => {
    const paydata = businessDetail?.payments
      ? JSON.parse(businessDetail?.payments)
      : {};
    setPaymentLists(paydata);
    // paymentExtract();
    getBusinessdetail();
    getuserData();
  }, []);

  const paymentExtract = () => {
    const paymentMethods = [];
    try {
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
      setPaymentShow(value);
    } catch (error) {
      console.log(error);
    }
  };

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

  // console.log("find userData in profileid>>>", businessDetail);
  // console.log("find userData in profileid>>>", userData.profileid);
  // console.log("find userData in businessid>>>", userData.businessid);

  const getBusinessdetail = async () => {
    try {
      setIsLoading(true);
      const parms = {
        profileid: userData?.profileid,
        businessid: userData?.businessid,
      };
      console.log(" Api responce:----", response);

      const response = await apiCall(
        "POST",
        apiEndPoints.BUSINESSDETAIL,
        parms
      );
      console.log(" Api responce:----", response.data.data);
      if (response.status === 200) {
        setIsLoading(false);
        setBusinessDetail(response.data.data);
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
      console.log(error);
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

  const bussinessFormUpdate = async () => {
    const valid = validationFrom();

    const plantype = await AsyncStorage.getItem("plan_type");
    // console.log("find plantype>>>", plantype);

    const result = [];
    businessDetail?.naics.map((item) => {
      const foundItem = businessDetail?.naics.find(
        (ite) => ite.title === item.title
      );
      if (foundItem) {
        result.push(foundItem.naicsid);
      }
    });
    const stringData = result.join(",");
    console.log("The result ===>>", stringData);

    

    if (valid) {
      try {
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
        businessData.append("payments", JSON.stringify(selectedLabels));
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
        businessData.append("industry", businessDetail?.industry);
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
        businessData.append("photofile", businessDetail?.photofile);
        businessData.append("certificate", businessDetail?.certificate);
        businessData.append("is_nonprofit", businessDetail?.is_nonprofit);
        businessData.append("is_minority", businessDetail?.is_minority);
        businessData.append("allinformation", 1);

        
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      console.log("validation failed");
    }
  };

  const submitBusinessForm = async () => {
    var servId =
      businessDetails &&
      businessDetails?.naics &&
      businessDetails?.naics.length > 0
        ? businessDetails.naics.map((x) => x.naicsid)
        : "";
    if (!validation()) {
      // setIsLoader(true);
      setProIsLoader(true);
      let businessData = new FormData();
      businessData.append("businessid", businessDetails.businessid);
      businessData.append("profileid", businessDetails.profileid);
      businessData.append("status", businessDetails.status);
      businessData.append("fullname", businessDetails.fullname);
      businessData.append("address", businessDetails.address);
      // businessData.append("cityid", selectedCity);
      businessData.append("cityid", businessDetails.cityid);
      businessData.append("city_name", businessDetails.city_name);
      businessData.append("numemps", businessDetails.numemps);
      businessData.append(
        "annualgrossrevenue",
        businessDetails.annualgrossrevenue
      );
      businessData.append("about", businessDetails.about);
      businessData.append("pricehour", businessDetails.pricehour);
      businessData.append("pricemodel", businessDetails.pricemodel);
      businessData.append("hours", businessDetails.hours);
      businessData.append("payments", JSON.stringify(paymentmethods));
      businessData.append("phone", businessDetails.phone);
      businessData.append("email", businessDetails.email);
      businessData.append("websiteurl", businessDetails.websiteurl);
      businessData.append("showcall", businessDetails.showcall);
      businessData.append("showtext", businessDetails.showtext);
      businessData.append("showemail", businessDetails.showemail);
      businessData.append("service_offer", businessDetails.service_offer);
      businessData.append("service_area", businessDetails.service_area);
      businessData.append("county", "1");
      businessData.append("state", "1");
      businessData.append("industry", businessDetails.industry);
      businessData.append("industry_name", businessDetails.industry_name);
      businessData.append("year_revenue", businessDetails.year_revenue);
      businessData.append("plan_type", plantype);
      businessData.append(
        "business_validation",
        businessDetails.business_validation
      );
      businessData.append(
        "naicsid",
        selectedService.length > 0 &&
          selectedService.map((item) => item.cat).join(", ")
      );
      businessData.append("facebookurl", businessDetails.facebookurl);
      businessData.append("linkedInurl", businessDetails.linkedInurl);
      businessData.append("twitterurl", businessDetails.twitterurl);
      businessData.append("youtubeurl", businessDetails.youtubeurl);
      businessData.append("instagramurl", businessDetails.instagramurl);
      businessData.append("photofile", businessDetails.photofile);
      businessData.append("certificate", businessDetails.certificate);
      businessData.append("is_nonprofit", businessDetails.is_nonprofit);
      businessData.append("is_minority", businessDetails.is_minority);
      businessData.append("allinformation", 1);

      // businessData.append("photofile", photofile);
      const header = {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      };
      const { data } = await apiCall(
        "POST",
        apiEndPoints.BUSINESSDETAILUPDATE,
        businessData,
        header
      );
      if (data.status == 200) {
        setIsLoader(false); // function handleIndustrySearch(){
        //   const status = industryListShow?false:true
        //   setIndustryListShow(status);
        // } // function handleIndustrySearch(){
        //   const status = industryListShow?false:true
        //   setIndustryListShow(status);
        // }

        document.getElementById("sucessModelBtn").click();
        //successToast(data.message);
        setProIsLoader(false);
        getBusinessData();
      } else {
        setProIsLoader(false);
        setIsLoader(false);
        errorToast(data.message);
      }
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
        paymentshow={paymentshow}
        paymentCheckbox={paymentCheckbox}
        toggleCheckbox={toggleCheckbox}
        contactCheckbox={contactCheckbox}
        toggleContactCheckbox={toggleContactCheckbox}
        handleChangenaics={handleChangenaics}
        bussinessFormUpdate={bussinessFormUpdate}
      />
      {/* <CommingSoon /> */}
    </Fragment>
  );
};
export default Index;
