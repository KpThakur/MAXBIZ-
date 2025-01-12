import React, {Fragment, useRef, useState} from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Platform,
  Linking,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
// import StarRating from 'react-native-star-rating';
import StringsOfLanguages from '../utils/translations';

import {scale} from '../utils/utils';
import {
  COMMON_COLOR,
  FONT_FAMILY_REGULAR,
  FONT_FAMILY_SEMIBOLD,
  YELLOW_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
  BLACK_COLOR,
} from '../utils/constants';
//import { ICONS } from "../utils/imagePath";
import {ICONS} from '../utils/imagePath';
import {
  BORDERLINE_COLOR,
  FONT_FAMILY_LIGHT,
  FONT_FAMILY_MEDIUM,
  GOLDEN_COLOR,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
} from '../utils/constants';
import {normalize} from './scaleFontSize';

import {StarRatingDisplay} from 'react-native-star-rating-widget';
const ServiceItem = props => {
  const {
    img,
    name,
    hours,
    rating,
    pricemodel,
    address,
    phone,
    email,
    service_name,
    serviceDetail,
    city,
  } = props;

  const [profileLoader, setProfileLoader] = useState('');

  const onLoadProfileStart = () => {
    setProfileLoader(true);
  };
  const onLoadProfileEnd = () => {
    setProfileLoader(false);
  };

  const renderFileUri = () => {
    if (img !== '') {
      return (
        <View>
          <Fragment>
            {profileLoader == true ? (
              <ActivityIndicator
                style={styles.activityIndicator}
                // animating={props.profileLoader}
                size={'large'}
                color={COMMON_COLOR}
              />
            ) : null}
            <Image
              onLoadStart={() => onLoadProfileStart()}
              onLoadEnd={() => onLoadProfileEnd()}
              source={{uri: `${img}`}}
              style={styles.serviceImg}
            />
          </Fragment>
        </View>
      );
    } else {
      return (
        <Image
          source={require('../assets/dummy/no_image.png')}
          style={styles.serviceImg}
        />
      );
    }
  };

  return (
    <>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.showDetail(serviceDetail);
          }}
          style={styles.top}>
          <View style={styles.activeView}>{renderFileUri()}</View>

          <View style={styles.dataView}>
            <Text style={styles.name}>{name}</Text>
            {/* <Text style={styles.review}>{hours}</Text> */}
            <View style={{width: 130}}>
              {/* <StarRating
                disabled={false}
                maxStars={5}
                // rating={rating}
                rating={parseFloat(rating)}
                fullStar={ICONS.starIcon}
                emptyStar={ICONS.emptystarIcon}
                halfStar={ICONS.halfstarIcon}
                starStyle={styles.starStyle}
               // starSize={20}
                fullStarColor={GOLDEN_COLOR}
              /> */}
              <StarRatingDisplay
                rating={parseFloat(rating)}
                maxStars={5}
                starSize={20}
                color={GOLDEN_COLOR}
                emptyColor={GRAY_COLOR}
                starStyle={styles.starStyle}
              />
            </View>
            <Text style={styles.hour}>{pricemodel}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bottom}>
          {/* <View style={styles.addView}>
            <Text style={styles.serveTxticon}>
              <Image source={ICONS.dialIcon} style={styles.serviceImgicon} />
            </Text>
            <Text style={styles.addrsTxtadd}>{phone}</Text>
          </View> */}

          {/* <View style={styles.addView}>
            <Text style={styles.serveTxticon}>
              <Image source={ICONS.emailIcon} style={styles.serviceImgicon} />
            </Text>
            <Text style={styles.addrsTxtadd}>{email}</Text>
          </View>
           */}

          {/* <View style={styles.addView}>
            <Text style={styles.serveTxticon}>
              <Image
                source={ICONS.locationIcon}
                style={styles.serviceImgicon}
              />
            </Text>
            <Text style={styles.addrsTxtadd}>{address}</Text>
          </View> */}

          <View style={styles.addView}>
            <View style={styles.addViewtext}>
              <Text style={styles.serveTxt}>
                {StringsOfLanguages.SEARCH_SERVICE}:
              </Text>
            </View>
            <View style={styles.addViewcontent}>
              <Text style={styles.addrsTxt}>
                {service_name
                  ? service_name.map(item => item.title).join(', ')
                  : ''}
              </Text>
            </View>
          </View>
          {/* <View>
                    <Text style={styles.bestReview}>{best}</Text>
                </View> */}

          {/* <View style={styles.addView}>
            <Text style={styles.serveTxt}>{StringsOfLanguages.INDUSTRY}</Text>
            <Text
             // style={[styles.addrsTxtadd]}
               style={styles.addrsTxt}
            >
              {serviceDetail?.industryname}
            </Text>
          </View> */}

          <View style={styles.addView}>
            <View style={styles.addViewtext}>
              <Text style={styles.serveTxt}>{StringsOfLanguages.INDUSTRY}</Text>
            </View>
            <View style={styles.addViewcontent}>
              <Text style={styles.addrsTxt}>{serviceDetail?.industryname}</Text>
            </View>
          </View>

          <View style={styles.addView}>
            <View style={styles.addViewtext}>
              <Text style={styles.serveTxt}>{StringsOfLanguages.CITY}</Text>
            </View>
            <View style={styles.addViewcontent}>
              <Text
                // style={[styles.addrsTxtadd, { bottom: scale(2.5) }]}
                style={[styles.addrsTxt]}>
                {city}, {serviceDetail?.state_name}
              </Text>
            </View>
          </View>

          <View style={styles.addView}>
            <View style={styles.addViewtext}>
              <Text style={styles.serveTxt}>{StringsOfLanguages.HOURS}</Text>
            </View>

            <View style={styles.addViewcontent}>
              <Text
                // style={[styles.addrsTxtadd, { bottom: scale(2.5) }]}
                style={[styles.addrsTxt]}>
                {serviceDetail?.hours}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contactView}>
          {serviceDetail?.showtext === 1 ? (
            <>
              <TouchableOpacity
                style={styles.contact}
                onPress={() => Linking.openURL(`sms:${serviceDetail?.phone}`)}>
                <Image source={ICONS.adthereIcon} style={styles.contactImg} />
              </TouchableOpacity>
            </>
          ) : null}

          {serviceDetail?.showcall === 1 ? (
            <>
              <TouchableOpacity
                style={styles.contact}
                onPress={() => Linking.openURL(`tel:${serviceDetail?.phone}`)}>
                <Image source={ICONS.dialIcon} style={styles.contactImg} />
              </TouchableOpacity>
            </>
          ) : null}

          {serviceDetail?.showemail === 1 ? (
            <>
              <TouchableOpacity
                style={styles.contact}
                onPress={() =>
                  Linking.openURL(`mailto:${serviceDetail?.email}`)
                }>
                <Image source={ICONS.emailIcon} style={styles.contactImg} />
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity
            style={styles.contact}
            onPress={() => Linking.openURL(`${serviceDetail?.websiteurl}`)}>
            <Image source={ICONS.website_Icon} style={styles.contactImg} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contact}
            // onPress={() => Linking.openURL(`geo:${serviceDetail?.address}`)}
            // onPress={() => Linking.openURL(`geo:${serviceDetail?.latitude},${serviceDetail?.longitude}`)}
            onPress={() =>
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  serviceDetail?.address,
                )}`,
              )
            }>
            <Image source={ICONS.map_Icon} style={styles.contactImg} />
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    //backgroundColor:'pink',
    padding: scale(15),
    marginBottom: scale(40),
    marginHorizontal: scale(20),
    marginTop: scale(15),
    borderRadius: scale(10),
    backgroundColor: WHITE_COLOR,
    shadowColor: BLACK_COLOR,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10,
  },
  top: {
    flexDirection: 'row',
  },
  serviceImg: {
    height: 100,
    width: 100,
    borderRadius: 10,
    // marginTop: 8,
  },
  dataView: {
    marginLeft: scale(15),
    width: scale(170),
  },
  name: {
    fontSize: scale(14),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_COLOR,
  },
  review: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: scale(13),
    color: GRAY_COLOR,
  },
  hour: {
    fontSize: scale(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: COMMON_COLOR,
  },
  bottom: {
    marginVertical: scale(10),
  },

  addViewtext: {
    flex: 1.8,
    // backgroundColor:'yellow',
  },

  addViewcontent: {
    flex: 4.1,
    // backgroundColor:'red',
    // marginLeft:scale(1)
  },
  addView: {
    flexDirection: 'row',
    // borderBottomWidth:1,
    //  borderBottomColor:BORDERLINE_COLOR,
    marginBottom: scale(5),
  },
  // addView: {
  //   flexDirection: "row",
  //   marginBottom: scale(5),
  //   paddingVertical: Platform.OS === "ios" ? normalize(2) : null,
  //   // alignItems:'center'
  //   //paddingBottom:0,
  // },
  addrsTxtadd: {
    fontSize: scale(15),
    fontFamily: FONT_FAMILY_SEMIBOLD,
    color: GRAY_COLOR,
    marginTop: Platform.OS === 'ios' ? normalize(-2) : 3,
    marginLeft: 8,
  },
  serviceImgicon: {
    height: 20,
    width: 20,
  },
  serveTxt: {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: scale(13),
    color: GRAY_COLOR,
    marginTop: 2,
  },
  addrsTxt: {
    fontSize: scale(13),
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
    top: 2,
    // flex:1
  },
  // addrsTxt: {
  //   fontSize: scale(13),
  //   fontFamily: FONT_FAMILY_REGULAR,
  //   color: GRAY_COLOR,
  //   flex: 1,
  //   marginLeft: normalize(5),
  //   top: 2,
  // },
  bestReview: {
    fontFamily: FONT_FAMILY_REGULAR,
    color: GRAY_COLOR,
    fontSize: scale(13),
  },
  contactView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: scale(-20),
    left: scale(0),
    right: scale(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    padding: scale(10),
    marginHorizontal: scale(10),
    borderRadius: scale(8),
    backgroundColor: GRADIENT_COLOR_NEW2,
    shadowColor: BLACK_COLOR,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 10,
  },
  contactImg: {
    width: scale(20),
    height: scale(20),
    tintColor: WHITE_COLOR,
  },
  activeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 10,
    right: 0,
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starStyle: {
    marginHorizontal: 3,
  },
});
