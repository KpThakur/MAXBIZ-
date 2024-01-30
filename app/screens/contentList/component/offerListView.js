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



const offerListView = (props) => {
  const {type,contentdata} = props
  console.log("🚀 ~ PhotoListView ~ contentdata:", contentdata)
  

  const renderItem = ({ item }) => (
    
    <View style={{padding:15}}>
      { console.log("🚀 ~ PhotoListView ~ item:", item)}
      
      <View style={styles.containerjob}>
        <View style={styles.offerimgcont}>
         <Image style={styles.imageDesignoffer} source={require("../../../assets/dummy/profile2.jpg")} />
         </View>
        <View style={styles.leftContainerjob}>
          <View style={styles.jobcont}>
            <Text style={styles.jobtxt}>{'Offer Title : '}</Text>
            <Text style={styles.jobtxt}>{item?.title}</Text>
          </View>
          <View style={styles.jobcont}>
            <Text style={styles.jobtxt}>{'Effective Date : '}</Text>
            <Text style={styles.jobtxt}>{item?.createddate}</Text>
          </View>
          <View style={styles.jobcont}>
            <Text style={styles.jobtxt}>{'Exp. Date : '}</Text>
            <Text style={styles.jobtxt}>{item?.expirationdate}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row'}}>
            
            <Text>{item?.description}</Text>
          </View>
          
          
        </View>
        
      </View>
     
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
          keyExtractor={item => item.fileid}
        />
        {/* </LinearGradient> */}
     </SafeAreaView>
  );
};
export default offerListView;
