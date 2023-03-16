import React, { useState } from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import {  FONT_FAMILY_SEMIBOLD, COMMON_COLOR} from './../../../../utils/constants';
import styles from './style'
import commomstyle from '../../../common/styles';
import { Button, Input, Header } from '@components';
import { ICONS } from './../../../utils/imagePath';
import ServiceList from './serviceList';

const FindService = (props ) => {
    const {showSearch,searchScreen,toggleShowSearch,navigation,searchdata,setSearchdata} = props
    const showDetail = (Serviceid) => {
         //navigation.navigate("serviceDetailScreen", {Serviceid : Serviceid});
      }
     return ( 
        <SafeAreaView style={commomstyle.container}>
        <Header
            onPressLeft={toggleShowSearch}
            onPressRight={props.drawerOpen()}
            headerType={'other'}
            leftImg={!showSearch ? (ICONS.searchIcon) : (ICONS.crossIcon)}
            leftImgStyl={styles.leftImg}
            rightImg={true} 
            headerText={'Find Local Services'}
            headertxt={styles.headerTxt}
         />
         {showSearch && 
        <View style={styles.inputWrapper}>
            <View style={styles.inputView}>
                <View style={styles.input}>
                    <Input 
                       image={"noNeed"}
                       placeholder={searchdata.service_id == '' ? 'What Service You Want ?' : ''}
                       onChangeText={(val) => props.setSearchdata({
                           ...props.searchdata,
                           service_id: val
                       })}
                       value={searchdata.service_id}
                   />
                </View>
                <View style={styles.input}>
                       <Input 
                            image={"noNeed"}
                            placeholder={searchdata.service_id == '' ? 'City Name ?' : ''}
                            onChangeText={(val) => setSearchdata({
                                ...searchdata,
                                city_id: val
                            })}
                            value={searchdata.city_id}
                            />
                </View>
                <View style={styles.inputButton}>
                    <TouchableOpacity >
                           <Button onPress={() => searchScreen() }
                                buttonText={'SEARCH SERVICE'}
                            />
                    </TouchableOpacity>
                </View>
            </View>
        </View>}   
              <ServiceList
                showDetail ={(Serviceid) => showDetail(Serviceid)}
              /> 
         </SafeAreaView>  
    )
}

export default FindService