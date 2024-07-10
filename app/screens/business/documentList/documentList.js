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
  Linking,
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
import DocumentPicker, { types } from "react-native-document-picker";

const DocumentList = ({
  filetype,
  documentListData,
  getDocumentList,
  itemOffset,
}) => {
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
  const [documentName, setdocumentName] = useState("");

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

  const uploaddocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [types.pdf, types.docx],
      });
      console.log(
        "URI: " + res[0].uri,
        "Type: " + res[0].type,
        "Name: " + res[0].name,
        "Size: " + res[0].size
      );
      setDocument(res[0]);
      setdocumentName(res[0]?.name);

      const uriSegments = res[0].uri.split("/");
      const lastSegment = uriSegments[uriSegments.length - 1];
      setUrilastpath(lastSegment);
      console.log("lastSegment>>>>", lastSegment);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        // Error occurred
        console.log("Error occurred:", err);
      }
    }
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
      console.log("🚀 ~ getValidationList ~ response:", response.data);
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
    // let errorcreateddate = "";
    // let errorexpirationdate = "";
    let errordocument = "";
    let errordate = "";

    if (!editData?.name) {
      errorname = "title is required";
    } else if (editData?.name.length < 5) {
      errorname = "title length more than 5!";
    }
    if (!editData?.description) {
      errordescription = "description is required";
    }
    if (!document) {
      errordocument = "document is required";
    }
    if (!editData?.createddate || !editData?.expirationdate) {
      errordate = "date is required";
    }

    setinputError({
      errorname,
      errordescription,
      // errorcreateddate,
      // errorexpirationdate,
      errordocument,
      errordate,
    });

    return !errorname && !errordescription && !errordocument && !errordate;
  }

  const checkcountvalidation = () => {
    return true;
    if (documentListData.length < documentNumberValidation?.number) {
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
      console.log("🚀 ~ handleAddDocument ~ editData:", editData);
      setIsLoading(true);
      documentData.append("name", editData?.name);
      documentData.append("filetype", "document");
      documentData.append(
        "createddate",
        moment(editData?.createddate).format("YYYY-MM-DD")
      );
      documentData.append(
        "expirationdate",
        moment(editData?.expirationdate).format("YYYY-MM-DD")
      );
      documentData.append("description", editData?.description);
      documentData.append("documentfile", document);
      documentData.append("islicense", editData?.islicense ?? false);
      console.log("🚀 ~ handleAddDocument ~ documentData:", documentData);

      const authToken = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        "content-type": "multipart/form-data",
      };

      try {
        const response = await apiCall(
          "POST",
          apiEndPoints.ADDVIDEOFILE,
          documentData,
          headers
        );
        if (response.status === 200) {
          await getDocumentList(itemOffset);
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
          console.log("api in else handleAddPhoto", response);
          showMessage({
            message: response.data.message,
            type: "danger",
            duration: 3000,
          });
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
    if (formValidation()) {
      setIsLoading(true);
      const documentData = new FormData();
      documentData.append("name", editData?.name);
      documentData.append("filetype", "document");
      documentData.append(
        "createddate",
        moment(editData?.createddate).format("YYYY-MM-DD")
      );
      documentData.append(
        "expirationdate",
        moment(editData?.expirationdate).format("YYYY-MM-DD")
      );
      documentData.append("description", editData?.description);
      documentData.append("documentfile", document);
      documentData.append("islicense", editData?.islicense ?? false);
      documentData.append("fileid", editData?.fileid);
      console.log("🚀 ~ updateDocument ~ documentData:", documentData);
      const authToken = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        "content-type": "multipart/form-data",
      };
      try {
        const response = await apiCall(
          "POST",
          apiEndPoints.UPDATEVIDEOFILE,
          documentData,
          headers
        );
        if (response.status === 200) {
          await getDocumentList(itemOffset);
          setIsLoading(false);
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
          showMessage({
            message: response.data.message,
            type: "danger",
            duration: 3000,
          });
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
    const authToken = await AsyncStorage.getItem("userToken");
    const headers = {
      Authorization: `Bearer ${authToken}`,
      // "content-type": "multipart/form-data",
    };

    try {
      const response = await apiCall(
        "POST",
        apiEndPoints.VIDEODOCUMENTDELETE,
        params,
        headers
      );
      // console.log("responce ", response);
      if (response.data.status === 200) {
        await getDocumentList(itemOffset);
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
          onPress={() =>
            Linking.openURL(
              `https://smbmblobtest.blob.core.windows.net/attachments/${item.filefile}`
            )
          }
          style={styles.mainvideoview}
        >
          <Icon name="eye" size={28} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>
        {/* </View> */}
        <TouchableOpacity
          onPress={() => {
            Viewmodelshow(1),
              console.log("items-data", item.filefile),
              setEditData({
                ...item,
              });
          }}
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
              editData?.fileid && editData?.fileid
                ? updateDocument()
                : handleAddDocument();
            }}
            inputError={inputError}
            cleanSetEditData={cleanSetEditData}
            viewphotoselect={true}
            uploaddocument={uploaddocument}
            handlePhotoFileSize={handlePhotoFileSize}
            fileName={documentName}
          />
        )}
        {deleteModel && (
          <DeleteModel
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            filetype={filetype}
            fileid={selectfileid}
            deleteVideo={deleteDocument}
          />
        )}
      </View>
    </>
  );
};

export default DocumentList;
