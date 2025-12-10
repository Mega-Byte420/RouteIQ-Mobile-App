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

const RetailProfileInfo = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.userSlices.token);
  const role = useAppSelector(state => state.userSlices.role);
  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.profileBg}}>
      <AppHeader
        role="Driver"
        title="Profile Info"
        enableBack={true}
        rightIcon={false}
      />
      <View style={[ AppStyles.flexBetween]}>
        <View style={{backgroundColor:AppColors.white, paddingHorizontal: hp(2), paddingVertical: hp(2)}}>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Name</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
              Mark Tommay
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Company Name</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
              Nike.co
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Address</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>802 E Frierson Ave, Tampa, FL 33603</Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Phone Number
            </Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
             +1-424-271-8337
            </Text>
          </View>

          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Email</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
              marktommay@gmail.com
            </Text>
          </View>
          
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>CC</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
             1414
            </Text>
          </View>
           <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Purchase Order info</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
             1234.1
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Card Holder Name</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
             Jhon
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Card Number</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
             4646 4646 4646 4646
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>Expiration Date</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
             02/2030
            </Text>
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>CVV</Text>
            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
             123
            </Text>
          </View>
        </View>
        {role === 'Retail' && (
          <View>
            <AppButton
              onPress={() => navigation.navigate('UpdateRetailProfile')}
              title="Edit Info"
              style={styles.button}
              titleStyle={styles.buttonTitle}
            />
            <AppButton
              title="Confirm"
              style={{alignSelf: 'center', width: '95%'}}
              onPress={() => {
                console.log(token, 'token');

                token || token == 1
                  ? navigation.goBack()
                  : dispatch(saveToken(1));
              }}
            />
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default RetailProfileInfo;

const styles = StyleSheet.create({
  button: {
    width: '95%',
    backgroundColor: AppColors.white,
    borderColor: AppColors.red,
    borderWidth: 1.5,
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  buttonTitle: {
    color: AppColors.black,
  },
});
