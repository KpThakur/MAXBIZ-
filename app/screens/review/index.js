import React, { Fragment, useState } from "react";
import Review from "./component/Review";
const Index = ({route,navigation}) => {
  const {contentdata , type, serviceid, cityid, servicename, cityname} = route.params
  // console.log("🚀 ~ file: index.js:4 ~ index ~ route:", contentdata)
  const [searchdata, setSearchdata] = useState({
    "serviceid": serviceid,
    "servicename": servicename,
    "cityid": cityid,
    "cityname": cityname
  })

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
