import React, { Fragment, useCallback, useRef, useState } from "react";
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
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from "react-native";
import commomstyle from "../../../common/styles";
import { Header } from "../../../components";
import { ICONS } from "../utils/imagePath";
import LinearGradient from "react-native-linear-gradient";
import {
  WHITE_COLOR,
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
  COMMON_COLOR,
} from "../../../utils/constants";
import Notfound from "../../../components/notfound";

const offerListView = (props) => {
  const { type, contentdata, backscreen } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const initialLoadRef = useRef(true);

  const onLoadStarts = () => {
    if (!initialLoadRef.current) {
      return;
    }
    setIsLoading(true);
  };

  const onLoadEnds = () => {
    if (!initialLoadRef.current) {
      return;
    }
    setIsLoading(false);
    initialLoadRef.current = false;
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 15 }}>

      <View style={styles.containerjob}>
        <View style={styles.offerimgcont}>
          {isLoading && (
            <ActivityIndicator size={'large'} style={styles.activityIndicator}/>
          )}
          {
          <Image
            style={styles.imageDesignoffer}
            //source={require("../../../assets/dummy/profile2.jpg")}
            source={{ uri: `${item?.aws_url}` }}
            onLoadStart={onLoadStarts}
            onLoadEnd={onLoadEnds}
          />
         }
        </View>
        
        <View style={styles.leftContainerjob}>
          <View style={styles.jobcont}>
            <Text style={styles.jobtxt}>{"Offer Title : "}</Text>
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
            <Text>{item?.description}</Text>
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
        ListEmptyComponent={<Notfound textnotfound="Offers" />}
       // keyExtractor={(item) => item.fileid}
        keyExtractor={(item, index, ) => item?.id || index?.toString()}

      />
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
export default offerListView;
