import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import style from "./style";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import Picker from "../../../../components/picker";
import MultiSelect from 'react-native-multiple-select';
import { FONT_FAMILY_MEDIUM, GRADIENT_COLOR, LINEAR_GRAD_COLOR, WHITE_COLOR } from '../../../../utils/constants';
const registration = (props) => {
  return (
    <SafeAreaView style={commomstyle.container}>
      
        <Header 
        rightImg={false}
        headerText={"Registration"}
        headertxt={styles.headerTxt}
         />
         <ScrollView>
        <View style={style.container}>
        
          <Text style={style.firstText}>Register Your Business</Text> 

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
              placeholder="Business UserName"
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
              placeholder="Business Name"
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
              msg={props.inputError.errorbusinessname}
            />
            <Text style={style.errorText}>
              {props.inputError.errorbusinessname}
            </Text>
          </View>
          <View></View>
          <View style={style.secondText}>
            <Input
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  address: val,
                })
              }
              value={props.register.address}
              image="noNeed"
              placeholder="Address"
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            />
            <Text style={style.errorText}>{props.inputError.erroraddress}</Text>
          </View>
        <View style={style.secondText}>


        <MultiSelect
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
          
         
        />




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
            /> */}
            <Text style={style.errorText}>
              {props.inputError.errorservices}
            </Text>
          </View>
          <View style={style.secondText}>
            <Picker
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  industry: val,
                })
              }
              value={props.register.industry}
              items="2"
              placeholder="Industry"
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            />
            <Text style={style.errorText}>
              {props.inputError.errorindustry}
            </Text>
          </View>
          <View style={style.secondText}>
            <Picker
              onChangeText={(val) =>
                props.setRegister({
                  ...props.register,
                  city: val,
                })
              }
              value={props.register.city}
              items="3"
              placeholder="City"
              labelTxt={style.labelTxt}
              style={style.inputContainer}
              inputDsgn={style.inputDesign}
            />
            <Text style={style.errorText}>
              {props.inputError.errorcity}
            </Text>
          </View>

           <View style={[style.secondText,{flex:1,flexDirection:'row',justifyContent:'space-between'}]}>
           <View style={{flex:3}}><Text >Business License</Text></View> 
            <View tyle={{flex:3}}>
             <Button buttonText={"Browse"} onPress={() => props.uploaddocument()} style={style.btnstyle} />
             </View>
            <Text style={style.errorText}>
              {props.inputError.errorcity}
            </Text>
          </View>
        

          <View style={style.button}>
            <Button buttonText={"SUBMIT"} onPress={() => props.toNextPage()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default registration;
