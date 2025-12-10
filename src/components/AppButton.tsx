import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppButtonProps } from '../types/types';
import AppFonts from '../utils/appFonts';
import { AppColors } from '../utils/color';
import { hp, wp } from '../utils/constants';
import { size } from '../utils/responsiveFonts';

const AppButton: React.FC<AppButtonProps> = ({title, onPress, style, titleStyle, leftIcon, rightIcon, disabled, loading, loaderStyle}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container, style]}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {loading ? <View style={[{width: '100%'}, loaderStyle]}><ActivityIndicator size="small" color={AppColors.black} /></View> : <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(6),
        // borderRadius: hp(6),
        backgroundColor: AppColors.red,
        marginVertical: hp(.5),
        width: wp(75),
        borderRadius: 8
    },
    title: {
        // color: AppColors.secondary,
        color: AppColors.white,
        fontFamily: AppFonts.NunitoSansSemiBold,
        fontSize: size.lg,
    },
    leftIcon: {marginRight: hp(1)},
    rightIcon: {marginLeft: hp(1)},
})