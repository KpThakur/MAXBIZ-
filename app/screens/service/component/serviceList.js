import React, { useState } from "react";
import { FlatList, View,Text } from "react-native";
import ServiceItem from "../../../components/serviceItem";
import { ICONS } from "../../../../utils/imagePath";
import Notfound from '../../../components/notfound'



const ServiceList = (props) => {
  const { serviceList, filteredData } = props
 // console.log('serviceList<<<<<<<<<<<<<<<<<<<<<<<<: ', serviceList);
 // console.log('>>>>>filteredData<<<<<: ', filteredData);

  const [serviceData, setServiceData] = useState([]);

  const renderItem = ({ item }) => {
 
    const showDetail = (serviceDetail, searchdata) => {
       props.showDetail(serviceDetail, searchdata);
   }
   
    return (
      <ServiceItem
        img={item.aws_url}
        name={item.business_name}
        hours={item.hours}
        rating={item.ranting}
        pricemodel={item.pricemodel}
        address={item.address}
        phone={item.phone}
        email={item.email}
        service_name={item.service_name}
        serviceDetail={item}
        showDetail={(serviceDetail)=>showDetail(serviceDetail)}
      />
    );
  };



  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={serviceList}
      //  data={filteredData > 0 ? filteredData : serviceList}
        renderItem={renderItem}
        keyExtractor={serviceList.name}
       // ListHeaderComponent={props.header}
        ListEmptyComponent={<Notfound textnotfound = 'Service'/>}
        extraData={props}
      />
    </>
  );
};

export default ServiceList;
