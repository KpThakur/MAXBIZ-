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
