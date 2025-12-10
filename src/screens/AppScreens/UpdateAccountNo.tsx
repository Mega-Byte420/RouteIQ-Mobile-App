import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import {AppColors} from '../../utils/color';
import AppStyles from '../../styles/AppStyles';
import {hp} from '../../utils/constants';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';

const UpdateAccountNo = () => {
  const navigation = useNavigation();
  const [fields, setFields] = useState({
    name: 'SunTrust Bank',
    accountNo: '01234567890',
    routingNo: '01234567890',
    accountType: 'Saving',
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      accountNo: '',
      routingNo: '',
      accountType: '',
    },
  });

  useEffect(() => {
    setValue('name', 'SunTrust Bank');
    setValue('accountNo', '01234567890');
    setValue('routingNo', '01234567890');
    setValue('accountType', 'Saving');
  }, []);

  const onSubmit = () => {
    navigation.goBack();
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.white}}>
      <AppHeader
        role="Driver"
        title="Update Account No"
        enableBack={true}
        rightIcon={false}
      />
      <ScrollView
        contentContainerStyle={[AppStyles.flexBetween, styles.container]}>
       <View style={{backgroundColor: AppColors.white, paddingHorizontal: hp(2), paddingVertical: hp(4)}}>
          <View style={[AppStyles.rowBetween]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Bank Name
            </Text>
            <Controller
              name="name"
              control={control}
              rules={{required: 'Name is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  value={value}
                  containerStyle={AppStyles.halfWidth}
                  container={[styles.inputContainer, {height: 40}]}
                  inputStyle={styles.inputStyle}
                  onChangeText={text => onChange(text)}
                  error={errors.name?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Account No
            </Text>
            <Controller
              name="accountNo"
              control={control}
              rules={{required: 'Age is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  value={value}
                  containerStyle={AppStyles.halfWidth}
                  keyboardType="number-pad"
                  container={[styles.inputContainer, {height: 40}]}
                  inputStyle={styles.inputStyle}
                  onChangeText={text => onChange(text)}
                  error={errors.accountNo?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Routing No
            </Text>
            <Controller
              name="routingNo"
              control={control}
              rules={{required: 'Email is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  value={value}
                  containerStyle={[AppStyles.halfWidth]}
                  container={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  multiline={true}
                  onChangeText={text => onChange(text)}
                  error={errors.routingNo?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Account Type
            </Text>
            <Controller
              name="accountType"
              control={control}
              rules={{required: 'Phone Number is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  value={value}
                  containerStyle={AppStyles.halfWidth}
                  keyboardType="number-pad"
                  container={[styles.inputContainer, {height: 40}]}
                  inputStyle={styles.inputStyle}
                  onChangeText={text => onChange(text)}
                  error={errors.accountType?.message}
                />
              )}
            />
          </View>
        </View>
        <View>
          <AppButton
            title="Confirm"
            style={{width: '92%', alignSelf: 'center', marginBottom: hp(2)}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default UpdateAccountNo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.profileBg,
  },

  button: {
    backgroundColor: AppColors.white,
    borderColor: AppColors.red,
    borderWidth: 1.5,
    marginBottom: hp(2),
  },
  buttonTitle: {
    color: AppColors.black,
  },
  inputContainer: {
    borderColor: AppColors.graySuit,
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
  inputStyle: {color: AppColors.graySuit},
});
