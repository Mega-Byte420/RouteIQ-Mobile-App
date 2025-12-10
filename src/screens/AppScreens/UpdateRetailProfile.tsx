import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import {AppColors} from '../../utils/color';
import AppStyles from '../../styles/AppStyles';
import {hp} from '../../utils/constants';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';

const UpdateRetailProfile = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      companyName: '',
      address: '',
      phoneNumber: '',
      email: '',
      cc: '',
      purchaseOrderInfo: '',
      cardHolderName: '',
      cardNumber: '',
      expirationDate: '',
      cvv: '',
    },
  });

  useEffect(() => {
    setValue('name', 'Mark Tommay');
    setValue('companyName', 'Nike.co');
    setValue('address', '802 E Frierson Ave, Tampa, FL 33603');
    setValue('phoneNumber', '+1-424-271-8337');
    setValue('email', 'marktommay@gmail.com');
    setValue('cc', '1414');
    setValue('purchaseOrderInfo', '1234.1');
    setValue('cardHolderName', 'jhon');
    setValue('cardNumber', '4646 4646 4646 4646');
    setValue('expirationDate', '02/2030');
    setValue('cvv', '123');
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
        title="Profile Info"
        enableBack={true}
        rightIcon={false}
      />
      <ScrollView
        contentContainerStyle={{padding: hp(2)}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(5)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Name</Text>
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
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Company Name</Text>
          <Controller
            name="companyName"
            control={control}
            rules={{required: 'Company name is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                onChangeText={text => onChange(text)}
                error={errors.companyName?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Address</Text>
          <Controller
            name="address"
            control={control}
            rules={{required: 'Address is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.address?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Phone Number</Text>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{required: 'Phone number is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                keyboardType="number-pad"
                onChangeText={text => onChange(text)}
                error={errors.phoneNumber?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Email</Text>
          <Controller
            name="email"
            control={control}
            rules={{required: 'Email is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.email?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>CC</Text>
          <Controller
            name="cc"
            control={control}
            rules={{required: 'CC is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.cc?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Purchase Order Info</Text>
          <Controller
            name="purchaseOrderInfo"
            control={control}
            rules={{required: 'Purchase order info is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.purchaseOrderInfo?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Card Holder Name</Text>
          <Controller
            name="cardHolderName"
            control={control}
            rules={{required: 'Card holder name is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.cardHolderName?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Card Number</Text>
          <Controller
            name="cardNumber"
            control={control}
            rules={{required: 'Card number is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.cardNumber?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>Expiration Date</Text>
          <Controller
            name="expirationDate"
            control={control}
            rules={{required: 'Expiration date is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.expirationDate?.message}
              />
            )}
          />
        </View>
        <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
          <Text style={[AppStyles.title, AppStyles.halfWidth]}>CVV</Text>
          <Controller
            name="cvv"
            control={control}
            rules={{required: 'CVV is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                containerStyle={AppStyles.halfWidth}
                container={[styles.inputContainer, {height: 40}]}
                inputStyle={styles.inputStyle}
                multiline
                onChangeText={text => onChange(text)}
                error={errors.cvv?.message}
              />
            )}
          />
        </View>

        <AppButton
          title="Update"
          style={{width: '100%', alignSelf: 'center'}}
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </AppLayout>
  );
};

export default UpdateRetailProfile;

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
