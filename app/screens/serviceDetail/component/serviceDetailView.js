import React, { useState } from 'react'
import { SafeAreaView, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import { GRADIENT_COLOR_NEW1, GRADIENT_COLOR_NEW2, GRADIENT_COLOR_NEW3, GRADIENT_COLOR_NEW4 } from '@utils/constants';
import styles from './style'
import commomstyle from '../../../common/styles';
import { Button, Input, Header } from '@components';
import { ICONS } from './../../../utils/imagePath';

import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import { BLACK_COLOR, GRAY_COLOR, WHITE_COLOR, YELLOW_COLOR } from '../../../utils/constants';
import { scale } from '@utils/utils';
import StringsOfLanguages from '../../../utils/translations';
const ServiceDetailView = (props) => {
  const { toggleShowSearch, serviceDetail, showDetailContent, backscreen } = props


  return (
    <SafeAreaView style={commomstyle.container}>


      <Header
        onPressLeft={toggleShowSearch}
        onPressRight={props.drawerOpen()}
        //headerType={'other'}
        rightImgStyl={{ tintColor: BLACK_COLOR }}
        rightImg={true}
        // headerText={serviceDetail?.fullname}
        headerText={''}
        headertxt={styles.headerTxt}
        backscreen={backscreen}
        showFindServiceOnBack={true}

      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.top}>
            <Image source={require("../../../assets/dummy/no_image.png")} style={styles.serviceImg} />
            <View style={styles.dataView}>
              <Text style={styles.name}>{serviceDetail?.fullname}</Text>
              <Text style={styles.review}>{serviceDetail?.hours}</Text>
              <View style={{ width: 130 }}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={serviceDetail?.avg_rating}
                  /*  fullStar={ICONS.starIcon}
                   emptyStar={ICONS.starBlackIcon} */
                  starSize={20}
                  fullStarColor={YELLOW_COLOR}
                  starStyle={{}

                  }
                /></View>
              <Text style={styles.hour}>{serviceDetail?.pricemodel}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.bottom}>
            <View style={styles.addView}>
              <Text style={styles.serveTxticon}>
                <Image source={require("./../../../assets/images/location.png")} style={styles.serviceImgicon} />
              </Text>
              <Text style={styles.addrsTxtadd}>{serviceDetail?.address}</Text>
            </View>
            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.SERVICES}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.servicedata ? serviceDetail?.servicedata.map(item => item.title).join(" | ") : ""}</Text>
              </View>
            </View>
            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.PHONE}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.phone}</Text>
              </View>
            </View>
            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.EMAIL}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.email}</Text>
              </View>
            </View>
            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.CITY}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.city}</Text>
              </View>
            </View>

            <View style={styles.addView}>

              <Text style={styles.serveTxt}>{StringsOfLanguages.HEAD_COUNT}</Text>


              <Text style={styles.addrsTxt}>{serviceDetail?.numemps}</Text>

            </View>

            <View style={styles.addView}>
              <View style={styles.addViewtext}>
                <Text style={styles.serveTxt}>{StringsOfLanguages.PAYMENTS}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>

                  {'Cash | Credit card | Cash app | Paypal'}</Text>
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
                <Text style={styles.serveTxt}>{StringsOfLanguages.WEBSITE}</Text>
              </View>
              <View style={styles.addViewcontent}>
                <Text style={styles.addrsTxt}>{serviceDetail?.websiteurl}</Text>
              </View>
            </View>
            <View style={styles.addView}>
              <Text style={styles.serveTxt}>{StringsOfLanguages.ABOUT}</Text>
              <Text style={[styles.addrsTxt, { flex: 1 }]}>{'  '}{serviceDetail?.about}</Text>
            </View>
            {/*  <View>
                        <Text style={styles.bestReview}>"{'best'}"</Text>
                    </View> */}

            <View style={styles.addViewicons}>
              <TouchableOpacity onPress={() => showDetailContent('contentListScreen', 'Video')} style={styles.contactvideo}>
                <Image source={ICONS.videoIcon} style={styles.contactImgvideo} />
                <Text style={styles.contacttext}>Video</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showDetailContent('contentListScreen', 'Photo', serviceDetail?.photo)} style={styles.contactvideo}>
                <Image source={ICONS.photoIcon} style={styles.contactImgvideo} />
                <Text style={styles.contacttext}>{StringsOfLanguages.PHOTO}</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.addViewicons}>
            <TouchableOpacity  onPress={() => showDetailContent('contentListScreen', 'Document', serviceDetail?.documents)} style={styles.contactvideo}>
                <Image source={ICONS.documentIcon} style={styles.contactImgvideo}/>
                <Text style={styles.contacttext}>Documents</Text>
            </TouchableOpacity>
            
              <TouchableOpacity onPress={() => showDetailContent('contentListScreen', 'Jobs', serviceDetail?.jobs)} style={styles.contactvideo}>
                <Image source={ICONS.jobsIcon} style={styles.contactImgvideo} />
                <Text style={styles.contacttext}>Jobs</Text>
              </TouchableOpacity>

             
            </View>
            <View style={styles.addViewicons}>

            <TouchableOpacity onPress={() => showDetailContent('contentListScreen', 'Offers', serviceDetail?.offers)} style={styles.contactvideo}>
                <Image source={ICONS.offersIcon} style={styles.contactImgvideo} />
                <Text style={styles.contacttext}>Offers</Text>
              </TouchableOpacity>
            
            <TouchableOpacity onPress={() => showDetailContent('reviewScreen', 'review', serviceDetail?.reviews)} style={styles.contactvideo}>
                <Image source={ICONS.reviewsIcon} style={styles.contactImgvideo} />
                <Text style={styles.contacttext}>{StringsOfLanguages.REVIEWS}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addViewicons}>
              {/*   */}

            </View>



          </View>
          <View style={styles.contactView}>
            {serviceDetail?.showcall == 1 ? <>
              <TouchableOpacity style={styles.contact}>
                <Image source={ICONS.dialIcon} style={styles.contactImg} />
              </TouchableOpacity></> : null
            }

            {serviceDetail?.showemail == 1 ? <>
              <TouchableOpacity style={styles.contact}>
                <Image source={ICONS.emailIcon} style={styles.contactImg} />
              </TouchableOpacity>
            </> : null
            }
            {serviceDetail?.showtext == 1 ? <>
              <TouchableOpacity style={styles.contact}>
                <Image source={ICONS.adthereIcon} style={styles.contactImg} />
              </TouchableOpacity>
            </> : null
            }

          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ServiceDetailView