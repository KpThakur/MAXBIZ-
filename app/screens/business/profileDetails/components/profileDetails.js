import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  RefreshControl,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
// import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from "react-native-safe-area-context";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import styles from "./style";
import { ICONS } from "../../../../utils/imagePath";
import { scale } from "@utils/utils";
import VideoList from "../../videoList/videoList";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import {
  COMMON_COLOR,
  GRADIENT_COLOR_NEW1,
  WHITE_COLOR,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
} from "./../../../../utils/constants";
import LinearGradient from "react-native-linear-gradient";
import StringsOfLanguages from "../../../../utils/translations";
import { AuthContext } from "../../../../utils/UserContext";
const ProfileDetails = (props) => {
  const {
    businessDetail,
    inputError,
    refreshing,
    onRefresh,
    handleChange,
    value,
    paymentCheckbox,
    toggleCheckbox,
    contactCheckbox,
    toggleContactCheckbox,
    handleChangenaics,
    bussinessFormUpdate,
    paymentMethodError,
    showCall,
    showText,
    showEmail,
    isNonProfit,
    isMinority,
    toggleShowCall,
    toggleShowText,
    toggleShowEmail,
    toggleIsNonProfit,
    toggleIsMinority,
    handleShowTextCheckbox,
    handleShowPaymentCheckbox,
    paymentmethod,
    paymentselectMethod
  } = props;

  // console.log("check name>>>>>", businessDetail?.fullname);

  const [showDetails, setShowDetail] = useState(true);
  const [showVideos, setShowVideos] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  const toggleDetails = () => {
    return setShowDetail(!showDetails);
  };
  const toggleVideos = () => {
    return setShowVideos(!showVideos);
  };
  const togglePhotos = () => {
    return setShowPhotos(!showPhotos);
  };
  const toggleOffers = () => {
    return setShowOffers(!showOffers);
  };
  const toggleJobs = () => {
    return setShowJobs(!showJobs);
  };
  const toggleDocuments = () => {
    return setShowDocuments(!showDocuments);
  };

  return (
    <SafeAreaView style={commomstyle.container}>
      <StatusBar
        animated={true}
        backgroundColor={WHITE_COLOR}
        barStyle="dark-content"
      />
      {/* <LinearGradient
        colors={[
          GRADIENT_COLOR_NEW1,
          GRADIENT_COLOR_NEW2,
          GRADIENT_COLOR_NEW3,
          GRADIENT_COLOR_NEW4,
        ]}
        angle={83}
        locations={[0.24, 0.63, 0.87, 0.99]}
        style={{ flexGrow: 1 }}
      > */}
      <Header
        headertxt={styles.headerTxt}
        headerType="none"
        rightImg={true}
        headerText={StringsOfLanguages.PROFILE_DETAIL}
        rightImgStyl={{}}
      />
      <ScrollView
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COMMON_COLOR}
            colors={[COMMON_COLOR]}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity onPress={toggleDetails} style={styles.dropDown}>
                <Text style={styles.headingTxt}>
                  {StringsOfLanguages.DETAILS}
                </Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={showDetails ? ICONS.upArrwIcon : ICONS.downArrwIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showDetails && (
              <View style={styles.inputWrap}>
                <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChange("fullname", text)}
                    value={businessDetail?.fullname}
                    placeholder={StringsOfLanguages.BUSINESS_NAME}
                    image={"noNeed"}
                    labelTxt={styles.labelTxt}
                    maxLength={70}
                  />
                  <Text style={styles.errorText}>
                    {inputError.errorfullname}
                  </Text>
                </View>

                <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChange("address", text)}
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.ADDRESS}
                    value={businessDetail?.address}
                    labelTxt={styles.labelTxt}
                  />
                  <Text style={styles.errorText}>
                    {inputError.erroraddress}
                  </Text>
                </View>

                <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChange("city_name", text)}
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.CITY_}
                    value={businessDetail?.city_name}
                    // value={`${businessDetail?.city_name} ${businessDetail?.cityid}`}
                    labelTxt={styles.labelTxt}
                  />
                  <Text style={styles.errorText}>
                    {inputError.errorcity_name}
                  </Text>
                </View>

                <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChangenaics(0, "title", text)}
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.SERVICES}
                    // value={businessDetail?.naics[0].title}
                    value={businessDetail?.naics?.[0]?.title || ""}
                    labelTxt={styles.labelTxt}
                    maxLength={70}
                  />
                  <Text style={styles.errorText}>{inputError.errornaics}</Text>
                </View>
                <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChange("industry_name", text)}
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.INDUSTRY_}
                    labelTxt={styles.labelTxt}
                    value={businessDetail?.industry_name}
                    maxLength={70}
                    multiline={true}
                    // inputDsgn={styles.TextInput}
                  />
                  <Text style={styles.errorText}>
                    {inputError.errorindustry_name}
                  </Text>
                </View>

                {/* <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChange("head_count", text)}
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.HEAD_COUNT}
                    labelTxt={styles.labelTxt}
                    value={businessDetail?.head_count}
                  />
                   <Text style={styles.errorText}>
                    {inputError.errorhead_count}
                  </Text>
                </View> */}

                {/* <View style={styles.input}>
                  <Input
                    image={"noNeed"}
                    placeholder={"Overview/introduction"}
                  />
                </View> */}
                {/*  <View style={styles.input}>
                  <Input
                    image={"noNeed"}
                    placeholder={"Servicing areas: cities, counties,states"}
                  />
                </View>
                <View style={styles.input}>
                  <Input
                    image={"noNeed"}
                    placeholder={"Services offered within your main service"}
                  />
                </View> */}
                <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChange("hours", text)}
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.HOURS_OF_OPERATION}
                    labelTxt={styles.labelTxt}
                    value={businessDetail?.hours}
                  />
                  <Text style={styles.errorText}>{inputError.errorhours}</Text>
                </View>

                <View style={styles.input}>
                  <Input
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.PAYMENT_METHOD}
                    labelTxt={styles.labelTxt}
                    // value={businessDetail?.payments}
                    value={value}
                    editable={false}
                  />
                </View>

                {/* <View style={styles.addView}>
                  <View style={styles.addViewtext}>
                    <Text style={styles.serveTxt}>
                      {StringsOfLanguages.PAYMENT_METHOD}
                    </Text>
                  </View>
                  <View style={styles.addViewcontent}>
                    <Text style={styles.addrsTxt}>
                    {paymentmethod?.cash == 1 ? "Cash, " : null}
                    {paymentmethod?.creditcard == 1 ? "Card, " : null}
                    {paymentmethod?.cashapp == 1 ? "Check, " : null}
                    {paymentmethod?.paypal == 1 ? "Paypal, " : null}
                    {paymentmethod?.zelle == 1
                    ? "Zelle"
                    : null}
                    </Text>
                  </View>
                </View> */}

                <View style={styles.input}>
                  <Input
                    onChangeText={(text) => handleChange("websiteurl", text)}
                    image={"noNeed"}
                    placeholder={StringsOfLanguages.WEBSITE_URL}
                    labelTxt={styles.labelTxt}
                    value={businessDetail?.websiteurl}
                  />
                  <Text style={styles.errorText}>
                    {inputError.errorwebsiteurl}
                  </Text>
                </View>
                <View style={styles.input}>
                  <View style={styles.checkboxContainer}>
                    <Text>{StringsOfLanguages.PAYMENT_METHOD}</Text>

                    {/* <View style={styles.checkboxView}>
                      {paymentCheckbox.map((option, index) => (
                        <View key={index} style={styles.checkbox}>
                          <CheckBox
                            checked={option.isSelected}
                            onPress={() => toggleCheckbox(index)}
                          />
                          <Text style={styles.checkboxText}>
                            {option.label}
                          </Text>
                        </View>
                      ))}
                    </View>
                    <Text style={styles.errorText}>
                      {inputError.errorpaymentcheckbox}
                    </Text> */}

                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.checkbox}>
                        <CheckBox
                          onPress={() => handleShowPaymentCheckbox("cash")}
                          checked={businessDetail.cash === 1 ? true : false}
                        />
                        <Text style={styles.checkboxText}>
                          {StringsOfLanguages.CASH}
                        </Text>
                      </View>
                      <View style={styles.checkbox}>
                        <CheckBox
                          onPress={() => handleShowPaymentCheckbox("cashapp")}
                          checked={businessDetail.cashapp === 1 ? true : false}
                        />
                        <Text style={styles.checkboxText}>
                          {StringsOfLanguages.Check}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.checkbox}>
                        <CheckBox
                          onPress={() => handleShowPaymentCheckbox("creditcard")}
                          checked={businessDetail.creditcard === 1 ? true : false}
                        />
                        <Text style={styles.checkboxText}>
                          {StringsOfLanguages.CARD}
                        </Text>
                      </View>
                      <View style={styles.checkbox}>
                        <CheckBox
                          onPress={() => handleShowPaymentCheckbox("paypal")}
                          checked={businessDetail.paypal === 1 ? true : false}
                        />
                        <Text style={styles.checkboxText}>
                          {StringsOfLanguages.PAYPAL}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.checkbox}>
                        <CheckBox
                          onPress={() => handleShowPaymentCheckbox("zelle")}
                          checked={businessDetail.zelle === 1 ? true : false}
                          
                        />
                        <Text style={styles.checkboxText}>
                          {StringsOfLanguages.ZELLE}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text>{StringsOfLanguages.CONTACT_OPTIONS}</Text>

                  {/* <View style={styles.checkboxView}>
                    {contactCheckbox.map((option, index) => (
                      <View key={index} style={styles.checkbox}>
                        <CheckBox
                          checked={option.isSelected}
                          onPress={() => toggleContactCheckbox(index)}
                        />
                        <Text style={styles.checkboxText}>{option.label}</Text>
                      </View>
                    ))}
                  </View>
                  <Text style={styles.errorText}>
                    {inputError.contactOptionsError}
                  </Text> */}

                  <View style={styles.checkbox}>
                    <CheckBox
                      onPress={() => handleShowTextCheckbox("showcall")}
                      checked={businessDetail.showcall === 1 ? true : false}
                    />
                    <Text style={styles.checkboxText}>
                      {StringsOfLanguages.SHOW_CALL_BUTTON}
                    </Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      onPress={() => handleShowTextCheckbox("showtext")}
                      checked={businessDetail.showtext === 1 ? true : false}
                    />
                    <Text style={styles.checkboxText}>
                      {StringsOfLanguages.SHOW_TEXT_BUTTON}
                    </Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      onPress={() => handleShowTextCheckbox("showemail")}
                      checked={businessDetail.showemail === 1 ? true : false}
                    />
                    <Text style={styles.checkboxText}>
                      {StringsOfLanguages.SHOW_EMAIL_BUTTON}
                    </Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      onPress={() => handleShowTextCheckbox("is_nonprofit")}
                      checked={businessDetail.is_nonprofit === 1 ? true : false}
                    />
                    <Text style={styles.checkboxText}>
                      {StringsOfLanguages.NON_PROFIT}
                    </Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      onPress={() => handleShowTextCheckbox("is_minority")}
                      checked={businessDetail.is_minority === 1 ? true : false}
                    />
                    <Text style={styles.checkboxText}>
                      {StringsOfLanguages.MINORITY}
                    </Text>
                  </View>
                  <Text style={styles.errorText}>
                    {inputError.contactOptionsError}
                  </Text>
                </View>

                <View style={styles.saveButton}>
                  <Button
                    buttonText={StringsOfLanguages.SAVE_CHANGES}
                    onPress={() => bussinessFormUpdate()}
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity onPress={toggleVideos} style={styles.dropDown}>
                <Text style={styles.headingTxt}>Videos</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={showVideos ? ICONS.upArrwIcon : ICONS.downArrwIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showVideos && (
              <View>
                <VideoList filetype={"video"} />
              </View>
            )}
          </View>
          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity onPress={togglePhotos} style={styles.dropDown}>
                <Text style={styles.headingTxt}>Photos</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={showPhotos ? ICONS.upArrwIcon : ICONS.downArrwIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showPhotos && (
              <View>
                <VideoList filetype={"photo"} />
              </View>
            )}
          </View>

          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity
                onPress={toggleDocuments}
                style={styles.dropDown}
              >
                <Text style={styles.headingTxt}>Documents</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={
                      showDocuments ? ICONS.upArrwIcon : ICONS.downArrwIcon
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showDocuments && (
              <View>
                <VideoList filetype={"document"} />
              </View>
            )}
          </View>

          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity onPress={toggleOffers} style={styles.dropDown}>
                <Text style={styles.headingTxt}>Offer</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={showPhotos ? ICONS.upArrwIcon : ICONS.downArrwIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showOffers && (
              <View>
                <VideoList filetype={"offer"} />
              </View>
            )}
          </View>
          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity onPress={toggleJobs} style={styles.dropDown}>
                <Text style={styles.headingTxt}>Jobs</Text>
                <View>
                  <Image
                    style={styles.dropdownImg}
                    source={showJobs ? ICONS.upArrwIcon : ICONS.downArrwIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {showJobs && (
              <View>
                <VideoList />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};
export default ProfileDetails;
