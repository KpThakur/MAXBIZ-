import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import style from './style';
import commomstyle from '../../../../common/styles';
import { Button, Input, Header } from '@components';

const validateIdentity = (props) => {
    return (
        <SafeAreaView style={commomstyle.container}>
            <Header
                rightImg={false}
                headerText={""}
                headertxt={styles.headerTxt}
            />
            <View style={style.container}>
              <View style={style.containercenter}> 
                <Text style={style.firstText}>Validate your identity</Text>
                <View style={style.firstInput}>
                    <Input
                        onChangeText={(val) => props.setLoginData({
                            ...props.loginData,
                            mobileNo: val
                        })}
                        value={props.loginData.mobileNo}
                        image="noNeed"
                        placeholder="Your mobile number"
                        labelTxt={style.labelTxt}
                        style={style.inputContainer}
                        inputDsgn={style.inputDesign}
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
                        placeholder="Your email address"
                        labelTxt={style.labelTxt}
                        style={style.inputContainer}
                        inputDsgn={style.inputDesign}
                    />
                     <Text style={style.errorText}>{props.inputError.emailaddrError}</Text>
                </View>
               </View> 
                <View style={style.button}>
                    <Button
                        buttonText={'SUBMIT'}
                        onPress={() => props.toNextPage()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
export default validateIdentity;