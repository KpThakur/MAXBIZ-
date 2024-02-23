import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import findServiceScreen from '../screens/findService';
import homeScreen from '../screens/home';
import joinScreen from '../screens/auth/join';
import CustomMenu  from '../components/customMenu';
const Drawer = createDrawerNavigator();

const drawerNavigation = () => {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false , drawerPosition: "right"}} drawerContent={props => <CustomMenu {...props} />} >
        <Drawer.Screen name="Home" component={homeScreen} />       
        <Drawer.Screen name="Join as MAXBIZ" component={joinScreen}/> 
        <Drawer.Screen name="Account Detail" component={joinScreen}/> 
        <Drawer.Screen name="Categories" component={findServiceScreen}/>
        
        {/* {
          DrawerItems.map(drawer=><Drawer.Screen 
            key={drawer.name}
          />)
        } */}
        </Drawer.Navigator>
    )
}


export default drawerNavigation;