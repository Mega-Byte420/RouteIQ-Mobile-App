import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import {UpdateGuardianProfileProps} from '../../types/types';
import {
  BusType,
  RetailRequestQuoteData as RetailRequestQuoteData,
  RoundTrip,
} from '../../utils/DummyData';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp, wp} from '../../utils/constants';
import {size} from '../../utils/responsiveFonts';
import AppCheckBox from '../../components/AppCheckBox';
import GlobalIcon from '../../components/GlobalIcon';
import CalendarPicker from '../../components/CalendarPicker';

const RetailRequestQuote: React.FC<UpdateGuardianProfileProps> = ({route}) => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(true);

  //   useEffect(() => {
  //     setValue('name', 'Enter name');
  //     setValue('address', 'E301, 20 Cooper Square');
  //     setValue('city', 'New York');
  //     setValue('state', 'New York State');
  //     setValue('zipCode', '3132325');
  //     setValue('phone', '+93123132325');
  //     // setValue('email', 'jones234@gmail.com');
  //   }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      selectCurrentTrip: '',
      companygroupname: '',
      phonenumber: '',
      email: '',
      roundtrip: '',
      numberofpassengers: '',
      isawheelchairlift: '',
      bustype: '',
      pickupdate: '',
      pickuptime: '',
      returndate: '',
      returntime: '',
      typeofgroup: '',
      pickuplocation: '',
      name: '',
      pickupaddress: '',
      pickupcity: '',
      pickupstate: '',
      pickupzip: '',
      addadditionaldestinations: '',
      destinationlocation: '',
      destinationaddress: '',
      destinationcity: '',
      destinationstate: '',
      destinationzip: '',
      howwereyoureferredtous: '',
    },
  });

  const onSubmit = () => {
    navigation.goBack();
  };

  return (
    <AppLayout statusbackgroundColor={AppColors.red}>
      <AppHeader
        title="New Request For Quote"
        titleStyle={styles.titleStyle}
        enableBack={true}
        rightIcon={false}
        role="Driver"
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
            name="selectCurrentTrip"
            control={control}
            // rules={{required: 'Relation with child is required'}}
            render={({field: {onChange, value}}) => (
              <>
                <AppInput
                  containerStyle={{marginBottom: hp(0)}}
                  label="Select current trip"
                  labelStyle={styles.labelStyle}
                  container={{display: 'none'}}
                />
                <SelectList
                  search={false}
                  setSelected={(val: string) => onChange(val)}
                  data={RetailRequestQuoteData}
                  save="value"
                  placeholder="Select"
                  boxStyles={[
                    styles.boxStyle,
                    {
                      borderRadius: 4,
                    },
                  ]}
                  dropdownStyles={{
                    backgroundColor: AppColors.white,
                    borderColor: AppColors.black,
                    borderRadius: 4,
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
              </>
            )}
          />
          <Controller
            name="companygroupname"
            control={control}
            rules={{required: 'Company Group Name is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                onChangeText={(text: string) => onChange(text)}
                containerStyle={styles.inputContainer}
                label="Company/Group Name"
                labelStyle={styles.labelStyle}
                placeholder="Enter name"
                editable={true}
                error={errors.companygroupname?.message}
              />
            )}
          />
          <Controller
            name="phonenumber"
            control={control}
            rules={{required: 'Phone is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                value={value}
                onChangeText={(text: string) => onChange(text)}
                label="Phone Number"
                labelStyle={styles.labelStyle}
                placeholder="Enter number"
                editable={true}
                error={errors.phonenumber?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{required: 'City is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Email Address"
                labelStyle={styles.labelStyle}
                placeholder="Enter email"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="roundtrip"
            control={control}
            // rules={{required: 'Relation with child is required'}}
            render={({field: {onChange, value}}) => (
              <>
                <AppInput
                  containerStyle={{marginBottom: hp(0)}}
                  label="Round Trip"
                  labelStyle={styles.labelStyle}
                  container={{display: 'none'}}
                />
                <SelectList
                  search={false}
                  setSelected={(val: string) => onChange(val)}
                  data={RoundTrip} // Updated variable name
                  save="value"
                  placeholder="Select"
                  boxStyles={[
                    styles.boxStyle,
                    {
                      borderRadius: 4,
                    },
                  ]}
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
              </>
            )}
          />
          <Controller
            name="numberofpassengers"
            control={control}
            rules={{required: 'State is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Number of Passengers"
                labelStyle={styles.labelStyle}
                placeholder="Enter location"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.numberofpassengers?.message}
              />
            )}
          />
          <Controller
            name="isawheelchairlift"
            control={control}
            rules={{required: 'Zip Code is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Is a Wheelchair lift required?"
                labelStyle={styles.labelStyle}
                placeholder="Enter location"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.isawheelchairlift?.message}
              />
            )}
          />
          <Controller
            name="bustype"
            control={control}
            //  rules={{required: 'Select Current Trip is required'}}
            render={({field: {onChange, value}}) => (
              <>
                <AppInput
                  containerStyle={{marginBottom: hp(0)}}
                  label="Bus Type"
                  labelStyle={styles.labelStyle}
                  container={{display: 'none'}}
                />
                <SelectList
                  search={false}
                  setSelected={(val: string) => onChange(val)}
                  data={BusType} // Updated variable name
                  save="value"
                  placeholder="Select"
                  boxStyles={[
                    styles.boxStyle,
                    {
                      borderRadius: 4,
                    },
                  ]}
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
              </>
            )}
          />
          <Controller
            name="pickupdate"
            control={control}
            rules={{required: 'Pickup Date is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CalendarPicker
                selectedDate={value}
                setDates={(date: string) => onChange(date)}
                error={error?.message}
                label="Pickup Date"
              />
            )}
          />

          <Controller
            name="pickuptime"
            control={control}
            rules={{required: 'Phone is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Pickup Time"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.pickuptime?.message}
              />
            )}
          />

          {/* <Controller
            name="returndate"
            control={control}
            rules={{required: 'Phone is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Return Date"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.returndate?.message}
              />
            )}
          /> */}

          <Controller
            name="returndate"
            control={control}
            rules={{required: 'Return Date is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CalendarPicker
                selectedDate={value}
                setDates={(date: string) => onChange(date)}
                error={error?.message}
                label="Return Date"
              />
            )}
          />

          <Controller
            name="returntime"
            control={control}
            rules={{required: 'Phone is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Return Time"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.returntime?.message}
              />
            )}
          />

          <Controller
            name="typeofgroup"
            control={control}
            rules={{required: 'Type of Group is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Type of Group"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.typeofgroup?.message}
              />
            )}
          />

          <Controller
            name="pickuplocation"
            control={control}
            rules={{required: 'Pickup Location is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Pickup Location"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.pickuplocation?.message}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            rules={{required: 'Name is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Name"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="pickupaddress"
            control={control}
            rules={{required: 'Pickup Address is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Pickup Address"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                // keyboardType="number-pad"
                error={errors.pickupaddress?.message}
              />
            )}
          />

          <Controller
            name="pickupcity"
            control={control}
            rules={{required: 'Pickup City is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Pickup City"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.pickupcity?.message}
              />
            )}
          />

          <Controller
            name="pickupstate"
            control={control}
            rules={{required: 'Pickup State is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Pickup State"
                labelStyle={styles.labelStyle}
                placeholder="Enter instruction"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.pickupstate?.message}
              />
            )}
          />

          <Controller
            name="pickupzip"
            control={control}
            rules={{required: 'Pickup Zip is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Pickup Zip"
                labelStyle={styles.labelStyle}
                placeholder="Enter"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                keyboardType="number-pad"
                error={errors.pickupzip?.message}
              />
            )}
          />

          <Controller
            name="addadditionaldestinations"
            control={control}
            rules={{required: 'Add Additional Destinations is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Add Additional Destinations"
                labelStyle={styles.labelStyle}
                placeholder="Enter destination"
                value={value}
                leftInnerIcon={
                  <GlobalIcon
                    library="Entypo"
                    name="plus"
                    size={24}
                    color={AppColors.red}
                  />
                }
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.addadditionaldestinations?.message}
              />
            )}
          />

          <Controller
            name="destinationlocation"
            control={control}
            rules={{required: 'Destination Location is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Destination Location"
                labelStyle={styles.labelStyle}
                placeholder="Enter"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.destinationlocation?.message}
              />
            )}
          />

          <Controller
            name="destinationaddress"
            control={control}
            rules={{required: 'Destination Address is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Destination Address"
                placeholder="Enter"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.destinationaddress?.message}
              />
            )}
          />

          <Controller
            name="destinationcity"
            control={control}
            rules={{required: 'Destination City is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Destination City"
                labelStyle={styles.labelStyle}
                placeholder="Enter"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.destinationcity?.message}
              />
            )}
          />

          <Controller
            name="destinationstate"
            control={control}
            rules={{required: 'Destination State is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="Destination State"
                labelStyle={styles.labelStyle}
                placeholder="Enter"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                error={errors.destinationstate?.message}
              />
            )}
          />

          <Controller
            name="destinationzip"
            control={control}
            rules={{required: 'Destination Zip is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={styles.inputContainer}
                label="Destination Zip"
                labelStyle={styles.labelStyle}
                placeholder="Enter"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                keyboardType="number-pad"
                error={errors.destinationzip?.message}
              />
            )}
          />

          <Controller
            name="howwereyoureferredtous"
            control={control}
            rules={{required: 'How Were You Referred To Us is Required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                containerStyle={{marginBottom: hp(0)}}
                label="How were you referred to us?"
                labelStyle={styles.labelStyle}
                placeholder="Enter"
                value={value}
                onChangeText={(text: string) => onChange(text)}
                editable={true}
                keyboardType="number-pad"
                error={errors.howwereyoureferredtous?.message}
              />
            )}
          />

          <View
            style={{
              marginTop: hp(2),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppCheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              unCheckedImage={<View style={styles.checkContainer}></View>}
              checkedImage={
                <View style={styles.checkContainer}>
                  <GlobalIcon
                    library="Feather"
                    name="check"
                    color={AppColors.black}
                    size={20}
                  />
                </View>
              }
            />
            <Text style={styles.textStyle}>Terms and Conditions</Text>
          </View>
        </View>

        <AppButton
          title="Submit"
          style={styles.submitBtn}
          onPress={handleSubmit}
        />

        <AppButton
          title="Cancel"
          titleStyle={{color: AppColors.red}}
          style={styles.button}
          onPress={onSubmit}
        />
      </ScrollView>
    </AppLayout>
  );
};

export default RetailRequestQuote;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(3),
  },
  inputContainer: {
    // marginBottom: hp(1.6),
    marginTop: hp(1),
  },
  submitBtn: {
    width: '100%',
    marginTop: hp(3),
  },

  button: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.red,
    marginTop: hp(1.5),
    marginBottom: hp(8),
  },

  boxStyle: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    borderColor: AppColors.black,
  },
  titleStyle: {
    fontSize: 18,
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.white,
  },
  labelStyle: {
    fontSize: 18,
    fontFamily: AppFonts.NunitoSansBold,
  },
  checkContainer: {
    height: hp(2.5),
    width: hp(2.5),
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  textStyle: {
    marginLeft: wp(2),
    fontSize: 16,
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansSemiBold,
    textDecorationLine: 'underline',
  },
});
