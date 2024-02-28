import React, { Fragment, useState, useCallback, useRef } from "react";
import styles from "./style";
import profile_img from "../../../assets/images/review-img-01.png";
import profile_img2 from "../../../assets/images/review-img-02.png";
import profile_img3 from "../../../assets/images/review-img-03.png";
import StringsOfLanguages from "../../../utils/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Modal,
  StatusBar,
} from "react-native";

import commomstyles from "../../../common/styles";
import { Header } from "@components";
import { ICONS } from "@utils/imagePath";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  WHITE_COLOR,
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
} from "../../../utils/constants";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
// import YoutubeIframe from "react-native-youtube-iframe";
import YoutubePlayer from "react-native-youtube-iframe";
import { ActivityIndicator } from "react-native";

const DATA = [
  {
    id: "1",
    profileImage: require("../../../assets/dummy/construction2.jpg"),
    channel_id: "1",
    url: "https://www.youtube.com/watch?v=1hLBCOlptq8",
  },
  {
    id: "2",
    profileImage: require("../../../assets/dummy/construction2.jpg"),
    channel_id: "2",
    url: "https://www.youtube.com/watch?v=N6f_sayw0mM",
  },
  {
    id: "3",
    profileImage: require("../../../assets/dummy/construction2.jpg"),
    channel_id: "3",
    url: "https://www.youtube.com/watch?v=E_jUq6Ssx5Y",
  },
  {
    id: "4",
    profileImage: require("../../../assets/dummy/construction2.jpg"),
    channel_id: "4",
    url: "https://www.youtube.com/watch?v=7pQf29yJtmg",
  },
  {
    id: "5",
    profileImage: require("../../../assets/dummy/profile2.jpg"),
    channel_id: "5",
    url: "https://www.youtube.com/watch?v=x0RTwqaRock",
  },
  {
    id: "6",
    profileImage: require("../../../assets/dummy/profile2.jpg"),
    channel_id: "6",
    url: "https://www.youtube.com/watch?v=tkk-t9reNk8",
  },
];

const VideoListView = (props) => {
  const [playing, setPlaying] = useState(false);
  const [videoModel, setVideoModel] = useState(false);
  const [playvideoId, setPlayvideoId] = useState("");
  const [loading, setLoading] = useState(false);

  const { type, contentdata, backscreen } = props;
  const ratingCompleted = (rating) => {
  };

  /* const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []); */

  const videoPlay = (videolink) => {
    setLoading(true);
    const videoId = extractVideoId(videolink);
    setPlayvideoId(videoId);
    setVideoModel(!videoModel);
  };

  const onReady = () => {
    setLoading(false);
    clearLoadingTimeout();
  };

  const loadingTimeout = setTimeout(() => {
    setLoading(false);
  }, 2000);

  const clearLoadingTimeout = () => {
    clearTimeout(loadingTimeout);
  };

  window.clearLoadingTimeout = clearLoadingTimeout;

  const extractVideoId = (youtubeUrl) => {
    const regex =
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = youtubeUrl.match(regex);
    return match ? match[1] : null;
  };

  const renderItem = ({ item }) => (
    <View>
     
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            // onPress={() => Linking.openURL(item?.youtubeLink)}
            onPress={() => videoPlay(item?.youtubeLink)}
          >
            <Image
              style={styles.imageDesignVideo}
              source={require("../../../assets/dummy/videos.png")}
              // source={require("../../../assets/dummy/video_thumb.png")}
              //source={{ uri: `${item.filefile}` }}
            />
            <Image style={styles.imageDesignplayicon} source={ICONS.playIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.border}></View>
    </View>
  );

  return (
    <SafeAreaView style={commomstyles.container}>
      <StatusBar
          animated={true}
          backgroundColor={WHITE_COLOR}
          barStyle="dark-content"
        />
      <Header
        rightImgStyl={{ tintColor: WHITE_COLOR }}
        rightImg={true}
        headerText={type}
        backscreen={backscreen}
        showFindServiceOnBack={true}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contentdata}
        renderItem={renderItem}
       // keyExtractor={(item) => item.id}
        keyExtractor={(item, index) => item.id || index.toString()}
      />

      <Modal
        animationType="none"
        transparent={true}
        visible={videoModel}
        onRequestClose={() => {
          setVideoModel(!videoModel);
          ///setVisibleBothModal(0)
        }}
      >
        <View
          activeOpacity={1}
          onPress={() => {
            setVideoModel(!videoModel);
            ///setVisibleBothModal(0)
          }}
          style={[
            styles.modalContainermain,
            {
              flex: 1,
              justifyContent: "center",
              // Platform.OS == "ios"
              // ? isKeyboardVisible
              //     ? "center"
              //     : "center"
              //   : "center",
              //bottom: Platform.OS == 'ios' ? isKeyboardVisible ? wp('13%') : wp('19%') : wp('00%'),
            },
          ]}
        >
          <View style={[styles.modalContainer]}>
            <View style={styles.topheading}>
              <Text style={styles.topheadingtext}>Play Video</Text>
              <TouchableOpacity
                onPress={() => {
                  setVideoModel(!videoModel);
                  ///setVisibleBothModal(0)
                }}
              >
                <Icon
                  style={styles.topheadingtext}
                  name={StringsOfLanguages.REMOVE}
                ></Icon>
              </TouchableOpacity>
            </View>
            <View style={styles.midelcontent}>
              {loading ? (
                <ActivityIndicator size={"large"} style={styles.midelcontent} />
              ) : (
                <YoutubePlayer
                  width={350}
                  height={400}
                  // play={playing}
                  videoId={playvideoId ? playvideoId : "iee2TATGMyI"}
                  // onChangeState={() => onStateChange()}
                  onReady={() => onReady()}
                  // onError={onError}
                />
              )}

              {/* <YoutubePlayer
                width={350}
                height={400}
                //play={playing}
                videoId={playvideoId ? playvideoId : "iee2TATGMyI"}
                //onChangeState={onStateChange}
              /> */}
              {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default VideoListView;
