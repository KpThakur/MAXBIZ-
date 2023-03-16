import React, { Fragment } from "react";
import VideoListView from "./component/videoListView";
import PhotoListView from "./component/photoListView";
const contentList = ({route }) => {

  const type = route.params
  //console.log("contentList -> type", type)
  return (
    <Fragment>
      {type === 'Video' ? 
      <VideoListView type={type} /> :
      <PhotoListView type={type} /> }
    </Fragment>
  );
};
export default contentList;
