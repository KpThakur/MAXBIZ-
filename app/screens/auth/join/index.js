import React, { useState } from 'react';
import Join from './component/join';

const JoinView = ({ navigation }) => {
    const [select, setSelect] = useState()
    const toValidtIdentity = () => {
        setSelect(1)
        navigation.navigate('validateIdentityScreen')
    }

    const toCertifyBisnuess = () => {
        setSelect(1)
        navigation.navigate('certifyBusinessScreen')
    }
   

    return (
        <Join
            select={select}
            toValidtIdentity={toValidtIdentity}
            toCertifyBisnuess={toCertifyBisnuess}
           
        />
    )
}
export default JoinView;