import React, { useState, createContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [searchdata, setSearchdata] = useState({
    serviceid: "",
    servicename: "",
    cityid: "",
    cityname: "",
  });
  return (
    <SearchContext.Provider value={[searchdata, setSearchdata]}>
      {props.children}
    </SearchContext.Provider>
  );
};


export const LoadingContext = createContext();

export const LoadingProvider = (props) => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {props.children}
    </LoadingContext.Provider>
  );
};


// export const RegisterDataContext = createContext();

// export const RegisterProvider = (props) => {

//   const [register, setRegister] = useState({
//     businessusername: "",
//     businessname: "",
//     address: "",
//     industry: "",
//     occupationid: "",
//     occupation: "",
//     about_us: "",
//     /*areas: "",
//     mainservice: "", */
//     operation_hours: "",
//     payment: "",
//     phone_no: "",
//     website_url: "",
//     services: "",
//     cityid: "",
//     cityname: "",
//     servicename: "",
//     head_count: "",
//     business_photo_url: "",
//     certificate: "",
//     serviceid: "",
//     payment_method: "",
//     phone: "",
//     business_url: "",
//     lastModifiedDate: "",
//     facebookurl: "",
//     // head_count: "",
//     hours_operation: "",
//     introduction: "",
//     linkedInurl: "",
//     numemps: "",
//     pricehour: "",
//     revenue: "",
//     servicing_areas: "",
//     servicing_offer: "",
//     twitterurl: "",
//     website: "",
//     youtubeurl: "",
//     service_offer: "",
//     instagramurl: "",
//     is_non_profit: 0,
//   });
  
//   return (
//     <RegisterDataContext.Provider value={[register, setRegister]}>
//       {props.children}
//     </RegisterDataContext.Provider>
//   );
// };

