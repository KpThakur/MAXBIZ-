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
import { COMMON_COLOR } from "./../../../utils/constants";

const deleteModel = ({
  setDeleteModel,
  deleteModel,
  filetype,
  deleteVideo,
  fileid,
  offerId,
  jobId,
}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [videoData, setVideoData] = useState({
    name: "",
    video: "",
    filetype: "video",
    createddate: "",
    description: "",
  });

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

  const deletecontent = () => {
    console.log("🚀 ~ deletecontent ~ fileid:", fileid);
    setDeleteModel(!deleteModel);
    deleteVideo(fileid, filetype, offerId, jobId);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={deleteModel}
      onRequestClose={() => {
        setDeleteModel(!deleteModel);
        ///setVisibleBothModal(0)
      }}
    >
      <View
        activeOpacity={1}
        onPress={() => {
          setDeleteModel(!deleteModel);
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
              {StringsOfLanguages.DELETE}
              {filetype === "video"
                ? "Video"
                : filetype === "photo"
                ? "Photo"
                : filetype === "document"
                ? "Document"
                : "File"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setDeleteModel(!deleteModel);
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
            <Text style={style.confirmtxt}>
              {StringsOfLanguages.ARE_YOU_SURE_YOU_WANT_TO_DELETE}
              {filetype === "video"
                ? "Video"
                : filetype === "photo"
                ? "Photo"
                : filetype === "document"
                ? "Document"
                : "File"}{" "}
              ?
            </Text>
          </View>
          <View style={style.bottumbutton}>
            <View style={style.buttonview}>
              <Button
                onPress={() => deletecontent()}
                buttonText={StringsOfLanguages.YES}
              />
            </View>
            <View style={style.buttonview}>
              <Button
                onPress={() => setDeleteModel(!deleteModel)}
                buttonText={StringsOfLanguages.NO}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default deleteModel;
