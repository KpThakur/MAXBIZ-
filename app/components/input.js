import React, { Fragment, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Platform,
} from "react-native";
import {
  BLACK_COLOR,
  BORDERLINE_COLOR,
  PLACEHOLDER_COLOR,
  FONT_FAMILY_REGULAR,
} from "@utils/constants";
import { scale } from "@utils/utils";
import { color } from "react-native-elements/dist/helpers";
import { GRADIENT_COLOR, GRAY_COLOR } from "../utils/constants";
import { normalize, normalizeHeight, normalizeSpacing } from "./scaleFontSize";

const input = (props) => {
  const [selected, setSelected] = useState(false);
  const [isFocused, setIsfocused] = useState(false);
  const handleFocus = () => {
    setSelected(true);
    setIsfocused(true);
  };
  const _handleBlur = () => {
    value === "" && setIsfocused(false);
  };
  const labelStyle = {
    position: "absolute",
    flexDirection: "row",
    bottom: isFocused ? (value === "" ? scale(9) : scale(35)) : scale(12),
  };
  const {
    imgCntnr,
    leftImage,
    value,
    onChangeText,
    style,
    labelTxt,
    labelStyl,
    secureTextEntry,
    inputCntnr,
    inputDsgn,
    brdr,
    rightImage,
    placeholder,
    image,
    keyboardType,
    maxLength,
    editable,
    multiline,
    
  } = props;
  const {
    inputDesign,
    container,
    inputContainer,
    imgContainer,
    border,
    labelText,
    inputDesignnoimg,
  } = styles;
  return (
    <Fragment>
      <View
        style={[
          {
            marginBottom: isFocused ? scale(15) : scale(0),
            marginTop: isFocused ? scale(24) : scale(0),
          },
          container,
          style,
        ]}
      >
        <View style={[labelStyle, labelStyl]}>
          <View style={[inputContainer, inputCntnr]}>
            {image == "noNeed" ? null : (
              <Image style={[imgContainer, imgCntnr]} source={leftImage} />
            )}
            <View>
              <Text style={[labelText, labelTxt]}>{placeholder}</Text>
            </View>
            <Image source={rightImage} />
          </View>
        </View>
        <TextInput
          style={[
            image == "noNeed" ? inputDesignnoimg : inputDesign,
            inputDsgn,
            { color: GRAY_COLOR },
          ]}
          value={value}
          keyboardType={keyboardType ? keyboardType : "default"}
          maxLength={maxLength ? maxLength : 30}
          onChangeText={(val) => onChangeText(val)}
          secureTextEntry={secureTextEntry}
          onFocus={handleFocus}
          onBlur={_handleBlur}
          editable={editable}
          multiline={multiline}
          
        />
        <View
          style={[
            border,
            { marginLeft: image == "noNeed" ? scale(3) : scale(27) },
            brdr,
          ]}
        ></View>
      </View>
    </Fragment>
  );
};
input.defaultProps = {
  secureTextEntry: false,
  value: "",
  placeholder: "Input",
};

const styles = StyleSheet.create({
  container: {
    height: 45,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  labelText: {
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
    fontWeight: "400",
    // marginHorizontal: scale(9),
    marginHorizontal: Platform.OS === "ios" ? scale(3) : scale(6),
    fontSize: scale(15),
    top: scale(3),
  },
  imgContainer: {
    width: scale(18),
    height: scale(18),
    bottom: scale(1),
  },
  inputDesign: {
    marginHorizontal: 5,
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: "400",
    color: BLACK_COLOR,
    fontSize: scale(16),
    top: scale(5),
    paddingRight: scale(15),
    left: scale(18),
  },
  inputDesignnoimg: {
    //marginHorizontal: 5,
    marginHorizontal: scale(3),
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: "400",
    color: BLACK_COLOR,
    fontSize: scale(16),
    //top: scale(5),
    top: scale(12),
    paddingRight: scale(15),
    //left: scale(18)
  },
  border: {
    borderWidth: 1,
    borderColor: BORDERLINE_COLOR,
    height: 1,
    marginRight: scale(3),
    marginTop: Platform.OS === "ios" ? normalizeSpacing(12) : null,
  },
});
export default input;
