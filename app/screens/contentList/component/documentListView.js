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
import { Header } from "@components";
import { ICONS } from "@utils/imagePath";
import LinearGradient from "react-native-linear-gradient";
import { WHITE_COLOR,GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4 } from "../../../utils/constants";
import Notfound from "../../../components/notfound";

const DATA = [
  {
    id:'1',
    aws_url: require("../../../assets/dummy/construction2.jpg"),
  
  },
  {
    id:'2',
    aws_url: require('../../../assets/dummy/construction2.jpg'),
  
  },
  {
    id:'3',
    aws_url: require('../../../assets/dummy/construction2.jpg'),
   
  },
  {
    id:'4',
    aws_url: require("../../../assets/dummy/construction2.jpg"),
  
  },
  {
    id:'5',
    aws_url: require("../../../assets/dummy/profile2.jpg"),
    
  },
  {
    id:'6',
    aws_url: require("../../../assets/dummy/profile2.jpg"),
   
  },
];


const DocumentListView = (props) => {
  const {type,contentdata} = props
  console.log("🚀 ~ PhotoListView ~ contentdata:", contentdata)
  

  const renderItem = ({ item }) => (
    
    <View>
      { console.log("🚀 ~ PhotoListView ~ item:", item.aws_url)}
      
      <View style={styles.container}>
        <View style={styles.leftContainer}>
        <Image style={styles.imageDesign} source={require("../../../assets/images/pdffile.png")} />
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
       />
          <FlatList
          showsVerticalScrollIndicator={false}
          data={contentdata}
          renderItem={renderItem}
          ListEmptyComponent={<Notfound textnotfound = 'Photo'/>}
          //keyExtractor={item => item.fileid}
        />
        {/* </LinearGradient> */}
     </SafeAreaView>
  );
};
export default DocumentListView;
