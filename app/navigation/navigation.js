import React from "react";
import { AuthContext } from "../utils/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
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

import reviewScreen from "../screens/review";
import contentListScreen from "../screens/contentList";
import HomeScreen from "../screens/home";
import otpVerifyScreen from "../screens/auth/otpVerify";
import forgotPasswordScreen from "../screens/auth/forgotPassword";
import forgotVerifiedScreen from "../screens/auth/forgotVerified";
import updatePasswordScreen from "../screens/auth/updatePassword";

import accountScreen from "../screens/auth/updatePassword";
import profileDetailsScreen from "../screens/auth/updatePassword"


import CustomMenu  from '../components/customMenu';
const Drawer = createDrawerNavigator();
const App = createNativeStackNavigator();
const Auth = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
//const AuthContext = React.createContext();

function CustomDrawerNavigation() {
  return (
      <Drawer.Navigator screenOptions={{headerShown: false , drawerPosition: "right"}}     drawerContent={props => <CustomMenu {...props} />} >
         
           <Drawer.Screen name="profileDetailsScreen" component={profileDetailsScreen} />
           <Drawer.Screen name="accountScreen" component={accountScreen} />
         
        
      </Drawer.Navigator >
  )
}

const AppStack = () => {
  return (
   
      <App.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }}>
         <App.Screen name="splashScreen" component={splashScreen} />
        <App.Screen name="splashTwoScreen" component={splashTwoScreen} />
        <App.Screen name="homeScreen" component={CustomDrawerNavigation} />
        
      
      </App.Navigator>
    
  );
};




const AuthStack = () => {
  return (
   
      <Auth.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }}>
        <Auth.Screen name="splashScreen" component={splashScreen} />
        <Auth.Screen name="splashTwoScreen" component={splashTwoScreen} />
        <Auth.Screen name="homeScreen" component={HomeScreen} />
        {/*Service Screens*/}
        <Auth.Screen name="findServiceScreen" component={findServiceScreen} />  
        {/* <Auth.Screen name="serviceDetailScreen" component={serviceDetailScreen} /> */}  
        <Auth.Screen name="reviewScreen" component={reviewScreen} />
        <Auth.Screen name="contentListScreen" component={contentListScreen} />
        {/*Auth screens Screens*/}
        <Auth.Screen name="loginScreen" component={loginScreen} /> 
        <Auth.Screen name="joinScreen" component={joinScreen} /> 
        <Auth.Screen name="validateIdentityScreen" component={validateIdentityScreen} />
        <Auth.Screen name="registrationScreen" component={registrationScreen} />
         <Auth.Screen name="thankyouScreen" component={thankyouScreen} />
        
        <Auth.Screen name="forgotPasswordScreen" component={forgotPasswordScreen} />
        <Auth.Screen name="forgotVerifiedScreen" component={forgotVerifiedScreen} />
        <Auth.Screen name="updatePasswordScreen" component={updatePasswordScreen} />
        {/*    */}
        <Auth.Screen name="otpVerifyScreen" component={otpVerifyScreen} />
        <Auth.Screen name="certifyBusinessScreen" component={certifyBusinessScreen} />
       
      </Auth.Navigator>
    
  );
};

const AppLoading = () => {


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken =  await AsyncStorage.getItem('userToken');
       
      } catch (e) {
        
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: data?.token });
      },
      signOut: async () => {

        await AsyncStorage.removeItem('userToken');
        dispatch({ type: 'SIGN_OUT' });

      },
     
    }),
    []
  );


 
  return (
    
         /*  <Stack.Navigator screenOptions={{ headerShown: false }}>
              
                  <Stack.Screen name="Auth" component={AuthStack} />
                  <Stack.Screen name="App" component={AppStack} />
                 
              </Stack.Navigator> */

              <AuthContext.Provider value={authContext}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {state.userToken == null ? (
                  <Stack.Screen name="AuthStack" component={AuthStack} />
                ) : (
                  <Stack.Screen name="AppStack" component={AppStack} />
                )}
              </Stack.Navigator>
              </AuthContext.Provider>
          
           
  )
}
const NavigationLoading = () => {
 
  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/*   {loginState.userToken == null ?
                      <Stack.Screen name="Auth" component={AuthStack} />
                      :
                      <Stack.Screen name="App" component={AppStack} />
                  } */}
                  <Stack.Screen name="AppLoading" component={AppLoading} />
              </Stack.Navigator>
          
              </NavigationContainer>
  )
}



export default NavigationLoading;
