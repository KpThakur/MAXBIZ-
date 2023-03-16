import React, { useState } from "react";
import { FlatList } from "react-native";
import ServiceItem from "../../../components/serviceItem";
import { ICONS } from "../../../../utils/imagePath";

const DATA = [
  {
    img: require("./../../../assets/dummy/profile.jpg"),
    name: "Peter Wilson",
    reviews: 30,
    rating: 3,
    dollar: 20,
    addrs: "Palm Beach Country FL",
    best: "Accountent | Accountent | Accountent | Accountent",
  },
  {
    img: require("./../../../assets/dummy/profile2.jpg"),
    name: "Garry hilrt",
    reviews: 30,
    rating: 3,
    dollar: 20,
    addrs: "Palm Beach Country FL",
    best: "Accountent | Accountent | Accountent | Accountent",
  },
  {
    img: require("./../../../assets/dummy/profile2.jpg"),
    name: "Garry hlbert",
    reviews: 30,
    rating: 3,
    dollar: 20,
    addrs: "Palm Beach Country FL",
    best: "Accountent | Accountent | Accountent | Accountent",
  },
  {
    img: require("./../../../assets/dummy/profile2.jpg"),
    name: "Garry hilbet",
    reviews: 30,
    rating: 3,
    dollar: 20,
    addrs: "Palm Beach Country FL",
    best: "Accountent | Accountent | Accountent | Accountent",
  },
];


const ServiceList = (props) => {
  const [serviceData, setServiceData] = useState([]);

  const renderItem = ({ item }) => {
 
    const showDetail = (Serviceid) => {
       props.showDetail(Serviceid);
   }
   
    return (
      <ServiceItem
        img={item.img}
        name={item.name}
        reviews={item.reviews}
        rating={item.rating}
        dollar={item.dollar}
        addrs={item.addrs}
        best={item.best}
        showDetail={(Serviceid)=>showDetail(Serviceid)}
      />
    );
  };



  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={DATA.name}
        //ListHeaderComponent={props.header}
        ListEmptyComponent={props.smb}
        extraData={props}
      />
    </>
  );
};

export default ServiceList;
