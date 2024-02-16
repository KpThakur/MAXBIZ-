import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import styles from "./style";
import profile_img from "../../../assets/images/review-img-01.png";
import profile_img2 from "../../../assets/images/review-img-02.png";
import profile_img3 from "../../../assets/images/review-img-03.png";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Platform,
  ActivityIndicator,
} from "react-native";
import commomstyle from "../../../common/styles";
import { Header } from "@components";
import { ICONS } from "@utils/imagePath";
import LinearGradient from "react-native-linear-gradient";
import {
  WHITE_COLOR,
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
} from "../../../utils/constants";
import Notfound from "../../../components/notfound";
import Icon from "react-native-vector-icons/FontAwesome";
import StringsOfLanguages from "../../../utils/translations";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DATA = [
  {
    id: "1",
    aws_url: require("../../../assets/dummy/construction2.jpg"),
  },
  {
    id: "2",
    aws_url: require("../../../assets/dummy/construction2.jpg"),
  },
  {
    id: "3",
    aws_url: require("../../../assets/dummy/construction2.jpg"),
  },
  {
    id: "4",
    aws_url: require("../../../assets/dummy/construction2.jpg"),
  },
  {
    id: "5",
    aws_url: require("../../../assets/dummy/profile2.jpg"),
  },
  {
    id: "6",
    aws_url: require("../../../assets/dummy/profile2.jpg"),
  },
];
const YourComponent = React.memo(() => {
  // ... your component logic
});

const PhotoListView = (props) => {
  const { type, contentdata, backscreen } = props;
 // console.log("🚀 ~ PhotoListView ~ contentdata:", contentdata);
  const [photoModel, setPhotoModel] = useState(false);
  const [imgeurl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const imageViewr = (item) => {
    //const imgsrc = [{ uri: `${(item?.aws_url)}` }];
    setImageUrl(item);
    setPhotoModel(!photoModel);
  };

 

  const initialLoadRef = useRef(true);

  const onLoadStarts = () => {
    if (!initialLoadRef.current) {
      return;
    }
    setLoading(true);
   // console.log("onLoadStart===============");
  };


  const onLoadEnds = () => {
    if (!initialLoadRef.current) {
      return;
    }
    setLoading(false);
    initialLoadRef.current = false;
   // console.log("onLoadEnd>>>>>>>>>>>");
  };

  const renderItem = ({ item }) => (
    <View>
      {/* {console.log("🚀 ~ PhotoListView ~ item:", item.aws_url)} */}

      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {/* <Image style={styles.imageDesign} source={item?.aws_url ? item?.aws_url : require("../../../assets/dummy/profile2.jpg")} /> */}

          <TouchableOpacity
            onPress={() => {
              imageViewr(item?.aws_url);
            }}
          >
            <View style={styles.imageDesign}>
              {loading && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 285,
                    height: 350,
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              )}

              {
                <Image
                  style={styles.imageDesign}
                  source={{ uri: `${item?.aws_url}` }}
                  alt={"No image found"}
                  //onLoadStart={() => onLoading(true, "onLoadStart")}
                  //onLoadEnd={() => onLoading(false, "onLoadStart")}
                  onLoadStart={onLoadStarts}
                  onLoadEnd={onLoadEnds}
                />
              }
            </View>

            {/* {item?.aws_url ? (
              <Image
                style={styles.imageDesign}
                source={{ uri: `${item?.aws_url}` }}
                alt={"No image found"}
                onLoadEnd={()=> onLoadEnd()}
              />
            ) : (
              <View
                style={{
                  ...styles.imageDesign,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" />
              </View>
            )} */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.border}></View>
    </View>
  );

  return (
    <SafeAreaView style={commomstyle.container}>
      {/* <LinearGradient
        colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4]}
        angle={83}
        locations={[0.24, 0.63, 0.87, 0.99]}
        style={commomstyle.gradientstyle}> */}
      <Header
        rightImg={true}
        rightImgStyl={{ tintColor: WHITE_COLOR }}
        headerText={type}
        backscreen={backscreen}
        showFindServiceOnBack={true}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={contentdata}
        renderItem={renderItem}
        ListEmptyComponent={<Notfound textnotfound="Photo" />}
        keyExtractor={(item) => item.fileid}
      />

      <Modal
        animationType="none"
        transparent={true}
        visible={photoModel}
        onRequestClose={() => {
          setPhotoModel(!photoModel);
          ///setVisibleBothModal(0)
        }}
      >
        <View
          activeOpacity={1}
          onPress={() => {
            setPhotoModel(!videoModel);
            //setVisibleBothModal(0)
          }}
          style={[
            styles.modalContainermain,
            {
              flex: 1,

              justifyContent: "center",
              // Platform.OS == "ios"
              //   ? isKeyboardVisible
              //     ? "flex-start"
              //     : "flex-start"
              //   : "flex-start",
            },
          ]}
        >
          <View style={[styles.modalContainerphoto]}>
            <View style={styles.topheading}>
              <Text style={styles.topheadingtext}>View Photos</Text>
              <TouchableOpacity
                onPress={() => {
                  setPhotoModel(!photoModel);
                  ///setVisibleBothModal(0)
                }}
              >
                <Icon
                  style={styles.topheadingtext}
                  name={StringsOfLanguages.REMOVE}
                ></Icon>
              </TouchableOpacity>
            </View>
            {imgeurl ? (
              <Image
                style={[styles.imageDesignphoto]}
                source={{ uri: `${imgeurl}` }}
              />
            ) : (
              <View
                style={{
                  ...styles.imageDesignphoto,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" />
              </View>
            )}
          </View>
        </View>
      </Modal>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
export default PhotoListView;
