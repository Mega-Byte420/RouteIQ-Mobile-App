import React from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppLayoutProps} from '../types/types';
import {AppColors} from '../utils/color';
import {hp, StatusBarHeight} from '../utils/constants';
import AppStyles from '../styles/AppStyles';
import AlarmIcon from '../assets/svgs/AlarmIcon';
import {useNavigation} from '@react-navigation/native';
import GlobalIcon from '../components/GlobalIcon';

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  style,
  statusbackgroundColor = AppColors.black,
  alarmIcon,
}) => {
  const navigation = useNavigation();
  return (
    <View style={AppStyles.flex}>
      <StatusBar
        translucent={true}
        backgroundColor={statusbackgroundColor}
        barStyle={'light-content'}
      />
      <View style={[styles.childContainer, style]}>{children}</View>
      {alarmIcon && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AlertScreen');
          }}
          style={[AppStyles.alarmIcon, styles.absolute]}>
          <AlarmIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  childContainer: {
    flex: 1,
    paddingTop: StatusBarHeight(),
    backgroundColor: AppColors.black,
  },
  absolute: {
    position: 'absolute',
    bottom: hp(1.5),
    right: hp(2),
  },
});
