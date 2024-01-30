import React, { useState } from "react";
import styles from "./style";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import { ICONS } from "../../../../utils/imagePath";
import {
  GRADIENT_COLOR_NEW1, WHITE_COLOR,GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4
} from "../../../../utils/constants";
import LinearGradient from 'react-native-linear-gradient';
import StringsOfLanguages from "../../../../utils/translations";
// import { ICONS } from "@utils";

const account = () => {
  const [showAccountDetails, setShowAccountDetail] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleAccountDetails = () => {
    return setShowAccountDetail(!showAccountDetails);
  };
  const toggleChangePassword = () => {
    return setShowChangePassword(!showChangePassword);
  };
  const toggleNotification = () => {
    return setShowNotification(!showNotification);
  };
  return (
    <SafeAreaView style={commomstyle.container}>
       <LinearGradient
                colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4]}
                angle={83}
                locations={[0.24, 0.63, 0.87, 0.99]}
                style={{ flexGrow: 1 }}>
      <Header
        headertxt={styles.headerTxt}
        rightImg={true}
        headerText="Accounts"
        rightImgStyl={{ tintColor: WHITE_COLOR }}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity
                onPress={toggleAccountDetails}
                style={styles.dropDown}
              >
                <Text style={styles.headingTxt}>{StringsOfLanguages.ACCOUNT_DETAILS}</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={
                      showAccountDetails ? ICONS.upArrwIcon : ICONS.downArrwIcon
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showAccountDetails && (
              <View style={styles.inputWrap}>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.FIRST_NAME} />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.LAST_NAME} />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.EMAIL_ADDRESS} />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.PHONE_NUMBER} />
                </View>
                <View style={styles.saveButton}>
                  <Button buttonText={StringsOfLanguages.SAVE_CHANGES} />
                </View>
              </View>
            )}
          </View>
          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity
                onPress={toggleChangePassword}
                style={styles.dropDown}
              >
                <Text style={styles.headingTxt}>{StringsOfLanguages.CHANGE_PASSWORD}</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={
                      showChangePassword ? ICONS.upArrwIcon : ICONS.downArrwIcon
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showChangePassword && (
              <View style={styles.inputWrap}>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.OLD_PASSWORD} />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.NEW_PASSWORD} />
                </View>
                <View style={styles.input}>
                  <Input
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.CONFIRM_NEW_PASSWORD}
                  />
                </View>
                <View style={styles.saveButton}>
                  <Button buttonText={StringsOfLanguages.SAVE_CHANGES} />
                </View>
              </View>
            )}
          </View>
          {/* <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity
                onPress={toggleNotification}
                style={styles.dropDown}
              >
                <Text style={styles.headingTxt}>Notification Settings</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={
                      showNotification ? ICONS.upArrwIcon : ICONS.downArrwIcon
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showNotification && (
              <View style={styles.inputButtonWrap}>
                <View style={styles.buttonView}>
                  <Button buttonText={"YES"} />
                </View>
                <View style={styles.buttonView}>
                  <Button
                    buttonColor={[LINEAR_GRAD_GRAY_COLOR, GRADIENT_GRAY_COLOR]}
                    buttonText={"NO"}
                  />
                </View>
              </View>
            )}
          </View> */}
        </View>
      </ScrollView>

      </LinearGradient>
    </SafeAreaView>
  );
};
export default account;
