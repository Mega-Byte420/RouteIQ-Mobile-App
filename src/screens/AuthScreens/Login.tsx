import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import GlobalIcon from '../../components/GlobalIcon';
import AuthLayout from '../../layout/AuthLayout';
import AppStyles from '../../styles/AppStyles';
import AppButton from '../../components/AppButton';
import {hp, wp} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import AppInput from '../../components/AppInput';
import {AppColors} from '../../utils/color';
import {fontSize, size} from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {saveToken, setUserInfo, setForgotType, setLogout} from '../../store/user/userSlices';
import {Controller, useForm} from 'react-hook-form';
import {authAPI} from '../../utils/api';
import {decodeJWT} from '../../utils/jwt';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.userSlices.role);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(setLogout(false));
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: {email: string; password: string}) => {
    try {
      setLoading(true);
      
      // Call login API
      const response = await authAPI.login(data.email, data.password);
      
      // Extract token from response (adjust based on your API response structure)
      const token = response.token || response.accessToken || response.data?.token;
      
      if (!token) {
        Alert.alert('Error', 'No token received from server');
        setLoading(false);
        return;
      }

      // Decode JWT to get user info
      const decodedToken = decodeJWT(token);
      
      if (!decodedToken) {
        Alert.alert('Error', 'Invalid token received');
        setLoading(false);
        return;
      }

      // Store token and user info in Redux
      dispatch(saveToken(token));
      dispatch(setUserInfo(decodedToken));

      // Navigation will be handled by Navigation.tsx based on token and role
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert(
        'Login Failed',
        error.message || 'Invalid email or password. Please try again.'
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AuthLayout>
        <View>
          <View
            style={[
              AppStyles.rowBetween,
              {alignItems: 'flex-start', justifyContent: 'center'},
            ]}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0, top: 15}}
              onPress={() => navigation.navigate('LoginAs')}>
              <GlobalIcon
                library="Feather"
                name="chevron-left"
                color={AppColors.red}
              />
            </TouchableOpacity>
            <Image
              style={{height: hp(40), width: hp(40), resizeMode: 'contain'}}
              source={require('../../assets/images/Splash_icon.png')}
            />
            <View></View>
          </View>
          <View style={AppStyles.center}>
            <Text style={AppStyles.titleHead}>
              {role?.toUpperCase() === 'DRIVER'
                ? 'Driver'
                : role?.toUpperCase() === 'PARENT' || role?.toUpperCase() === 'PARENTS'
                ? 'Parent'
                : role?.toUpperCase() === 'RETAIL'
                ? 'Retail'
                : 'Login'}
            </Text>
            <Text style={[AppStyles.subHeading, {marginBottom: hp(2)}]}>
              Enter your credential to login
            </Text>
            <View style={styles.setMargin}>
              <Controller
                name="email"
                control={control}
                rules={{required: 'Email is required'}}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    label={
                      role?.toUpperCase() === 'DRIVER' || role?.toUpperCase() === 'RETAIL'
                        ? 'Email / Username'
                        : 'Email'
                    }
                    value={value}
                    placeholderTextColor={AppColors.inputGrey}
                    inputStyle={styles.inputStyle}
                    placeholder="Email Address"
                    container={styles.inputContainer}
                    labelStyle={styles.inputLabelStyle}
                    onChangeText={text => onChange(text)}
                    error={errors.email?.message}
                    containerStyle={{marginBottom: hp(0)}}
                    rightInnerIcon={
                      <View style={{marginBottom: hp(-0.4)}}>
                        <GlobalIcon
                          size={20}
                          library="FontelloIcon"
                          color={AppColors.inputGrey}
                          name="-icon-_email"
                        />
                      </View>
                    }
                  />
                )}
              />
              {(role?.toUpperCase() === 'DRIVER' || role?.toUpperCase() === 'RETAIL') && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setForgotType('username'));
                    navigation.navigate('ResetPassword');
                  }}
                  style={[
                    styles.forgotPassword,
                    {marginTop: 0, marginBottom: 0},
                  ]}>
                  <Text style={styles.forgotText}>Forgot Username?</Text>
                </TouchableOpacity>
              )}
              <Controller
                name="password"
                control={control}
                rules={{required: 'Password is required'}}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    label="Password"
                    value={value}
                    placeholderTextColor={AppColors.inputGrey}
                    inputStyle={styles.inputStyle}
                    containerStyle={{marginBottom: hp(0)}}
                    container={styles.inputContainer}
                    labelStyle={styles.inputLabelStyle}
                    placeholder="Enter Password"
                    togglePasswordVisibility={true}
                    secureTextEntry={true}
                    onChangeText={text => onChange(text)}
                    error={errors.password?.message}
                    rightInnerIcon={
                      <GlobalIcon
                        size={20}
                        library="FontelloIcon"
                        color={AppColors.inputGrey}
                        name="lock"
                      />
                    }
                  />
                )}
              />
              <TouchableOpacity
                onPress={() => {
                  dispatch(setForgotType('password'));
                  navigation.navigate('ResetPassword');
                }}
                style={styles.forgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <AppButton 
                onPress={handleSubmit(onSubmit)} 
                title={loading ? 'Logging in...' : 'Log In'}
                disabled={loading}
                leftIcon={loading ? <ActivityIndicator color={AppColors.white} size="small" /> : null}
              />

              {role?.toUpperCase() === 'RETAIL' && (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setForgotType('password'));
                    navigation.navigate('Signup');
                  }}
                  style={styles.DontHaveAc}>
                  <Text style={styles.DontAcText}>
                    Didn’t have an account?{' '}
                    <Text style={styles.signupText}>Signup</Text>
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </AuthLayout>
    </ScrollView>
  );
};

export default Login;

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
  signupText: {
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansBold,
    fontSize: fontSize(14),
  },
  DontHaveAc: {
    marginTop: hp(1),
  },
  DontAcText: {
    color: AppColors.lightBlack,
    fontFamily: AppFonts.NunitoSansRegular,
    fontSize: fontSize(14),
    textAlign: 'center',
    alignSelf: 'center',
  },
});
