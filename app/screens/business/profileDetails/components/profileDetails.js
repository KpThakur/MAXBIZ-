import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
// import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from "react-native-safe-area-context";
import commomstyle from "../../../../common/styles";
import { Button, Input, Header } from "@components";
import styles from "./style";
import { ICONS } from "../../../../utils/imagePath";
import { scale } from '@utils/utils';
import VideoList from '../../videoList/videoList'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  COMMON_COLOR, GRADIENT_COLOR_NEW1, WHITE_COLOR,GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4
} from "./../../../../utils/constants";
import LinearGradient from 'react-native-linear-gradient';
import StringsOfLanguages from "../../../../utils/translations";
const profileDetails = () => {
  const [isSelectedCall, setSelectionCall] = useState(false);
  const [isSelectedText, setSelectionText] = useState(false);
  const [isSelectedEmail, setSelectionEmail] = useState(false);
  const [isSelectedBusiness, setSelectionBusiness] = useState(false);
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
      <LinearGradient
        colors={[GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4]}
        angle={83}
        locations={[0.24, 0.63, 0.87, 0.99]}
        style={{ flexGrow: 1 }}>
      <Header
        headertxt={styles.headerTxt}
        headerType='none'
        rightImg={true}
        headerText={StringsOfLanguages.PROFILE_DETAIL}
        rightImgStyl={{ tintColor: WHITE_COLOR }}
      />
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.container}>

          
          <View style={styles.section1}>
            <View style={styles.headingWrapper}>
              <TouchableOpacity onPress={toggleDetails} style={styles.dropDown}>
                <Text style={styles.headingTxt}>{StringsOfLanguages.DETAILS}</Text>
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
                  {/* <Input image={"noNeed"} placeholder={"Business Name"} /> */}
                  <Input
                      value={"Remi"}
                      placeholder={StringsOfLanguages.BUSINESS_NAME}
                      
                  />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.ADDRESS} />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.SERVICES} />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.INDUSTRY} />
                </View>
                
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.HEAD_COUNT} />
                </View>
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
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.HOURS_OF_OPERATION} />
                </View>
                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.PAYMENT_METHOD} />
                </View>

                <View style={styles.input}>
                  <Input image={"noNeed"} placeholder={StringsOfLanguages.WEBSITE_URL} />
                </View>
                <View style={styles.input}>

                  <View style={styles.checkboxContainer}>
                    <Text>{StringsOfLanguages.PAYMENT_METHOD}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.checkbox}>
                        <CheckBox
                          checked={isSelectedCall}
                          onPress={() => setSelectionCall(!isSelectedCall)}
                        />
                        <Text style={styles.checkboxText}>{StringsOfLanguages.CASH}</Text>
                      </View>
                      <View style={styles.checkbox}>
                        <CheckBox
                          checked={isSelectedText}
                          onPress={() => setSelectionText(!isSelectedText)}
                        />
                        <Text style={styles.checkboxText}>{StringsOfLanguages.CASH_APP}</Text>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row' }}>
                      <View style={styles.checkbox}>
                        <CheckBox
                          checked={isSelectedEmail}
                          onPress={() => setSelectionEmail(!isSelectedEmail)}
                        />
                        <Text style={styles.checkboxText}>{StringsOfLanguages.CREDIT_CARD}</Text>
                      </View>
                      <View style={styles.checkbox}>
                        <CheckBox
                          checked={isSelectedEmail}
                          onPress={() => setSelectionEmail(!isSelectedEmail)}
                        />
                        <Text style={styles.checkboxText}>{StringsOfLanguages.PAYPAL}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                      <View style={styles.checkbox}>
                        <CheckBox
                          checked={isSelectedEmail}
                          onPress={() => setSelectionEmail(!isSelectedEmail)}
                        />
                        <Text style={styles.checkboxText}>{StringsOfLanguages.ZELLE}</Text>
                      </View>
                    </View>
                  </View>
                </View>


                <View style={styles.checkboxContainer}>
                  <Text>{StringsOfLanguages.CONTACT_OPTIONS}</Text>
                  <View style={styles.checkbox}>
                    <CheckBox
                      checked={isSelectedCall}
                      onPress={() => setSelectionCall(!isSelectedCall)}
                    />
                    <Text style={styles.checkboxText}>{StringsOfLanguages.SHOW_CALL_BUTTON}</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      checked={isSelectedText}
                      onPress={() => setSelectionText(!isSelectedText)}
                    />
                    <Text style={styles.checkboxText}>{StringsOfLanguages.SHOW_TEXT_BUTTON}</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      checked={isSelectedEmail}
                      onPress={() => setSelectionEmail(!isSelectedEmail)}
                    />
                    <Text style={styles.checkboxText}>{StringsOfLanguages.SHOW_EMAIL_BUTTON}</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      checked={isSelectedEmail}
                      onPress={() => setSelectionEmail(!isSelectedEmail)}
                    />
                    <Text style={styles.checkboxText}>{StringsOfLanguages.NON_PROFIT}</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      checked={isSelectedEmail}
                      onPress={() => setSelectionEmail(!isSelectedEmail)}
                    />
                    <Text style={styles.checkboxText}>{StringsOfLanguages.MINORITY}</Text>
                  </View>
                </View>

                <View style={styles.saveButton}>
                  <Button buttonText={StringsOfLanguages.SAVE_CHANGES} />
                </View>
              </View>
            )}
          </View>


        {/*   <View style={styles.section1}>
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
            {showVideos &&
              <View>
                <VideoList
                  filetype={'video'} />
              </View>}
          </View> */}
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
            {showPhotos && <View>
              <VideoList filetype={'photo'} />
            </View>}
          </View>

          {/* <View style={styles.section1}>
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
            {showDocuments && <View>
              <VideoList filetype={'document'} />
            </View>}
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
            {showOffers && <View>
              <VideoList filetype={'offer'} />
            </View>}
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
            {showJobs && 
             <View>
              
              <VideoList />
            </View>}
          </View> */}

        </View>
      </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
export default profileDetails;
