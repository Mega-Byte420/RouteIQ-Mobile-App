import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

const UpdateRetailDetail = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      slectCurrentTrip: '',
      companyName: '',
      phoneNumber: '',
      email: '',
      roundTrip: '',
      numberOfPassengers: '',
      isWheelChairLift: '',
      busType: '',
      pickupDate: '',
      pickupTime: '',
      returnDate: '',
      returnTime: '',
      typeOfGroup: '',
      pickupLocation: '',
      sName: '',
      pickupAddress: '',
      pickupCity: '',
      pickupState: '',
      pickupZip: '',
      addAdditionalDestinations: '',
      destinationLocation: '',
      destinationAddress: '',
      destinationCity: '',
      destinationState: '',
      destinationZip: '',
      howWereYouReferredToUs: '',
    },
  });

  useEffect(() => {
    setValue('slectCurrentTrip', 'Motorcoach');
    setValue('companyName', 'Jonney Barbo');
    setValue('phoneNumber', '+1-424-271-8337');
    setValue('email', 'ab@gmail.com');
    setValue('roundTrip', 'Shuttle');
    setValue('numberOfPassengers', '70');
    setValue('isWheelChairLift', 'YES');
    setValue('busType', 'Motorcoach');
    setValue('pickupDate', '03/06/2025');
    setValue('pickupTime', '08:00');
    setValue('returnDate', '09/07/2025');
    setValue('returnTime', '12:00');
    setValue('typeOfGroup', 'Test');
    setValue('pickupLocation', 'Oakwood Elementary School');
    setValue('sName', 'Mark Tommay');
    setValue('pickupAddress', 'Oakwood Elementary School');
    setValue('pickupCity', 'Los Angeles');
    setValue('pickupState', 'California');
    setValue('pickupZip', '90001');
    setValue('addAdditionalDestinations', 'Oakwood Elementary School');
    setValue('destinationLocation', 'Oakwood Elementary School');
    setValue('destinationAddress', 'Oakwood Elementary School');
    setValue('destinationCity', 'Los Angeles');
    setValue('destinationState', 'California');
    setValue('destinationZip', '90002');
    setValue('howWereYouReferredToUs', 'Test');
  }, [setValue]);

  const onSubmit = data => {
    navigation.goBack();
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.white}}>
      <AppHeader
        role="Retail"
        title="Update"
        enableBack={true}
        rightIcon={false}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{paddingBottom: hp(4)}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={AppStyles.driverContainer}>
            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Select Current Trip
              </Text>
              <Controller
                name="slectCurrentTrip"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Company/Group Name
              </Text>
              <Controller
                name="companyName"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Phone Number
              </Text>
              <Controller
                name="phoneNumber"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    keyboardType="number-pad"
                    onChangeText={onChange}
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
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
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
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Number Of Passengers
              </Text>
              <Controller
                name="numberOfPassengers"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Is a Wheelchair lift required?
              </Text>
              <Controller
                name="isWheelChairLift"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Bus Type
              </Text>
              <Controller
                name="busType"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Pickup Date
              </Text>
              <Controller
                name="pickupDate"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Pickup Time
              </Text>
              <Controller
                name="pickupTime"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Return Date
              </Text>
              <Controller
                name="returnDate"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Return Time
              </Text>
              <Controller
                name="returnTime"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Type Of Group
              </Text>
              <Controller
                name="typeOfGroup"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Pickup Location
              </Text>
              <Controller
                name="pickupLocation"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>Name</Text>
              <Controller
                name="sName"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Pickup Address
              </Text>
              <Controller
                name="pickupAddress"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Pickup City
              </Text>
              <Controller
                name="pickupCity"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Pickup State
              </Text>
              <Controller
                name="pickupState"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>
            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Pickup Zip
              </Text>
              <Controller
                name="pickupZip"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                AddAdditional Destinations
              </Text>
              <Controller
                name="addAdditionalDestinations"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Destination Location
              </Text>
              <Controller
                name="destinationLocation"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Destination Address
              </Text>
              <Controller
                name="destinationAddress"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Destination City
              </Text>
              <Controller
                name="destinationCity"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Destination State
              </Text>
              <Controller
                name="destinationState"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                Destination Zip
              </Text>
              <Controller
                name="destinationZip"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
              <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                How Were You Referred To Us
              </Text>
              <Controller
                name="howWereYouReferredToUs"
                control={control}
                render={({field: {onChange, value}}) => (
                  <AppInput
                    value={value}
                    containerStyle={AppStyles.halfWidth}
                    container={[styles.inputContainer, {height: 40}]}
                    inputStyle={styles.inputStyle}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <AppButton
              title="Update"
              style={{width: '100%', alignSelf: 'center'}}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppLayout>
  );
};

export default UpdateRetailDetail;

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
  inputStyle: {
    color: AppColors.graySuit,
  },
});
