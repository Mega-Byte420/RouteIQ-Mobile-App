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
      console.log('Attempting login with email:', data.email);
      
      // Call login API
      const response = await authAPI.login(data.email, data.password);
      
      // Log full response for debugging
      console.log('📥 Login response received:', JSON.stringify(response, null, 2));
      console.log('📥 Response type:', typeof response);
      console.log('📥 Response keys:', response ? Object.keys(response) : 'No response');
      
      // Extract token from response - try multiple possible structures
      let token = null;
      
      // Try different response structures
      if (typeof response === 'string') {
        // Response might be just the token string
        token = response;
      } else if (response?.token) {
        // Direct token property
        token = response.token;
      } else if (response?.data?.token) {
        // Nested data.token
        token = response.data.token;
      } else if (response?.accessToken) {
        // accessToken property
        token = response.accessToken;
      } else if (response?.access_token) {
        // access_token property (snake_case)
        token = response.access_token;
      } else if (response?.data?.accessToken) {
        // Nested data.accessToken
        token = response.data.accessToken;
      } else if (response?.data?.access_token) {
        // Nested data.access_token
        token = response.data.access_token;
      }
      
      console.log('🔑 Token extraction result:', {
        found: !!token,
        tokenLength: token ? token.length : 0,
        tokenPreview: token ? token.substring(0, 50) + '...' : 'No token',
      });
      
      if (!token) {
        console.error('❌ No token found in response. Response structure:', response);
        Alert.alert(
          'Error', 
          'No token received from server. Please check the console for details.'
        );
        setLoading(false);
        return;
      }

      // Decode JWT to get user info
      console.log('🔐 Attempting to decode token...');
      const decodedToken = decodeJWT(token);
      
      if (!decodedToken) {
        console.error('❌ Failed to decode token. Token value:', token);
        Alert.alert(
          'Error', 
          'Invalid token received. Please check the console for details.'
        );
        setLoading(false);
        return;
      }
      
      console.log('✅ Token decoded successfully:', {
        userId: decodedToken.sub,
        username: decodedToken.username,
        role: decodedToken.role,
      });

      // Check if token is expired (shouldn't happen on fresh login, but good to check)
      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        Alert.alert('Error', 'Token has expired. Please try again.');
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
      // Log error for debugging
      console.error('Login error:', error);
      
      // Provide more helpful error messages
      let errorMessage = 'Invalid email or password. Please try again.';
      let errorTitle = 'Login Failed';
      
      if (error.message) {
        errorMessage = error.message;
        // Check if it's a network error
        if (error.code === 'NETWORK_ERROR' || error.status === 0 || error.message.includes('Network')) {
          errorTitle = 'Connection Error';
        }
      } else if (error.status === 0) {
        errorTitle = 'Connection Error';
        errorMessage = 'Network error. Please check your connection and ensure the server is running.';
      } else if (error.status === 401) {
        errorMessage = 'Invalid credentials. Please check your email and password.';
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      Alert.alert(errorTitle, errorMessage);
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
