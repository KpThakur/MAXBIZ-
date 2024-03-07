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


// export const PaymentContext = createContext();

// export const PaymentProvider = (props) => {

//   const [paymentList, setPaymentList] = useState({});

//   return (
//     <PaymentContext.Provider value={[paymentList, setPaymentList]}>
//       {props.children}
//     </PaymentContext.Provider>
//   );
// };
