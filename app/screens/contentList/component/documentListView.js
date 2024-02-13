import React, { Fragment, useRef, useState } from "react";
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
  Linking,
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
import Pdf from "react-native-pdf";
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

const DocumentListView = (props) => {
  const { type, contentdata, backscreen } = props;
  console.log("🚀 ~ DocumentListView ~ contentdata:", contentdata);

  const [isLoading, setIsLoading] = useState(false);

  const initialLoadRef = useRef(true);

  const onLoadStarts = () => {
    if (!initialLoadRef.current) {
      return;
    }
    setIsLoading(true);
    console.log("onLoadStart===============");
  };

  const onLoadEnds = () => {
    if (!initialLoadRef.current) {
      return;
    }
    setIsLoading(false);
    initialLoadRef.current = false;
    console.log("onLoadEnd>>>>>>>>>>>");
  };


  // const documentView = (item) => {
  //   const source = {
  //     uri: file_object?.aws_url,
  //     cache: true,
  //   };

  //   return (
  //     <View style={styles.container_Document}>
  //       <Pdf
  //         source={source}
  //         //source={item?.aws_url}
  //         onLoadComplete={(numberOfPages, filePath) => {
  //           console.log(`Number of pages: ${numberOfPages}`);
  //         }}
  //         onPageChanged={(page, numberOfPages) => {
  //           console.log(`Current page: ${page}`);
  //         }}
  //         onError={(error) => {
  //           console.log(error);
  //         }}
  //         onPressLink={(uri) => {
  //           console.log(`Link pressed: ${uri}`);
  //         }}
  //         style={styles.pdf}
  //       />
  //     </View>
  //   );
  // };

  // const file_object = fetch("https://smbmblobtest.blob.core.windows.net/attachments/documentfile/1702375814227_file.pdf")
  //         .then(r => r.blob())
  //         .then(blob => {
  //             var file_name = Math.random().toString(36).substring(6) + 'aws_url'; //e.g ueq6ge1j_name.pdf
  //             var file_object = new File([blob], file_name, {type: 'application/pdf'});
  //             console.log("file_object<=========>",file_object); //Output
  //          });

  const renderItem = ({ item }) => (
    <View>
      {console.log("🚀 ~ PhotoListView ~ item:", item.aws_url)}

      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL(item?.aws_url)}
            //onPress={() => documentView(item?.aws_url)}
          >
            {isLoading && (
              <ActivityIndicator
                size={"large"}
                style={[styles.activityIndicator, {alignSelf:'center', bottom:10}]}
              />
            )}
            {
              <Image
                style={styles.imageDesign}
                source={require("../../../assets/images/pdffile.png")}
                //source={require("../../../assets/dummy/profile2.jpg")}
                onLoadStart={onLoadStarts}
                onLoadEnd={onLoadEnds}
              />
            }
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
        //keyExtractor={item => item.fileid}
      />
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
export default DocumentListView;
