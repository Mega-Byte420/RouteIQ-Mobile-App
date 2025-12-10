import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AppButton from '../../components/AppButton';
import AuthLayout from '../../layout/AuthLayout';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp} from '../../utils/constants';
import {size} from '../../utils/responsiveFonts';
import {useNavigation} from '@react-navigation/native';

const OnBoarding = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const nextImage = (num: number) => {
    switch (num) {
      case 0:
        return require('../../assets/images/mobile.png');
      case 1:
        return require('../../assets/images/licenseAndRoute.png');
      case 2:
        return require('../../assets/images/boarding_bus.png');
    }
  };
  return (
    <AuthLayout>
      <View style={styles.container}>
        {/* <TouchableOpacity
          disabled={index != 2 ? false : true}
          onPress={() => setIndex(index + 1)}
          style={styles.skipContainer}>
          {index != 2 && <Text style={styles.skipTitle}>SKIP</Text>}
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.skipContainer}
          onPress={() => navigation.navigate('LoginAs')}>
          <Text style={styles.skipTitle}>SKIP</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            style={{height: hp(40), width: hp(40), resizeMode: 'contain'}}
            source={nextImage(index)}
          />
        </View>
        <View style={[AppStyles.rowBetween, {flex: 0.2}]}>
          <View style={[AppStyles.row, {marginTop: hp(2)}]}>
            <View
              style={index == 0 ? styles.selectedCircle : styles.circle}></View>
            <View
              style={index == 1 ? styles.selectedCircle : styles.circle}></View>
            <View
              style={index == 2 ? styles.selectedCircle : styles.circle}></View>
          </View>
          <AppButton
            title="Next"
            onPress={() =>
              index < 2 ? setIndex(index + 1) : navigation.navigate('LoginAs')
            }
            style={styles.button}
            titleStyle={{fontFamily: AppFonts.NunitoSansSemiBold}}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {height: '100%'},
  skipContainer: {
    alignSelf: 'flex-end',
    height: '10%',
    paddingTop: hp(3),
    flex: 0.2,
  },
  skipTitle: {
    fontSize: size.lg,
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansBold,
  },
  imageContainer: {
    marginTop: hp(2),
    height: '70%',
    alignItems: 'center',
    flex: 0.6,
  },
  circle: {
    height: hp(1.2),
    width: hp(1.2),
    backgroundColor: '#808080',
    borderRadius: hp(2),
    marginHorizontal: hp(0.5),
  },
  button: {width: '50%'},
  selectedCircle: {
    height: hp(1.2),
    backgroundColor: 'red',
    width: hp(3),
    borderRadius: hp(2),
    marginHorizontal: hp(0.5),
  },
});
