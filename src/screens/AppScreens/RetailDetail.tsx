import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import { AppColors } from '../../utils/color';
import AppHeader from '../../components/AppHeader';
import AppStyles from '../../styles/AppStyles';
import { hp } from '../../utils/constants';
import AppFonts from '../../utils/appFonts';
import AppButton from '../../components/AppButton';
import GlobalIcon from '../../components/GlobalIcon';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import AppBottomSheet from '../../components/AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AppInput from '../../components/AppInput';
import Modal from "react-native-modal";
import { size } from '../../utils/responsiveFonts';
import { useNavigation } from '@react-navigation/native';
import { setChatTabIndex } from '../../store/driver/driverSlices';
import { Dropdown } from 'react-native-element-dropdown';
import { retailDetailData } from '../../utils/DummyData';

const RetailDetail = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  

  const [value, setValue] = useState(null);
  
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSubmitFeedBack = () => {
    closeSheet();
    toggleModal()

    setTimeout(() => {
      setModalVisible(false)
    }, 2000)
  }

  const data = [
    { label: 'School', value: '1' },
    { label: 'Vendor', value: '2' },
    { label: 'Guardian', value: '3' },
    { label: 'All', value: '4' },
  ];


  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{ backgroundColor: AppColors.driverScreen }}>
      <AppHeader
        role="Driver"
        title="Details"
        enableBack={true}
        profile_image={false}
        rightIcon={true}
      />


      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 0 }}>
          {/* <View style={[AppStyles.alignJustifyCenter, { marginBottom: hp(2) }]}>
            <Image style={styles.image} source={retailDetail?.image} />
          </View> */}
          <View style={styles.container}>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>Select Current Trip</Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.slectCurrentTrip}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>Company/Group Name</Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.name}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
               Phone Number
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.PhoneNumber}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                Email Address
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.emailAddress}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                Round Trip
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.roundTrip}
              </Text>
            </View>
             <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                Number of Passengers
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.numberOfPassengers}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                  Is a Wheelchair lift required?
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.isWheelChairLift}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Bus Type
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.busType}
              </Text>
            </View>

            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Pickup Date
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.pickupDate}
              </Text>
            </View>

            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Pickup Time
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.pickupTime}
              </Text>
            </View>
             <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Return Date
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.returnDate}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Return Time
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.returnTime}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Type Of Group
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.typeOfGroup}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Pickup Location
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.pickupLocation}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Name
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.sName}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Pickup Address
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.pickupAddress}
              </Text>
            </View>
             <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Pickup City
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.pickupCity}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Pickup State
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.pickupState}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Pickup Zip
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.pickupZip}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Add Additional Destinations
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.addAdditionalDestinations}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Destination Location
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.destinationLocation}
              </Text>
            </View>
             <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Destination Address
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.destinationAddress}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Destination City
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.destinationCity}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Destination State
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.destinationState}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
              Destination Zip
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.destinationZip}
              </Text>
            </View>
             <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
               How Were you referred to us?
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  { color: AppColors.charcoalGray },
                ]}>
                {retailDetailData?.howWereYouReferredToUs}
              </Text>
            </View>
             <AppButton
              onPress={() => navigation.navigate('UpdateRetailDetail')}
              title="Edit Info"
              style={styles.button}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </View>

      </ScrollView>

      <AppBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={({ style }) => (
          <Pressable
            onPress={() => closeSheet()}
            style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}
          />
        )}>

        <Text style={[AppStyles.title, {fontFamily: AppFonts.NunitoSansBold, marginBottom: hp(1)}]}>Sent To</Text>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            borderWidth: .5,
            borderColor: AppColors.black,
            borderRadius: hp(1)
          }}
          itemContainerStyle={{
            borderRadius: hp(1)
          }}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          searchPlaceholder="Search..."
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          renderRightIcon={() => (
            <GlobalIcon
              library='Entypo'
              color={AppColors.black}
              name="chevron-down"
              size={20}
            />
          )}
        />

        <AppInput
          multiline
          numberOfLines={8}
          container={{ height: hp(16), borderRadius: hp(0.5), marginBottom: hp(2) }}
          label="Feedback"
          placeholder="Descripton"

          labelStyle={{
            marginBottom: hp(2),
            fontFamily: AppFonts.NunitoSansBold,
          }}

        />

        <View style={[AppStyles.rowBetween, { width: '100%' }]}>
          <AppButton
            title="Cancel"
            onPress={() => {
              closeSheet()
            }}
            style={styles.backButton}
            titleStyle={{ color: AppColors.textLightGrey }}
          />
          <AppButton
            title="Submit"
            onPress={handleSubmitFeedBack}
            style={styles.submitButton}
          />
        </View>


      </AppBottomSheet>




      <Modal isVisible={isModalVisible}
        backdropTransitionInTiming={0}
        coverScreen={true}
        animationIn={'fadeInRightBig'}
        backdropOpacity={0.5}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="left"
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <View style={{ width: '70%', height: '40%', backgroundColor: AppColors.white, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <GlobalIcon name={'group-(6)'} library='FontelloIcon' color={AppColors.red}
            size={hp(8)}
          />
          <Text style={[AppStyles.titleHead,
          { fontFamily: AppFonts.NunitoSansBold, marginTop: hp(3) }]}>Thankyou</Text>
          <Text style={[AppStyles.title,
          { fontFamily: AppFonts.NunitoSansSemiBold, fontSize: size.lg, }]}>For your feedback</Text>
        </View>
      </Modal>


    </AppLayout>
  );
};

export default RetailDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
  },
  image: {
    height: hp(20),
    width: hp(17),
    resizeMode: 'cover',
    borderRadius: 8,
  },
  textContainer: { alignItems: 'flex-start', marginBottom: hp(2) },
  backButton: { width: '36%', backgroundColor: AppColors.screenColor },
  submitButton: { width: '60%' },
  dropdowncontainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: hp(2),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
});
