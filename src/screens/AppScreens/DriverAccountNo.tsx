import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import {AppColors} from '../../utils/color';
import AppStyles from '../../styles/AppStyles';
import {hp} from '../../utils/constants';
import AppButton from '../../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {saveToken} from '../../store/user/userSlices';
import { size } from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';

const DriverProfileInfo = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.userSlices.token);
  const role = useAppSelector(state => state.userSlices.role);
  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.white}}>
      <AppHeader
        role="Driver"
        title="Account No"
        enableBack={true}
        rightIcon={false}
      />
      <View
        style={[
          AppStyles.flexBetween,
          styles.container,
        ]}>
        <View style={{backgroundColor: AppColors.white, paddingHorizontal: hp(2), paddingVertical: hp(4)}}>
          <Text style={styles.bankAccountNoText}>Bank Account No</Text>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Bank Name
            </Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
              SunTrust Bank
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Account No
            </Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
              01234567890
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Routing No
            </Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
              01234567890
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Account Type
            </Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
              Saving
            </Text>
          </View>
        </View>
        {role === 'Driver' && (
          <View>
            <AppButton
              onPress={() => navigation.navigate('UpdateAccountNo')}
              title="Update"
              style={{alignSelf: 'center', width: '92%', marginBottom: hp(2)}}
            />
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default DriverProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.profileBg,
  },
  button: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderColor: AppColors.red,
    borderWidth: 1.5,
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  buttonTitle: {
    color: AppColors.black,
  },
  bankAccountNoText:{
    fontSize: size.lg,
    fontFamily:AppFonts.NunitoSansBold,
    color:AppColors.secondary,
    marginBottom: hp(2)

  }
});
