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
import React, {useCallback, useMemo, useRef, useState} from 'react';
import AppLayout from '../../layout/AppLayout';
import {AppColors} from '../../utils/color';
import AppHeader from '../../components/AppHeader';
import AppStyles from '../../styles/AppStyles';
import {hp} from '../../utils/constants';
import AppFonts from '../../utils/appFonts';
import AppButton from '../../components/AppButton';
import GlobalIcon from '../../components/GlobalIcon';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import AppBottomSheet from '../../components/AppBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AppInput from '../../components/AppInput';
import Modal from 'react-native-modal';
import {size} from '../../utils/responsiveFonts';
import {useNavigation} from '@react-navigation/native';
import {setChatTabIndex} from '../../store/driver/driverSlices';
import {Dropdown} from 'react-native-element-dropdown';

const DriverStudentDetail = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const studentDetail = useAppSelector(
    state => state.driverSlices.studentDetail,
  );
  const [value, setValue] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const snapPoints = useMemo(() => ['45%', '20%'], []);
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
    toggleModal();

    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  const data = [
    {label: 'School', value: '1'},
    {label: 'Vendor', value: '2'},
    {label: 'Guardian', value: '3'},
    {label: 'All', value: '4'},
  ];

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.driverScreen}}>
      <AppHeader
        role="Driver"
        title="Students Details"
        enableBack={true}
        profile_image={false}
        rightIcon={false}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.driverContainer, {paddingHorizontal: 0}]}>
          <View style={[AppStyles.alignJustifyCenter, {marginBottom: hp(2)}]}>
            <Image style={styles.image} source={studentDetail?.image} />
          </View>
          <View style={styles.container}>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>Name</Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  {color: AppColors.charcoal},
                ]}>
                {studentDetail?.name}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                Emergency Contact
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  {color: AppColors.charcoal},
                ]}>
                {studentDetail?.emergency_contact}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                School Name
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  {color: AppColors.charcoal},
                ]}>
                {studentDetail?.school_name}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                Transportation Preference
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  {color: AppColors.charcoal},
                ]}>
                {studentDetail?.transportation_preference}
              </Text>
            </View>
            <View style={[AppStyles.rowBetween, styles.textContainer]}>
              <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                Medical Details
              </Text>
              <Text
                style={[
                  AppStyles.halfWidth,
                  AppStyles.subTitle,
                  {color: AppColors.charcoal},
                ]}>
                {studentDetail?.medical_details}
              </Text>
            </View>
            <FlatList
              scrollEnabled={false}
              data={studentDetail?.guardians}
              renderItem={({item, index}) => (
                <>
                  <View style={[AppStyles.rowBetween, styles.textContainer]}>
                    <Text
                      style={[
                        AppStyles.halfWidth,
                        AppStyles.title,
                        {fontFamily: AppFonts.NunitoSansBold},
                      ]}>
                      Guardian {index + 1}:
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
                        {color: AppColors.charcoal},
                      ]}>
                      {item?.name}
                    </Text>
                  </View>
                  <View style={[AppStyles.rowBetween, styles.textContainer]}>
                    <Text style={[AppStyles.halfWidth, AppStyles.title]}>
                      Relation
                    </Text>
                    <Text
                      style={[
                        AppStyles.halfWidth,
                        AppStyles.subTitle,
                        {color: AppColors.charcoal},
                      ]}>
                      {item?.relation}
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
                        {color: AppColors.charcoal},
                      ]}>
                      {item?.phone_number}
                    </Text>
                  </View>
                </>
              )}
            />
          </View>
          <View style={{padding: hp(2), gap: 10}}>
            <AppButton
              title="Add Feedback"
              style={AppStyles.widthFullPercent}
              leftIcon={
                <GlobalIcon
                  library="MaterialIcons"
                  name="edit"
                  color={AppColors.white}
                />
              }
              onPress={() => openSheet()}
            />
            <AppButton
              onPress={() => {
                dispatch(setChatTabIndex(1));
                navigation.navigate('DriverChats');
              }}
              title="Message Guardian"
              style={AppStyles.widthFullPercent}
            />
          </View>
        </View>
      </ScrollView>

      <AppBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <Pressable
            onPress={() => closeSheet()}
            style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}
          />
        )}>
        <Text
          style={[
            AppStyles.title,
            {
              fontFamily: AppFonts.NunitoSansBold,
              marginBottom: hp(1),
              marginTop: hp(2),
            },
          ]}>
          Sent To
        </Text>
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            borderWidth: 0.5,
            borderColor: AppColors.black,
            borderRadius: hp(1),
          }}
          itemContainerStyle={{
            borderRadius: hp(1),
          }}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setIsDropdownOpen(false)}
          onChange={item => {
            setValue(item.value);
            setIsDropdownOpen(false); 
          }}
          renderRightIcon={() => (
            <GlobalIcon
              library="Entypo"
              color={AppColors.black}
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
            />
          )}
        />

        <AppInput
          multiline
          numberOfLines={8}
          container={{
            height: hp(16),
            borderRadius: hp(0.5),
            marginBottom: hp(2),
          }}
          label="Feedback"
          placeholder="Descripton"
          labelStyle={{
            marginBottom: hp(2),
            fontFamily: AppFonts.NunitoSansBold,
          }}
        />

        <View style={[AppStyles.rowBetween, {width: '100%'}]}>
          <AppButton
            title="Cancel"
            onPress={() => {
              closeSheet();
            }}
            style={styles.backButton}
            titleStyle={{color: AppColors.textLightGrey}}
          />
          <AppButton
            title="Submit"
            onPress={handleSubmitFeedBack}
            style={styles.submitButton}
          />
        </View>
      </AppBottomSheet>

      <Modal
        isVisible={isModalVisible}
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
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View
          style={{
            width: '70%',
            height: '40%',
            backgroundColor: AppColors.white,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <GlobalIcon
            name={'group-(6)'}
            library="FontelloIcon"
            color={AppColors.red}
            size={hp(8)}
          />
          <Text
            style={[
              AppStyles.titleHead,
              {fontFamily: AppFonts.NunitoSansBold, marginTop: hp(3)},
            ]}>
            Thankyou
          </Text>
          <Text
            style={[
              AppStyles.title,
              {fontFamily: AppFonts.NunitoSansSemiBold, fontSize: size.lg},
            ]}>
            For your feedback
          </Text>
        </View>
      </Modal>
    </AppLayout>
  );
};

export default DriverStudentDetail;

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
  textContainer: {alignItems: 'flex-start', marginBottom: hp(2)},
  backButton: {width: '36%', backgroundColor: AppColors.screenColor},
  submitButton: {width: '60%'},
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
});
