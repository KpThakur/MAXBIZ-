import React, { Fragment } from "react";
import styles from "./style";
import profile_img from "../../../assets/images/review-img-01.png";
import profile_img2 from "../../../assets/images/review-img-02.png";
import profile_img3 from "../../../assets/images/review-img-03.png";
import StringsOfLanguages from "../../../utils/translations";
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
import { Header } from "@components";
import { ICONS } from "@utils/imagePath";
import { WHITE_COLOR,GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4 } from "../../../utils/constants";
import LinearGradient from "react-native-linear-gradient";

const DATA = [
  {
    id:'1',
    profileImage: require("../../../assets/dummy/construction2.jpg"),
  
  },
  {
    id:'2',
    profileImage: require('../../../assets/dummy/construction2.jpg'),
  
  },
  {
    id:'3',
    profileImage: require('../../../assets/dummy/construction2.jpg'),
   
  },
  {
    id:'4',
    profileImage: require("../../../assets/dummy/construction2.jpg"),
  
  },
  {
    id:'5',
    profileImage: require("../../../assets/dummy/profile2.jpg"),
    
  },
  {
    id:'6',
    profileImage: require("../../../assets/dummy/profile2.jpg"),
   
  },
];


const VideoListView = (props) => {

  const {type} = props
  const ratingCompleted = (rating) => {
    console.log(StringsOfLanguages.RATING_IS + rating);
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image style={styles.imageDesign} source={item.profileImage} />
          <Image style={styles.imageDesignplayicon} source={ICONS.playIcon} />
        </View>
        
      </View>
      <View style={styles.border}></View>
      </View>
  );


  return (
    <SafeAreaView style={commomstyle.container}>
     
       <Header 
       rightImgStyl={{ tintColor: WHITE_COLOR }}
       rightImg={true} 
       headerText= {type}  />
          <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
       
     </SafeAreaView>
  );
};
export default VideoListView;
