import React, { useState } from "react";
import Registration from "./component/registration";
import ImagePicker from "react-native-image-crop-picker";

import MultiSelect from 'react-native-multiple-select';
import StringsOfLanguages from "../../../utils/translations";

const items = [{
    id: '92iijs7yta',
    name: 'Ondo'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
  }, {
    id: '16hbajsabsd',
    name: 'Calabar'
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos'
  }, {
    id: '667atsas',
    name: 'Maiduguri'
  }, {
    id: 'hsyasajs',
    name: 'Anambra'
  }, {
    id: 'djsjudksjd',
    name: 'Benue'
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
  }, {
    id: 'suudydjsjd',
    name: 'Abuja'
    }
];




const RegistrationView = ({ navigation }) => {
  const [inputError, setinputError] = useState({});
  const [imageData, setimageData] = useState({});
  const [servicesData, setServicesData] = useState([]);

  const onSelectedItemsChange = (servicesData) => {
    //this.setState({ selectedItems });
    (servicesData.length <= 3)?
    setServicesData(servicesData):'null'
  };


  const uploaddocument = () => {
    ImagePicker.openPicker({}).then((images) => {
      setimageData(images);
    });
  };
  const [register, setRegister] = useState({
    businessusername: "",
    businessname: "",
    address: "",
     about_us: "",
    /*areas: "",
    mainservice: "", */
    operation_hours: "",
    payment: "",
    phone_no: "",
    website_url: "", 
    services: [],
    city: "",
    head_count: "",
    business_photo_url: "",
  });
  function validationFrom() {
    let errorbusinessusername = "";
    let errorbusinessname = "";
    let erroraddress = "";
    let errorservices = "";
    let errorindustry = "";
    let errorcity = "";
    

    if (register.businessusername == "") {
      errorbusinessusername = StringsOfLanguages.PLEASE_ENTER_BUSINESS_USERNAME;
    }
    if (register.businessname == "") {
      errorbusinessname = StringsOfLanguages.PLEASE_ENTER_BUSINESS_NAME;
    }
    if (register.address == "") {
      erroraddress = StringsOfLanguages.PLEASE_ENTER_ADDRESS;
    }
   
    if (servicesData.length  == 0) {
      errorservices = StringsOfLanguages.PLEASE_ENTER_SERVICES;
    }
    /* if (register.industry == "") {
      errorindustry = "Please enter Industry";
    } */
    if (
      errorbusinessusername ||
      errorbusinessname ||
      erroraddress ||
      errorservices ||
      errorindustry ||
      errorcity
     
    ) {
      setinputError({
        ...inputError,
        errorbusinessusername,errorbusinessname, erroraddress ,errorservices,errorindustry,errorcity
      });
      return false;
    }
    return true;
  }

  const toNextPage = () => {
    navigation.navigate("thankyouScreen");
    const valid = validationFrom();
    if (valid) {
      
    }
  };
/*   const uploaddocument = () => {
    
  }; */
  return (
    <Registration
      register={register}
      setRegister={setRegister}
      toNextPage={toNextPage}
      uploaddocument={uploaddocument}
      inputError={inputError}
      servicesData={servicesData}
      setServicesData={setServicesData}
      onSelectedItemsChange={onSelectedItemsChange}
      items={items}
    />
  );
};
export default RegistrationView;
