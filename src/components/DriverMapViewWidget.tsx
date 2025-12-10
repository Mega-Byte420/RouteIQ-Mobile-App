import { Image, PanResponder, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AppLayout from '../layout/AppLayout';
import AppHeader from './AppHeader';
import AppStyles from '../styles/AppStyles';
import AppBottomSheet from './AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AppInput from './AppInput';
import AppButton from './AppButton';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import AppFonts from '../utils/appFonts';
import GlobalIcon from './GlobalIcon';
import AlarmIcon from '../assets/svgs/AlarmIcon';
import { useNavigation } from '@react-navigation/native';
import { mapCustomStyle } from '../utils/mapConfig';
import { AppColors } from '../utils/color';
import { hp, wp } from '../utils/constants';
import { fontSize, size } from '../utils/responsiveFonts';
import Draggable from 'react-native-draggable';
import { Animated } from 'react-native';

const DriverMapViewWidget = () => {

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {useNativeDriver: false}),
        onPanResponderRelease: () => {
          pan.extractOffset();
        },
      }),
    ).current;

    const navigation = useNavigation();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [endTrip, setEndTrip] = useState(false);
    const [tripEnd, setTripEnd] = useState(false);

    const snapPoints = useMemo(() => ['28%', '90%'], []);
    const openSheet = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const closeSheet = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const startLocation = {
        latitude: 37.7749,
        longitude: -122.4454,
    };

    const endLocation = {
        latitude: 37.7793,
        longitude: -122.426,
    };

    const mapView = () => (
        // <TouchableOpacity>
     

        <MapView
            provider={PROVIDER_GOOGLE}
            style={[AppStyles.map, ]}
            region={{
                latitude: (startLocation.latitude + endLocation.latitude) / 2,
                longitude: (startLocation.longitude + endLocation.longitude) / 2,
                latitudeDelta:
                Math.abs(startLocation.latitude - endLocation.latitude) * 1.5,
                longitudeDelta:
                Math.abs(startLocation.longitude - endLocation.longitude) * 1.5,
            }}
            customMapStyle={mapCustomStyle}
            />
           
            //  </TouchableOpacity>
    );

    useEffect(() => {
        
    }, []);

    return (



        //        <Animated.View
        // style={{
        //   transform: [{ translateX: pan.x }, { translateY: pan.y }],
        // }}
        // {...panResponder.panHandlers}>
        <View style={[AppStyles.driverContainer, { paddingHorizontal: hp(0) }]}>

            {mapView()}

            <View style={{position: 'absolute',left: hp(3)}}>
                <Image source={require('../assets/images/map-direction.png')} />
            </View>

            {/* <View style={[styles.absoluteContainer]}> */}
            {/* <View style={[AppStyles.rowBetween, { alignItems: 'flex-end' }]}> */}
            {/* <View style={{ gap: 10 }}> */}
            {/* <View style={styles.firstContainer}>
                    <Text style={styles.boardTitle}>Students</Text>
                    <Text style={styles.boardTitle}>on board:</Text>
                    <Text style={styles.boardDate}>10 / 12</Text>
                    </View> */}
            {!endTrip && (
                <View style={[styles.distanceContainer, styles.absoluteContainer]}>


                    <View style={AppStyles.row}>
                        <Text style={[styles.boardDate, styles.smallHeadings]}>Turn right</Text>
                        <GlobalIcon
                            library="MaterialCommunityIcons"
                            name="arrow-left-top-bold"
                            />

                    </View>

                    <View style={{ gap: hp(0.4) }}>
                        <Text style={styles.boardDate}>3 Birrel Avenue</Text>
                        <View style={[AppStyles.row, { gap: wp(1) }]}>
                            <GlobalIcon
                                library="MaterialCommunityIcons"
                                name="arrow-left-top-bold"
                                size={15}
                                />
                            <Text style={[styles.boardDate, styles.smallHeadings]}>10 Mtr Left</Text>
                        </View>
                    </View>

                </View>
            )}
            {/* </View> */}
            {/* </View> */}

            {/* </View> */}
        </View>


                                // </Animated.View>

    );
};

export default DriverMapViewWidget;

const styles = StyleSheet.create({
    
    firstContainer: {
        backgroundColor: AppColors.black,
        width: hp(12),
        paddingHorizontal: hp(1),
        paddingVertical: hp(1),
        borderRadius: hp(1),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boardDate: {
        fontSize: size.xs,
        color: AppColors.white,
        fontFamily: AppFonts.NunitoSansSemiBold,
    },
    boardTitle: {
        fontSize: fontSize(14),
        color: AppColors.white,
        fontFamily: AppFonts.NunitoSansMedium,
    },
    distanceContainer: {
        width: '100%',
        // width: wp(100),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(0.5),
        backgroundColor: AppColors.red,
        padding: hp(0.7),
        paddingHorizontal: hp(0.4),
        // borderRadius: hp(1),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    absoluteContainer: {
        position: 'absolute',
        bottom: hp(0),
        width: '100%',
        // paddingHorizontal: hp(2),
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
    smallHeadings: {
        fontSize: size.xs
    }
});
