import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, StatusBar } from "react-native";
import style from "./style";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import ImagePicker from "react-native-image-crop-picker";
import LinearGradient from "react-native-linear-gradient";
import { GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW2, WHITE_COLOR } from "../../../../utils/constants";
import StringsOfLanguages from "../../../../utils/translations";

const thankyouView = (props) => {
 
  return (
    <View style={[
      style.container, 
       
      {
    /*  flexDirection: "column", */
    }]}>
      <StatusBar
          animated={true}
          backgroundColor={WHITE_COLOR}
          barStyle="dark-content"
        />
      {/* <Header /> */}
      {/* <LinearGradient 
           colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW2]}
           locations={[0.24, 0.63, 0.87]} // Make sure the length matches the colors array
           style={{ flexGrow: 1 }}
      > */}
     <View style = {{padding : 20,flexGrow: 1,}}>
      <View style={style.imageview}>
        <View style={style.showimageview}>
          <Image style={style.showimage} source={require("../../../../assets/images/right_img.png")} />
        </View>

        <View style={style.showtextview}>
          
           <Text style={style.showtextviewfirst}>{StringsOfLanguages.THANK_FOR_REGISTER}</Text>
          
           <Text style={style.showtextviewsecond}>{StringsOfLanguages.OUR_BACKEND_TEAM}</Text>  
                                       

         
        </View>

      </View>
      <View style={style.buttonview}>
      <Button
            buttonText={StringsOfLanguages.OK}
            onPress={() => props.OnSubmit()}
          />
     </View>
     </View>  
    
    {/* </LinearGradient> */}
    </View>
  );
};
export default thankyouView;
