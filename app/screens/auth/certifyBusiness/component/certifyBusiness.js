import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView, StatusBar } from "react-native";
import style from "./style";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import ImagePicker from "react-native-image-crop-picker";
import StringsOfLanguages from '../../../../utils/translations';
import { WHITE_COLOR } from "../../../../utils/constants";
const certifyBusiness = (props) => {
  const [imageData, setimageData] = useState({});
  const openPicker = () => {
    ImagePicker.openPicker({}).then((images) => {
      setimageData(images);
    });
  };
  return (
    <ScrollView style={commomstyle.container}>
      <StatusBar
          animated={true}
          backgroundColor={WHITE_COLOR}
          barStyle="dark-content"
        />
      <Header rightImg={false} />
error listen EADDRINUSE: address already in use :::8081.
      <View style={style.container}>
        <Text style={style.firstText}>{StringsOfLanguages.CERTIFYBUSINESS}</Text>
        <View style={style.firstInput}>
          <Image style={style.images} source={{uri: imageData.path}}/>
        </View>
        <View style={style.secondInput}>
        <Button buttonText={StringsOfLanguages.CHOOSE_IMAGE} onPress={openPicker} />
        </View>
        <View style={style.button}>
          <Button
            buttonText={StringsOfLanguages.CHECK_STATUS}
            onPress={() => props.OnSubmit()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default certifyBusiness;
