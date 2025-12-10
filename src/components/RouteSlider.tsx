import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import AppStyles from '../styles/AppStyles';
import {size} from '../utils/responsiveFonts';
import AppFonts from '../utils/appFonts';

const RouteSlider = () => {
  return (
    <View style={styles.container}>
      <View style={[AppStyles.rowBetween, {marginBottom: hp(1), zIndex: 1, width: '100%'}]}>
        <Text style={styles.title}>School</Text>
        <Text style={styles.title}>Home</Text>
      </View>
      <View style={[AppStyles.rowBetween, {width: '100%'}]}>
        <View style={[styles.circle, {backgroundColor: AppColors.red}]}></View>
        <View style={styles.lineContainer}>
            <View style={styles.busContainer}>
                <Image style={{left: 140}} source={require('../assets/images/bus.png')}/>
                <Text style={[styles.kiloMeterTitle, {left: 140}]}>2.4 km</Text>
            </View>
            <View style={styles.line}></View>
        </View>
        <View style={[styles.circle, {backgroundColor: AppColors.lightPink}]}></View>
      </View>
    </View>
  );
};

export default RouteSlider;

const styles = StyleSheet.create({
  title: {
    color: AppColors.black,
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
  },
  container: {
    width: '100%',
    paddingTop: hp(3),
  },
  circle: {
    height: hp(1.5), 
    width: '3%', 
    borderRadius: hp(3), 
  },
  line: {
    height: hp(.5),
    width: '50%', 
    backgroundColor: AppColors.red, 
    position: 'absolute'
  },
  busContainer: {
    position: 'absolute', 
    bottom: hp(0), 
    width: '100%'
  },
  lineContainer: {
    height: hp(.5), 
    width: '94%', 
    backgroundColor: AppColors.lightPink
  },
  kiloMeterTitle: {
    color: AppColors.black, 
    width: '100%',  
    top: hp(3)
  }
});