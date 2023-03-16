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


const forgotPasswordView = (props) => {
    const {inputError,loginData,setLoginData,toLogin,sendOTP} = props
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
                        <View>
                            <Input
                                onChangeText={(val) => setLoginData({
                                    ...loginData,
                                    emailId: val
                                })}
                                value={loginData.emailId}
                                placeholder="Enter your email id"
                                leftImage={ICONS.emailIcon}
                            />
                            <Text style={style.errorText}>{inputError.emailerror}</Text>
                        </View>

                        <View style={style.Items}>
                            <View style={style.horizontalCheck}>

                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => toLogin()} >
                                <Text style={style.forgotText}>Back To Login ?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.button}>
                        <Button
                            buttonText={'Send OTP'}
                            onPress={() => sendOTP()}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default forgotPasswordView;
