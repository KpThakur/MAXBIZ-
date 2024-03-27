import React, { Fragment, useContext, useEffect, useState } from "react";
import ProfileDetails from "./components/profileDetails";
import CommingSoon from "./components/commingSoon";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiEndPoints from "../../../utils/apiEndPoints";
import { apiCall } from "../../../utils/httpClient";
import { showMessage, hideMessage } from "react-native-flash-message";
import Loader from "../../../components/loader";
import { RegisterDataContext } from "../../../utils/searchContext";
const Index = ({ route, navigation }) => {
  const { profileid } = route?.params || {};
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentLists, setPaymentLists] = useState({});
  const [businessDetail, setBusinessDetail] = useState({
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

  const handleChange = (field, value) => {
    setBusinessDetail((prevbusinessDetail) => ({
      ...prevbusinessDetail,
      [field]: value,
    }));
  };

  //  console.log("find userData in profileid>>>", userData.profileid);
  //  console.log("find userData in businessid>>>", userData.businessid);
  //  console.log("find businessDetail |||>>>", businessDetail);

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
  }, []);

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

  const getBusinessdetail = async () => {
    try {
      setIsLoading(true);
      const parms = {
        profileid: userData.profileid,
        businessid: userData.businessid,
      };
      console.log("responce api in deatail:----", response);
      const response = await apiCall(
        "POST",
        apiEndPoints.BUSINESSDETAIL,
        parms
      );

      if (response.status === 200) {
        setIsLoading(false);
        setBusinessDetail(response.data.data);
      } else {
        setIsLoading(false);

        const msg = response.data.message
          ? response.data.message
          : "Somting Went Wrong!!";
        showMessage({
          message: msg,
          type: "danger",
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [paymentCheckbox, setPaymentCheckbox] = useState([
    { label: "Cash", isSelected: false },
    { label: "Cash app", isSelected: false },
    { label: "Credit Card", isSelected: false },
    { label: "PayPal", isSelected: false },
    { label: "Cash", isSelected: false },
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
  console.log("Selected labels:", selectedLabels);
  // console.log("Selected values:", selectedValues);
  // console.log("Checkbox state:", paymentCheckbox);

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
  }

  return (
    <Fragment>
      {isLoading && <Loader />}
      <ProfileDetails
        businessDetail={businessDetail}
        handleChange={handleChange}
        value={value}
        paymentCheckbox={paymentCheckbox}
        toggleCheckbox={toggleCheckbox}
      />
      {/* <CommingSoon /> */}
    </Fragment>
  );
};
export default Index;
