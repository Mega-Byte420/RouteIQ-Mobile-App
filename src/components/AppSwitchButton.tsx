import React, {useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {hp} from '../utils/constants';
import {AppColors} from '../utils/color';
import AppFonts from '../utils/appFonts';
import {size} from '../utils/responsiveFonts';
import {AppSwitchButtonProps} from '../types/types';

const AppSwitchButton: React.FC<AppSwitchButtonProps> = ({
  isOn,
  onToggle,
  onTitle = 'Online',
  offTitle = '',
  switchBackgroundStyle,
  switchBackgroundColor = AppColors.black,
  outputRange = [hp(0.5), hp(9)],
  circleStyle,
  circleBackgroundColor = AppColors.white,
  titleColor = AppColors.white,
}) => {
  const [position] = useState(new Animated.Value(isOn ? 1 : 0));

  const toggleSwitch = () => {
    Animated.timing(position, {
      toValue: isOn ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    onToggle(!isOn);
  };

  const backgroundColor = position.interpolate({
    inputRange: [0, 1],
    outputRange: [switchBackgroundColor, switchBackgroundColor],
  });

  const circlePosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: outputRange,
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
      <Animated.View
        style={[
          styles.switchBackground,
          switchBackgroundStyle,
          {backgroundColor},
        ]}>
        <Animated.Text
          style={[
            styles.text,
            {color: titleColor},
            isOn ? {left: 10} : {right: 10},
          ]}>
          {isOn ? onTitle : offTitle}
        </Animated.Text>
        <Animated.View
          style={[
            styles.circle,
            circleStyle,
            {left: circlePosition, backgroundColor: circleBackgroundColor},
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchBackground: {
    width: hp(13),
    height: hp(5),
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
  },
  text: {
    color: AppColors.white,
    fontFamily: AppFonts.NunitoSansSemiBold,
    fontSize: size.default,
    position: 'absolute',
    // left: 10,
  },
  circle: {
    width: hp(3.5),
    height: hp(3.5),
    borderRadius: 50,
    // backgroundColor: 'white',
    position: 'absolute',
  },
});

export default AppSwitchButton;
