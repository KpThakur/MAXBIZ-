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
const DATA = [
  {
    id:'1',
    profileImage: require("../../../assets/images/review-img-01.png"),
    userName: 'John D.',
    comment: 'One of the best handyman ever hired, very straight forward...',
    date: 'Aug 27, 2021',
    Verified: true,
  },
  {
    id:'2',
    profileImage: require('../../../assets/images/review-img-02.png'),
    userName: 'John D.',
    comment: 'One of the best handyman ever hired, very straight forward...',
    date: 'Aug 27, 2021',
    Verified: true,
  },
  {
    id:'3',
    profileImage: require('../../../assets/images/review-img-03.png'),
    userName: 'John D.',
    comment: 'One of the best handyman ever hired, very straight forward...',
    date: 'Aug 27, 2021',
    Verified: true,
  },
  {
    id:'4',
    profileImage: require("../../../assets/dummy/profile2.jpg"),
    userName: 'John D.',
    comment: 'One of the best handyman ever hired, very straight forward...',
    date: 'Aug 27, 2021',
    Verified: true,
  },
  {
    id:'5',
    profileImage: require("../../../assets/dummy/profile2.jpg"),
    userName: 'John D.',
    comment: 'One of the best handyman ever hired, very straight forward...',
    date: 'Aug 27, 2021',
    Verified: true,
  },
  {
    id:'6',
    profileImage: require("../../../assets/dummy/profile2.jpg"),
    userName: 'John D.',
    comment: 'One of the best handyman ever hired, very straight forward...',
    date: 'Aug 27, 2021',
    Verified: true,
  },
];


const Review = () => {
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image style={styles.imageDesign} source={item.profileImage} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.section1}>
            <View style={styles.section2}>
              <Text style={styles.titileText}>{item.userName}</Text>
              <Rating
                type="custom"
                ratingColor="#EB9C25"
                ratingBackgroundColor="#c8c7c8"
                ratingCount={5}
                imageSize={20}
                style={styles.rating}
              />
            </View>
            <Text style={styles.detailText}>{item.comment}</Text>
            <View style={styles.section3}>
              <Text style={styles.dateText}>{item.date}</Text>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Verified</Text>
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
      
        <Header rightImg={true} headerText="Reviews"  />
          <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />


        {/* <ScrollView>
        <Reviews
          profileImage={profile_img}
          userName={"John D."}
          comment={
            " One of the best handyman ever hired, very straight forward..."
          }
          date={"Aug 27, 2021"}
        />
        <Reviews
          profileImage={profile_img2}
          userName={"R.J.Portales"}
          comment={
            " One of the best handyman ever hired, very straight forward..."
          }
          date={"Aug 27, 2021"}
        />
        <Reviews
          profileImage={profile_img3}
          userName={"John D."}
          comment={
            " One of the best handyman ever hired, very straight forward..."
          }
          date={"Aug 27, 2021"}
        />
        <Reviews
          profileImage={profile_img}
          userName={"John D."}
          comment={
            " One of the best handyman ever hired, very straight forward..."
          }
          date={"Aug 27, 2021"}
        />
        <Reviews
          profileImage={profile_img2}
          userName={"R.J.Portales"}
          comment={
            " One of the best handyman ever hired, very straight forward..."
          }
          date={"Aug 27, 2021"}
        />
        <Reviews
          profileImage={profile_img3}
          userName={"Linda Blind"}
          comment={
            " One of the best handyman ever hired, very straight forward..."
          }
          date={"Aug 27, 2021"}
        />
      </ScrollView> */}
    </SafeAreaView>
  );
};
export default Review;
