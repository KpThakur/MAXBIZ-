import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import style from './style';
import commomstyle from '../../../../common/styles';
import { Button, Input, Logo } from '../../../../components';
import { ICONS } from '../../../../utils/imagePath';
import { Header } from '../../../../components';
import StringsOfLanguages from '../../../../utils/translations';
import { WHITE_COLOR } from '../../../../utils/constants';


const forgotPasswordView = (props) => {
    const {inputError,loginData,setLoginData,toLogin,sendOTP} = props
    return (
        <SafeAreaView style={commomstyle.container}>
            <StatusBar
          animated={true}
          backgroundColor={WHITE_COLOR}
          barStyle="dark-content"
        />
            <Header
               rightImg={false} headerText={StringsOfLanguages.FORGOT_PASSWORD}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={style.firstFlex}>
                    <Logo />
                </View>
                <View style={style.secondFlex}>
                    <View style={style.topContainer}>
                        <View>
                            <Input
                                onChangeText={(val) => setLoginData({
                                    ...loginData,
                                    emailId: val
                                })}
                                value={loginData.emailId}
                                placeholder={StringsOfLanguages.ENTER_YOUR_EMAIL_ID}
                                leftImage={ICONS.emailIcon}
                                image={"noNeed"}
                            />
                            <Text style={style.errorText}>{inputError.emailerror}</Text>
                        </View>

                        <View style={style.Items}>
                            <View style={style.horizontalCheck}>

                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => toLogin()} >
                                <Text style={style.forgotText}>{StringsOfLanguages.BACKTOLOGIN}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.button}>
                        <Button
                            buttonText={StringsOfLanguages.SEND_OTP}
                            onPress={() => sendOTP()}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default forgotPasswordView;
