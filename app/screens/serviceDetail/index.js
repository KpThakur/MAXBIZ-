import React, { useEffect, useLayoutEffect, useState } from "react";
import ServiceDetailView from "./component/serviceDetailView";
import apiEndPoints from "../../utils/apiEndPoints";
import Loader from "../../components/loader";
import { apiCall } from "../../utils/httpClient";
import { useFocusEffect } from "@react-navigation/native";
const ServiceDetail = ({ route, navigation }) => {
  const { serviceDetaildata, searchdata } = route?.params || {};
  const [showSearch, setShowSearch] = useState(true);
  const [serviceDetail, setServiceDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  const [paymentList, setPaymentList] = useState("");
  const [image, setImage] = useState("");

  // console.log("serviceDetaildata>>>", serviceDetaildata?.photofile);

  // useEffect(() => {
  //     const stringData =
  //     serviceDetaildata?.payments &&
  //     serviceDetaildata?.payments.reduce((result, item) => {
  //         return `${result}${item.title},`;
  //       }, "");

  //     setServiceDetail(stringData);

  //     const paydata = serviceDetaildata?.payments
  //       ? JSON.parse(serviceDetaildata?.payments)
  //       : {};
  //     setPaymentList(paydata);
  //   }, []);

  useEffect(() => {
    if (serviceDetaildata?.payments) {
      try {
        const paydata = JSON.parse(serviceDetaildata?.payments);
        setPaymentList(paydata);
      } catch (error) {
        console.error("Error parsing payments JSON:", error);
      }
    }
  }, [serviceDetaildata]);

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
      getServicesDetails(
        serviceDetaildata?.businessid,
        serviceDetaildata?.photofile
      );
    }, [navigation, serviceDetaildata])
  );

  /* useEffect(() => {
        getServicesDetails()
    }, []); */

  const getImage = async (param) => {
    setIsLoading(true);
    const params = {
      fileName: param,
    };
    const { data } = await apiCall("POST", apiEndPoints.GETIMAGE, params);
    if (data.status == 200) {
      // console.log('image data>>>', data.url)
      setImage(data.url);
      setIsLoading(false);
    } else {
      console.log("image in else");
    }
  };
  useEffect(() => {
    serviceDetaildata?.photofile && getImage(serviceDetaildata.photofile);
  }, []);

  const getServicesDetails = async (businessid) => {
    if (businessid > 0) {
      try {
        setIsLoading(true);
        const response = await apiCall("POST", apiEndPoints.GETSERVICEDETAIL, {
          businessid: businessid,
        });

        if (response.status === 200) {
          // console.log("🚀 ~ getServicesDetails ~ response.data.data:", response.data.data)
          setIsLoading(false);
          setServiceDetail(response.data.data);
        } else {
          setIsLoading(false);
          setServiceDetail([]);
        }
      } catch (error) {
        console.log(
          "🚀 ~ file: index.js:43 ~ getServicesDetails ~ error:",
          error
        );
        setIsLoading(false);
      }
    }
  };

  const backscreen = () => {
    navigation.navigate("findServiceScreen", searchdata);
    console.log("back in findServiceScreen<<<<", searchdata);
  };
  const drawerOpen = () => {
    //navigation.navigate("drawerNavigation");
  };
  const showDetailContent = (screenName, type = "", data) => {
    // console.log("🚀 ~ file: index.js:58 ~ showDetailContent ~ data:", data)
    navigation.navigate(screenName, { type: type, contentdata: data });
    // navigation.navigate(screenName, { type: type, contentdata: data ,searchdata: searchdata,});
  };
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
        showDetailContent={(screenName, type, data) =>
          showDetailContent(screenName, type, data)
        }
        backscreen={backscreen}
        paymentList={paymentList}
        image={image}
      />
    </>
  );
};
export default ServiceDetail;
