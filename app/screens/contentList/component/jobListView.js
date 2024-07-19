import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  StatusBar,
  RefreshControl,
} from "react-native";
import commomstyle from "../../../common/styles";
import { Header } from "../../../components";
import { ICONS } from "../../../utils/imagePath";
import LinearGradient from "react-native-linear-gradient";
import {
  WHITE_COLOR,
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_MEDIUM,
  COMMON_COLOR,
} from "../../../utils/constants";
import Notfound from "../../../components/notfound";

const JobListView = (props) => {
  const { type, contentdata, backscreen } = props;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const ReadMoreText = ({ content, maxLines = 3 }) => {
    const [showAll, setShowAll] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(0);
    const toggleReadMore = () => {
      setShowAll(!showAll);
    };

    // const handleTextLayout = (e) => {
    //   setNumberOfLines(e.nativeEvent.lines.length);
    // };

    const handleTextLayout = useCallback((e) => {
      setNumberOfLines(e.nativeEvent.lines.length >= 3);
    }, []);

    return (
      <View>
        {/* <Text
          numberOfLines={showAll ? undefined : maxLines}
          onTextLayout={handleTextLayout}
          style={{ fontFamily:FONT_FAMILY_REGULAR}}
        >
          {content}
        </Text>
        {numberOfLines > maxLines && (
          
          <TouchableOpacity onPress={()=> toggleReadMore()}>
            <Text style={{ color: "blue", marginTop: 3, }}>
              {showAll ? "Less" : "See More"}
            </Text>
          </TouchableOpacity>
          
        )} */}

        <Text
          onTextLayout={handleTextLayout}
          numberOfLines={showAll ? undefined : 3}
          style={{ lineHeight: 21, fontFamily: FONT_FAMILY_REGULAR }}
        >
          {content}
        </Text>

        {numberOfLines ? (
          <Text
            onPress={toggleReadMore}
            style={{
              lineHeight: 21,
              marginTop: 3,
              color: "blue",
              fontFamily: FONT_FAMILY_MEDIUM,
            }}
          >
            {showAll ? "Less" : "See More"}
          </Text>
        ) : null}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 15 }}>
      <View style={styles.containerjob}>
        <View style={styles.leftContainerjob}>
          <View style={styles.jobcont}>
            <Text style={styles.jobtxt}>{"Job Title : "}</Text>
            <Text style={styles.jobtxt}>{item?.title}</Text>
          </View>
          <View style={styles.jobcont}>
            <Text style={styles.jobtxt}>{"Effective Date : "}</Text>
            <Text style={styles.jobtxt}>{item?.createddate}</Text>
          </View>
          <View style={styles.jobcont}>
            <Text style={styles.jobtxt}>{"Exp. Date : "}</Text>
            <Text style={styles.jobtxt}>{item?.expirationdate}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {/* <Text>{item?.description}</Text> */}
            <ReadMoreText content={item?.description} />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={commomstyle.container}>
      <StatusBar
        animated={true}
        backgroundColor={WHITE_COLOR}
        barStyle="dark-content"
      />
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COMMON_COLOR} colors={[COMMON_COLOR]} />
        }
        showsVerticalScrollIndicator={false}
        data={contentdata}
        renderItem={renderItem}
        ListEmptyComponent={<Notfound textnotfound="Jobs" />}
        // keyExtractor={(item) => item.fileid}
        keyExtractor={(item, index) => index?.toString()}
      />
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
export default JobListView;
