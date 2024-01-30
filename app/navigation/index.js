import React, { Fragment } from 'react'
import { View } from 'react-native';
import StackNavigation  from './navigation'
const index = () => {
    return (
        <View style={{flex:1}}>
        <Fragment>
           <StackNavigation/> 
        </Fragment>
        </View> 
    )
}
export default index;