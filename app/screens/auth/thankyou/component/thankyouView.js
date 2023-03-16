import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import style from "./style";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import ImagePicker from "react-native-image-crop-picker";

const thankyouView = (props) => {
 
  return (
    <View style={[style.container, {
     flexDirection: "column",
    }]}>
      {/* <Header /> */}
      
      <View style={style.imageview}>
        <View style={style.showimageview}>
          <Image source={require("../../../../assets/images/right_img.png")} />
        </View>

        <View style={style.showtextview}>
          
           <Text style={style.showtextviewfirst}>Thank For Register with us.</Text>
          
           <Text style={style.showtextviewsecond}>Our backend team verify you information and update you shortly for login your business account.</Text>  
                                       

         
        </View>

      </View>
      <View style={style.buttonview}>
      <Button
            buttonText={"OK"}
            onPress={() => props.OnSubmit()}
          />
     </View>
      
    
    </View>
  );
};
export default thankyouView;
