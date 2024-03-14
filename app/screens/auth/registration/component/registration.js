import React from "react";
import { View, Text, ScrollView, SafeAreaView, StatusBar } from "react-native";
import style from "./style";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import Picker from "@components/picker";
//import MultiSelect from 'react-native-multiple-select';
import { Dropdown } from "react-native-element-dropdown";
import { MultiSelect } from "react-native-element-dropdown";
import {
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW2,
  GRAY_COLOR,
  WHITE_COLOR,
} from "../../../../utils/constants";
import LinearGradient from "react-native-linear-gradient";
import StringsOfLanguages from "../../../../utils/translations";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const registration = (props) => {
  const { backscreen, allCity, getcitylist, industryList, getServiceList, submitForResig, imageData, uploaddocument, extractFileName} = props;

 

  return (
    <SafeAreaView style={commomstyle.container}>
      <StatusBar
        animated={true}
        backgroundColor={WHITE_COLOR}
        barStyle="dark-content"
      />
      {/* <LinearGradient 
           colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW2]}
           locations={[0.24, 0.63, 0.87]} // Make sure the length matches the colors array
           style={{ flexGrow: 1 }}
      >  */}
      <Header
        rightImg={false}
        headerText={StringsOfLanguages.REGISTRATION}
        headertxt={style.headerTxt}
        backscreen={backscreen}
        showFindServiceOnBack={true}
      />
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <Text style={style.firstText}>
            {StringsOfLanguages.REGISTER_YOUR_BUSINESS}
          </Text>

          <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  businessusername: val,
                })
              }
              value={props.register.businessusername}
              image="noNeed"
              placeholder={StringsOfLanguages.BUSINESS_USERNAME}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
              msg={props.inputError.errorbusinessusername}
            />
            <Text style={style.errorText}>
              {props.inputError.errorbusinessusername}
            </Text>
          </View>

          <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  businessname: val,
                })
              }
              value={props.register.businessname}
              image="noNeed"
              placeholder={StringsOfLanguages.BUSINESS_NAME}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
              msg={props.inputError.errorbusinessname}
            />
            <Text style={style.errorText}>
              {props.inputError.errorbusinessname}
            </Text>
          </View>

          <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  address: val,
                })
              }
              value={props.register.address}
              image="noNeed"
              placeholder={StringsOfLanguages.ADDRESS}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            />
            <Text style={style.errorText}>{props.inputError.erroraddress}</Text>
          </View>

          <View style={style.firstInput}>
            {/*  <MultiSelect
                style={style.dropdownmulti}
                items={props.items}
                uniqueKey="id"
                //ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={props.onSelectedItemsChange}
                selectedItems={props.servicesData}
                selectText="Select Services"
                searchInputPlaceholderText="Search Services..."
                //onChangeInput={ (text)=> console.log(text)}
                //altFontFamily={FONT_FAMILY_MEDIUM}
                tagRemoveIconColor={GRADIENT_COLOR}
                tagBorderColor={GRADIENT_COLOR}
                tagTextColor={GRADIENT_COLOR}
                selectedItemTextColor={GRADIENT_COLOR}
                selectedItemIconColor={GRADIENT_COLOR}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC',fontSize:16,borderColor:'#CCC',borderBottomWidth:1 }}
                submitButtonColor={GRADIENT_COLOR}
                submitButtonText="Select"
                styleItemsContainer={{height:200,fontSize:20,marginBottom:10,marginTop:10}}
                styleListContainer={{}}


                /> */}

            {/* <MultiSelect
              showsVerticalScrollIndicator={false}
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStylemul}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              containerStyle={style.dropdownContener}
              search
              data={data}
              labelField="label"
              valueField="value"
              placeholder={StringsOfLanguages.SELECT_ITEM}
              searchPlaceholder={StringsOfLanguages.SEARCH}
              value={props.register.services}
              onChange={(item) => {
                props.setRegister({
                  ...props.register,
                  services: item,
                });
              }}
               renderLeftIcon={() => (
                <AntDesign
                  style={style.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )} 
              selectedStyle={style.selectedStyle}
            /> */}

            {/* <Picker
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  services: val,
                })
              }
              value={props.register.services}

              placeholder="Services"
              items="1"

              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            /> 
            <Text style={style.errorText}>
              {props.inputError.errorservices}
            </Text> */}
          </View>
          <View style={style.firstInput}>
            <Dropdown
              showsVerticalScrollIndicator={false}
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              containerStyle={style.dropdownContener}
              onChangeText={getcitylist}
              // data={data}
              data={allCity ? allCity : []}
              search
              maxHeight={300}
              // labelField="label"
              // valueField="value"
              labelField="formattedLabel"
              valueField="id"
              placeholder={StringsOfLanguages.SEARCH_CITY}
              searchPlaceholder={StringsOfLanguages.SEARCH_CITY_NAME}
              value={props.register.city}
              onChange={(item) => {
                props.setRegister({
                  ...props.register,
                  city: item.value,
                });
              }}
              /*  renderLeftIcon={() => (
             <AntDesign style={style.icon} color="black" name="Safety" size={20} />
            )} */
            />
          </View>

          <View style={style.firstInput}>
            <Dropdown
              showsVerticalScrollIndicator={false}
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
            //  selectedTextStyle={props.register?.servicename.length > 55 ? commomstyle.selectedTextStylelong : props.register?.servicename.length > 33 ? commomstyle.selectedTextSortlong : commomstyle.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              containerStyle={style.dropdownContener}
              onChangeText={getServiceList}
              // data={data}
              data={industryList ? industryList : []}
              search
              maxHeight={300}
              labelField="title"
              valueField="naicsid"
              // labelField="formattedLabel"
              // valueField="id"
              placeholder={StringsOfLanguages.INDUSTRY_}
              searchPlaceholder={StringsOfLanguages.SEARCH_INDUSTRY_NAME}
              value={props.register.industry}
              onChange={(item) => {
                props.setRegister({
                  ...props.register,
                  serviceid: item.naicsid,
                  servicename: item.title,
                });
              }}
              
              /*  renderLeftIcon={() => (
             <AntDesign style={style.icon} color="black" name="Safety" size={20} />
            )} */
            />
          </View>

          {/* <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  phone_no: val,
                })
              }
              value={props.register.phone_no}
              image="noNeed"
              placeholder={StringsOfLanguages.BUSINESS_PHONE}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
              msg={props.inputError.errorbusinessname}
            />
            <Text style={style.errorText}>
               {props.inputError.errorbusinessname}
            </Text>
          </View> */}

          {/* <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  industry: val,
                })
              }
              value={props.register.industry}
              image="noNeed"
              placeholder={StringsOfLanguages.INDUSTRY_}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
              msg={props.inputError.errorindustry}
            />
            <Text style={style.errorText}>
              {props.inputError.errorindustry}
            </Text>
          </View> */}

          <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  occupation: val,
                })
              }
              value={props.register.occupation}
              image="noNeed"
              placeholder={StringsOfLanguages.SEARCH_SERVICE}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
              msg={props.inputError.erroroccuption}
            />
            <Text style={style.errorText}>
              {props.inputError.erroroccuption}
            </Text>
          </View>

          {/* <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  about_us: val,
                })
              }
              value={props.register.about_us}
              image="noNeed"
              placeholder={StringsOfLanguages.ABOUT_YOUR_BUSINESS}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
              msg={props.inputError.errorbusinessname}
            />
            <Text style={style.errorText}>
              {props.inputError.errorbusinessname}
            </Text>
          </View> */}

          <View></View>

          {/* <View style={style.secondText}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  head_count: val,
                })
              }
              value={props.register.head_count}
              image="noNeed"
              placeholder={StringsOfLanguages.HEAD}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            />
            <Text style={style.errorText}>
              {props.inputError.erroraddress}
            </Text>
          </View> */}

          {/* <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  operation_hours: val,
                })
              }
              value={props.register.operation_hours}
              image="noNeed"
              placeholder={StringsOfLanguages.HOURS_OF_OPERATION}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            />
            <Text style={style.errorText}>
              {props.inputError.erroraddress}
            </Text>
          </View> */}

          {/* <View style={style.firstInput}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  website_url: val,
                })
              }
              value={props.register.website_url}
              image="noNeed"
              placeholder={StringsOfLanguages.WEBSITE_URL}
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            />
            <Text style={style.errorText}>
              {props.inputError.erroraddress}
            </Text>
          </View> */}

          <View
            style={[
              style.secondText,
              {
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <View style={{ flex: 3 }}>
              <Text style={style.labelText}>Business License</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Button
                buttonText={StringsOfLanguages.BROWSE}
                onPress={() => uploaddocument()}
                style={style.btnstyle}
              />
            </View>
          </View>
          {/* <Text style={style.errorText}>{imageData ? imageData.filename : ""}</Text> */}
          <Text style={style.errorText}>{imageData ? extractFileName(imageData.path) : ""}</Text>
          <Text style={style.errorText}>{props.inputError.errorbusiness_photo_url}</Text>

          <View style={style.button}>
            <Button
              buttonText={StringsOfLanguages.SUBMIT}
              onPress={() => submitForResig()}
            />
          </View>
        </View>
      </ScrollView>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
export default registration;
