import React from 'react'

import { Text, TouchableOpacity, View,Image, StyleSheet } from 'react-native'
import StarRating from 'react-native-star-rating';


import { scale } from '@utils/utils';
import { COMMON_COLOR, FONT_FAMILY_REGULAR, FONT_FAMILY_SEMIBOLD, GRAY_COLOR, WHITE_COLOR, BLACK_COLOR } from '../utils/constants';
import { ICONS } from '@utils/imagePath';

const ServiceItem = (props) => {
    const {img,name, reviews, rating, dollar, addrs, best} = props
    return (
        <>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.showDetail(name)} style={styles.top}>
                <Image source={img} style={styles.serviceImg}/>
                <View style={styles.dataView}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.review}>rewiews ({reviews})</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={rating}
                        fullStar={ICONS.starIcon}
                        emptyStar={ICONS.starBlackIcon}
                        starSize={24}
                    />
                    <Text style={styles.hour}>${dollar}/hour</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.bottom}>
                <View style={styles.addView}>
                       <Text style={styles.serveTxticon}>
                            <Image source={require("./../assets/images/location.png")} style={styles.serviceImgicon} />
                        </Text>
                        <Text style={styles.addrsTxtadd}>{'197 Rajendra Nagar Indore'}</Text>           
                </View>
                <View style={styles.addView}>
                    <Text style={styles.serveTxt}>Serves : </Text>
                    <Text style={styles.addrsTxt}>{best}</Text>            
                </View>
                {/* <View>
                    <Text style={styles.bestReview}>{best}</Text>
                </View> */}
            </View>
            <View style={styles.contactView}>
                <TouchableOpacity style={styles.contact}>
                    <Image source={ICONS.dialIcon} style={styles.contactImg}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contact}>
                    <Image source={ICONS.emailIcon} style={styles.contactImg}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contact}>
                    <Image source={ICONS.adthereIcon} style={styles.contactImg}/>
                </TouchableOpacity>
            </View>
        </View>
        
        </>
    )
}

export default ServiceItem

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'pink',
        padding:scale(15),
        marginBottom:scale(40),
        marginHorizontal:scale(20),
        marginTop:scale(15),
        borderRadius:scale(10),
        backgroundColor: WHITE_COLOR,
        shadowColor: BLACK_COLOR,
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity:  0.1,
        shadowRadius: 11,
        elevation: 30,
    },
    top:{
        flexDirection:'row'
    },
    serviceImg:{
        height:100,
        width:100,
        borderRadius:10,
        marginTop:8
    },
    dataView:{
        marginLeft:scale(15),
      
    },
    name:{
        fontSize:scale(18),
        fontFamily:FONT_FAMILY_SEMIBOLD
    },
    review:{
        fontFamily:FONT_FAMILY_REGULAR,
        fontSize:scale(13),
        color:GRAY_COLOR
    },
    hour:{
        fontSize:scale(18),
        fontFamily:FONT_FAMILY_SEMIBOLD,
        color:COMMON_COLOR
    },
    bottom:{
        marginVertical:scale(10)
    },
    addView:{
        flexDirection:'row',
        marginBottom:scale(5),
        //paddingBottom:0,
    },
    addrsTxtadd:{
        fontSize:scale(15),
        fontFamily:FONT_FAMILY_SEMIBOLD,
        color:GRAY_COLOR,
        marginTop : 3,
        marginLeft: 8,
    },
    serviceImgicon:{
        height:20,
        width:20,
    },
    serveTxt:{
        fontFamily:FONT_FAMILY_SEMIBOLD,
        fontSize:scale(15),
        color: GRAY_COLOR,        
    },
    addrsTxt:{
        fontSize:scale(13),
        fontFamily:FONT_FAMILY_REGULAR,
        color:GRAY_COLOR,
        flex:1
    },
    bestReview:{
        fontFamily:FONT_FAMILY_REGULAR,
        color:GRAY_COLOR,
        fontSize:scale(13)
    },
    contactView:{
        flexDirection:'row',
        position:'absolute',
        bottom:scale(-20),
        left:scale(0),
        right:scale(0),
        alignItems:'center',
        justifyContent:'center' 
    },
    contact:{
        padding:scale(10),
        marginHorizontal:scale(10),
        borderRadius:scale(8),
        backgroundColor: WHITE_COLOR,
        shadowColor: BLACK_COLOR,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity:  0.1,
        shadowRadius: 1,
        elevation: 10,
     },
    contactImg:{
        width:scale(25),
        height:scale(25)

    },
    
})