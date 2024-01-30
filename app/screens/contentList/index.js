import React, { Fragment } from "react";
import VideoListView from "./component/videoListView";
import PhotoListView from "./component/photoListView";
import DocumentListView from "./component/documentListView";
import JobListView from "./component/jobListView";
import OfferListView from "./component/offerListView";
import StringsOfLanguages from "../../utils/translations";
const contentList = ({route }) => {

  const {type , contentdata} = route?.params
  console.log("🚀 ~ file: index.js:7 ~ contentList ~ contentdata:", contentdata)
  //console.log("contentList -> type", type)
  return (
    <Fragment>
      {type === StringsOfLanguages.VIDEO ? 
      <VideoListView type={type} /> :
      type === "Photo" ?
      <PhotoListView type={type} contentdata={contentdata} />:
      type === "Document" ?
      <DocumentListView type={type} contentdata={contentdata} />:
      type === "Jobs" ?
      <JobListView type={type} contentdata={contentdata} /> :
      <OfferListView type={type} contentdata={contentdata} />
      }
    </Fragment>
  );
};
export default contentList;
