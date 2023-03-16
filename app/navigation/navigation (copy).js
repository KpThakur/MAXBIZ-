import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import { View } from 'react-native';
import splashScreen from "../screens/auth/splash";
import splashTwoScreen from "../screens/auth/splashTwo";
import loginScreen from "../screens/auth/login";
import joinScreen from "../screens/auth/join";
import validateIdentityScreen from "../screens/auth/validateIdentity";
import registrationScreen from "../screens/auth/registration";
import certifyBusinessScreen from "../screens/auth/certifyBusiness";
import thankyouScreen from "../screens/auth/thankyou";


import findServiceScreen from "../screens/service";
import serviceDetailScreen from "../screens/serviceDetail";
import reviewScreen from "../screens/review";
import contentListScreen from "../screens/contentList";
import HomeScreen from "../screens/home";
import otpVerifyScreen from "../screens/auth/otpVerify";
import forgotPasswordScreen from "../screens/auth/forgotPassword";
import forgotVerifiedScreen from "../screens/auth/forgotVerified";
import updatePasswordScreen from "../screens/auth/updatePassword";
/* import drawerNavigation from "./drawerNavigation"; */
import accountScreen from "../screens/business/accounts/index";
import profileDetailsScreen from "../screens/business/profileDetails/index"
import CustomMenu  from '../components/customMenu';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


function CustomDrawerNavigation() {
  return (
      <Drawer.Navigator screenOptions={{headerShown: false , drawerPosition: "right"}}     drawerContent={props => <CustomMenu {...props} />} >
          {/* <Drawer.Screen name="Dashboard" component={HomeScreen} options={{ swipeEnabled: false, }} /> */}
           <Drawer.Screen name="splashScreen" component={splashScreen} />
           <Drawer.Screen name="splashTwoScreen" component={splashTwoScreen} />
           <Drawer.Screen name="loginScreen" component={loginScreen} />
           <Drawer.Screen name="homeScreen" component={HomeScreen} />
           <Drawer.Screen name="findServiceScreen" component={findServiceScreen} />  
           <Drawer.Screen name="accountScreen" component={accountScreen} />
          <Drawer.Screen name="profileDetailsScreen" component={profileDetailsScreen} />
          <Stack.Screen name="joinScreen" component={joinScreen} />
        
      </Drawer.Navigator >
  )
}




const AppStack = () => {
  return (
   
      <Stack.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splashScreen" component={splashScreen} />
        <Stack.Screen name="splashTwoScreen" component={splashTwoScreen} />
        <Drawer.Screen name="homeScreen" component={HomeScreen} />
        {/*Service Screens*/}
        <Drawer.Screen name="findServiceScreen" component={findServiceScreen} />  
        <Drawer.Screen name="serviceDetailScreen" component={serviceDetailScreen} />  
        <Stack.Screen name="reviewScreen" component={reviewScreen} />
        <Stack.Screen name="contentListScreen" component={contentListScreen} />
        {/*Auth screens Screens*/}
        <Stack.Screen name="loginScreen" component={loginScreen} /> 
        <Stack.Screen name="joinScreen" component={joinScreen} /> 
        <Stack.Screen name="validateIdentityScreen" component={validateIdentityScreen} />
        <Stack.Screen name="registrationScreen" component={registrationScreen} />
         <Stack.Screen name="thankyouScreen" component={thankyouScreen} />
        
        <Stack.Screen name="forgotPasswordScreen" component={forgotPasswordScreen} />
        <Stack.Screen name="forgotVerifiedScreen" component={forgotVerifiedScreen} />
        <Stack.Screen name="updatePasswordScreen" component={updatePasswordScreen} />
        {/*    */}
        <Stack.Screen name="otpVerifyScreen" component={otpVerifyScreen} />
        {/* <Stack.Screen name="accountScreen" component={accountScreen} /> */}
        {/* <Stack.Screen name="profileDetailsScreen" component={profileDetailsScreen} /> */}
      </Stack.Navigator>
    
  );
};

const NavigationLoading = () => {
 
  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/*   {loginState.userToken == null ?
                      <Stack.Screen name="Auth" component={AuthStack} />
                      :
                      <Stack.Screen name="App" component={AppStack} />
                  } */}
                  <Stack.Screen name="App" component={AppStack} />
              </Stack.Navigator>
          
              </NavigationContainer>
  )
}



export default NavigationLoading;
