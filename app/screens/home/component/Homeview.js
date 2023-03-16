import React, { useState } from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native'
import {  FONT_FAMILY_SEMIBOLD, COMMON_COLOR} from './../../../../utils/constants';
import styles from './style'
import commomstyle from '../../../common/styles';
import { Button, Input, Header } from '@components';
import { ICONS,LOGOIMAGE } from '../../../utils/imagePath';

const HomeView = (props ) => {
  const {english,espanol,showSearch,toggleLanguage,toggleShowSearch,setSearchdata,searchdata} = props

    
     return (    
        <SafeAreaView  style={commomstyle.container}>
          <StatusBar
            animated={true}
            backgroundColor="#ffff"
             barStyle='dark-content'
            /*showHideTransition={statusBarTransition}
            hidden={hidden}  */
            />
            <Header
                onPressLeft={toggleShowSearch}
                onPressRight={props.drawerOpen()}
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
                         <Text style={styles.regisViewTxt}>Find Local Services</Text>
                        </View>
                <View style={styles.inputView}>
                    <View style={styles.input}>
                        <Input 
                            image={"noNeed"}
                            placeholder={'What service you want ?'}
                            onChangeText={(val) => setSearchdata({
                                ...searchdata,
                                service_id: val
                            })}
                            value={searchdata.service_id}
                            
                            
                        />
                    </View>
                    <View style={styles.input}>
                        <Input 
                            image={"noNeed"}
                            placeholder={'City Name ?'}
                            onChangeText={(val) => setSearchdata({
                                ...searchdata,
                                city_id: val
                            })}
                            value={searchdata.city_id}
                            />
                    </View>
                    <View style={styles.inputButton}>
                        <TouchableOpacity >
                               <Button onPress={() => props.searchService() }
                                    buttonText={'SEARCH SERVICE'}
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
                
                    <View style={styles.topviewsecond}> 

                    {/*  */}
                        <View style={styles.texttop}>               
                         <Text style={styles.regisViewTxt}>Get FREE local leads</Text>
                        </View>
                        <View style={styles.button}>
                            <Button onPress={() => props.loginScreen() }
                                buttonText={'REGISTER YOUR SMB'}
                            />
                        </View>
                    </View>

                
                <View style={styles.maskView}>
                    
                    <View style={styles.imgView}>
                   {/*  <Text style={styles.regisViewTxt}>Get FREE local leads</Text> */}
                       <Image style={styles.maskImg} source={require('./../../../assets/dummy/blacknwhite.jpeg')} />
                    </View>
                    <View style={styles.toggleView}>
                        <TouchableOpacity style={styles.toggleButton} onPress={()=>toggleLanguage()}>
                            <Text style={[styles.toggleTxt, english? styles.enabled:'']}>English</Text>
                        </TouchableOpacity>
                        <Text>|</Text>
                        <TouchableOpacity style={styles.toggleButton} onPress={()=>toggleLanguage()}>
                            <Text style={[styles.toggleTxt, espanol? styles.enabled: '']}>Espanol</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                           
            
          
         </ScrollView>
       
        </SafeAreaView> 
        
    )
}

export default HomeView