import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Touchable,
  Keyboard,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button, Input, Header } from "@components";
import style from "./style";
import Icon from "react-native-vector-icons/FontAwesome";
import StringsOfLanguages from "../../../utils/translations";
import styles from "../../home/component/style";
import {
  BORDERLINE_COLOR,
  COMMON_COLOR,
  GRADIENT_COLOR_NEW2,
  GRAY_COLOR,
} from "./../../../utils/constants";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";

const viewModel = ({
  setViewModel,
  viewModel,
  filetype,
  editData,
  setEditData,
  onPress,
  inputError,
  cleanSetEditData,
  viewphotoselect,
  uploaddocument,
  fileid,
  fileName,
  allServices,
  setSearchdata,
  searchdata,
  searchServicebyname,
}) => {
  console.log("🚀 ~ fileName:", fileName);
  // if (!editData?.expirationdate) {
  //   fileName = "";
  // }

  const today = new Date();
  const maximumDate = new Date();
  const nextYear = maximumDate.getFullYear() + 1;
  maximumDate.setFullYear(nextYear);
  console.log("🚀 ~ maximumDate:", maximumDate);
  console.log("🚀 ~ editData:", editData);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [videoData, setVideoData] = useState({
    name: "",
    video: "",
    filetype: "video",
    createddate: "",
    description: "",
  });

  const [date, setDate] = useState(new Date());
  // const [show, setShow] = useState(false);
  const [show_1, setShow_1] = useState(false);
  const [show_2, setShow_2] = useState(false);

  const SetCreateDate = async (event, selectedDate) => {
    console.log("🚀 ~ SetCreateDate ~ selectedDate:", selectedDate);
    setShow_1(false);
    await setEditData({
      ...editData,
      createddate: selectedDate,
    });
    console.log("🚀 ~ SetCreateDate ~ createddate:", editData?.createddate);
  };

  const SetExpirationDate = (event, selectedDate) => {
    console.log("🚀 ~ SetExpirationDate ~ selectedDate:", selectedDate);
    setShow_2(false);
    setEditData({
      ...editData,
      expirationdate: selectedDate,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Modal
      //animationType="slide"
      transparent={true}
      visible={viewModel}
      //backdropOpacity={0.9}
      onRequestClose={() => {
        setViewModel(!viewModel);
        ///setVisibleBothModal(0)
      }}
    >
      <View
        //activeOpacity={0.5}
        onPress={() => {
          setViewModel(!viewModel);
          ///setVisibleBothModal(0)
        }}
        style={[
          style.modalContainermain,
          {
            flex: 2,
            justifyContent:
              Platform.OS == "ios"
                ? isKeyboardVisible
                  ? "center"
                  : "flex-end"
                : "flex-end",
            bottom:
              Platform.OS == "ios"
                ? isKeyboardVisible
                  ? wp("13%")
                  : wp("19%")
                : wp("00%"),
          },
        ]}
      >
        <View style={[style.modalContainer]}>
          <View style={style.topheading}>
            <Text style={style.topheadingtext}>
              {editData?.fileid
                ? StringsOfLanguages.UPDATE
                : StringsOfLanguages.ADD_NEW}{" "}
              {filetype === "video"
                ? "Video"
                : filetype === "photo"
                ? "Photo"
                : filetype === "document"
                ? "Document"
                : filetype === "offer"
                ? "Offer"
                : filetype === "job"
                ? "Job"
                : "File"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setViewModel(!viewModel);
                cleanSetEditData();
                ///setVisibleBothModal(0)
              }}
            >
              <Icon
                style={style.topheadingtext}
                name={StringsOfLanguages.REMOVE}
              ></Icon>
            </TouchableOpacity>
          </View>
          <View style={style.midelcontent}>
            <View style={{ marginRight: 15 }}>
              {filetype === "job" && (
                <View style={style.input}>
                  <Dropdown
                    showsVerticalScrollIndicator={false}
                    style={[styles.dropdown, { marginLeft: "7%" }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={
                      searchdata.servicename.length > 55
                        ? styles.selectedTextStylelong
                        : searchdata.servicename.length > 33
                        ? styles.selectedTextSortlong
                        : styles.selectedTextStyle
                    }
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={styles.dropdownContener}
                    data={allServices ? allServices : []}
                    search
                    onChangeText={searchServicebyname}
                    maxHeight={300}
                    labelField="title"
                    valueField="naicsid"
                    placeholder={StringsOfLanguages.SELECT_YOUR_SERVICE}
                    searchPlaceholder={StringsOfLanguages.SEARCH_SERVICE}
                    value={searchdata.serviceid}
                    onChange={(val) =>
                      setSearchdata({
                        ...searchdata,
                        serviceid: val.naicsid,
                        servicename: val.title,
                      })
                    }
                  />
                </View>
              )}
              <View style={style.input}>
                <Input
                  onChangeText={(val) => {
                    console.log("🚀 ~ val:", val);
                    setEditData({
                      ...editData,
                      name: val,
                    });
                  }}
                  value={editData.name}
                  placeholder={
                    !editData?.name &&
                    (filetype === "video"
                      ? "Title video"
                      : filetype === "photo"
                      ? "Title photo"
                      : filetype === "document"
                      ? "Title document"
                      : filetype === "offer"
                      ? "Offer Title"
                      : filetype === "job"
                      ? "Job Title"
                      : "file Title")
                  }
                />
                <Text style={[style.errorText, { marginTop: "-4%" }]}>
                  {inputError.errorname}
                </Text>
              </View>
              {filetype === "video" && (
                <View style={style.input}>
                  <Input
                    onChangeText={(val) =>
                      setEditData({
                        ...editData,
                        youtubeLink: val,
                      })
                    }
                    value={editData.youtubeLink}
                    placeholder={
                      !editData.youtubeLink &&
                      (filetype === "video" ? "Youtube video link" : "")
                    }
                    multiline={true}
                    maxLength={70}
                  />
                  <Text style={style.errorText}>
                    {inputError.erroryoutubeLink}
                  </Text>
                </View>
              )}
              {filetype !== "photo" && filetype !== "offer" && (
                <View style={style.input}>
                  <Input
                    onChangeText={(val) =>
                      setEditData({
                        ...editData,
                        description: val,
                      })
                    }
                    value={editData.description}
                    placeholder={
                      !editData?.description &&
                      StringsOfLanguages.ENTER_DESCRIPTION
                    }
                  />
                  <Text style={[style.errorText, { marginTop: "-4%" }]}>
                    {inputError.errordescription}
                  </Text>
                </View>
              )}
              {filetype !== "photo" && filetype !== "video" && (
                <View>
                  <View
                    style={{
                      marginHorizontal: "7%",
                      marginTop: "5%",
                      marginBottom: -8,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: GRAY_COLOR }}>
                      Effective Date
                    </Text>
                  </View>
                  <View
                    style={[
                      style.input,
                      {
                        // width: "90%",
                        // alignSelf: "center",
                        borderBottomWidth: 2,
                        borderColor: BORDERLINE_COLOR,
                        marginLeft: "7%",
                        // marginVertical: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        // paddingHorizontal: 22,
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: GRAY_COLOR,
                      }}
                    >
                      {editData?.createddate
                        ? moment(editData?.createddate).format("DD-MM-YYYY")
                        : "DD-MM-YYYY"}
                    </Text>
                    <TouchableOpacity
                      style={[style.mainvideoview]}
                      onPress={() => setShow_1(true)}
                    >
                      <Icon
                        name="calendar"
                        size={25}
                        color={GRADIENT_COLOR_NEW2}
                      />
                    </TouchableOpacity>

                    {show_1 && (
                      <RNDateTimePicker
                        testID="dateTimePicker"
                        value={
                          editData?.createddate
                            ? new Date(editData?.createddate)
                            : today
                        }
                        minimumDate={today}
                        maximumDate={
                          editData?.expirationdate
                            ? new Date(editData?.expirationdate)
                            : maximumDate
                        }
                        mode="date"
                        onChange={SetCreateDate}
                      />
                    )}
                  </View>
                  <Text style={style.errorText}>{inputError.errordate}</Text>
                  <View
                    style={{
                      marginHorizontal: "7%",
                      marginTop: "5%",
                      marginBottom: -8,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: GRAY_COLOR }}>
                      Expiration Date
                    </Text>
                  </View>
                  <View
                    style={[
                      style.input,
                      {
                        // width: "90%",
                        // alignSelf: "center",
                        borderBottomWidth: 2,
                        borderColor: BORDERLINE_COLOR,
                        marginLeft: "7%",
                        // marginVertical: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        // paddingHorizontal: 22,
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: GRAY_COLOR,
                      }}
                    >
                      {editData?.expirationdate
                        ? moment(editData.expirationdate).format("DD-MM-YYYY")
                        : "DD-MM-YYYY"}
                    </Text>
                    <TouchableOpacity
                      style={[style.mainvideoview]}
                      onPress={() => setShow_2(true)}
                    >
                      <Icon
                        name="calendar"
                        size={25}
                        color={GRADIENT_COLOR_NEW2}
                      />
                    </TouchableOpacity>

                    {show_2 && (
                      <RNDateTimePicker
                        testID="dateTimePicker"
                        value={
                          editData?.expirationdate
                            ? new Date(editData?.expirationdate)
                            : today
                        }
                        minimumDate={
                          editData?.createddate
                            ? new Date(editData?.createddate)
                            : today
                        }
                        mode="date"
                        onChange={SetExpirationDate}
                      />
                    )}
                  </View>
                  <Text style={style.errorText}>{inputError.errordate}</Text>
                </View>
              )}
            </View>
          </View>

          {viewphotoselect && filetype !== "job" && (
            <View
              style={[
                style.secondText,
                {
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              ]}
            >
              <View style={style.photoView}>
                <Text style={style.labelText}>Upload {filetype}</Text>
              </View>
              <View style={style.photoView}>
                <Button
                  buttonText={StringsOfLanguages.BROWSE}
                  onPress={() => uploaddocument()}
                />
              </View>
              <Text
                style={[
                  style.errorText,
                  {
                    color: COMMON_COLOR,
                    position: "absolute",
                    right: "4%",
                    bottom: "4%",
                  },
                ]}
              >
                {fileName}
              </Text>
              <Text style={style.errorText}>{inputError.errordocument}</Text>
              {/* <Text style={style.errorText}>
                {filetype === "photo"
                  ? inputError.errorPhoto
                  : filetype === "document"
                  ? inputError.errordocument
                  : filetype === "offer"
                  ? inputError.errorOffer
                  : filetype === "job"
                  ? errorJob
                  : errorfile}
              </Text> */}
            </View>
          )}

          <View style={style.bottumbutton}>
            <View style={style.buttonview}>
              <Button
                onPress={() => onPress()}
                buttonText={
                  editData?.fileid
                    ? filetype === "video"
                      ? StringsOfLanguages.UPDATE_VIDEO
                      : filetype === "photo"
                      ? StringsOfLanguages.UPDATE_PHOTO
                      : filetype === "document"
                      ? StringsOfLanguages.UPDATE_DOCUMENT
                      : filetype === "offer"
                      ? StringsOfLanguages.UPDATE_OFFER
                      : filetype === "job"
                      ? StringsOfLanguages.UPDATE_JOB
                      : StringsOfLanguages.ADD_NEW_FILE
                    : filetype === "video"
                    ? StringsOfLanguages.ADD_NEW_VIDEO
                    : filetype === "photo"
                    ? StringsOfLanguages.ADD_NEW_PHOTO
                    : filetype === "document"
                    ? StringsOfLanguages.ADD_NEW_DOCUMENT
                    : filetype === "offer"
                    ? StringsOfLanguages.ADD_NEW_OFFER
                    : filetype === "job"
                    ? StringsOfLanguages.ADD_NEW_JOB
                    : StringsOfLanguages.ADD_NEW_FILE
                }
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default viewModel;
