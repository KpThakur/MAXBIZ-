import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
  BackHandler,
  Modal,
} from "react-native";

import styles from "./style";
import commomstyle from "../../../common/styles";
import { Button, Input, Header } from "../../../components";
import { ICONS, LOGOIMAGE } from "../../../utils/imagePath";
import LinearGradient from "react-native-linear-gradient";
import {
  BLACK_COLOR,
  COMMON_COLOR,
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
  GRAY_COLOR,
  LINEAR_GRAD_COLOR,
  WHITE_COLOR,
} from "../../../utils/constants";
import StringsOfLanguages from "../../../utils/translations";
import { Dropdown } from "react-native-element-dropdown";
import Video from "react-native-video";
import { Slider } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const colors = [
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
];
//const colors = ['#FF5733', '#FFC300', '#33FF57'];
const locations = [0.24, 0.63, 0.87, 0.99];
//const locations = [0.1, 0.5, 0.9];

const HomeView = (props) => {
  const {
    currLang,
    allServices,
    allCity,
    toggleLanguage,
    toggleShowSearch,
    setSearchdata,
    searchdata,
    setService,
    searchService,
    searchServicebyname,
    getcitylist,
    isFetchingServices,
    isFetchingCities,
  } = props;
  const [pausedvideo, SetPausedVideo] = useState(false);

  const [totalDuration, setTotalDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [isMuted, setIsMuted] = React.useState(false);
  const [duration, setduration] = useState(0.1);
  const [overlay, setoverlay] = useState(false);

  const playerRef = useRef();
  const overlayTimer = useRef(null);

  // const onslide = (slide) => {
  //   playerRef.current.seek(slide * duration);
  //   clearTimeout(overlayTimer.current);
  //   overlayTimer.current = setTimeout(() => setoverlay(false), 3000);
  // };

  const onslide = (slide) => {
    const newCurrentTime = slide * totalDuration;
    setCurrentTime(newCurrentTime);
    playerRef.current.seek(newCurrentTime, 100);
    clearTimeout(overlayTimer.current);
    overlayTimer.current = setTimeout(() => setoverlay(false), 3000);
  };

  const load = ({ duration }) => {
    setTotalDuration(duration);
    setduration(duration);
  };

  const progress = ({ currentTime }) => {
    setCurrentTime(currentTime);
  };

  const playvideo = () => {
    SetPausedVideo(!pausedvideo);
  };

  // const onProgress = ({ currentTime }) => {
  //   setCurrentTime(currentTime);
  // };

  // const onLoad = ({ duration }) => {
  //   setTotalDuration(duration);
  // };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const AppExitModal = ({ visible, onClose, onExitApp }) => {
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          openModal();
          return true;
        };

        BackHandler.addEventListener("hardwareBackPress", onBackPress);

        return () => {
          BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        };
      }, [openModal])
    );
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => onClose()}
      >
        <View style={styles.modalMainView}>
          <View style={styles.modalContainView}>
            <Text style={styles.modalTextHoldStyle}>Hold on!</Text>
            <Text style={styles.modalTextStyle}>
              Are you sure you want to close this app ?
            </Text>

            <View style={styles.buttnView}>
              <TouchableOpacity onPress={() => onClose()}>
                <Text style={[styles.buttnText, { color: COMMON_COLOR }]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onExitApp()}>
                <Text style={styles.buttnText}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onExitApp = () => {
    BackHandler.exitApp();
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       Alert.alert("Hold on!", "Are you sure you want to close this app ?", [
  //         {
  //           text: "Cancel",
  //           onPress: () => null,
  //           style: "cancel",
  //         },
  //         { text: "YES", onPress: () => BackHandler.exitApp() },
  //       ]);
  //       return true;
  //     };
  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);
  //     return () =>
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //   }, [])
  // );

  return (
    <SafeAreaView style={commomstyle.container}>
      <StatusBar
        animated={true}
        backgroundColor={WHITE_COLOR}
        barStyle="dark-content"
      />
      <Header
        onPressLeft={toggleShowSearch}
        //onPressRight={props.drawerOpen()}
        headerType={"other"}
        leftImg={LOGOIMAGE.LOGO}
        leftImgStyl={styles.leftImg}
        rightImg={true}
        //headerText={'Find Local Services'}
        headertxt={styles.headerTxt}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerview}
      >
        <View style={styles.topview}>
          <View style={styles.texttop}>
            <Text style={styles.regisViewTxt}>
              {StringsOfLanguages.Find_Local_Services}
            </Text>
          </View>
          <View style={styles.inputView}>
            <View style={styles.input}>
              <Dropdown
                showsVerticalScrollIndicator={false}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
               // selectedTextStyle={styles.selectedTextStyle}
               // selectedTextStyle={searchdata.servicename.length > 35 ? styles.selectedTextStylelong : styles.selectedTextStyle}
                selectedTextStyle={searchdata?.servicename?.length > 55 ? styles.selectedTextStylelong : searchdata?.servicename?.length > 33 ? styles.selectedTextSortlong : styles.selectedTextStyle}
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

                // renderRightIcon={() =>
                //   isFetchingServices && (
                //     <ActivityIndicator
                //       size={"large"}
                //       style={styles.placeholderStyle}
                //       color={GRADIENT_COLOR_NEW1}
                //     />

                //   )
                // }
                // renderRightIcon={() => {
                //   if (isFetchingServices) {
                //     return <ActivityIndicator size={'large'} color={GRADIENT_COLOR_NEW1} style={styles.placeholderStyle} />;
                //   } else if (!allServices || allServices.length === 0) {
                //     return null;
                //   } else {
                //     return null;
                //   }
                // }}

                /*  renderLeftIcon={() => (
                             <AntDesign style={style.icon} color="black" name="Safety" size={20} />
                            )} */
              />
            </View>
            {/*  <View style={styles.input}>
                                <Input
                                    image={"noNeed"}
                                    placeholder={'What service you want ?'}
                                    onChangeText={(val) => setSearchdata({
                                        ...searchdata,
                                        service_id: val
                                    })}
                                    value={searchdata.service_id}


                                />
                            </View> */}
            <View style={styles.input}>
              <Dropdown
                showsVerticalScrollIndicator={false}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                containerStyle={styles.dropdownContener}
                data={allCity ? allCity : []}
                search
                onChangeText={getcitylist}
                maxHeight={300}
                // labelField="city"
                labelField="formattedLabel"
                valueField="id"
                // valueField="state_id"
                placeholder={StringsOfLanguages.SELECT_YOUR_CITY}
                searchPlaceholder={StringsOfLanguages.SEARCH_CITY}
                value={searchdata.cityid}
                onChange={(val) =>
                  setSearchdata({
                    ...searchdata,
                    cityid: val.id,
                    cityname: val.city,
                    // stateid: val.state_id
                  })
                }
                textColor="#FFF"
                // renderRightIcon={() =>
                //   isFetchingCities && (
                //     <ActivityIndicator
                //       size={"large"}
                //       style={styles.placeholderStyle}
                //       color={GRADIENT_COLOR_NEW1}
                //     />
                //   )
                // }

                // renderRightIcon={() => {
                //   if (isFetchingCities) {
                //     return <ActivityIndicator size={'large'} color={GRADIENT_COLOR_NEW1} style={styles.placeholderStyle} />;
                //   } else if (!allCity || allCity.length === 0) {
                //     return null;
                //   } else {
                //     return null;
                //   }
                // }}
                /*  renderLeftIcon={() => (
                             <AntDesign style={style.icon} color="black" name="Safety" size={20} />
                            )} */
              />
              {/*  <Input
                                    image={"noNeed"}
                                    placeholder={StringsOfLanguages.CityName}
                                    onChangeText={(val) => setSearchdata({
                                        ...searchdata,
                                        city_id: val
                                    })}
                                    value={searchdata.city_id}
                                /> */}
            </View>
            <View style={styles.inputButton}>
              <TouchableOpacity>
                <Button
                  onPress={searchService}
                  buttonText={StringsOfLanguages.SEARCHSERVICE}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/*  <View style={styles.texttop}>               
                    <Text style={styles.regisViewTxt}>Get FREE local leads</Text>
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => props.loginScreen() }
                            buttonText={'REGISTER YOUR SMB'}
                        />
                    </View>  */}
        </View>

        {/* <View style={styles.topviewsecond}>

                       
                        <View style={styles.texttop}>
                            <Text style={styles.regisViewTxt}>{StringsOfLanguages.GetFREElocalleads}</Text>
                        </View>
                        <View style={styles.button}>
                            <Button onPress={() => props.loginScreen()}
                                buttonText={StringsOfLanguages.REGISTERNOW}
                            />
                        </View>
                    </View> */}
        <View style={styles.maskView}>
          <View style={styles.imgView}>
            {/* <Image style={styles.maskImg} source={require('./../../../assets/dummy/construction1.jpeg')} /> */}
            {/* <Video
              source={require("../../../assets/video/FinalVideo2.mp4")}
              ref={(ref) => {
                this.player = ref;
              }}
             // ref={playerRef}
              autoPlay={false}
              resizeMode="contain"
              paused={pausedvideo}
              onBuffer={this.onBuffer}
              onError={this.videoError}
              style={styles.backgroundVideo}
             // onProgress={progress}
             // onLoad={load}
            //  muted={isMuted}
             // currentTime={currentTime}
            /> */}

            {/* {pausedvideo ? (
              <TouchableOpacity onPress={() => playvideo()}>
                <Image
                  style={styles.imageDesignplayicon}
                  source={ICONS.playIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => playvideo()}>
                <Image
                  style={[
                    styles.imageDesignplayicon,
                    { width: 65, height: 65, bottom: 65 },
                    //  {backgroundColor:'white', borderRadius: 25, tintColor:'rgba(0, 0.1, 0.1, 0.1)' }
                  ]}
                  source={ICONS.pause_Icon48dp}
                />
              </TouchableOpacity>
            )} */}

            {/* {pausedvideo && currentTime > 0 ? (
              <TouchableOpacity onPress={() => playvideo()}>
                <Image
                  style={styles.imageDesignplayicon}
                  source={ICONS.playIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => playvideo()}>
                <Image
                  style={[
                    styles.imageDesignplayicon,
                    { width: 65, height: 65, bottom: 65 },
                    //  {backgroundColor:'white', borderRadius: 25, tintColor:'rgba(0, 0.1, 0.1, 0.1)' }
                  ]}
                  source={ICONS.pause_Icon48dp}
                />
              </TouchableOpacity>
            )}
            <View style={styles.timeView}>
              <Text style={styles.timeStyle}>
                {formatTime(currentTime)} /{formatTime(totalDuration)}
              </Text>

              {isMuted ? (
                <TouchableOpacity onPress={() => setIsMuted((m) => !m)}>
                  <Image style={styles.muteICON} source={ICONS.mic_Off_Icon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsMuted((m) => !m)}>
                  <Image style={styles.muteICON} source={ICONS.mic_On_Icon} />
                </TouchableOpacity>
              )}
            </View> */}

            {/* <Slider
              style={styles.sliderStyle}
              maximumTrackTintColor="white"
              minimumTrackTintColor="red"
              thumbTintColor={"red"}
              thumbStyle={styles.thumbStyle}
              value={currentTime / duration}
              // value={currentTime / totalDuration}
              onValueChange={onslide}
            /> */}

            {/* <TouchableOpacity onPress={() => {
                                playvideo()
                            }}>
                             {
                               pausedvideo ?
                               <Image onPress={() => 
                                playvideo()} style={styles.imageDesignplayicon} source={ICONS.playIcon} />
                                :<Image onPress={() => 
                                    playvideo()} style={styles.imageDesignplayicon} source={ICONS.playIcon} />
                             }
                            </TouchableOpacity>  */}
          </View>

          {/* <View style={styles.toggleView}>
                            <TouchableOpacity style={styles.toggleButton} onPress={(val) => toggleLanguage('EN')}>
                                <Text style={[styles.toggleTxt, currLang === 'EN' ? styles.enabled : '']}>{StringsOfLanguages.ENGLISH}</Text>
                            </TouchableOpacity>
                            <Text>|</Text>
                            <TouchableOpacity style={styles.toggleButton} onPress={(val) => toggleLanguage('HI')}>
                                <Text style={[styles.toggleTxt, currLang === 'HI' ? styles.enabled : '']}>{StringsOfLanguages.HINDI}</Text>
                            </TouchableOpacity>
                        </View> */}
        </View>
      </ScrollView>

      <AppExitModal
        visible={modalVisible}
        onClose={closeModal}
        onExitApp={onExitApp}
      />
    </SafeAreaView>
  );
};

export default HomeView;
