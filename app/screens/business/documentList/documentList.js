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

const DocumentList = ({ filetype, documentListData, getDocumentList }) => {
  console.log("🚀 ~ DocumentList ~ documentListData:", documentListData);
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

  const [document, setDocument] = useState({
    document: "",
  });

  console.log("find document", document);
  const [editData, setEditData] = useState({
    title: "",
    filetype: "document",
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
      setDocument({
        ...document,
        document: "",
      });
    } else {
      setDocument({
        ...document,
        document: e.target.files[0],
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
    }).then((document) => {
      // console.log(image);
      setDocument(document);
    });
  };

  useEffect(() => {
    getValidationList();
    getImage();
    getImageModal();
  }, []);

  const [validationData, setValidationData] = useState([]);
  const [documentNumberValidation, setDocumentNumberValidation] = useState(0);
  async function getValidationList() {
    const response = await apiCall("GET", apiEndPoints.GETVALIDATIONLIST);
    if (response.status == 200) {
      setValidationData(response.data.data);
      setDocumentNumberValidation(
        response.data.data.find((x) => x.lable == "addDocument")
      );
    } else {
      setValidationData([]);
    }
  }

  function formValidation() {
    let errorname = "";
    let errordescription = "";
    let errorcreateddate = "";
    let errorexpirationdate = "";
    let erroreditDocument = "";

    if (!editData?.name) {
      errorname = "title is required";
    } else if (editData?.name.length < 5) {
      errorname = "title length more than 5!";
    }
    if (!editData?.description) {
      errordescription = "description is required";
    }

    setinputError({
      errorname,
      errordescription,
      errorcreateddate,
      errorexpirationdate,
      erroreditDocument,
    });

    return (
      !errorname &&
      !errorcreateddate &&
      !errordescription &&
      !errorexpirationdate &&
      !erroreditDocument
    );
  }

  const checkcountvalidation = () => {
    if (documentListData.length < documentNumberValidation?.number) {
      return true;
    } else {
      Alert.alert(
        "Oops...",
        `You have already uploaded ${documentNumberValidation?.number} Document`,
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
      filetype: "document",
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
        console.log("find document", response.data.url);
      } else {
        console.lig("document in else");
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

  const handleAddDocument = async () => {
    if (formValidation() && checkcountvalidation()) {
      const documentData = new FormData();
      setIsLoader(true);
      documentData.append("name", editData.name);
      documentData.append("filetype", "document");
      documentData.append("createddate", editData.createddate);
      documentData.append("expirationdate", editData.expirationdate);
      documentData.append("description", editData.description);
      documentData.append("documentfile", editDocument);
      documentData.append("islicense", editData.islicense ?? false);

      try {
        const { data } = await apiCall(
          "POST",
          apiEndPoints.ADDVIDEOFILE,
          documentData
        );
        if (data.status === 200) {
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
          console.log("api in else handleAddPhoto", response.data);
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

  const updateDocument = async () => {
    if (!FormValidation()) {
      setIsLoader(true);
      const DocumentData = new FormData();
      DocumentData.append("name", editData.title);
      DocumentData.append("filetype", "photo");
      DocumentData.append("photo", photo.photo);
      DocumentData.append(
        "createddate",
        moment(new Date()).format("MM-DD-YYYY")
      );
      DocumentData.append("fileid", editData.fileid);
      DocumentData.append("islogo", editData.islogo ? editData.islogo : false);
      try {
        const { data } = await apiCall(
          "POST",
          apiEndPoints.UPDATEVIDEOFILE,
          DocumentData
        );
        if (response.status === 200) {
          setIsLoading(false);
          getDocumentList();
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

  const deleteDocument = async (fileid, filetype) => {
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
        getDocumentList();
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
            <Text style={styles.serveTxt}>{StringsOfLanguages.DOCUMENT}</Text>
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
        {/* <View style={styles.mainvideoview}> */}
        <TouchableOpacity
          onPress={() => ViewPhotoSelect()}
          style={styles.mainvideoview}
        >
          <Icon name="eye" size={28} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>
        {/* </View> */}
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
          data={documentListData}
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
                ? updateDocument()
                : handleAddDocument();
            }}
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
            fileid={selectfileid}
            deleteDocument={deleteDocument}
          />
        )}
      </View>
    </>
  );
};

export default DocumentList;
