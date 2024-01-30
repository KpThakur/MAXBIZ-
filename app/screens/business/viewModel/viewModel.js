import React, { useState, useEffect } from "react";
import { View, Modal, Text, ScrollView, TouchableOpacity, Image, FlatList, Touchable, Keyboard } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, Input, Header } from "@components";
import style from "./style"
import Icon from 'react-native-vector-icons/FontAwesome';
import StringsOfLanguages from "../../../utils/translations";
import {
  COMMON_COLOR,
} from "./../../../utils/constants";


const viewModel = ({
  setViewModel,
  viewModel,
  filetype
}) => {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [videoData, setVideoData] = useState({
    "name": '',
    "video": '',
    "filetype": 'video',
    "createddate": '',
    "description": ''
  })

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
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
      }}>
      <View
        //activeOpacity={0.5}
        onPress={() => {
          setViewModel(!viewModel);
          ///setVisibleBothModal(0)
        }}
        style={[style.modalContainermain, {
          flex: 2,
          justifyContent: Platform.OS == 'ios' ? isKeyboardVisible ? "center" : "flex-end" : "flex-end",
          bottom: Platform.OS == 'ios' ? isKeyboardVisible ? wp('13%') : wp('19%') : wp('00%'),
        }]}>
        <View style={[style.modalContainer]}>
          <View style={style.topheading}>
            <Text style={style.topheadingtext}>{StringsOfLanguages.ADD_NEW} {filetype === 'video' ? 'Video' : filetype === 'photo' ? 'Photo' : filetype === 'document' ? 'Document' : 'File'}</Text>
            <TouchableOpacity onPress={() => {
              setViewModel(!viewModel);
              ///setVisibleBothModal(0)
            }}>
              <Icon style={style.topheadingtext} name={StringsOfLanguages.REMOVE} ></Icon>
            </TouchableOpacity>
          </View>
          <View style={style.midelcontent}>

            <View style={{marginRight:15}}>
              <View style={style.input}>
                <Input
                  onChangeText={(val) => setVideoData({
                    ...videoData,
                    name: val
                  })}
                  value={videoData.name}
                  placeholder={StringsOfLanguages.ENTER_NAME}

                />
              </View>

              <View style={style.input}>
                <Input
                  onChangeText={(val) => setVideoData({
                    ...videoData,
                    video: val
                  })}
                  value={videoData.video}
                  placeholder={StringsOfLanguages.ENTER_URL}

                />
              </View>

              <View style={style.input}>
                <Input
                  onChangeText={(val) => setVideoData({
                    ...videoData,
                    description: val
                  })}
                  value={videoData.description}
                  placeholder={StringsOfLanguages.ENTER_DESCRIPTION}

                />
              </View>
              <View style={style.input}>
                <Input
                  onChangeText={(val) => setVideoData({
                    ...videoData,
                    createddate: val
                  })}
                  value={videoData.createddate}
                  placeholder={StringsOfLanguages.ENTER_DATE}

                />
              </View>
            </View>
          </View>
          <View style={style.bottumbutton}>
            <View style={style.buttonview}>
              <Button onPress={() => updatevideo()}
                buttonText={filetype === StringsOfLanguages.VIDEO ? StringsOfLanguages.ADD_NEW_VIDEO : filetype === StringsOfLanguages.PHOTO ? StringsOfLanguages.ADD_NEW_PHOTO : filetype === StringsOfLanguages.DOCUMENT ? StringsOfLanguages.ADD_NEW_DOCUMENT : StringsOfLanguages.ADD_NEW_FILE}
              />
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
};
export default viewModel;
