import React, { Fragment, useState } from "react";
import { View, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';

import {
  BORDERLINE_COLOR,
  PLACEHOLDER_COLOR,
  FONT_FAMILY_REGULAR,
} from "../utils/constants";
import { scale } from "../utils/utils";
import { GRAY_COLOR } from "../utils/constants";
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
          <Picker.Item label={items} value={items}
          />
        </Picker>
        <View style={styles.border}></View>
    </Fragment>
  );
};
export default picker;

styles = StyleSheet.create({
  itemsDesign: {
      marginHorizontal: 5,
      fontFamily: FONT_FAMILY_REGULAR,
      fontWeight: '400',
      color: GRAY_COLOR,
      fontSize: scale(16),
      right: scale(18)
  },
  border: {
    borderWidth: 1,
    borderColor: BORDERLINE_COLOR,
    height: 1,
    width: "95%",
  },
});
