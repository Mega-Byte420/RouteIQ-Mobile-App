import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import {mapCustomStyle} from '../utils/mapConfig';
import {fontSize, size} from '../utils/responsiveFonts';
import GlobalIcon from './GlobalIcon';
import Range from './Range';

const AppMapView = () => {
  const navigation = useNavigation();
  const [showDistance, setShowDistance] = useState(false);
  const startLocation = {
    latitude: 37.7749,
    longitude: -122.4454,
  };

  const endLocation = {
    latitude: 37.7793,
    longitude: -122.426,
  };

  const handleChange = useCallback((condition: boolean) => {
    setShowDistance(condition);
  }, []);

  return (
    <View style={styles.mapContainer}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={AppStyles.map}
        region={{
          latitude: (startLocation.latitude + endLocation.latitude) / 2,
          longitude: (startLocation.longitude + endLocation.longitude) / 2,
          latitudeDelta:
            Math.abs(startLocation.latitude - endLocation.latitude) * 1.5,
          longitudeDelta:
            Math.abs(startLocation.longitude - endLocation.longitude) * 1.5,
        }}
        customMapStyle={mapCustomStyle}></MapView>

      <Pressable
        onPress={() => handleChange(true)}
        style={[
          styles.bottomContainers,
          {bottom: hp(49), justifyContent: 'center'},
        ]}>
        <Image source={require('../assets/images/direction.png')} />
      </Pressable>
      {showDistance && <Range onPress={() => handleChange(false)} />}

      <View style={styles.bottomContainers}>
        <View style={styles.firstContainer}>
          <Text
            style={[
              AppStyles.subHeading,
              {fontSize: size.default, fontFamily: AppFonts.NunitoSansBold},
            ]}>
            Boarding status:
          </Text>
          <Text style={styles.onRouteTitle}>On Route</Text>
          <Text
            style={[
              AppStyles.subHeading,
              {fontSize: fontSize(14), fontFamily: AppFonts.NunitoSansBold},
            ]}>
            ETA: <Text style={styles.timeTitle}>15 min</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ParentFeedback')}
          style={styles.secondContainer}>
          <View style={{marginBottom: hp(-1)}}>
            <GlobalIcon
              library="FontelloIcon"
              name="group-1982"
              color={AppColors.red}
              size={hp(4)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppMapView;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  bottomContainers: {
    position: 'absolute',
    bottom: hp(28),
    paddingHorizontal: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  firstContainer: {
    backgroundColor: AppColors.white,
    width: hp(22),
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
    borderRadius: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  onRouteTitle: {
    fontSize: size.slg,
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  timeTitle: {
    fontSize: fontSize(14),
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansBold,
  },
  secondContainer: {
    backgroundColor: AppColors.white,
    padding: hp(2),
    borderRadius: hp(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});
