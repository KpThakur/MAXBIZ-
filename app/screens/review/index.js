import React, { Fragment, useContext, useState } from "react";
import { SearchContext } from "../../utils/searchContext";
import Review from "./component/Review";
const Index = ({route,navigation}) => {
  const { contentdata , type } = route.params
  
  const [searchdata, setSearchdata] = useContext(SearchContext);

  const backscreen = () => {
    navigation.navigate("serviceDetailScreen",{searchdata: searchdata} );

}
  return (
    <Fragment>
      <Review 
      contentdata = {contentdata} backscreen={backscreen}/>
    </Fragment>
  );
};
export default Index;
