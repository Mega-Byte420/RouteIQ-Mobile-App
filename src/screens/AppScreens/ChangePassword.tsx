import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import {AppColors} from '../../utils/color';
import {hp, wp} from '../../utils/constants';
import {size} from '../../utils/responsiveFonts';
import AppButton from '../../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import GlobalIcon from '../../components/GlobalIcon';
import AppFonts from '../../utils/appFonts';

const ChangePassword = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = () => {
    navigation.navigate('Settings');
  };

  const rightIcon = () => (
    <Image source={require('../../assets/images/open_lock.png')} />
  );
  return (
    <AppLayout>
      <AppHeader title="Change Password" enableBack={true} rightIcon={false} />
      <View
        style={[
          AppStyles.container,
          {backgroundColor: AppColors.white, paddingVertical: hp(3)},
        ]}>
        <Controller
          name="current_password"
          control={control}
          rules={{required: 'Current Password is required'}}
          render={({field: {onChange, value}}) => (
            <AppInput
              value={value}
              onChangeText={(text: string) => onChange(text)}
              placeholderTextColor={AppColors.brightGrey}
              inputStyle={styles.inputStyle}
              container={styles.inputContainer}
              labelStyle={styles.inputLabelStyle}
              placeholder="Current Password"
              togglePasswordVisibility={true}
              secureTextEntry={true}
              rightInnerIcon={rightIcon()}
              error={errors.current_password?.message}
            />
          )}
        />
        <Controller
          name="new_password"
          control={control}
          rules={{required: 'New Password is required'}}
          render={({field: {onChange, value}}) => (
            <AppInput
              value={value}
              onChangeText={(text: string) => onChange(text)}
              placeholderTextColor={AppColors.brightGrey}
              inputStyle={styles.inputStyle}
              container={styles.inputContainer}
              labelStyle={styles.inputLabelStyle}
              placeholder="New Password"
              togglePasswordVisibility={true}
              secureTextEntry={true}
              rightInnerIcon={rightIcon()}
              error={errors.new_password?.message}
            />
          )}
        />
        <View style={styles.suggestionContainer}>
          <View style={[AppStyles.row, {gap: 5}]}>
            <GlobalIcon
              library="FontAwesome6"
              name="check"
              color={AppColors.brightGrey}
              size={hp(2)}
            />
            <Text style={styles.suggestionText}>Minimum 8 character</Text>
          </View>
          <View style={[AppStyles.row, {gap: 5}]}>
            <GlobalIcon
              library="FontAwesome6"
              name="check"
              color={AppColors.brightGrey}
              size={hp(2)}
            />
            <Text style={styles.suggestionText}>
              At least 1 upper case & 1 lower case letter
            </Text>
          </View>
          <View style={[AppStyles.row, {gap: 5}]}>
            <GlobalIcon
              library="FontAwesome6"
              name="check"
              color={AppColors.brightGrey}
              size={hp(2)}
            />
            <Text style={styles.suggestionText}>
              At least 1 special character
            </Text>
          </View>
        </View>
        <Controller
          name="confirm_password"
          control={control}
          rules={{required: 'Confirm New Password is required'}}
          render={({field: {onChange, value}}) => (
            <AppInput
              value={value}
              onChangeText={(text: string) => onChange(text)}
              placeholderTextColor={AppColors.brightGrey}
              inputStyle={styles.inputStyle}
              container={styles.inputContainer}
              labelStyle={styles.inputLabelStyle}
              placeholder="Re-type New Password"
              togglePasswordVisibility={true}
              secureTextEntry={true}
              rightInnerIcon={rightIcon()}
              error={errors.confirm_password?.message}
            />
          )}
        />
        <AppButton
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          style={{
            width: '100%',
            backgroundColor: AppColors.black,
            height: hp(6.5),
          }}
        />
      </View>
    </AppLayout>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  inputStyle: {
    height: hp(6.5),
    marginLeft: wp(2),
    fontSize: size.md,
  },
  inputContainer: {
    borderColor: '#E2E8F0',
    borderWidth: 1,
    marginBottom: hp(1),
  },
  inputLabelStyle: {
    color: AppColors.lightBlack,
  },
  suggestionContainer: {marginLeft: hp(2), marginBottom: hp(2), gap: 5},
  suggestionText: {
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansSemiBold,
    color: AppColors.brightGrey,
  },
});
