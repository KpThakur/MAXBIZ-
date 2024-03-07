import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import style from "./style";
import commomstyle from "../../../../common/styles";
import { Button, Input, Logo } from "@components";

import { ICONS, LOGOIMAGE } from "@utils/imagePath";
import { Header } from "@components";
import {
  WHITE_COLOR,
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
} from "../../../../utils/constants";
import LinearGradient from "react-native-linear-gradient";
import StringsOfLanguages from "../../../../utils/translations";
import { useFocusEffect } from "@react-navigation/native";

const login = (props) => {
  const { inputError } = props;

  useFocusEffect(
    useCallback(() => {
      props.setLoginData({
        ...props.loginData,
        email: "",
        password: "",
      });
    }, [])
  );

  return (
    <SafeAreaView style={commomstyle.container}>
      <StatusBar
        animated={true}
        backgroundColor={WHITE_COLOR}
        barStyle="dark-content"
      />
      {/*  <LinearGradient
                colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW2]}
                locations={[0.24, 0.63, 0.87, 0.99]}
                style={commomstyle.gradientstyle}> */}

      <Header
        rightImg={true}
        headerText={StringsOfLanguages.LOGIN}
        rightImgStyl={{}}
        headertxt={{ color: WHITE_COLOR }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.firstFlex}>
          <Logo style={{ height: 200, width: 200 }} />
        </View>
        <View style={style.secondFlex}>
          <View style={style.topContainer}>
            <View>
              <Input
                onChangeText={(val) =>
                  props.setLoginData({
                    ...props.loginData,
                    email: val,
                  })
                }
                value={props.loginData.email}
                placeholder={StringsOfLanguages.ENTER_YOUR_EMAIL_ID}
                leftImage={ICONS.emailIcon}
                image={"noNeed"}
              />
              <Text style={style.errorText}>{inputError.emailerror}</Text>
            </View>
            <View style={style.secondInput}>
              <Input
                onChangeText={(val) =>
                  props.setLoginData({
                    ...props.loginData,
                    password: val,
                  })
                }
                secureTextEntry={true}
                value={props.loginData.password}
                placeholder={StringsOfLanguages.PASSWORD}
                leftImage={ICONS.passwordIcon}
                image={"noNeed"}
              />
              <Text style={style.errorText}>{inputError.passworderror}</Text>
            </View>
            <View style={style.Items}>
              <View style={style.horizontalCheck}>
                {/*  <TouchableOpacity activeOpacity={1}
                                            onPress={() => props.Remember()}>
                                            <Image style={{ width: 24, height: 24 }} resizeMode="cover"
                                                source={props.check ?
                                                    ICONS.unCheckIcon
                                                    :
                                                    ICONS.checkIcon} />
                                        </TouchableOpacity>
                                        <Text style={style.rememberText}>Remember me?</Text> */}
              </View>
              {/*  <TouchableOpacity activeOpacity={1} onPress={() => props.forgotPassword()}>
                                    <Text style={style.forgotText}>{StringsOfLanguages.FORGOT_PASSWORD}</Text>
                                </TouchableOpacity> */}
            </View>
          </View>
          <View style={style.button}>
            <Button
              buttonText={StringsOfLanguages.LOGIN}
              onPress={() => props.toJoin()}
            />
          </View>
        </View>
        {/*  <View style={style.thiredFlex}>
                        <View style={style.lastItem}>
                            <TouchableOpacity onPress={() => props.toRegistration()}
                                activeOpacity={1}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={style.newUserText}>{StringsOfLanguages.NEW_USER} </Text>
                                <Text style={style.registerText}>{StringsOfLanguages.REGISTER_OR_SIGNUP_WITH}</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}
      </ScrollView>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
export default login;
