import React, { Fragment } from "react";
import Review from "./component/Review";
const index = ({route,navigation}) => {
  const {contentdata , type} = route.params
  console.log("🚀 ~ file: index.js:4 ~ index ~ route:", contentdata)
  return (
    <Fragment>
      <Review 
      contentdata = {contentdata}/>
    </Fragment>
  );
};
export default index;
