import React, {useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
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
import {saveToken, setForgotType, setLogout} from '../../store/user/userSlices';
import {Controller, useForm} from 'react-hook-form';

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const role = useAppSelector(state => state.userSlices.role);

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
      username: '',
      confirmpassword: '',
    },
  });

  const onSubmit = () => {
    role == 'Retail'
      ? navigation.navigate('VerificationCode')
      : dispatch(saveToken(1));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
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
                style={{height: hp(30), width: hp(40), resizeMode: 'contain'}}
                source={require('../../assets/images/Splash_icon.png')}
              />
              <View></View>
            </View>
            <View style={AppStyles.center}>
              <Text style={AppStyles.titleHead}>Sign Up</Text>
              <Text style={[AppStyles.subHeading, {marginBottom: hp(2)}]}>
                Just some details to get you in!
              </Text>
              <View style={styles.setMargin}>
                <Controller
                  name="username"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <AppInput
                      label="Username"
                      value={value}
                      placeholderTextColor={AppColors.inputGrey}
                      inputStyle={styles.inputStyle}
                      placeholder="Username"
                      container={styles.inputContainer}
                      labelStyle={styles.inputLabelStyle}
                      onChangeText={text => onChange(text)}
                      containerStyle={{marginBottom: hp(0)}}
                      rightInnerIcon={
                        <GlobalIcon
                          size={20}
                          library="FontAwesome6"
                          color={AppColors.inputGrey}
                          name="user-large"
                        />
                      }
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                //   rules={{required: 'Email is required'}}
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

                <Controller
                  name="password"
                  control={control}
                //   rules={{required: 'Password is required'}}
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

                <Controller
                  name="confirmpassword"
                  control={control}
                //   rules={{required: 'Password is required'}}
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
                <AppButton
                  onPress={handleSubmit(onSubmit)}
                  title="Sign Up"
                  style={styles.signup_Btn}
                />

                <TouchableOpacity
                  onPress={() => {
                    dispatch(setForgotType('password'));
                    navigation.navigate('Login');
                  }}
                  style={styles.forgotPassword}>
                  <Text style={styles.forgotText}>Already Registered? <Text style={styles.loginText}>Login</Text></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AuthLayout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

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
    alignSelf:'center',
    padding: hp(0.5),
    paddingRight: 0,
    marginTop: hp(0.5),
  },
  forgotText: {
    color: AppColors.lightBlack,
    fontFamily: AppFonts.NunitoSansRegular,
    fontSize: fontSize(14),
  },
  loginText:{
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansBold,
    fontSize: fontSize(14),
  },
  signup_Btn: {
    marginTop: hp(1),
  },
});
