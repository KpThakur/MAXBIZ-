import React, { useCallback, useState } from "react";
import { FlatList, View,Text, RefreshControl } from "react-native";
import ServiceItem from "../../../components/serviceItem";
import { ICONS } from "../../../utils/imagePath";
import Notfound from '../../../components/notfound'
import { COMMON_COLOR } from "../../../utils/constants";



const ServiceList = (props) => {
  const { serviceList } = props

  const [serviceData, setServiceData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
        city={item.city}
        serviceDetail={item}
        showDetail={(serviceDetail)=>showDetail(serviceDetail)}
      />
    );
  };



  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COMMON_COLOR} colors={[COMMON_COLOR]}/>
        }
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
