import React, { useState } from 'react';
import FindService from './component/findService';

const FindServiceView = ({route ,navigation}) => {

    const {service_id,city_id} = route.params
    const [showSearch, setShowSearch] = useState(true)
    const [searchdata, setSearchdata] = useState({
        "service_id": service_id,
        "city_id": city_id
    })
    const toggleShowSearch = () => {
        setShowSearch(!showSearch)
    }

    const searchScreen = () => {
           //setShowSearch(!showSearch)
         // navigation.navigate("findServiceScreen");
        }
    const drawerOpen = () => {
        //navigation.navigate("drawerNavigation");
        }
    
    return (
        <FindService
            searchScreen= {searchScreen}
            drawerOpen ={drawerOpen}
            showSearch ={showSearch}
            setShowSearch ={setShowSearch}
            toggleShowSearch ={toggleShowSearch}
            navigation={navigation}
            searchdata={searchdata}
            setSearchdata={setSearchdata}
            
        />
    )
}
export default FindServiceView;