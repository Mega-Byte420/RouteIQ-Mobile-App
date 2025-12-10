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

const EditRetailDetail = () => {
  const navigation = useNavigation();
  const [fields, setFields] = useState({
    name: 'Mark Tommay',
    age: '32',
    email: 'marktommay@gmail.com',
    phoneNumber: '+1-424-271-8337',
    address: '802 E Frierson Ave, Tampa, FL 33603',
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      roundTrip: '',
      isWheelchairLift: '',
      nameOfLocaton: '',
      additionalDestination: '',
      specialInstructions: '',
    },
  });

  //   useEffect(() => {
  //     setValue('name', 'Mark Tommay');
  //     setValue('age', '32');
  //     setValue('email', 'marktommay@gmail.com');
  //     setValue('phoneNumber', '+1-424-271-8337');
  //     setValue('address', '802 E Frierson Ave, Tampa, FL 33603');
  //   }, []);

  const onSubmit = () => {
    navigation.goBack();
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.profileBg}}>
      <AppHeader
        role="Driver"
        title="Edit Details"
        enableBack={true}
        rightIcon={true}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: hp(10),
           paddingTop: hp(2),
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: hp(2)}}>
          <View style={[AppStyles.rowBetween]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Company/Group Name
            </Text>
            <Controller
              name="name"
              control={control}
              rules={{required: 'Name is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="Jonney Barbo"
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
              Phone Number
            </Text>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{required: 'Age is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="012 022 1531"
                  value={value}
                  containerStyle={AppStyles.halfWidth}
                  keyboardType="number-pad"
                  container={[styles.inputContainer, {height: 40}]}
                  inputStyle={styles.inputStyle}
                  onChangeText={text => onChange(text)}
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Email Address
            </Text>
            <Controller
              name="email"
              control={control}
              rules={{required: 'Email is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="ab@gmail.com"
                  value={value}
                  containerStyle={[AppStyles.halfWidth]}
                  container={[styles.inputContainer, {height: 40}]}
                  inputStyle={styles.inputStyle}
                  multiline={true}
                  onChangeText={text => onChange(text)}
                  error={errors.email?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Round Trip
            </Text>
            <Controller
              name="roundTrip"
              control={control}
              rules={{required: 'Phone Number is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="Shuttle"
                  value={value}
                  containerStyle={AppStyles.halfWidth}
                  keyboardType="number-pad"
                  container={[styles.inputContainer, {height: 40}]}
                  inputStyle={styles.inputStyle}
                  onChangeText={text => onChange(text)}
                  error={errors.roundTrip?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Is a Wheelchair lift required?
            </Text>
            <Controller
              name="isWheelchairLift"
              control={control}
              rules={{required: 'Address is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="Yes"
                  value={value}
                  containerStyle={[AppStyles.halfWidth]}
                  container={[styles.inputContainer, {height: 40}]}
                  inputStyle={styles.inputStyle}
                  multiline={true}
                  onChangeText={text => onChange(text)}
                  error={errors.isWheelchairLift?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Name of Locaton
            </Text>
            <Controller
              name="nameOfLocaton"
              control={control}
              rules={{required: 'Name Of Locaton is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="Oakwood Elementary School"
                  value={value}
                  containerStyle={[AppStyles.halfWidth]}
                  container={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  multiline={true}
                  onChangeText={text => onChange(text)}
                  error={errors.nameOfLocaton?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Additional Destination
            </Text>
            <Controller
              name="additionalDestination"
              control={control}
              rules={{required: 'Additional Destination is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="Oakwood Elementary School"
                  value={value}
                  containerStyle={[AppStyles.halfWidth]}
                  container={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  multiline={true}
                  onChangeText={text => onChange(text)}
                  error={errors.additionalDestination?.message}
                />
              )}
            />
          </View>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
            <Text style={[AppStyles.title, AppStyles.halfWidth]}>
              Special Instructions
            </Text>
            <Controller
              name="specialInstructions"
              control={control}
              rules={{required: 'Special Instructions is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  placeholder="Oakwood Elementary School"
                  value={value}
                  containerStyle={[AppStyles.halfWidth]}
                  container={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  multiline={true}
                  onChangeText={text => onChange(text)}
                  error={errors.specialInstructions?.message}
                />
              )}
            />
          </View>
        </View>
        <View style={{width: '90%', alignSelf:'center'}}>
          <AppButton
            title="Update"
            style={{width: '100%', alignSelf: 'center'}}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default EditRetailDetail;

const styles = StyleSheet.create({
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
  inputStyle: {color: AppColors.black},
});
