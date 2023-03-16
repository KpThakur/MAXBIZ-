import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ScrollView } from "react-native";
import style from "./style";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import ImagePicker from "react-native-image-crop-picker";
const certifyBusiness = (props) => {
  const [imageData, setimageData] = useState({});
  const openPicker = () => {
    ImagePicker.openPicker({}).then((images) => {
      setimageData(images);
    });
  };
  return (
    <ScrollView style={commomstyle.container}>
      <Header rightImg={false} />
      <View style={style.container}>
        <Text style={style.firstText}>Certify Your Business</Text>
        <View style={style.firstInput}>
          <Image style={style.images} source={{uri: imageData.path}}/>
        </View>
        <View style={style.secondInput}>
        <Button buttonText={"Choose Image"} onPress={openPicker} />
        </View>
        <View style={style.button}>
          <Button
            buttonText={"CHECK STATUS"}
            onPress={() => props.OnSubmit()}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default certifyBusiness;
