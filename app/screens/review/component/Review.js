import React, { Fragment } from "react";
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
} from "react-native";
import commomstyle from "../../../common/styles";
import { Button, Input, Header } from "@components";
import Reviews from "../../../components/reviews";
import { Rating, AirbnbRating } from "react-native-ratings";
import tickMark from "../../../assets/images/tickMark.png";
import LinearGradient from "react-native-linear-gradient";
import { WHITE_COLOR,GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4, GRAY_COLOR } from "../../../utils/constants";
import StarRating from "react-native-star-rating";
import { ICONS } from "../../../utils/imagePath";
import Notfound from "../../../components/notfound";
import StringsOfLanguages from "../../../utils/translations";



const Review = (props) => {
  const {contentdata, backscreen} = props

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
                  fullStarColor = {GRAY_COLOR}
                />
            </View>
            <Text style={styles.detailText}>{item?.description}</Text>
            <View style={styles.section3}>
              <Text style={styles.dateText}>{item?.createddate}</Text>
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
          showsVerticalScrollIndicator={false}
          data={contentdata}
          renderItem={renderItem}
          ListEmptyComponent={<Notfound textnotfound = 'Review'/>}
          keyExtractor={item => item.contentdata}
        />
      {/* </LinearGradient> */}

    
    </SafeAreaView>
  );
};
export default Review;
