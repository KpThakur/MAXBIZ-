import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import style from './style';
import commomstyle from '../../../../common/styles';
import { Button, Input, Header } from '@components';
import { GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3,GRADIENT_COLOR_NEW2 } from '../../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import StringsOfLanguages from '../../../../utils/translations';

const validateIdentity = (props) => {
    return (
        <SafeAreaView style={commomstyle.container}>

            <LinearGradient 
             colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3,GRADIENT_COLOR_NEW2]}
             locations={[0.24, 0.63, 0.87, 0.99]}
             style={commomstyle.gradientstyle}
             > 

            <Header
                rightImg={false}
                headerText={""}
                headertxt={styles.headerTxt}
            />
             <ScrollView contentContainerStyle={{ flexGrow: 1}}>
            <View style={style.container}>
              <View style={style.containercenter}> 
                <Text style={style.firstText}>{StringsOfLanguages.VALIDATE_YOUR_IDENTITY}</Text>
                <View style={style.firstInput}>
                    <Input
                        onChangeText={(val) => props.setLoginData({
                            ...props.loginData,
                            firstname: val
                        })}
                        value={props.loginData.firstname}
                        image="noNeed"
                        placeholder={StringsOfLanguages.YOUR_FIRST_NAME}
                        labelTxt={style.labelTxt}
                        style={style.inputContainer}
                        inputDsgn={style.inputDesign}
                    />
                     <Text style={style.errorText}>{props.inputError.firstnameError}</Text>
                </View>
                <View style={style.firstInput}>
                    <Input
                        onChangeText={(val) => props.setLoginData({
                            ...props.loginData,
                            lastname: val
                        })}
                        value={props.loginData.lastname}
                        image="noNeed"
                        placeholder={StringsOfLanguages.YOUR_LAST_NAME}
                        labelTxt={style.labelTxt}
                        style={style.inputContainer}
                        inputDsgn={style.inputDesign}
                    />
                     <Text style={style.errorText}>{props.inputError.lastnameError}</Text>
                </View>
                <View style={style.firstInput}>
                    <Input
                        onChangeText={(val) => props.setLoginData({
                            ...props.loginData,
                            mobileNo: val
                        })}
                        value={props.loginData.mobileNo}
                        image="noNeed"
                        placeholder={StringsOfLanguages.YOUR_MOBILE_NUMBER}
                        labelTxt={style.labelTxt}
                        style={style.inputContainer}
                        inputDsgn={style.inputDesign}
                        keyboardType = 'numeric'
                        maxLength = {12}
                    />
                     <Text style={style.errorText}>{props.inputError.mobileNoError}</Text>
                </View>
                <View style={style.secondText}>
                    <Input
                        onChangeText={(val) => props.setLoginData({
                            ...props.loginData,
                            emailaddr: val
                        })}
                        value={props.loginData.emailaddr}
                        image="noNeed"
                        placeholder={StringsOfLanguages.YOUR_EMAIL_ADDRESS}
                        labelTxt={style.labelTxt}
                        style={style.inputContainer}
                        inputDsgn={style.inputDesign}
                    />
                     <Text style={style.errorText}>{props.inputError.emailaddrError}</Text>
                </View>
               </View> 
                <View style={style.button}>
                    <Button
                        buttonText={StringsOfLanguages.SUBMIT}
                        onPress={() => props.toNextPage()}
                    />
                </View>
            </View>
            </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}
export default validateIdentity;