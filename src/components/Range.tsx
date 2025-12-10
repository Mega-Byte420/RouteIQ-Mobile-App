import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hp} from '../utils/constants';
import {AppColors} from '../utils/color';
import Slider from '@react-native-community/slider';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import {size} from '../utils/responsiveFonts';
import AppButton from './AppButton';
import {RangeProps} from '../types/types';

const Range: React.FC<RangeProps> = ({onPress}) => {
  return (
    <View style={styles.bottomContainers}>
      <View style={[styles.firstContainer, AppStyles.rowBetween]}>
        <View style={[AppStyles.center, {gap: 5, width: '20%'}]}>
          <Image
            style={styles.img}
            source={require('../assets/images/driverProfile.png')}
          />
          <Text style={[AppStyles.title, {fontSize: size.s}]}>Wilson</Text>
        </View>
        <View>
          <Text style={[styles.text, {fontFamily: AppFonts.NunitoSansBold}]}>
            Distance Range
          </Text>
          <View>
            <View style={AppStyles.rowBetween}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor={AppColors.red}
                maximumTrackTintColor={AppColors.lightPink}
                thumbTintColor={AppColors.red}
              />
              <AppButton
                title="Ok"
                style={styles.button}
                onPress={onPress}
                titleStyle={{...styles.text, color: AppColors.white}}
              />
            </View>
            <Text style={styles.text}>0 km</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Range;

const styles = StyleSheet.create({
  bottomContainers: {
    position: 'absolute',
    paddingHorizontal: hp(2),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    zIndex: 1,
    flex: 1,
    bottom: hp(50),
    justifyContent: 'center',
  },
  img: {height: hp(5), width: hp(5), borderRadius: hp(5)},
  firstContainer: {
    backgroundColor: AppColors.white,
    width: '95%',
    paddingHorizontal: hp(1),
    paddingVertical: hp(1),
    borderRadius: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  text: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    fontSize: size.s,
    color: AppColors.black,
  },
  slider: {width: hp(23), height: hp(3), marginLeft: hp(-1.6)},
  button: {
    width: '25%',
    height: hp(3.5),
    backgroundColor: AppColors.green,
    borderRadius: hp(0.7),
  },
});
