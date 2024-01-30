import React, { useState } from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native'
import { FONT_FAMILY_SEMIBOLD, COMMON_COLOR } from './../../../../utils/constants';
import styles from './style'
import commomstyle from '../../../common/styles';
import { Button, Input, Header } from '@components';
import { ICONS, LOGOIMAGE } from '../../../utils/imagePath';
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4, WHITE_COLOR } from '../../../utils/constants';
import StringsOfLanguages from '../../../utils/translations'
import { Dropdown } from 'react-native-element-dropdown';


const colors = [GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4];
//const colors = ['#FF5733', '#FFC300', '#33FF57'];
const locations = [0.24, 0.63, 0.87, 0.99];
//const locations = [0.1, 0.5, 0.9];

const HomeView = (props) => {
    const { currLang, allServices, allCity, toggleLanguage, toggleShowSearch, setSearchdata, searchdata, setService, searchService, searchServicebyname, getcitylist } = props



    return (
        <SafeAreaView style={commomstyle.container}>
          
                 <Header
                onPressLeft={toggleShowSearch}
                //onPressRight={props.drawerOpen()}
                headerType={'other'}
                leftImg={(LOGOIMAGE.LOGO)}
                leftImgStyl={styles.leftImg}
                rightImg={true}
                //headerText={'Find Local Services'}
                headertxt={styles.headerTxt}
            />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.containerview}>

                    <View style={styles.topview}>

                        <View style={styles.texttop}>
                            <Text style={styles.regisViewTxt}>{StringsOfLanguages.Find_Local_Services}</Text>
                        </View>
                        <View style={styles.inputView}>
                            <View style={styles.input}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    containerStyle={styles.dropdownContener}
                                    data={allServices ? allServices : []}
                                    search
                                    onChangeText={searchServicebyname}
                                    maxHeight={300}
                                    labelField="title"
                                    valueField="naicsid"
                                    placeholder={StringsOfLanguages.SELECT_YOUR_SERVICE}
                                    searchPlaceholder={StringsOfLanguages.SEARCH_SERVICE}
                                    value={searchdata.serviceid}
                                    onChange={(val) =>
                                        setSearchdata({
                                            ...searchdata,
                                            serviceid: val.naicsid,
                                            servicename: val.title
                                        })
                                    }
                                /*  renderLeftIcon={() => (
                                 <AntDesign style={style.icon} color="black" name="Safety" size={20} />
                                )} */
                                />
                            </View>
                            {/*  <View style={styles.input}>
                                <Input
                                    image={"noNeed"}
                                    placeholder={'What service you want ?'}
                                    onChangeText={(val) => setSearchdata({
                                        ...searchdata,
                                        service_id: val
                                    })}
                                    value={searchdata.service_id}


                                />
                            </View> */}
                            <View style={styles.input}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    containerStyle={styles.dropdownContener}
                                    data={allCity ? allCity : []}
                                    search
                                    onChangeText={getcitylist}
                                    maxHeight={300}
                                    labelField="city"
                                    valueField="id"
                                    placeholder={StringsOfLanguages.SELECT_YOUR_CITY}
                                    searchPlaceholder={StringsOfLanguages.SEARCH_CITY}
                                    value={searchdata.cityid}
                                    onChange={(val) => setSearchdata({
                                        ...searchdata,
                                        cityid: val.id,
                                        cityname : val.city
                                    })}
                                    textColor="#FFF"
                                /*  renderLeftIcon={() => (
                                 <AntDesign style={style.icon} color="black" name="Safety" size={20} />
                                )} */
                                />
                                {/*  <Input
                                    image={"noNeed"}
                                    placeholder={StringsOfLanguages.CityName}
                                    onChangeText={(val) => setSearchdata({
                                        ...searchdata,
                                        city_id: val
                                    })}
                                    value={searchdata.city_id}
                                /> */}
                            </View>
                            <View style={styles.inputButton}>
                                <TouchableOpacity >
                                    <Button onPress={searchService}
                                        buttonText={StringsOfLanguages.SEARCHSERVICE}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/*  <View style={styles.texttop}>               
                    <Text style={styles.regisViewTxt}>Get FREE local leads</Text>
                    </View>
                    <View style={styles.button}>
                        <Button onPress={() => props.loginScreen() }
                            buttonText={'REGISTER YOUR SMB'}
                        />
                    </View>  */}
                    </View>

                    {/* <View style={styles.topviewsecond}>

                       
                        <View style={styles.texttop}>
                            <Text style={styles.regisViewTxt}>{StringsOfLanguages.GetFREElocalleads}</Text>
                        </View>
                        <View style={styles.button}>
                            <Button onPress={() => props.loginScreen()}
                                buttonText={StringsOfLanguages.REGISTERNOW}
                            />
                        </View>
                    </View> */}


                    <View style={styles.maskView}>

                        <View style={styles.imgView}>
                            <Image style={styles.maskImg} source={require('./../../../assets/dummy/blacknwhite.jpeg')} />
                        </View>
                        {/* <View style={styles.toggleView}>
                            <TouchableOpacity style={styles.toggleButton} onPress={(val) => toggleLanguage('EN')}>
                                <Text style={[styles.toggleTxt, currLang === 'EN' ? styles.enabled : '']}>{StringsOfLanguages.ENGLISH}</Text>
                            </TouchableOpacity>
                            <Text>|</Text>
                            <TouchableOpacity style={styles.toggleButton} onPress={(val) => toggleLanguage('HI')}>
                                <Text style={[styles.toggleTxt, currLang === 'HI' ? styles.enabled : '']}>{StringsOfLanguages.HINDI}</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>



                </ScrollView>

           
        </SafeAreaView>
    )
}

export default HomeView