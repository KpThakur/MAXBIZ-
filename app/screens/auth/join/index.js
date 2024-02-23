import React, { useState } from 'react';
import Join from './component/join';

const JoinView = ({ navigation }) => {
    const [select, setSelect] = useState()
    const toValidtIdentity = () => {
        setSelect(1)
        navigation.navigate('validateIdentityScreen')
    }
   

    return (
        <Join
            select={select}
            toValidtIdentity={toValidtIdentity}
           
        />
    )
}
export default JoinView;