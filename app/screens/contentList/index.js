import React, { Fragment, useContext, useState } from "react";
import VideoListView from "./component/videoListView";
import PhotoListView from "./component/photoListView";
import DocumentListView from "./component/documentListView";
import JobListView from "./component/jobListView";
import OfferListView from "./component/offerListView";
import StringsOfLanguages from "../../utils/translations";
import { SearchContext } from "../../utils/searchContext";
const ContentList = ({route , navigation}) => {

  const { type , contentdata  } = route?.params
  
  // console.log("🚀 ~ file: index.js:7 ~ contentList ~ contentdata:", contentdata)
  
  //console.log("contentList -> type", type)

  const [searchdata, setSearchdata] = useContext(SearchContext);


  const backscreen = () => {
    navigation.navigate("serviceDetailScreen",{searchdata: searchdata} );
    console.log('backinTypeScreen<<<<<<<<', searchdata)
}
  return (
    <Fragment>
      {type === StringsOfLanguages.VIDEO ? 
      <VideoListView type={type} contentdata={contentdata} backscreen={backscreen}  /> :
      type === "Photo" ?
      <PhotoListView type={type} contentdata={contentdata} backscreen={backscreen}/>:
      type === "Document" ?
      <DocumentListView type={type} contentdata={contentdata} backscreen={backscreen} />:
      type === "Jobs" ?
      <JobListView type={type} contentdata={contentdata} backscreen={backscreen} /> :
      <OfferListView type={type} contentdata={contentdata}  backscreen={backscreen}/>
      }
    </Fragment>
  );
};
export default ContentList;
