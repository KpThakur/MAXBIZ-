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

const JobList = ({ filetype, getJobList, jobListData }) => {
  console.log("🚀 ~ Joblist ~ JobListData:", jobListData);
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
  const [jobId, setJobId] = useState("");

  const [editData, setEditData] = useState({
    title: "",
    filetype: "job",
    createddate: "",
    fileid: "",
    islogo: false,
  });

  useEffect(() => {
    getValidationList();
    getImage();
    getImageModal();
  }, []);

  const [validationData, setValidationData] = useState([]);
  const [jobNumberValidation, setjobNumberValidation] = useState(0);
  async function getValidationList() {
    const response = await apiCall("GET", apiEndPoints.GETVALIDATIONLIST);
    if (response.status == 200) {
      setValidationData(response.data.data);
      setjobNumberValidation(
        response.data.data.find((x) => x.lable == "addphoto")
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
    if (jobListData.length < jobNumberValidation?.number) {
      return true;
    } else {
      Alert.alert(
        "Oops...",
        `You have already uploaded ${jobNumberValidation?.number} offfers`,
        [
          {
            text: "OK",
            // onPress: () => console.log("OK Pressed"),
          },
        ],
        { cancelable: false }
      );
    }
  };

  function cleanSetEditData() {
    setEditData({
      title: "",
      filetype: "offer",
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

  const handleDeleteModal = (jobId) => {
    setDeleteModel(!deleteModel);
    setJobId(jobId);

    console.log("find jobId ", jobId);
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
        console.log("find offer", response.data.url);
      } else {
        console.lig("offer in else");
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

  const handleAddJob = async () => {
    if (formValidation() && checkcountvalidation()) {
      console.log("🚀 ~ handleAddJob ~ editData:", editData);

      const param = {
        occupation_id: editData.occupation_id,
        title: editData.name,
        createddate: "15-06-2024",
        expirationdate: "30-06-2024",
        description: editData.description,
      };
      const headers = {
        "content-type": "multipart/form-data",
      };

      try {
        const { data } = await apiCall(
          "POST",
          apiEndPoints.ADDJOB,
          param,
          headers
        );
        console.log("🚀 ~ handleAddOffer ~ data:", data);
        if (data.status === 200) {
          setIsLoading(false);
          setEditStatus(false);
          cleanSetEditData();
          setViewModel(false);
          showMessage({
            message: data.message,
            type: "success",
            duration: 3000,
          });
        } else {
          console.log("api in else handleAddPhoto", data);
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
  const updateJob = async () => {
    if (!formValidation()) {
      setIsLoader(true);
      const param = {
        occupation_id: editData.occupation_id,
        title: editData.title,
        createddate: editData.createddate,
        expirationdate: editData.expirationdate,
        description: editData.description,
        jobid: editData.jobid,
      };
      try {
        const { data } = await apiCall("POST", apiEndPoints.UPDATEJOB, param);
        if (data.status === 200) {
          setIsLoading(false);
          getJobList();
          setViewModel(false);
          showMessage({
            message: data.message,
            type: "success",
            duration: 3000,
          });
          cleanSetEditData();
        } else {
          setIsLoading(false);
          console.log("api in else updateVideo", data);
        }
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      console.log("validation failed");
    }
  };

  const deleteJob = async (jobId) => {
    const params = {
      jobid: jobId,
    };

    console.log("jobid: jobid", jobId);
    const headers = {
      "content-type": "multipart/form-data",
    };
    try {
      const response = await apiCall(
        "POST",
        apiEndPoints.JOBDELETE,
        params,
        headers
      );
      // console.log("responce ", response);
      if (response.status === 200) {
        getJobList();
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
            <Text style={styles.serveTxt}>{StringsOfLanguages.JOB}</Text>
          </View>
          <View style={styles.addViewcontent}>
            <Text style={styles.addrsTxt}>{item?.occupation}</Text>
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
            handleDeleteModal(item?.jobId)
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
          data={jobListData}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
          //   keyExtractor={(item) => item.fileid.toString()}
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
                ? updateJob()
                : handleAddJob();
            }}
            inputError={inputError}
            cleanSetEditData={cleanSetEditData}
            viewphotoselect={true}
            // uploadoffer={uploadoffer}
            // handlePhotoFileSize={handlePhotoFileSize}
          />
        )}
        {deleteModel && (
          <DeleteModel
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            filetype={filetype}
            fileid={selectfileid}
            deleteVideo={deleteJob}
            offerId={offerId}
            jobId={jobId}
          />
        )}
      </View>
    </>
  );
};

export default JobList;
