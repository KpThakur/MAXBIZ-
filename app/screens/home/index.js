import React, { useState } from 'react';
import Homeview from './component/Homeview';

const Home = ({navigation}) => {

    const [english, setEnglish] = useState(true)
    const [espanol, setEspanol] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [searchdata, setSearchdata] = useState({
        "service_id": '',
        "city_id": ''
    })

    const toggleLanguage = () => {
        setEnglish(!english)
        setEspanol(!espanol)
    }
    const toggleShowSearch = () => {
        setShowSearch(!showSearch)
    }
   const searchService = () => {
        setShowSearch(!showSearch)
          navigation.navigate("findServiceScreen", searchdata);
        }
    const loginScreen = () => {
          navigation.navigate("loginScreen");
        }
    const drawerOpen = () => {
        //navigation.navigate("drawerNavigation");
        }
    return (
        <Homeview
            english={english}
            espanol={espanol}
            showSearch={showSearch}
            toggleLanguage={toggleLanguage}
            toggleShowSearch={toggleShowSearch}
            searchService= {searchService}
            loginScreen= {loginScreen}
            drawerOpen ={drawerOpen}
            searchdata={searchdata}
            setSearchdata={setSearchdata}
        />
    )
}
export default Home;