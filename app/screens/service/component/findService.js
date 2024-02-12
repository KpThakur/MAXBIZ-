import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import {
  FONT_FAMILY_SEMIBOLD,
  COMMON_COLOR,
} from "./../../../../utils/constants";
import styles from "./style";
import commomstyle from "../../../common/styles";
import { Button, Input, Header } from "@components";
import { ICONS } from "./../../../utils/imagePath";
import ServiceList from "./serviceList";
import {
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
  WHITE_COLOR,
} from "../../../utils/constants";
import LinearGradient from "react-native-linear-gradient";
import { scale } from "@utils/utils";
import { Dropdown } from "react-native-element-dropdown";
import StringsOfLanguages from "../../../utils/translations";

const FindService = (props) => {
  const {
    showSearch,
    getAllservices,
    toggleShowSearch,
    navigation,
    searchdata,
    setSearchdata,
    serviceList,
    allServices,
    searchServicebyname,
    getcitylist,
    allCity,
    getAllservicesBySearch,
    selectedService,
    setSelectedService,
    selectedCity,
    setSelectedCity,
    filteredData,
    handlefilter,
  } = props;
  const showDetail = (serviceDetail) => {
    navigation.navigate("serviceDetailScreen", {
      serviceDetaildata: serviceDetail,
      searchdata: searchdata,
      //filteredData: filteredData
    });
  };

 

  return (
    <SafeAreaView style={commomstyle.container}>
      {/*  <LinearGradient
                colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4]}
                angle={83}
                locations={[0.24, 0.63, 0.87, 0.99]}
                style={commomstyle.gradientstyle}
            > */}
      <Header
        onPressLeft={toggleShowSearch}
        //onPressRight={props.drawerOpen()}
        headerType={"none"}
        leftImg={!showSearch ? ICONS.searchIcon : ICONS.crossIcon}
        leftImgStyl={styles.leftImg}
        rightImg={true}
        rightImgStyl={{}}
        headerText={StringsOfLanguages.Find_Local_Services}
        headertxt={styles.headerTxt}
      />

      <View style={{ paddingBottom: scale(50) }}>
        {showSearch && (
          <View style={styles.inputWrapper}>
            <View style={styles.inputView}>
              <View style={styles.input}>
                <Dropdown
                  style={commomstyle.dropdown}
                  placeholderStyle={commomstyle.placeholderStyle}
                  selectedTextStyle={commomstyle.selectedTextStyle}
                  inputSearchStyle={commomstyle.inputSearchStyle}
                  iconStyle={commomstyle.iconStyle}
                  containerStyle={commomstyle.dropdownContener}
                  data={allServices ? allServices : []}
                  search
                  onChangeText={searchServicebyname}
                  maxHeight={300}
                  labelField="title"
                  valueField="naicsid"
                  placeholder={StringsOfLanguages.SELECT_YOUR_SERVICE}
                  searchPlaceholder={StringsOfLanguages.SEARCH_SERVICE}
                  value={searchdata.serviceid}
                  // value={selectedService}
                  onChange={(val) => {
                    // setSelectedService(val.naicsid);
                    setSearchdata({
                      ...searchdata,
                      serviceid: val.naicsid,
                      servicename: val.title,
                    });
                  }}
                />
              </View>
              <View style={styles.inputcity}>
                {/*  <Input
                                    image={"noNeed"}
                                    placeholder={searchdata.serviceid == '' ? 'City Name ?' : ''}
                                    onChangeText={(val) => setSearchdata({
                                        ...searchdata,
                                        cityid: val
                                    })}
                                    value={searchdata.cityid}
                                /> */}

                <Dropdown
                  style={commomstyle.dropdown}
                  placeholderStyle={commomstyle.placeholderStyle}
                  selectedTextStyle={commomstyle.selectedTextStyle}
                  inputSearchStyle={commomstyle.inputSearchStyle}
                  iconStyle={commomstyle.iconStyle}
                  containerStyle={commomstyle.dropdownContener}
                  data={allCity ? allCity : []}
                  search
                  onChangeText={getcitylist}
                  maxHeight={300}
                  labelField="formattedLabel"
                  // labelField="city"
                  valueField="id"
                  placeholder={StringsOfLanguages.SELECT_YOUR_CITY}
                  searchPlaceholder={StringsOfLanguages.SEARCH_CITY}
                  value={searchdata.cityid}
                  // value={selectedCity}
                  onChange={(val) => {
                    // setSelectedCity(val.id);
                    setSearchdata({
                      ...searchdata,
                      cityid: val.id,
                      cityname: val.city,
                    });
                  }}
                  textColor="#FFF"
                />
              </View>
              <View style={styles.inputButton}>
                <TouchableOpacity>
                  <Button
                    onPress={() => {
                      console.log("button pressed");

                      getAllservices(searchdata.serviceid, searchdata.cityid);
                     // handlefilter(searchdata.cityid)
                    }}
                    buttonText={StringsOfLanguages.SEARCHSERVICE}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <ServiceList
          showDetail={(Serviceid) => showDetail(Serviceid)}
          serviceList={serviceList}
          // filteredData={filteredData}
        />
      </View>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export default FindService;
