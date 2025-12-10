import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import {UpdateGuardianProfileProps} from '../../types/types';
import {updateGuardianDropdown} from '../../utils/DummyData';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp} from '../../utils/constants';
import {size} from '../../utils/responsiveFonts';

const UpdateGuardianProfile: React.FC<UpdateGuardianProfileProps> = ({
  route,
}) => {
  const route_data = route?.params;
  const navigation = useNavigation();

  useEffect(() => {
    setValue('name', 'Jacob Jones');
    setValue('address', 'E301, 20 Cooper Square');
    setValue('city', 'New York');
    setValue('state', 'New York State');
    setValue('zipCode', '3132325');
    setValue('phone', '+93123132325');
    // setValue('email', 'jones234@gmail.com');
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      relationWithChild: '',
      otherRelation:'',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      // email: '',
    },
  });

  const onSubmit = () => {
    navigation.goBack();
  };

  return (
    <AppLayout>
      <AppHeader
        title={route_data?.title}
        enableBack={true}
        rightIcon={false}
      />
      <ScrollView
        scrollEnabled={true}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          AppStyles.body,
          {
            justifyContent: 'space-between',
          },
        ]}>
        <View style={styles.container}>
          <Controller
            name="name"
            control={control}
            rules={{required: 'Name is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                onChangeText={(text: string) => onChange(text)}
                containerStyle={styles.inputContainer}
                label="Name"
                editable={true}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="relationWithChild"
            control={control}
            rules={{required: 'Required*'}}
            render={({field: {onChange, value}}) => (
              <>
                <AppInput
                  containerStyle={{marginBottom: hp(0)}}
                  label="Relation with Child"
                  container={{display: 'none'}}
                />
                <SelectList
                  search={false}
                  setSelected={(val: string) => onChange(val)}
                  data={updateGuardianDropdown}
                  save="value"
                  placeholder="Select"
                  boxStyles={styles.boxStyle}
                  dropdownStyles={{
                    backgroundColor: AppColors.white,
                    borderColor: AppColors.black,
                  }}
                  dropdownTextStyles={{
                    color: AppColors.black,
                    fontSize: size.sl,
                    fontFamily: AppFonts.NunitoSansSemiBold,
                  }}
                  inputStyles={{
                    fontSize: size.sl,
                    color: AppColors.black,
                    fontFamily: AppFonts.NunitoSansSemiBold,
                  }}
                />
                {errors.relationWithChild?.message && (
                  <Text style={styles.errorText}>
                    {errors.relationWithChild.message}
                  </Text>
                )}

                {/* Show input field if "Other" is selected */}
                {value === 'Other' && (
                  <Controller
                    name="otherRelation"
                    control={control}
                    rules={{required: 'Please specify your relationship'}}
                    render={({field: {onChange, value}}) => (
                      <AppInput
                        containerStyle={styles.inputContainerStyle}
                        label="Specify Relationship"
                        value={value}
                        onChangeText={onChange}
                        inputStyle={{color: AppColors.black}}
                        error={errors.otherRelation?.message}
                      />
                    )}
                  />
                )}
              </>
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{required: 'Address is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                onChangeText={(text: string) => onChange(text)}
                containerStyle={[styles.inputContainer, {marginTop: hp(1.6)}]}
                label="Address"
                editable={true}
                error={errors.address?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            rules={{required: 'City is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="City"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.city?.message}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            rules={{required: 'State is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="State"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.state?.message}
              />
            )}
          />
          <Controller
            name="zipCode"
            control={control}
            rules={{required: 'Zip Code is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Zip Code"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.zipCode?.message}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Phone is required',
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'Phone number must be 11 digits',
              },
            }}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Phone"
                value={value}
                onChangeText={(text: string) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  onChange(numericText);
                }}
                editable={true}
                keyboardType="number-pad"
                maxLength={11}
                error={errors.phone?.message}
              />
            )}
          />
          {/* <Controller
            name="email"
            control={control}
            rules={{required: 'Email is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Email"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.email?.message}
              />
            )}
          /> */}
        </View>

        <AppButton
          onPress={handleSubmit(onSubmit)}
          title="Update"
          style={styles.button}
        />
      </ScrollView>
    </AppLayout>
  );
};

export default UpdateGuardianProfile;

const styles = StyleSheet.create({
  container: {marginTop: hp(3)},
  inputContainer: {
    marginBottom: hp(1.6),
  },
  button: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: AppColors.black,
    marginTop: hp(4),
    marginBottom: hp(8),
  },
  boxStyle: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    borderColor: AppColors.black,
  },
  errorText: {
    color: AppColors.red,
    fontSize: size.sl,
    fontFamily: AppFonts.NunitoSansRegular,
    marginTop: hp(0.5),
    marginLeft: hp(0.5),
  },
  inputContainerStyle:{
    marginTop:hp(2)
  }
});
