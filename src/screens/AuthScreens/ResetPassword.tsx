import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import GlobalIcon from '../../components/GlobalIcon';
import AuthLayout from '../../layout/AuthLayout';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp, wp} from '../../utils/constants';
import {fontSize, size} from '../../utils/responsiveFonts';
import {useAppSelector} from '../../store/hooks';
import {authAPI} from '../../utils/api';

const ResetPassword = ({route}: any) => {
  const type = useAppSelector(state => state.userSlices.forgotType);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: {email: string}) => {
    try {
      setLoading(true);
      const resp = await authAPI.requestPasswordReset(data.email);
      if (resp?.success) {
        navigation.navigate('VerificationCode', {
          email: resp.email || data.email,
          username: resp.username,
          userId: resp.userid,
          otp: resp.otp, // keep if you want to prefill or debug
        });
      } else {
        Alert.alert('Error', resp?.message || 'Could not send reset code.');
      }
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message;
      const friendlyMessage = Array.isArray(apiMessage)
        ? apiMessage.join('\n')
        : apiMessage || err?.message || 'Could not send reset code. Please try again.';
      Alert.alert(
        'Error',
        friendlyMessage,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AuthLayout>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[AppStyles.titleHead, {textTransform: 'capitalize'}]}>
            Resetting {type}
          </Text>
          <Text
            style={[
              AppStyles.subHeading,
              {marginBottom: hp(2), textAlign: 'center'},
            ]}>
            Enter your email for the verification process. We will send 4 digits
            code to your email.
          </Text>
          <View style={styles.setMargin}>
            <Controller
              name="email"
              control={control}
              rules={{required: 'Email is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  label="Email"
                  value={value}
                  placeholderTextColor={AppColors.inputGrey}
                  inputStyle={styles.inputStyle}
                  placeholder="Enter Email Address"
                  container={styles.inputContainer}
                  labelStyle={styles.inputLabelStyle}
                  onChangeText={text => onChange(text)}
                  error={errors.email?.message}
                  rightInnerIcon={
                    <GlobalIcon
                      size={20}
                      library="FontelloIcon"
                      color={AppColors.inputGrey}
                      name="-icon-_email"
                    />
                  }
                />
              )}
            />
            <AppButton
              onPress={handleSubmit(onSubmit)}
              title={loading ? 'Please wait...' : 'Continue'}
              disabled={loading}
              style={{marginTop: hp(10)}}
            />
          </View>
        </View>
      </AuthLayout>
    </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  setMargin: {
    marginTop: hp(3),
  },
  inputStyle: {
    height: hp(6),
    marginLeft: wp(2),
    fontSize: size.md,
  },
  inputContainer: {
    borderColor: '#cfcfcf',
    borderWidth: 1,
  },
  inputLabelStyle: {
    color: AppColors.lightBlack,
  },
  forgotText: {
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansBold,
    fontSize: fontSize(14),
  },
});
