import React, {useCallback, useMemo, useRef, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import {AppColors} from '../../utils/color';
import {useAppSelector} from '../../store/hooks';
import AppStyles from '../../styles/AppStyles';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppInput from '../../components/AppInput';
import {hp, wp} from '../../utils/constants';
import AppFonts from '../../utils/appFonts';
import FuelCard from '../../components/FuelCard';
import AnimatedDriverMapView from '../../components/AnimatedDriverMapView';
import AppButton from '../../components/AppButton';
import AppBottomSheet from '../../components/AppBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {size} from '../../utils/responsiveFonts';
import GlobalIcon from '../../components/GlobalIcon';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {TouchableOpacity, Image} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import CalendarPicker from '../../components/CalendarPicker';

const FuelRecordsScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%', '100%'], []);
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      response => {
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          setSelectedImage(response.assets[0]);
        }
      },
    );
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      amount: '',
      gal: '',
      date: '',
      location: '',
      upload: '',
    },
  });

  const onSubmit = () => {
    console.log('test');
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.driverScreen}}>
      <AppHeader
        role="Driver"
        title={'Fuel Log'}
        enableBack={true}
        rightIcon={true}
      />
      <View style={AppStyles.flex}>
        <ScrollView>
          <View style={{paddingHorizontal: wp(3), paddingTop: hp(2)}}>
            <AppInput
              placeholder="Search"
              rightInnerIcon={
                <GlobalIcon
                  library="Fontisto"
                  name="search"
                  size={20}
                  color={AppColors.black}
                />
              }
            />
          </View>
          <FuelCard
            glNumber="GL#112-01"
            date="31-08-2024"
            price={42.909}
            gallons={9.74}
            pricePerGallon={4.405}
            location="San Francisco, ExampleCorp"
          />
          <FuelCard
            glNumber="GL#112-01"
            date="31-08-2024"
            price={42.909}
            gallons={9.74}
            pricePerGallon={4.405}
            location="San Francisco, ExampleCorp"
          />
          <FuelCard
            glNumber="GL#112-01"
            date="31-08-2024"
            price={42.909}
            gallons={9.74}
            pricePerGallon={4.405}
            location="San Francisco, ExampleCorp"
          />
          <FuelCard
            glNumber="GL#112-01"
            date="31-08-2024"
            price={42.909}
            gallons={9.74}
            pricePerGallon={4.405}
            location="San Francisco, ExampleCorp"
          />
        </ScrollView>
        <View
          style={{
            width: '100%',
            paddingHorizontal: hp(2),
            paddingBottom: hp(1),
          }}>
          <AppButton
            title="Add Fuel Log"
            onPress={() => openSheet()}
            style={{width: '100%'}}
          />
        </View>
      </View>

      <AppBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        enablePanDownToClose={false}
        contentContainerStyle={{borderRadius: 10, paddingHorizontal: hp(2)}}
        snapPoints={snapPoints}
        ContainerStyle={{borderRadius: 10}}
        backdropComponent={({style}) => <></>}>
        <ScrollView>
          <Controller
            name="amount"
            control={control}
            rules={{required: 'Amount is required'}}
            render={({field: {onChange, value, onBlur}}) => (
              <AppInput
                label="Enter Amount"
                placeholder="Enter amount"
                keyboardType="numeric"
                value={value}
                onChangeText={text => {
                  if (/^\d*\.?\d*$/.test(text)) {
                    onChange(text);
                  }
                }}
                onBlur={onBlur}
                error={errors.amount?.message}
              />
            )}
          />
          <Controller
            name="gal"
            control={control}
            rules={{required: 'Gal Number is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                label="Enter gal."
                value={value}
                placeholder="Enter gal."
                onChangeText={text => onChange(text)}
                error={errors.gal?.message}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{required: 'Date is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CalendarPicker
                selectedDate={value}
                setDates={(date: string) => onChange(date)}
                error={errors.date?.message}
                label="Enter Date"
              />
            )}
          />

          <Controller
            name="location"
            control={control}
            rules={{required: 'Location is required'}}
            render={({field: {onChange, value}}) => (
              <AppInput
                label="Enter Location"
                value={value}
                placeholder="Enter location"
                onChangeText={text => onChange(text)}
                error={errors.location?.message}
              />
            )}
          />

          <Controller
            name="upload"
            control={control}
            rules={{required: 'Upload File/Picture is required'}}
            render={({field: {onChange, value}}) => (
              <>
                <TouchableOpacity
                  style={styles.uploadDocBox}
                  onPress={handleImagePick}>
                  {selectedImage ? (
                    <Image
                      source={{uri: selectedImage.uri}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: 5,
                      }}
                    />
                  ) : (
                    <>
                      <GlobalIcon
                        library="FontelloIcon"
                        name={'group-(5)'}
                        color={AppColors.red}
                        size={40}
                      />
                      <Text style={styles.tapText}>
                        Tap & Upload Files/Pictures
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Display validation error message */}
                {errors.upload && (
                  <Text style={styles.errorText}>{errors.upload.message}</Text>
                )}
              </>
            )}
          />

          {/* <View
            style={{width: '100%', alignSelf: 'center', marginBottom: hp(2)}}>
            <Text
              style={[
                AppStyles.titleHead,
                {fontSize: size.lg, alignSelf: 'flex-start'},
              ]}>
              Upload Reciept
            </Text>
            <View style={styles.uploadDocBox}>
              <GlobalIcon
                library="FontelloIcon"
                name={'group-(5)'}
                color={AppColors.red}
                size={40}
              />
              <Text style={styles.tapText}>Tap & Upload Files/Pictures</Text>
            </View>
          </View> */}

          <View style={[AppStyles.rowBetween, AppStyles.widthFullPercent]}>
            <AppButton
              title="Cancel"
              onPress={() => closeSheet()}
              style={{width: '35%', backgroundColor: AppColors.lightGrey}}
              titleStyle={{color: AppColors.textLightGrey}}
            />
            <AppButton
              title="Submit"
              //   onPress={() => closeSheet()}
              onPress={handleSubmit(onSubmit)}
              style={{width: '62%'}}
            />
          </View>
        </ScrollView>
      </AppBottomSheet>

      {/* <AnimatedDriverMapView /> */}
    </AppLayout>
  );
};

export default FuelRecordsScreen;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: AppColors.white,
    padding: hp(2),
    borderRadius: 16,
  },
  inputStyle: {
    height: hp(5.5),
  },
  labelStyle: {
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  image: {
    height: hp(30),
    width: '100%',
    resizeMode: 'contain',
    marginTop: hp(1),
  },
  uploadDocBox: {
    width: '100%',
    marginVertical: hp(3),
    marginTop: hp(2),
    height: hp(15),
    // gap: hp(1),
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: AppColors.red,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.veryLightPink,
  },
  tapText: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    fontSize: size.s,
    lineHeight: 20,
    color: AppColors.red,
    alignSelf: 'center',
  },
  errorText: {
    color: AppColors.red,
    fontSize: 14,
    marginBottom: hp(2),
  },
});
