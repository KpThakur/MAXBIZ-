import React, { useState } from "react";
import Registration from "./component/registration";
import ImagePicker from "react-native-image-crop-picker";

import MultiSelect from 'react-native-multiple-select';

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




const registrationView = ({ navigation }) => {
  const [inputError, setinputError] = useState({});
  const [imageData, setimageData] = useState({});
  const [servicesData, setServicesData] = useState([]);
  console.log('servicesData============: ', servicesData);

  const onSelectedItemsChange = (servicesData) => {
  console.log('selectedItems: ', servicesData);
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
    /* intro: "",
    areas: "",
    mainservice: "",
    operation: "",
    payment: "",
    phone_no: "",
    website_url: "", */
    services: "",
    industry: "",
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
      errorbusinessusername = "Please enter Business UserName";
    }
    if (register.businessname == "") {
      errorbusinessname = "Please enter Business Name";
    }
    if (register.address == "") {
      erroraddress = "Please enter Address";
    }
   
    if (servicesData.length  == 0) {
      errorservices = "Please enter Services";
    }
    if (register.industry == "") {
      errorindustry = "Please enter Industry";
    }
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
    const valid = validationFrom();
    if (valid) {
      navigation.navigate("thankyouScreen");
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
export default registrationView;
