import React, { Fragment, useState } from "react";
import { View,Picker, StyleSheet } from "react-native";
// import {Picker} from '@react-native-picker/picker';
import {
  BORDERLINE_COLOR,
  PLACEHOLDER_COLOR,
  FONT_FAMILY_REGULAR,
} from "@utils/constants";
import { scale } from "@utils/utils";
const picker = (props) => {
  const [selectedData, setSelectedData] = useState({});
  const { placeholder, items} = props;
  return (
    <Fragment>
        <Picker
          style={styles.itemsDesign}
          selectedData={selectedData}
          onValueChange={(itemValue, itemIndex) =>props.onChangeText(itemValue)}
        >
          <Picker.Item label={placeholder} value=""  />
          <Picker.Item 
            label={items}
            value={items}
          />
        </Picker>
        <View style={styles.border}></View>
    </Fragment>
  );
};
export default picker;

styles = StyleSheet.create({
  itemsDesign: {
    fontFamily: FONT_FAMILY_REGULAR + "!important",
    color: PLACEHOLDER_COLOR,
    fontWeight: "400",
    fontSize: scale(15),
  },
  border: {
    borderWidth: 1,
    borderColor: BORDERLINE_COLOR,
    height: 1,
    width: "95%",
  },
});
