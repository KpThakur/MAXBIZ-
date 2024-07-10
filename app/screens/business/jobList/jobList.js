import React, { useContext, useEffect, useState } from "react";
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
import { SearchContext } from "../../../utils/searchContext";

const JobList = ({ filetype, getJobList, jobListData, itemOffset }) => {
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
  const [allServices, setAllServices] = useState([]);
  const [searchdata, setSearchdata] = useContext(SearchContext);
  console.log("🚀 ~ JobList ~ searchdata:", searchdata);

  const [editData, setEditData] = useState({
    title: "",
    createddate: "",
    description: "",
    expirationdate: "",
    jobid: "",
    occupation_id: "",
    occupation: "",
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
    let errordate = "";

    if (!editData?.name) {
      errorname = "title is required";
    } else if (editData?.name.length < 5) {
      errorname = "title length more than 5!";
    }
    if (!editData?.description) {
      errordescription = "description is required";
    }
    if (!editData?.createddate || !editData?.expirationdate) {
      errordate = "date is required";
    }

    setinputError({
      errorname,
      errordescription,
      errorcreateddate,
      errorexpirationdate,
      erroreditDocument,
      errordate,
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
    return true;
    if (jobListData.length < jobNumberValidation?.number) {
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
    console.log("🚀 ~ handleDeleteModal ~ jobId:", jobId);
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
        occupation_id: searchdata?.serviceid,
        title: editData?.name,
        createddate: moment(editData?.createddate).format("YYYY-MM-DD"),
        expirationdate: moment(editData?.expirationdate).format("YYYY-MM-DD"),
        description: editData?.description,
      };
      console.log("🚀 ~ handleAddJob ~ param:", param);

      const authToken = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        // "content-type": "multipart/form-data",
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
          getJobList(itemOffset);
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
          showMessage({
            message: data.message,
            type: "success",
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
  const updateJob = async () => {
    if (formValidation()) {
      setIsLoading(true);
      const param = {
        occupation_id: searchdata?.serviceid,
        title: editData?.name,
        createddate: moment(editData?.createddate).format("YYYY-MM-DD"),
        expirationdate: moment(editData?.expirationdate).format("YYYY-MM-DD"),
        description: editData?.description,
        jobid: editData?.jobid,
      };
      const authToken = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        // "content-type": "multipart/form-data",
      };
      try {
        const { data } = await apiCall(
          "POST",
          apiEndPoints.UPDATEJOB,
          param,
          headers
        );
        if (data.status === 200) {
          setIsLoading(false);
          getJobList(itemOffset);
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
          showMessage({
            message: data.message,
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

  const deleteJob = async () => {
    const params = {
      jobid: jobId,
    };

    console.log("jobid: jobid", jobId);
    const authToken = await AsyncStorage.getItem("userToken");
    const headers = {
      Authorization: `Bearer ${authToken}`,
      // "content-type": "multipart/form-data",
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
        getJobList(itemOffset);
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

  const searchServicebyname = async (val) => {
    if (val.length >= 3) {
      console.log("🚀 ~ searchServicebyname ~ val:", val);
      const authToken = await AsyncStorage.getItem("userToken");
      const headers = {
        Authorization: `Bearer ${authToken}`,
        // "content-type": "multipart/form-data",
      };
      try {
        const params = {
          servicename: val,
        };
        const response = await apiCall(
          "POST",
          apiEndPoints.GETSERVICENAME,
          params,
          headers
        );
        console.log("🚀 ~ searchServicebyname ~ response:", response.data);
        if (response.status === 200) {
          setAllServices(response.data.data);
        } else {
        }
      } catch (error) {
        console.error("Error in searchServicebyname:", error);
      }
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
          onPress={() => {
            Viewmodelshow(1),
              console.log("items-data", item),
              setEditData({
                ...item,
              });
          }}
          style={styles.mainvideoview}
        >
          <Icon name="edit" size={28} color={GRADIENT_COLOR_NEW2} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={
            () =>
              // Viewmodelshow(2)
              handleDeleteModal(item?.jobid)
            // console.log("🚀 ~ JobList ~ item:", item?.jobid)
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
            allServices={allServices}
            setSearchdata={setSearchdata}
            searchdata={searchdata}
            searchServicebyname={searchServicebyname}
          />
        )}
        {deleteModel && (
          <DeleteModel
            deleteModel={deleteModel}
            setDeleteModel={setDeleteModel}
            filetype={filetype}
            fileid={selectfileid}
            deleteVideo={deleteJob}
            // offerId={offerId}
            jobId={jobId}
          />
        )}
      </View>
    </>
  );
};

export default JobList;
