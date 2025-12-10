import React from 'react';
import {Image, ImageBackground, StatusBar, StyleSheet} from 'react-native';
import AppStyles from '../../styles/AppStyles';
import {hp} from '../../utils/constants';

const SplashScreen = () => {
  return (
    <ImageBackground
      style={[AppStyles.screenWidthHeight, AppStyles.alignJustifyCenter]}
      source={require('../../assets/images/Splash_background.png')}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <Image
        style={styles.image}
        source={require('../../assets/images/Splash_icon.png')}
      />
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    height: hp(40),
    width: hp(40),
    resizeMode: 'contain',
    marginTop: hp(-10),
  },
});
