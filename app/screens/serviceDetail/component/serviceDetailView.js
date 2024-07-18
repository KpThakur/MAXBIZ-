import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {
  GRADIENT_COLOR_NEW1,
  GRADIENT_COLOR_NEW2,
  GRADIENT_COLOR_NEW3,
  GRADIENT_COLOR_NEW4,
} from '../../utils/constants';
import styles from './style';
import commomstyle from '../../../common/styles';
import {Button, Input, Header} from '../../../components';
import {ICONS} from './../../../utils/imagePath';

// import StarRating from "react-native-star-rating";
import {StarRatingDisplay} from 'react-native-star-rating-widget';

import LinearGradient from 'react-native-linear-gradient';
import {
  BLACK_COLOR,
  COMMON_COLOR,
  GOLDEN_COLOR,
  GRAY_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from '../../../utils/constants';
import {scale} from '../utils/utils';
import StringsOfLanguages from '../../../utils/translations';
import {PaymentContext} from '../../../utils/searchContext';
const ServiceDetailView = props => {
  const {
    toggleShowSearch,
    serviceDetail,
    showDetailContent,
    backscreen,
    paymentList,
    image,
    serviceDetaildata,
    refreshing,
    onRefresh,
  } = props;
  console.log('🚀 ~ ServiceDetailView ~ paymentList:', paymentList);

  // const [paymentList, setPaymentList] = useContext(PaymentContext);

  const [profileLoader, setProfileLoader] = useState('');

  const onLoadProfileStart = () => {
    setProfileLoader(true);
  };
  const onLoadProfileEnd = () => {
    setProfileLoader(false);
  };

  const renderFileUri = () => {
    if (image !== '') {
      return (
        <View>
          <Fragment>
            {profileLoader == true ? (
              <ActivityIndicator
                style={styles.activityIndicator}
                // animating={props.profileLoader}
                size={'large'}
              />
            ) : null}
            <Image
              onLoadStart={() => onLoadProfileStart()}
              onLoadEnd={() => onLoadProfileEnd()}
              source={{uri: `${image}`}}
              style={styles.serviceImg}
            />
          </Fragment>
        </View>
      );
    } else {
      return (
        <Image
          source={require('../../../assets/dummy/no_image.png')}
          style={styles.serviceImg}
        />
      );
    }
  };

  return (
    <SafeAreaView style={commomstyle.container}>
      <StatusBar
        animated={true}
        backgroundColor={WHITE_COLOR}
        barStyle="dark-content"
      />
      <Header
        onPressLeft={toggleShowSearch}
        onPressRight={props.drawerOpen()}
        //headerType={'other'}
        rightImgStyl={{tintColor: BLACK_COLOR}}
        rightImg={true}
        // headerText={serviceDetail?.fullname}
        headerText={''}
        headertxt={styles.headerTxt}
        backscreen={backscreen}
        showFindServiceOnBack={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COMMON_COLOR}
            colors={[COMMON_COLOR]}
          />
        }>
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.activeView}>{renderFileUri()}</View>
            <View style={styles.dataView}>
              <Text style={styles.name}>{serviceDetail?.fullname}</Text>
              {/* <Text style={styles.review}>{serviceDetail?.hours}</Text> */}
              <View style={{width: 130}}>
                {/* <StarRating
                  disabled={false}
                  maxStars={5}
                  // rating={serviceDetail?.avg_rating}
                  rating={parseFloat(serviceDetail?.avg_rating)}
                    fullStar={ICONS.starIcon}
                  // emptyStar={ICONS.starBlackIcon} 
                  emptyStar={ICONS.emptystarIcon}
                  halfStar={ICONS.halfstarIcon}
                  starStyle={styles.starStyle}
                 // starSize={20}
                  fullStarColor={GOLDEN_COLOR}
                 // starStyle={{}}
                /> */}
                <StarRatingDisplay
                  rating={parseFloat(serviceDetail?.avg_rating)}
                  maxStars={5}
                  starSize={20}
                  color={GOLDEN_COLOR}
                  emptyColor={GRAY_COLOR}
                  starStyle={styles.starStyle}
                />
              </View>
              {/* <Text style={styles.hour}>{serviceDetail?.pricemodel}</Text> */}
            </View>
          </View>

          <View style={styles.bottom}>
            <View style={styles.addView}>
              <Text style={styles.serveTxticon}>
                {/* <Image
                  // source={require("./../../../assets/images/location.png")}
                  source={ICONS.locationIcon}
                  style={styles.serviceImgicon}
                /> */}
              </Text>
              {/* <Text style={styles.addrsTxtadd}>{serviceDetail?.address}</Text> */}
            </View>

            {/* <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.PHONE}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.phone}</Text>
              </View>
            </View> */}

            {/* <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.EMAIL}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.email}</Text>
              </View>
            </View> */}

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>
                  {/* {StringsOfLanguages.SERVICES} */}
                  {StringsOfLanguages.SEARCH_SERVICE}:
                </Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>
                  {serviceDetail?.servicedata
                    ? serviceDetail?.servicedata
                        .map(item => item.title)
                        .join(', ')
                    : ''}
                </Text>
              </View>
            </View>

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.CITY}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>
                  {serviceDetail?.city}, {serviceDetaildata?.state_name}
                </Text>
              </View>
            </View>

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>
                  {StringsOfLanguages.INDUSTRY}
                </Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>
                  {serviceDetail?.industry_name}
                </Text>
              </View>
            </View>

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>Pricing Model :</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.pricemodel}</Text>
              </View>
            </View>

            {/* <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>
                  {StringsOfLanguages.HEAD_COUNT}
                </Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.numemps}</Text>
              </View>
            </View> */}

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>
                  {StringsOfLanguages.PAYMENTS}
                </Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>
                  {/* {"Cash | Credit card | Cash app | Paypal"} */}
                  {paymentList?.cash == 1 ? 'Cash, ' : null}
                  {paymentList?.creditcard == 1 ? 'Card, ' : null}
                  {/* {paymentList?.cashapp == 1 ? "Cash app, " : null} */}
                  {paymentList?.cashapp == 1 ? 'Check, ' : null}
                  {paymentList?.paypal == 1 ? 'Paypal, ' : null}
                  {paymentList?.zelle == 1 ? 'Zelle' : null}
                </Text>
              </View>
            </View>

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.HOURS}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.hours}</Text>
              </View>
            </View>

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>
                  {StringsOfLanguages.WEBSITE}
                </Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.websiteurl}</Text>
              </View>
            </View>

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.ABOUT}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={[styles.addrsTxt, {flex: 1}]}>
                  {''}
                  {serviceDetail?.about}
                </Text>
              </View>
            </View>

            {/*  <View>
                        <Text style={styles.bestReview}>"{'best'}"</Text>
                    </View> */}

            <View style={styles.addViewicons}>
              <TouchableOpacity
                onPress={() =>
                  showDetailContent(
                    'contentListScreen',
                    'Video',
                    serviceDetail?.video,
                  )
                }
                style={styles.contactvideo}>
                <Image
                  source={ICONS.videoIcon}
                  style={styles.contactImgvideo}
                />
                <Text style={styles.contacttext}>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  showDetailContent(
                    'contentListScreen',
                    'Photo',
                    serviceDetail?.photo,
                  )
                }
                style={styles.contactvideo}>
                <Image
                  source={ICONS.photoIcon}
                  style={styles.contactImgvideo}
                />
                <Text style={styles.contacttext}>
                  {StringsOfLanguages.PHOTO}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addViewicons}>
              <TouchableOpacity
                onPress={() =>
                  showDetailContent(
                    'contentListScreen',
                    'Document',
                    serviceDetail?.documents,
                  )
                }
                style={styles.contactvideo}>
                <Image
                  source={ICONS.documentIcon}
                  style={styles.contactImgvideo}
                />
                <Text style={styles.contacttext}>Documents</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  showDetailContent(
                    'contentListScreen',
                    'Jobs',
                    serviceDetail?.jobs,
                  )
                }
                style={styles.contactvideo}>
                <Image source={ICONS.jobsIcon} style={styles.contactImgvideo} />
                <Text style={styles.contacttext}>Jobs</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addViewicons}>
              <TouchableOpacity
                onPress={() =>
                  showDetailContent(
                    'contentListScreen',
                    'Offers',
                    serviceDetail?.offers,
                  )
                }
                style={styles.contactvideo}>
                <Image
                  source={ICONS.offersIcon}
                  style={styles.contactImgvideo}
                />
                <Text style={styles.contacttext}>Offers</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  showDetailContent(
                    'reviewScreen',
                    'review',
                    serviceDetail?.reviews,
                  )
                }
                style={styles.contactvideo}>
                <Image
                  source={ICONS.reviewsIcon}
                  style={styles.contactImgvideo}
                />
                <Text style={styles.contacttext}>
                  {StringsOfLanguages.REVIEWS}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addViewicons}>{/*   */}</View>
          </View>

          <View style={styles.contactView}>
            {serviceDetail?.showtext == 1 ? (
              <>
                <TouchableOpacity
                  style={styles.contact}
                  onPress={() =>
                    Linking.openURL(`sms:${serviceDetail?.phone}`)
                  }>
                  <Image source={ICONS.adthereIcon} style={styles.contactImg} />
                </TouchableOpacity>
              </>
            ) : null}

            {serviceDetail?.showcall == 1 ? (
              <>
                <TouchableOpacity
                  style={styles.contact}
                  onPress={() =>
                    Linking.openURL(`tel:${serviceDetail?.phone}`)
                  }>
                  <Image source={ICONS.dialIcon} style={styles.contactImg} />
                </TouchableOpacity>
              </>
            ) : null}

            {serviceDetail?.showemail == 1 ? (
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceDetailView;
