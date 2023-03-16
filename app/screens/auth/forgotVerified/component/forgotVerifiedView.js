import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import style from './style';
import commomstyle from '../../../../common/styles';
import { Button, Input, Logo } from '@components';
import { ICONS } from '@utils/imagePath';
import { Header } from '@components';
import OTPTextInput from "react-native-otp-textinput";
import { COMMON_COLOR } from "../../../../utils/constants";

const forgotPasswordView = (props) => {
    const { email,verifiedOTP, resendOTP,setOtp,otp , inputError} = props
    /* const otpInput = useRef(null);

    const clearText = () => {
        otpInput.current.clear();
    }

    const setText = () => {
        otpInput.current.setValue("1234");
    } */

    return (
        <SafeAreaView style={commomstyle.container}>
            <Header
                rightImg={true}
                headerType="other"
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={style.firstFlex}>
                    <Logo />
                </View>
                <View style={style.secondFlex}>
                    <View style={style.topContainer}>
                        <View style={style.viewshowmessage}>
                            <Text style={style.textshowmessage}>We have sent your OTP on your Email {email} Please check your email if not recive click on Resend OTP for recive new OTP!</Text></View>
                        <View>
                            {/* <Input
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    emailId: val
                                })}
                                value={props.loginData.emailId}
                                placeholder="Enter your email id"
                                leftImage={ICONS.emailIcon}
                            /> */}

                            <OTPTextInput
                                containerStyle={style.otpInputContainer}
                                textInputStyle={style.otpInputTxt}
                                tintColor={COMMON_COLOR}
                                handleTextChange={(text) =>setOtp(text)}
                                inputCount={4}
                                keyboardType="numeric"
                            ></OTPTextInput>
                            <Text style={commomstyle.errorText}>{inputError.otperror}</Text>


                        </View>

                        <View style={style.Items}>
                            <View style={style.horizontalCheck}>

                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => resendOTP()} >
                                <Text style={style.forgotText}>Resend OTP ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.button}>
                        <Button
                            buttonText={'Verified'}
                            onPress={() => verifiedOTP()}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default forgotPasswordView;
