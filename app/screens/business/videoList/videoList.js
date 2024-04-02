import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Touchable,
  Alert,
  Modal,
} from "react-native";

import { Button, Input, Header } from "@components";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome";
import { COMMON_COLOR, GRADIENT_COLOR_NEW2 } from "./../../../utils/constants";
import ViewModel from "../viewModel/viewModel";
import DeleteModel from "../deleteModel/deleteModel";
import StringsOfLanguages from "../../../utils/translations";
import moment from "moment";
import { apiCall } from "../../../utils/httpClient";
import apiEndPoints from "../../../utils/apiEndPoints";
import { showMessage } from "react-native-flash-message";
import Loader from "../../../components/loader";
const Data = [
  {
    fileid: 137,
    businessid: 46,
    filetype: "video",
    title: "My first Video",
    description: "hello",
    filefile: "1647242139307_big_buck_bunny_720p_1mb.mp4",
  },
  {
    fileid: 138,
    businessid: 46,
    filetype: "video",
    title: "My first Video",
    description: "hello",
    filefile: "1647242139307_big_buck_bunny_720p_1mb.mp4",
  },
  {
    fileid: 139,
    businessid: 46,
    filetype: "video",
    title: "My first Video",
    description: "hello",
    filefile: "1647242139307_big_buck_bunny_720p_1mb.mp4",
  },
];

const videoList = ({ filetype, videoListData, getVideoList }) => {
  // console.log("find bussieness :---", videoListData);
  const [viewModel, setViewModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setinputError] = useState({});
  const [editStatus, setEditStatus] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    youtubeLink: "",
    filetype: "video",
    createddate: "",
    description: "",
  });

  useEffect(() => {
    getValidationList();
  }, []);

  const [validationData, setValidationData] = useState([]);
  const [videoNumberValidation, setVideoNumberValidation] = useState(1);

  const getValidationList = async () => {
    try {
      const response = await apiCall("GET", apiEndPoints.GETVALIDATIONLIST);
      if (response.status === 200) {
        setValidationData(response.data.data);
        setVideoNumberValidation(
          response.data.data.find((x) => x.lable == "addvideo")
        );
      } else {
        setValidationData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function formValidationvideo() {
    let errorname = "";
    let erroryoutubeLink = "";

    if (!editData?.name) {
      errorname = "title is required";
    } else if (editData?.name.length < 5) {
      errorname = "title length more than 5!";
    }
    if (!editData?.youtubeLink) {
      erroryoutubeLink = "Youtube Link is required";
    }
    if (editData?.youtubeLink) {
      var regExp =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (!editData?.youtubeLink.match(regExp)) {
        erroryoutubeLink = "Use only Youtube URL for Video";
      }
    }

    setinputError({
      errorname,
      erroryoutubeLink,
    });

    return !errorname && !erroryoutubeLink;
  }

  const checkcountvalidation = () => {
    if (videoListData.length < videoNumberValidation?.number) {
      return true;
    } else {
      Alert.alert(
        "Oops...",
        `You have already uploaded ${videoNumberValidation?.number} videos`,
        [
          {
            text: "OK",
            // onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
      // Swal.fire({
      //   title: "Oops...",
      //   text: `You have already uploaded ${videoNumberValidation?.number} videos`,
      //   icon: "info",
      //   //showCancelButton: true,
      //   //confirmButtonColor: "#6258D3",
      //   cancelButtonColor: "#000",
      //   cancelButtonText: "OK",
      //   //confirmButtonText: "Yes, delete it!",
      // }).then(async (result) => {});
    }
  };

  function cleanSetEditData() {
    setEditData({
      createddate: "",
      name: "",
      youtubeLink: "",
      filetype: "video",
      description: "",
    });
  }

  const handleAddVideoFile = async () => {
    if (formValidationvideo() && checkcountvalidation()) {
      try {
        // setIsLoading(true);
        const videoData = new FormData();

        videoData.append("name", editData?.name);
        videoData.append("youtubeLink", editData?.youtubeLink);
        videoData.append("filetype", editData?.filetype);
        //videoData.append("video", editData.video);
        videoData.append("description", editData?.description);
        //videoData.append("miniature", editData.miniature);
        videoData.append(
          "createddate",
          moment(new Date()).format("MM/DD/YYYY")
        );

        const headers = {
          "content-type": "multipart/form-data",
        };

        const response = await apiCall(
          "POST",
          apiEndPoints.ADDVIDEOFILE,
          videoData,
          headers
        );
        if (response.status === 200) {
          setIsLoading(false);
          setEditStatus(false);
          cleanSetEditData();
          setViewModel(false);
          showMessage({
            message: response.data.message,
            type: "success",
            duration: 3000,
          });
        } else {
          console.log("api in else handleAddVideoFile", response.data);
        }
      } catch (error) {
        console.log("catch error", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      console.log("validation failed");
    }
  };

  const updateVideo = async () => {
    if (!formValidationvideo()) {
      try {
        // setIsLoading(true);
        const videoData = new FormData();
        videoData.append("name", editData?.name);
        videoData.append("filetype", "video");
        videoData.append("fileid", editData?.fileid);
        videoData.append("description", editData?.description);
        videoData.append("youtubeLink", editData?.youtubeLink);
        videoData.append(
          "createddate",
          moment(new Date()).format("MM/DD/YYYY")
        );

        const headers = {
          "content-type": "multipart/form-data",
        };

        const response = await apiCall(
          "POST",
          apiEndPoints.UPDATEVIDEOFILE,
          videoData,
          headers
        );
        if (response.status === 200) {
          setIsLoading(false);
          getVideoList();
          setViewModel(false);
          showMessage({
            message: response.data.message,
            type: "success",
            duration: 3000,
          });
          cleanSetEditData();
        } else {
          setIsLoading(false);
          console.log("api in else updateVideo", response.data);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      console.log("validation failed");
    }
  };

  const deleteVideo = async (fileid, filetype) => {
    const params = {
      fileid: fileid,
      filetype: filetype,
    };

    console.log("find file id:-", fileid);
    console.log("find filetype:-", filetype);

    try {
      const response = await apiCall(
        "POST",
        apiEndPoints.VIDEODOCUMENTDELETE,
        params
      );
      // console.log("responce ", response);
      if (response.status === 200) {
        getVideoList();
        showMessage({
          message: response.data.message,
          type: "success",
          duration: 3000,
        });
        setEditData({});
        cleanSetEditData();
      } else {
        showMessage({
          message: response.data.message,
          type: "danger",
          duration: 3000,
        });
        console.log("in else ", response.data);
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  // console.log("show input data", editData?.description)

  const Viewmodelshow = (typecheck) => {
    typecheck === 1 ? setViewModel(!viewModel) : setDeleteModel(!deleteModel);
  };

  const [selectfileid, setSelectFileid] = useState();
  console.log("find select fileid", selectfileid);

  const handleDeleteModal = (fileid, filetype) => {
    setDeleteModel(!deleteModel);
    setSelectFileid(fileid);

    console.log("find select filetype", filetype);
  };

  const renderItem = ({ item }) => (
    <View style={styles.mainvideo}>
      <View style={styles.mainvideotop}>
        <View style={styles.addView}>
          <View style={styles.addViewtext}>
            <Text style={styles.serveTxt}>{StringsOfLanguages.NAME}</Text>
          </View>
          <View style={styles.addViewcontent}>
            <Text style={styles.addrsTxt}>{item?.title}</Text>
          </View>
        </View>

        <View style={styles.addView}>
          <View style={styles.addViewtext}>
            <Text style={styles.serveTxt}>{StringsOfLanguages.URL}</Text>
          </View>
          <View style={styles.addViewcontent}>
            <Text style={styles.addrsTxt}>{item?.youtubeLink}</Text>
          </View>
        </View>

        <View style={styles.addView}>
          <View style={styles.addViewtext}>
            <Text style={styles.serveTxt}>{StringsOfLanguages.DATE}</Text>
          </View>
          <View style={styles.addViewcontent}>
            <Text style={styles.addrsTxt}> {item?.createddate}</Text>
          </View>
        </View>

        {/* <View style={styles.nametag}>
          <Text style={styles.namelable}>{StringsOfLanguages.NAME}</Text>
          <Text style={styles.namevalue}>{item?.title}</Text>
        </View>
        <View style={styles.nametag}>
          <Text style={styles.namelable}>{StringsOfLanguages.URL}</Text>
          <Text style={styles.namevalue}>{item?.youtubeLink}</Text>
        </View>
        <View style={[styles.nametag]}>
          <Text style={[styles.namelable, { marginTop: 5 }]}>
            {StringsOfLanguages.DATE}
          </Text>
          <Text style={[styles.namevalue, { marginTop: 5 }]}>
            {item?.createddate}
          </Text>
        </View> */}
      </View>

      <View style={styles.mainvideobottum}>
        <View style={styles.mainvideoview}>
          <Icon name="eye" size={28} color={GRADIENT_COLOR_NEW2} />
        </View>
        <TouchableOpacity
          onPress={() => Viewmodelshow(1)}
          style={styles.mainvideoview}
        >
          <Icon name="edit" size={28} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            // Viewmodelshow(2)
            handleDeleteModal(item?.fileid, item?.filetype)
          }
          style={styles.mainvideoview}
        >
          <Icon name="trash" size={28} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => Viewmodelshow(1)}
          style={[styles.mainvideoview, { alignSelf: "flex-end" }]}
        >
          <Icon name="plus" size={25} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>
        <FlatList
          // data={Data}
          data={videoListData}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          keyExtractor={(item) => item.fileid.toString()}
        />

        {viewModel && (
          <ViewModel
            viewModel={viewModel}
            setViewModel={setViewModel}
            filetype={filetype}
            editData={editData}
            setEditData={setEditData}
            onPress={() => {
              editData?.fileid && editData?.fileid != ""
                ? updateVideo()
                : handleAddVideoFile();
            }}
            inputError={inputError}
            cleanSetEditData={cleanSetEditData}
          />
        )}
        {deleteModel && (
          <DeleteModel
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            filetype={filetype}
            fileid={selectfileid}
            deleteVideo={deleteVideo}
          />
        )}
      </View>
    </>
  );
};
export default videoList;
