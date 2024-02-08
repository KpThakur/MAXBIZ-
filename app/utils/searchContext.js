import React, {useState, createContext} from 'react';
export const SearchContext = createContext();
export const SearchProvider = props => {
 const [data, setData] = useState({})
 
  return (
    <SearchContext.Provider value={[data, setData]}>
      {props.children}
    </SearchContext.Provider>
  );
};

