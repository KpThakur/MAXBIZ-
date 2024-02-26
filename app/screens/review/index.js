import React, { Fragment, useContext, useState } from "react";
import { SearchContext } from "../../utils/searchContext";
import Review from "./component/Review";
const Index = ({route,navigation}) => {
  const { contentdata , type } = route.params
  // console.log("🚀 ~ file: index.js:4 ~ index ~ route:", contentdata)
  
  const [searchdata, setSearchdata] = useContext(SearchContext);

  const backscreen = () => {
    navigation.navigate("serviceDetailScreen",{searchdata: searchdata} );
   // console.log('backinTypeScreen<<<<<<<<', searchdata)

}
  return (
    <Fragment>
      <Review 
      contentdata = {contentdata} backscreen={backscreen}/>
    </Fragment>
  );
};
export default Index;
