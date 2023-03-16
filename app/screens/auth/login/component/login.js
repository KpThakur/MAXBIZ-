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


const login = (props) => {
    const {inputError} = props
    return (
        <SafeAreaView style={commomstyle.container}>
             <Header
                rightImg={true}
                headerType="other"
                //headerText={'Login'}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={style.firstFlex}>
                    <Logo />
                </View>
                <View style={style.secondFlex}>
                    <View style={style.topContainer}>
                        <View>
                            <Input
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    emailId: val
                                })}
                                value={props.loginData.emailId}
                                placeholder="Enter your email id"
                                leftImage={ICONS.emailIcon}
                            />
                            <Text style={style.errorText}>{inputError.emailerror}</Text>
                        </View>
                        <View style={style.secondInput}>
                            <Input
                                onChangeText={(val) => props.setLoginData({
                                    ...props.loginData,
                                    password: val
                                })}
                                secureTextEntry={true}
                                value={props.loginData.password}
                                placeholder="Password"
                                leftImage={ICONS.passwordIcon}
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
                            <TouchableOpacity activeOpacity={1} onPress={() => props.forgotPassword()}>
                                <Text style={style.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={style.button}>
                        <Button
                            buttonText={'LOGIN'}
                            onPress={() => props.toJoin()}
                        />
                    </View>
                    <View style={style.lastItem}>
                        <TouchableOpacity onPress={() => props.toRegistration()}
                            activeOpacity={1}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={style.newUserText}>New User? </Text>
                            <Text style={style.registerText}>Register or signup with</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default login;
