import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import AppLayout from '../../layout/AppLayout'
import { AppColors } from '../../utils/color'
import AppHeader from '../../components/AppHeader'
import { hp, wp } from '../../utils/constants'
import AppStyles from '../../styles/AppStyles'
import AppFonts from '../../utils/appFonts'
import { size } from '../../utils/responsiveFonts'
import GlobalIcon from '../../components/GlobalIcon'
import AppDoc from '../../components/AppDoc'
import AppButton from '../../components/AppButton'
import { useNavigation } from '@react-navigation/native'
import AppBottomSheet from '../../components/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export default function DriverCertification() {

    const [showDriverLicense, setShowDriverLicense] = useState(false);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['34%', '90%'], []);
    const openSheet = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const closeSheet = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const navigation = useNavigation();

    return (
        <AppLayout
            statusbackgroundColor={AppColors.red}
            style={{ backgroundColor: AppColors.profileBg }}>

            <AppHeader
                role="Driver"
                title={showDriverLicense ? "Driver's License" : "Certification"}
                enableBack={true}
                rightIcon={false}
            />

            {showDriverLicense === false ?
                <Pressable style={{ justifyContent: 'space-between', flex: 1 }} onPress={() => { setShowDriverLicense(true) }}>

                    <View style={{ gap: hp(4), justifyContent: 'center', alignItems: 'center' }}>



                        <View style={styles.mainContainer}>
                            <Text
                                style={[
                                    AppStyles.subHeading,
                                    {

                                        width: '100%',
                                        textAlign: 'center',
                                        paddingVertical: hp(2),
                                        backgroundColor: AppColors.darkBrown,
                                        color: AppColors.white,
                                        fontFamily: AppFonts.NunitoSansBold,
                                        alignSelf: 'center',
                                        fontSize: size.default,

                                    },
                                ]}>
                                Commercial Driver’s License
                            </Text>


                            <View style={styles.boxContainer}>
                                <View style={styles.imageContainer}>
                                    <Image source={require('../../assets/images/driverlicensepic.png')} resizeMode='cover' style={styles.image} />
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={[styles.row1, {width: '100%'}]}>
                                        <Text style={styles.headerSubTitle}>ID: B456788 </Text>
                                        <Text style={styles.headerSubTitle}>Class B</Text>
                                    </View>
                                    <Text style={styles.nameText}>Mark Tommay</Text>
                                    <Text style={styles.headerSubTitle}>Exp Date: <Text style={[styles.headerSubTitle, styles.highlight]}>  7.8.2027  </Text> </Text>
                                    <Text style={styles.headerSubTitle}>Renewal Date: <Text style={[styles.headerSubTitle, styles.highlight]}>  7.8.2027  </Text> </Text>
                                    <View style={[styles.row1,{width: '100%',}]}>
                                        <Text style={[styles.headerSubTitle, { color: AppColors.green }]}>Verified</Text>
                                        <View style={{transform: [{ rotate: '-50deg' }]}}><GlobalIcon library='MaterialIcons' name={'attachment'} color={AppColors.black} /></View>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <AppDoc title={'Fed Med Card'} containerStyle={{}} />
                        <AppDoc title={'Endorsements'} containerStyle={{}} />

                    </View>

                    <AppButton
                        title="Upload Documents"
                        onPress={() => openSheet()}
                        style={{
                            // width: '100%',
                            width: '90%',
                            backgroundColor: AppColors.red,
                            height: hp(6),
                            marginHorizontal: wp(7),
                            alignSelf: 'center',
                            position: 'relative',
                            top: -10
                        }}
                        titleStyle={{
                            fontSize: size.md
                        }}
                    />

                    <AppBottomSheet
                        bottomSheetModalRef={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        backdropComponent={({ style }) => (
                            <Pressable
                                onPress={() => closeSheet()}
                                style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}
                            />
                        )}>
                        <View style={AppStyles.center}>

                            <View style={{ width: '90%' }}>

                                <Text style={[AppStyles.titleHead, { fontSize: size.lg, alignSelf: 'flex-start' }]}>
                                    Upload Documents
                                </Text>
                                <View style={styles.uploadDocBox}>

                                    <GlobalIcon library='FontelloIcon' name={'group-(5)'} color={AppColors.red} size={40} />
                                    <Text style={styles.tapText} >Tap and Upload Files</Text>
                                </View>
                            </View>

                            <View style={[AppStyles.rowBetween, AppStyles.widthFullPercent]}>
                                <AppButton
                                    title="Cancel"
                                    style={styles.backButton}
                                    titleStyle={{ color: AppColors.textLightGrey }}
                                    onPress={() => closeSheet()}
                                />
                                <AppButton title="Upload" style={styles.submitButton} onPress={() => closeSheet()} />
                            </View>
                        </View>
                    </AppBottomSheet>





                </Pressable>

                :
                <>

                    <Text style={styles.text2}>Front Card</Text>
                    <View style={[styles.mainContainer, { marginTop: 0 }]}>
                        <Text
                            style={[
                                AppStyles.subHeading,
                                {

                                    width: '100%',
                                    textAlign: 'center',
                                    paddingVertical: hp(2),
                                    backgroundColor: AppColors.darkBrown,
                                    color: AppColors.white,
                                    fontFamily: AppFonts.NunitoSansBold,
                                    alignSelf: 'center',
                                    fontSize: size.default,

                                },
                            ]}>
                            Commercial Driver’s License
                        </Text>


                        <View style={styles.boxContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={require('../../assets/images/driverlicensepic.png')} resizeMode='cover' style={styles.image} />
                            </View>
                            <View style={styles.infoContainer}>
                            <View style={[styles.row1,{width: '100%'}]}>
                                    <Text style={styles.headerSubTitle}>ID: B456788 </Text>
                                    <Text style={styles.headerSubTitle}>Class B</Text>
                                </View>
                                <Text style={styles.nameText}>Mark Tommay</Text>
                                <Text style={styles.headerSubTitle}>Exp Date: <Text style={[styles.headerSubTitle, styles.highlight]}>  7.8.2027  </Text> </Text>
                                <Text style={styles.headerSubTitle}>Renewal Date: <Text style={[styles.headerSubTitle, styles.highlight]}>  7.8.2027  </Text> </Text>
                                <View style={[styles.row1,{width: '100%', justifyContent: 'flex-end'}]}>
                                    <Text style={[styles.headerSubTitle, { color: AppColors.green, fontSize: size.md }]}>Verified</Text>
                                    {/* <GlobalIcon library='CustomIcon' name={'account_circle'} color={AppColors.red} /> */}
                                </View>
                            </View>
                        </View>

                    </View>

                    <Text style={styles.text2}>Back Card</Text>

                    <View style={[styles.mainContainer3]}>
                        <View style={styles.row}>
                            <Text style={styles.backCardSubText}>Restrictions</Text>
                            <Text style={styles.backCardSubText}>ID: B456788 </Text>
                        </View>
                        <Text style={styles.backCardText}>●  Lorem ipsum dolor sit amet, consectetur adipiscing{'\n'}
                            ●  elit, sed do eiusmod tempor incididunt{'\n'}
                            ●  ut labore et dolore magna aliqua. Ut enim ad minim{'\n'}
                            ●  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex </Text>
                    </View>

                </>


            }


        </AppLayout>
    )
}

const styles = StyleSheet.create({

    backCardSubText: {
        fontFamily: AppFonts.NunitoSansMedium,
        fontSize: size.default,
        lineHeight: 20,
        color: AppColors.black,
        alignSelf: 'center',

    },


    backCardText: {
        fontFamily: AppFonts.NunitoSansRegular,
        fontSize: size.s,
        lineHeight: 20,
        color: AppColors.black,
        alignSelf: 'center',
    },

    uploadDocBox: {
        width: '100%',
        marginVertical: hp(3),
        marginTop: hp(2),
        height: hp(15),
        gap: hp(1),
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: AppColors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },

    tapText: {

        fontFamily: AppFonts.NunitoSansSemiBold,
        fontSize: size.s,
        lineHeight: 20,
        color: AppColors.red,
        alignSelf: 'center',
    },

    text2: {
        fontFamily: AppFonts.NunitoSansMedium,
        fontSize: size.default,
        lineHeight: 20,
        color: AppColors.black,
        alignSelf: 'center',
        marginTop: hp(5),
        marginBottom: hp(1)
    },
    highlight: {
        backgroundColor: AppColors.lightGrey,
    },
    mainContainer: {
        width: '90%',
        marginTop: hp(3),
        alignSelf: 'center',
        backgroundColor: AppColors.white,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 20
    },
    mainContainer3: {
        paddingVertical: hp(6),
        paddingBottom: hp(8),
        justifyContent: 'center', alignItems: 'center', padding: hp(2),
        paddingHorizontal: wp(5),
        gap: hp(1),
        width: '90%',
        marginTop: hp(0),
        alignSelf: 'center',
        backgroundColor: AppColors.white,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 20
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: wp(3),
        padding: wp(3),
        backgroundColor: AppColors.white

    },
    headerSubTitle: {
        fontFamily: AppFonts.NunitoSansMedium,
        fontSize: size.s,
        lineHeight: 20,
        color: AppColors.black,
    },
    image: {
        // width: '100%',
        // height: '100%',
        // borderRadius: hp(10),
        position: 'static',
        borderColor: AppColors.white,
        borderWidth: 1,
    },
    imageContainer: {
        // height: hp(18),
        // width: hp(13),
        alignSelf: 'center'
    },
    infoContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    row1: {
        maxWidth: '80%',
        minWidth: '78%',
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        // gap: wp(10)
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // gap: wp(10)
    },
    nameText: {
        color: AppColors.black,
        fontFamily: AppFonts.NunitoSansSemiBold,
        fontSize: size.xlg,
        textAlign: 'left',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: AppColors.dimGray,
        borderRadius: 5,
        width: '60%',
        marginTop: hp(2),
        marginBottom: hp(1),
    },
    inputStyle: {
        textAlign: 'center',
    },
    backButton: { width: '36%', backgroundColor: AppColors.screenColor },
    submitButton: { width: '60%' },
})