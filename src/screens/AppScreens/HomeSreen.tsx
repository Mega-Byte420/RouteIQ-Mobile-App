import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AppBottomSheet from '../../components/AppBottomSheet';
import AppButton from '../../components/AppButton';
import AppCalender from '../../components/AppCalender';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppMapView from '../../components/AppMapView';
import GlobalIcon from '../../components/GlobalIcon';
import RouteSlider from '../../components/RouteSlider';
import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp, screenHeight, screenWidth} from '../../utils/constants';
import {childDropDown, leaveDropdownData} from '../../utils/DummyData';
import {size} from '../../utils/responsiveFonts';
import AppCustomModal from '../../components/AppCustomModal';
import {useForm} from 'react-hook-form';
import ElephantIcon from '../../assets/svgs/ElephantIcon';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setStudentAbsentModal} from '../../store/user/userSlices';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';

export default function HomeSreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const studentAbsentModal = useAppSelector(
    state => state.userSlices.studentAbsentModal,
  );
  const selectedChild = useAppSelector(state => state.userSlices.selectedChild);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectAbsence, setSelectAbsence] = useState('');
  const [preview, setPreview] = useState(false);
  const [reasonOfAbsence, setReasonOfAbsence] = useState('');
  const [getDates, setGetDates] = useState<string | Date[] | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  const handleSetDates = (dates: string | Date[]) => {
    setGetDates(dates);

    if (typeof dates === 'string') {
      setShowConfirmButton(false);

      // Single date (One Day mode)
      if (dates.trim()) {
        setShowCalendar(false);
        setIsEditingDates(false);
      } else {
        setShowCalendar(true);
      }
    } else if (Array.isArray(dates)) {
      if (selectAbsence === 'All Week') {
        setShowConfirmButton(false);
        // Expecting a range of exactly two dates
        if (dates.length === 2 && dates[0] && dates[1]) {
          setShowCalendar(false);
          setIsEditingDates(false);
        } else {
          setShowCalendar(true);
        }
      } else if (selectAbsence === 'Multi Days') {
        // Keep calendar open for multi-select
        setShowConfirmButton(true);
        if (dates.length > 0) {
          // Keep calendar open, allow selecting more dates
          setIsEditingDates(true); // Optional: mark that user is still editing
        } else {
          setShowCalendar(true);
        }
      }
    } else {
      setShowConfirmButton(false);
      setShowCalendar(true);
    }
  };

  const handleEditDates = () => {
    setIsEditingDates(true);
    setShowCalendar(true);
    console.log('dates', getDates);
  };

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [error, setError] = useState({
    reason: '',
    calendar: '',
  });

  const snapPoints = useMemo(
    () => [
      selectAbsence == 'All Week' ? '80%' : preview ? '55%' : '45%',
      '90%',
    ],
    [selectAbsence, preview],
  );
  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const onSubmit = () => {
    if (reasonOfAbsence == '') {
      setError({
        ...error,
        reason: 'Reason is Required',
      });
      return;
    }
    if (reasonOfAbsence && (getDates || getDates?.length > 0) && !preview) {
      setPreview(true);
      setSelectAbsence('');
    }
    if (preview) {
      dispatch(setStudentAbsentModal(false));
      setPreview(false);
      setSelectAbsence('');
      setGetDates([]);
      setReasonOfAbsence('');
      setIsEditingDates(false);
      setError({
        reason: '',
        calendar: '',
      });
    }
  };

  useEffect(() => {
    if (selectAbsence) {
      setShowCalendar(true);
      setGetDates([]);
      setIsEditingDates(false);
    }
  }, [selectAbsence]);

  return (
    <AppLayout
      style={styles.layoutContainer}
      statusbackgroundColor={AppColors.lightBlack}>
      <View style={{height: screenHeight, width: screenWidth}}>
        <AppMapView />
      </View>
      <ImageBackground
        style={styles.headerImage}
        source={require('../../assets/images/rectangle.png')}>
        <AppHeader
          role="ParentsDropDown"
          title="Mark Tommay"
          rightIcon={true}
          onPressLeftIcon={() => {
            navigation.navigate('Settings');
          }}
          onPressRightIcon={() => navigation.navigate('Notification')}
          containerStyle={{backgroundColor: '#141516'}}
        />
        <View style={[AppStyles.rowBetween, styles.headerBottomContainer]}>
          <View style={styles.headerTitle}>
            <View style={[AppStyles.rowCenter, {gap: 5}]}>
              <Text style={styles.headerSubTitle}>Bus No:</Text>
              <ElephantIcon />
            </View>
            <Text
              style={[
                AppStyles.subHeading,
                {
                  color: AppColors.white,
                  fontFamily: AppFonts.NunitoSansBold,
                },
              ]}>
              B456788
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={selectedChild?.image || childDropDown[0]?.image}
            />
          </View>
          <View style={[styles.headerTitle, {paddingTop: hp(0.2)}]}>
            <View style={[AppStyles.rowCenter, {gap: 5}]}>
              <Image
                style={styles.driverProfile}
                source={require('../../assets/images/driverHomeProfile.png')}
              />
            </View>
            <Text
              style={[
                AppStyles.subHeading,
                {
                  color: AppColors.white,
                  fontFamily: AppFonts.NunitoSansBold,
                },
              ]}>
              Wilson
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.bottomContainer}>
        <RouteSlider />
        <View style={[AppStyles.rowBetween, {marginTop: hp(3)}]}>
          <Pressable
            onPress={() => navigation.navigate('ChatScreen')}
            style={[AppStyles.rowCenter, styles.bottomButton]}>
            <GlobalIcon
              library="Ionicons"
              name="chatbubble-ellipses"
              color={AppColors.red}
            />
          </Pressable>
          <AppButton
            title="Report Student Absence"
            onPress={() => dispatch(setStudentAbsentModal(true))}
            style={{backgroundColor: AppColors.lightBlack}}
            titleStyle={{fontFamily: AppFonts.NunitoSansSemiBold}}
          />
        </View>
      </View>

      <AppCustomModal
        visible={studentAbsentModal}
        onPress={() => dispatch(setStudentAbsentModal(false))}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                maxHeight: '100%',
                backgroundColor: AppColors.white,
                paddingHorizontal: hp(2),
                paddingVertical: hp(2),
                borderTopRightRadius: hp(2),
                borderTopLeftRadius: hp(2),
              }}>
              <AppInput
                containerStyle={{marginBottom: 0}}
                label="Child Absence"
                container={{display: 'none'}}
                labelStyle={{
                  fontFamily: AppFonts.NunitoSansBold,
                }}
              />
              <View
                style={[
                  AppStyles.row,
                  {alignItems: 'flex-start', width: '100%'},
                ]}>
                <SelectList
                  search={false}
                  setSelected={(val: string) => {
                    setPreview(false);
                    setSelectAbsence(val);
                    if(val !== 'Multi Days'){
                      setShowConfirmButton(false)
                    }
                  }}
                  data={leaveDropdownData}
                  save="value"
                  placeholder="Select"
                  boxStyles={{
                    ...styles.boxStyle,
                    width: selectAbsence != '' ? '90%' : '100%',
                  }}
                  dropdownTextStyles={{color: AppColors.black}}
                  dropdownStyles={{marginBottom: hp(1), marginTop: hp(-1)}}
                />
                {selectAbsence != '' && (
                  <View style={{left: hp(-1), width: '10%'}}>
                    <GlobalIcon
                      library="CustomIcon"
                      name="Group-2002"
                      color={AppColors.red}
                      size={hp(4)}
                    />
                  </View>
                )}
              </View>

              
              {getDates && getDates.length !== 0 && !isEditingDates && (
                <View style={styles.dateDisplayContainer}>
                  <AppInput

                    value={
                      typeof getDates === 'string'
                        ? moment(getDates).format('Do MMMM YYYY')
                        : selectAbsence === 'Multi Days' ?
                          getDates
                          .map(date => moment(date).format('Do MMMM YYYY'))
                          .join(', ')
                          :
                         moment(getDates[0]).format('Do MMMM YYYY') +
                          ' - ' +
                          moment(getDates[1]).format('Do MMMM YYYY')
                    }
                    editable={false}
                    containerStyle={styles.dateInputContainer}
                    multiline={true}
                    numberOfLines={
                      typeof getDates === 'string' ? 1 :
                      getDates.length > 2 ? Math.min(getDates.length, 7)-2 : 1
                    }
                  />
                  <Pressable
                    onPress={handleEditDates}
                    style={styles.editButton}>
                    <GlobalIcon
                      library="Feather"
                      name="edit"
                      color={AppColors.red}
                      size={34}
                    />
                  </Pressable>
                </View>
              )}


              {selectAbsence !== '' && !preview && (showCalendar || isEditingDates) && (
                <AppCalender
                  setDates={handleSetDates}
                  error={error.calendar}
                  selectionDays={selectAbsence}
                />
              )}

              {
                showConfirmButton && (
                  <AppButton
                    title="Confirm"
                    onPress={() => {
                      setShowCalendar(false);
                      setIsEditingDates(false);
                      setShowConfirmButton(false);
                    }}
                    style={styles.confirmButton}
                    titleStyle={{color: AppColors.white}}
                  />
                )
              }


              <MultiSelectDropdown />
             
              {!preview ? (
                <AppInput
                  multiline
                  numberOfLines={7}
                  container={{height: hp(16), borderRadius: hp(0.5)}}
                  label="Reason for Absence"
                  placeholder="Descripton"
                  value={reasonOfAbsence}
                  onChangeText={(text: string) => setReasonOfAbsence(text)}
                  labelStyle={{
                    fontFamily: AppFonts.NunitoSansBold,
                  }}
                  error={error.reason}
                />
              ) : (
                <>
                  <Text style={styles.label}>Reason for Absence</Text>
                  <View style={styles.reasonContainer}>
                    <Text style={AppStyles.subHeading}>{reasonOfAbsence}</Text>
                  </View>
                </>
              )}
              <View style={[AppStyles.rowBetween, {width: '100%'}]}>
                <AppButton
                  title="Cancel"
                  onPress={() => {
                    dispatch(setStudentAbsentModal(false));
                    setGetDates([]);
                    setPreview(false);
                    setReasonOfAbsence('');
                    setSelectAbsence('');
                    setIsEditingDates(false);
                    setError({
                      reason: '',
                      calendar: '',
                    });
                  }}
                  style={styles.cancelButton}
                  titleStyle={{color: AppColors.textLightGrey}}
                />
                <AppButton
                  title="Submit"
                  onPress={() => onSubmit()}
                  style={styles.submitButton}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </AppCustomModal>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 220,
    width: screenWidth,
    paddingTop: hp(4),
    position: 'absolute',
  },
  layoutContainer: {backgroundColor: 'rgba(16, 35, 53, 0)', paddingTop: 0},
  headerBottomContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: hp(2),
    height: hp(10),
    marginTop: hp(0),
    zIndex: 1,
  },
  imageContainer: {
    height: hp(15),
    width: hp(15),
  },
  driverProfile: {height: hp(4), width: hp(4), borderRadius: hp(4)},
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 0,
  },
  reactangleIcon: {
    height: 100,
    width: screenWidth,
    backgroundColor: 'rgba(16, 35, 53, 0)',
    position: 'absolute',
    top: 60,
    elevation: 0,
    opacity: 1,
  },
  headerTitle: {gap: hp(0.5), paddingTop: hp(1)},
  headerSubTitle: {
    fontFamily: AppFonts.NunitoSansMedium,
    fontSize: size.sl,
    lineHeight: 20,
    color: AppColors.white,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: hp(10),
    position: 'absolute',
    top: 15,
  },
  bottomContainer: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    height: hp(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal: hp(2),
  },
  bottomButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: AppColors.black,
    height: hp(6),
    width: hp(6),
  },
  boxStyle: {
    marginBottom: hp(1.6),
    backgroundColor: AppColors.white,
    alignItems: 'center',
    borderColor: AppColors.black,
    height: hp(6),
    borderRadius: hp(0.5),
    color: AppColors.black
  },
  confirmButton: {width: '100%', backgroundColor: AppColors.black, marginBottom: 20},
  cancelButton: {width: '35%', backgroundColor: AppColors.lightGrey},
  submitButton: {width: '60%', backgroundColor: AppColors.black},
  label: {
    marginBottom: 5,
    color: AppColors.black,
    fontSize: size.md,
    alignSelf: 'flex-start',
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  reasonContainer: {
    padding: hp(2),
    backgroundColor: '#dddde1',
    borderRadius: hp(1),
    marginBottom: hp(3),
  },
  // New styles for edit functionality
  dateDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1),
  },
  dateInputContainer: {
    flex: 1,
    marginRight: hp(1),
  },
  editButton: {
    paddingHorizontal: hp(1.5),
    borderColor: AppColors.red,
    marginBottom: hp(1)
  },
});