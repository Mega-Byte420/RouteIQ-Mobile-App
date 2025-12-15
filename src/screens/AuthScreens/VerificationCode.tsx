import {useNavigation, useRoute} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/AppButton';
import AuthLayout from '../../layout/AuthLayout';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp, wp} from '../../utils/constants';
import {fontSize, size} from '../../utils/responsiveFonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {saveToken} from '../../store/user/userSlices';
import {authAPI} from '../../utils/api';

const VerificationCode = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.userSlices.role);
  const email = route.params?.email;
  const userId = route.params?.userId;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AuthLayout>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{marginHorizontal: hp(3)}}>
            <Text style={[AppStyles.titleHead, {textAlign: 'center'}]}>
              Verification
            </Text>
            <Text
              style={[
                AppStyles.subHeading,
                {marginBottom: hp(2), textAlign: 'center'},
              ]}>
              Enter your 4 digits code that you received on your email.
            </Text>
          </View>
          <View style={[styles.setMargin, {alignItems: 'center'}]}>
            <OTPInputView
              style={styles.otpContainer}
              pinCount={4}
              keyboardType="number-pad"
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.underlineStyleBase}
              selectionColor={AppColors.black}
              onCodeFilled={(text: string) => setOtp(text)}
            />
            <Text style={styles.timerText}>00:30</Text>
            <AppButton
              onPress={async () => {
                if (!otp || otp.length !== 4) {
                  Alert.alert('Error', 'Please enter the 4-digit code.');
                  return;
                }
                try {
                  setLoading(true);
                  const resp = await authAPI.verifyOtp({email, otp});
                  if (resp?.success) {
                    navigation.navigate('NewPassword', {email, userId});
                  } else {
                    const friendlyMessage = Array.isArray(resp?.message)
                      ? resp?.message.join('\n')
                      : resp?.message || 'Invalid OTP.';
                    Alert.alert('Error', friendlyMessage);
                  }
                } catch (err: any) {
                  const apiMessage = err?.response?.data?.message;
                  const friendlyMessage = Array.isArray(apiMessage)
                    ? apiMessage.join('\n')
                    : apiMessage || err?.message || 'OTP verification failed. Please try again.';
                  Alert.alert(
                    'Error',
                    friendlyMessage,
                  );
                } finally {
                  setLoading(false);
                }
              }}
              title={loading ? 'Verifying...' : 'Continue'}
              disabled={loading}
              style={{marginTop: hp(10)}}
            />

            <Text
              style={{
                textAlign: 'center',
                marginTop: hp(1),
                color: AppColors.lightBlack,
              }}>
              If you didn’t receive a code!{' '}
              <Text onPress={() => setOtp('')} style={styles.timerText}>
                Resend
              </Text>
            </Text>
          </View>
        </View>
      </AuthLayout>
    </ScrollView>
  );
};

export default VerificationCode;

const styles = StyleSheet.create({
  setMargin: {
    marginTop: hp(1),
  },
  timerText: {
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansRegular,
    fontSize: fontSize(16),
    textAlign: 'center',
    marginTop: hp(2)
  },
  otpContainer: {
    height: hp(8),
    marginTop: hp(2),
    width: '90%'
  },
  underlineStyleBase: {
    width: wp(18),
    height: hp(8),
    color: AppColors.black,
    borderRadius: 5,
    fontSize: size.slg,
    backgroundColor: AppColors.transparent,
    borderColor: '#9BADCA',
    borderWidth: 1,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
});
