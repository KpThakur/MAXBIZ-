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
import { Button, Input, Logo } from '@components';
import { ICONS } from '@utils/imagePath';
import { Header } from '@components';
import StringsOfLanguages from '../../../../utils/translations';
import { WHITE_COLOR } from '../../../../utils/constants';


const updatePasswordView = (props) => {
    const {inputError,passwordData,setPasswordData,updatePassword} = props
    return (
        <SafeAreaView style={commomstyle.container}>
            <StatusBar
          animated={true}
          backgroundColor={WHITE_COLOR}
          barStyle="dark-content"
        />
             <Header
                rightImg={false} headerText={StringsOfLanguages.UPDATE_PASSWORD}
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
                                placeholder={StringsOfLanguages.ENTER_YOUR_PASSWORD}
                                leftImage={ICONS.passwordIcon}
                                image={"noNeed"}
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
                                placeholder={StringsOfLanguages.CONFIRM_YOUR_PASSWORD}
                                leftImage={ICONS.passwordIcon}
                                image={"noNeed"}
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
                            buttonText={StringsOfLanguages.UPDATE_PASSWORD}
                            onPress={() => props.updatePassword()}
                        />
                    </View>
                  
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default updatePasswordView;
