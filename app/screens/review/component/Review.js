import React, { Fragment, useCallback, useState } from "react";
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
import { Button, Input, Header } from "../../../components";
import Reviews from "../../../components/reviews";
import { Rating, AirbnbRating } from "react-native-ratings";
import tickMark from "../../../assets/images/tickMark.png";
import LinearGradient from "react-native-linear-gradient";
import { WHITE_COLOR,GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4, GRAY_COLOR, COMMON_COLOR, YELLOW_COLOR, GOLDEN_COLOR } from "../../../utils/constants";
import StarRating from "react-native-star-rating";
import { ICONS } from "../../../utils/imagePath";
import Notfound from "../../../components/notfound";
import StringsOfLanguages from "../../../utils/translations";
import moment from "moment";



const Review = (props) => {
  const {contentdata, backscreen} = props


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.container}>
        {/* <View style={styles.leftContainer}>
          <Image style={styles.imageDesign} source={item.profileImage} />
        </View> */}
        <View style={styles.rightContainer}>
          <View style={styles.section1}>
            <View style={styles.section2}>
              <Text style={styles.titileText}>{item?.fullname}</Text>
             {/*  <Rating
                type="custom"
                ratingColor=WHITE_COLOR
                ratingCount={5}
                imageSize={20}
                style={styles.rating}
              /> */}
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={item?.ranting}
                 /*   fullStar={ICONS.starIcon}
                  emptyStar={ICONS.starBlackIcon} */
                  starSize={15}
                  fullStarColor = {GOLDEN_COLOR}
                />
            </View>
            <Text style={styles.detailText}>{item?.description}</Text>
            <View style={styles.section3}>
              <Text style={styles.dateText}>{moment(item.createddate).format('MM/DD/YYYY h:mm:ss A')}</Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{StringsOfLanguages.VERIFIED}</Text>
                <Image style={styles.tickMark} source={tickMark} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.border}></View>
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
        headerText="Reviews" 
        rightImgStyl={{ tintColor: WHITE_COLOR }}
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
          ListEmptyComponent={<Notfound textnotfound = 'Review'/>}
         // keyExtractor={item => item.contentdata}
          keyExtractor={(item, index) => index.toString()}
        />
      {/* </LinearGradient> */}

    
    </SafeAreaView>
  );
};
export default Review;
