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
import AsyncStorage from "@react-native-async-storage/async-storage";
import deleteModel from "../deleteModel/deleteModel";
import viewModel from "../viewModel/viewModel";
import ImagePicker from "react-native-image-crop-picker";

const PhotoList = ({ filetype, photoListData, getPhotoList }) => {
  const [viewModel, setViewModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [viewphotoselect, setViewPhotoSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setinputError] = useState({});
  const [editStatus, setEditStatus] = useState(false);
  const [selectfileid, setSelectFileid] = useState();
  const [image, setImage] = useState("");
  //  console.log("image in state ", image)
  const [bucket_Img_url_Modal, setBucket_Img_url_Modal] = useState();
  const [title, setTitle] = useState("");

  const [photo, setPhoto] = useState({
    photo: "",
  });

  console.log("find photo", photo);
  const [editData, setEditData] = useState({
    title: "",
    filetype: "photo",
    createddate: "",
    fileid: "",
    islogo: false,
  });

  function handlePhotoFileSize(e) {
    const validationStatus = validationData.find((x) => x.lable == "photosize");
    console.log("validationstatus", validationStatus);
    var _size = Math.floor(e.target.files[0].size / 1000000); //MB

    if (_size >= validationStatus.number) {
      setFileSizeError(
        `Please select Less than ${
          validationStatus.number + validationStatus.type
        } file`
      );
      setPhoto({
        ...photo,
        photo: "",
      });
    } else {
      setPhoto({
        ...photo,
        photo: e.target.files[0],
      });
      console.log(
        "🚀 ~ file: photoList.js:292 ~ handlePhotoFileSize ~ URL.createObjectURL(e.target.files[0]):",
        URL.createObjectURL(e.target.files[0])
      );
      setBucket_Img_url(URL.createObjectURL(e.target.files[0]));
      setFileSizeError("");
    }
  }

  const uploaddocument = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 1,
      // mediaType:'any',
      // multiple: true
    }).then((image) => {
      // console.log(image);
      setPhoto(image);
    });
  };

  useEffect(() => {
    getValidationList();
    getImage();
    getImageModal();
  }, []);

  const [validationData, setValidationData] = useState([]);
  const [photoNumberValidation, setPhotoNumberValidation] = useState(0);
  async function getValidationList() {
    const response = await apiCall("GET", apiEndPoints.GETVALIDATIONLIST);
    if (response.status == 200) {
      setValidationData(response.data.data);
      setPhotoNumberValidation(
        response.data.data.find((x) => x.lable == "addphoto")
      );
    } else {
      setValidationData([]);
    }
  }

  function formValidationphoto() {
    let errorname = "";
    let erroryoutubeLink = "";
    let errorphoto = "";

    if (!editData?.name) {
      errorname = "title is required";
    } else if (editData?.name.length < 5) {
      errorname = "title length more than 5!";
    }
    if (!editData?.photourl) {
      erroryoutubeLink = "Photo Link is required";
    }
    if (!photo.photo) {
      errorphoto = "Image is required";
    }
    // if (editData?.youtubeLink) {
    //   var regExp =
    //     /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    //   if (!editData?.youtubeLink.match(regExp)) {
    //     erroryoutubeLink = "Use only Youtube URL for Video";
    //   }
    // }

    setinputError({
      errorname,
      erroryoutubeLink,
      errorphoto,
    });

    return !errorname && !erroryoutubeLink && !errorphoto;
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
      title: "",
      filetype: "photo",
      createddate: "",
      fileid: "",
      islogo: false,
    });
    setImage("");
  }

  const ViewPhotoSelect = () => {
    setViewPhotoSelect(!viewphotoselect);
  };

  const Viewmodelshow = (typecheck) => {
    typecheck === 1 ? setViewModel(!viewModel) : setDeleteModel(!deleteModel);
  };

  const handleDeleteModal = (fileid, filetype) => {
    setDeleteModel(!deleteModel);
    setSelectFileid(fileid);

    console.log("find select fileid", fileid);
  };

  const getImage = async (param) => {
    const authToken = await AsyncStorage.getItem("userToken");
    try {
      const params = {
        fileName: param,
      };
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETIMAGE,
        params,
        headers
      );
      if (response.status == 200) {
        setImage(response.data.url);
        console.log("find image", response.data.url);
      } else {
        console.lig("image in else");
      }
    } catch (error) {
      console.log("error in catch", error);
    }
  };

  const getImageModal = async (param, name) => {
    const authToken = await AsyncStorage.getItem("userToken");
    try {
      setTitle(name);
      const params = {
        fileName: param,
      };
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await apiCall(
        "POST",
        apiEndPoints.GETIMAGE,
        params,
        headers
      );
      if (response.status == 200) {
        setBucket_Img_url_Modal(response.data.url);
      } else {
        console.lig("image in else");
      }
    } catch (error) {
      console.log("error in catch getImageModal");
    }
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
            <Text style={styles.serveTxt}>{StringsOfLanguages.IMAGE}</Text>
          </View>
          <View style={styles.addViewcontent}>
            <Text style={styles.addrsTxt}>{item?.filefile}</Text>
            {/* <Image source={{uri: `${item?.filefile}`}} style={styles.imgStyle}/> */}
            {/* <Image source={{uri: `${image}`}} style={styles.imgStyle}/> */}
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
          data={photoListData}
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
            // onPress={() => {
            //   editData?.fileid && editData?.fileid != ""
            //     ? updateVideo()
            //     : handleAddVideoFile();
            // }}
            inputError={inputError}
            cleanSetEditData={cleanSetEditData}
            viewphotoselect={true}
            uploaddocument={uploaddocument}
            handlePhotoFileSize={handlePhotoFileSize}
          />
        )}
        {deleteModel && (
          <DeleteModel
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            filetype={filetype}
            // fileid={selectfileid}
            // deleteVideo={deleteVideo}
          />
        )}
      </View>
    </>
  );
};

export default PhotoList;
