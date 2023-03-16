import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import style from './style';
import commomstyle from '../../../../common/styles';
import { WHITE_COLOR } from '@utils/constants';
import { Header } from '@components';
import { scale } from '@utils/utils';
import { ICONS } from '@utils/imagePath';


const join = (props) => {
    return (
        <SafeAreaView style={commomstyle.container}>
            <Header
                rightImg={true}
                headerType="other"
               /*  headerText={"JOIN SMB"}
                headertxt={styles.headerTxt} */
            />
            <ScrollView>
                <View style={style.firstContainer}>
                    <Text style={style.firstText}>Join SMB Market &</Text>
                    <Text style={[style.firstText, { bottom: scale(12) }]}>get FREE local</Text>
                    <Text style={[style.firstText, { bottom: scale(20) }]}>leads</Text>
                </View>
                <View style={style.inContainer}>
                    <TouchableOpacity style={style.buttons}
                        activeOpacity={1}
                        onPress={() => props.toValidtIdentity()}>
                        {props.select === 1 ?
                            <View style={style.selectStyle}>
                                <View style={style.tickImage}>
                                    <Image source={ICONS.tickMarkIcon} />
                                </View>
                                <View style={style.selectItem}>
                                    <Image style={{ tintColor: WHITE_COLOR }}
                                        source={ICONS.validateIcon} />
                                    <View style={style.selectedTxt}>
                                        <Text style={style.selectText}>Validate your</Text>
                                        <Text style={[style.selectText, style.bottom]}>identity</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={[style.nonSelect, commomstyle.shadowContainer]}>
                                <Image resizeMode="cover"
                                    source={ICONS.validateIcon} />
                                <View style={style.nonSelectdTxt}>
                                    <Text style={style.nonSelectText}>Validate your</Text>
                                    <Text style={[style.nonSelectText, style.bottom]}>identity</Text>
                                </View>
                            </View>
                        }
                    </TouchableOpacity>
                   {/*  <TouchableOpacity style={style.buttons}
                        activeOpacity={1}
                        onPress={() => props.toRegistration()}>
                        {props.select === 2 ?
                            <View style={style.selectStyle}>
                                <View style={style.tickImage}>
                                    <Image source={ICONS.tickMarkIcon} />
                                </View>
                                <View style={style.selectItem}>
                                    <Image style={{ tintColor: WHITE_COLOR }}
                                        source={ICONS.registerIcon} />
                                    <View style={style.selectedTxt}>
                                        <Text style={style.selectText}>Register your</Text>
                                        <Text style={[style.selectText, style.bottom]}>business</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={[style.nonSelect, commomstyle.shadowContainer]}>
                                <Image resizeMode="cover"
                                    source={ICONS.registerIcon} />
                                <View style={style.nonSelectdTxt}>
                                    <Text style={style.nonSelectText}>Register your</Text>
                                    <Text style={[style.nonSelectText, style.bottom]}>business</Text>
                                </View>
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={style.buttons}
                        activeOpacity={1}
                        onPress={() => props.toCertifyBisnuess()}>
                        {props.select === 3 ?
                            <View style={style.selectStyle}>
                                <View style={style.tickImage}>
                                    <Image source={ICONS.tickMarkIcon} />
                                </View>
                                <View style={style.selectItem}>
                                    <Image style={{ tintColor: WHITE_COLOR, marginRight: scale(4) }}
                                        source={ICONS.certifyIcon} />
                                    <View style={[style.selectedTxt, { paddingRight: scale(32) }]}>
                                        <Text style={style.selectText}>Certify your</Text>
                                        <Text style={[style.selectText, style.bottom]}>business</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={[style.nonSelect, commomstyle.shadowContainer]}>
                                <Image style={{ marginRight: scale(4) }}
                                    source={ICONS.certifyIcon} />
                                <View style={[style.nonSelectdTxt, { paddingRight: scale(32) }]}>
                                    <Text style={style.nonSelectText}>Certify your</Text>
                                    <Text style={[style.nonSelectText, style.bottom]}>business</Text>
                                </View>
                            </View>
                        }
                    </TouchableOpacity>
                 */}</View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default join;