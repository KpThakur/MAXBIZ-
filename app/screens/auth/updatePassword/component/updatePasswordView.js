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


const updatePasswordView = (props) => {
    const {inputError,passwordData,setPasswordData,updatePassword} = props
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
                                onChangeText={(val) => props.setPasswordData({
                                    ...props.passwordData,
                                    newPassword: val
                                })}
                                secureTextEntry={true}
                                value={props.passwordData.newPassword}
                                placeholder="Enter your new password"
                                leftImage={ICONS.passwordIcon}
                            />
                            <Text style={commomstyle.errorText}>{inputError.newPassworderror}</Text>
                        </View>
                        <View style={style.secondInput}>
                            <Input
                                onChangeText={(val) => props.setPasswordData({
                                    ...props.passwordData,
                                    confirmpassword: val
                                })}
                                secureTextEntry={true}
                                value={props.passwordData.confirmpassword}
                                placeholder="Confirm your password"
                                leftImage={ICONS.passwordIcon}
                            />
                            <Text style={commomstyle.errorText}>{inputError.cPassworderror}</Text>
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
                            {/* <TouchableOpacity activeOpacity={1} onPress={() => props.forgotPassword()}>
                                <Text style={style.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity> */}
                        </View>
                       
                    </View>
                    <View style={style.button}>
                        <Button
                            buttonText={'Update Password'}
                            onPress={() => props.updatePassword()}
                        />
                    </View>
                  
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default updatePasswordView;
