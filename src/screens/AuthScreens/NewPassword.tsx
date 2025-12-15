import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalIcon from '../../components/GlobalIcon';
import AuthLayout from '../../layout/AuthLayout';
import AppStyles from '../../styles/AppStyles';
import AppButton from '../../components/AppButton';
import { hp, wp } from '../../utils/constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppInput from '../../components/AppInput';
import { AppColors } from '../../utils/color';
import { fontSize, size } from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetPasswordThunk } from '../../store/auth/authRecoverySlice';
import { Alert } from 'react-native';

const NewPassword = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const type = useAppSelector(state => state.userSlices.forgotType);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const email = route.params?.email;
  const userId = route.params?.userId;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: '',
      confirm_password: '',
      username: ''
    },
  });

  const onSubmit = async (form: any) => {
    if (type === 'username') {
      navigation.navigate('SuccessScreen');
      return;
    }
    if (form.new_password !== form.confirm_password) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      setLoading(true);
      await dispatch(
        resetPasswordThunk({
          userId,
          newPassword: form.new_password,
        }),
      ).unwrap();
      navigation.navigate('SuccessScreen');
    } catch (err: any) {
      const friendlyMessage =
        typeof err === 'string'
          ? err
          : err?.message || 'Could not reset password. Please try again.';
      Alert.alert('Error', friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AuthLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginHorizontal: hp(3) }}>
            <Text style={[AppStyles.titleHead, { textAlign: 'center', textTransform: 'capitalize' }]}>
              New {type}
            </Text>
            <Text
              style={[
                AppStyles.subHeading,
                { marginBottom: hp(2), textAlign: 'center' },
              ]}>
              Set the new {type} for your account so you can login and access
              all features.
            </Text>
          </View>
          <View style={styles.setMargin}>
            {
              type == 'username' ? <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field: { onChange, value } }) => (
                  <AppInput
                    label="New Username"
                    value={value}
                    placeholderTextColor={AppColors.inputGrey}
                    inputStyle={styles.inputStyle}
                    containerStyle={{ marginBottom: hp(0) }}
                    container={styles.inputContainer}
                    labelStyle={styles.inputLabelStyle}
                    placeholder="Enter username"
                    togglePasswordVisibility={true}
                    secureTextEntry={true}
                    onChangeText={text => onChange(text)}
                    error={errors.username?.message}
                    rightInnerIcon={
                     <GlobalIcon library='FontAwesome' name='user' size={24} color={AppColors.lightGrey}/>
                    }
                  />
                )}
              /> : <>
                <Controller
                  name="new_password"
                  control={control}
                  rules={{
                    required: 'New Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="New Password"
                      value={value}
                      placeholderTextColor={AppColors.inputGrey}
                      inputStyle={styles.inputStyle}
                      containerStyle={{ marginBottom: hp(1.5) }}
                      container={styles.inputContainer}
                      labelStyle={styles.inputLabelStyle}
                      placeholder="Enter New Password"
                      togglePasswordVisibility={true}
                      secureTextEntry={true}
                      onChangeText={text => onChange(text)}
                      error={errors.new_password?.message}
                      rightInnerIcon={
                        <GlobalIcon
                          size={20}
                          library="FontelloIcon"
                          color={AppColors.inputGrey}
                          name="-icon-_lock"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  name="confirm_password"
                  control={control}
                  rules={{
                    required: 'Confirm Password is required',
                    validate: value =>
                      value === (control as any)._formValues.new_password ||
                      'Passwords do not match',
                  }}
                  render={({ field: { onChange, value } }) => (
                    <AppInput
                      label="Confirm Password"
                      value={value}
                      placeholderTextColor={AppColors.inputGrey}
                      inputStyle={styles.inputStyle}
                      containerStyle={{ marginBottom: hp(0) }}
                      container={styles.inputContainer}
                      labelStyle={styles.inputLabelStyle}
                      placeholder="Enter Confirm Password"
                      togglePasswordVisibility={true}
                      secureTextEntry={true}
                      onChangeText={text => onChange(text)}
                      error={errors.confirm_password?.message}
                      rightInnerIcon={
                        <GlobalIcon
                          size={20}
                          library="FontelloIcon"
                          color={AppColors.inputGrey}
                          name="-icon-_lock"
                        />
                      }
                    />
                  )}
                />
              </>
            }
            <AppButton
              onPress={handleSubmit(onSubmit)}
              title={loading ? 'Updating...' : `Update ${type}`}
              disabled={loading}
              titleStyle={{ textTransform: 'capitalize' }}
              style={{ marginTop: hp(10) }}
            />
          </View>
        </View>
      </AuthLayout>
    </ScrollView>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  setMargin: {
    marginTop: hp(3),
  },
  inputStyle: {
    height: hp(6),
    marginLeft: wp(2),
    fontSize: size.md,
    fontFamily:AppFonts.NunitoSansRegular
  },
  inputContainer: {
    borderColor: '#cfcfcf',
    borderWidth: 1,
  },
  inputLabelStyle: {
    color: AppColors.secondary,
    fontSize: 16,
    fontFamily:AppFonts.NunitoSansSemiBold
  },
  forgotPassword: {
    marginBottom: hp(2.5),
    alignSelf: 'flex-end',
    padding: hp(0.5),
    paddingRight: 0,
    marginTop: hp(0.5),
  },
  forgotText: {
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansBold,
    fontSize: fontSize(14),
  },
});
