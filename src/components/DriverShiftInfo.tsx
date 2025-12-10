import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import moment, {months} from 'moment';
import GlobalIcon from './GlobalIcon';
import {AppColors} from '../utils/color';
import {hp, wp} from '../utils/constants';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import {fontSize, size} from '../utils/responsiveFonts';
import TripCard from './TripCard';
import {tripData} from '../utils/DummyData';
import {useAppDispatch} from '../store/hooks';
import {setDriverHomeStatus} from '../store/user/userSlices';
import {DriverShiftInfoProps} from '../types/types';
import AppBottomSheet from './AppBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AppButton from './AppButton';
import UploadDoc from './UploadDoc';
import AppInput from './AppInput';
import { Controller, useForm } from 'react-hook-form';
import CalendarPicker from './CalendarPicker';

const DriverShiftInfo: React.FC<DriverShiftInfoProps> = ({
  trackingDetails,
  timeOff,
}) => {
  const dispatch = useAppDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['12%', '55%'], []);
  const snapPoints2 = useMemo(() => ['45%', '55%'], []);
  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const openSheet2 = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const closeSheet2 = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);

  useEffect(() => {
    if (trackingDetails === true) {
      openSheet();
    }
    return () => {
      // closeSheet()
    };
  }, []);
  const [selectedDate, setSelectedDate] = useState(moment());

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewPosition, setviewPosition] = useState(0);
  const _spacing = 10;

  const changeMonth = (direction: any) => {
    setSelectedDate(prev => moment(prev).add(direction, 'months'));
  };

   const {
      control,
      handleSubmit,
      setValue,
      formState: {errors},
    } = useForm({
      defaultValues: {
       selectdate: '',
      
      },
    });
  
    const onSubmit = () => {
      // navigation.goBack();
    };
  

  const renderHeader = () => {
    return (
      <View style={[AppStyles.row, styles.header]}>
        <TouchableOpacity
          disabled={true}
          onPress={() => {
            changeMonth(-1);
            handleScrollToNext();
          }}>
          <GlobalIcon
            library="FontAwesome5"
            name="chevron-left"
            color={AppColors.black}
            size={hp(2.5)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={true}
          onPress={() => dispatch(setDriverHomeStatus(false))}>
          <Text style={styles.headerText}>{selectedDate.format('YYYY')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={true}
          onPress={() => {
            changeMonth(1);
            handleScrollToNext();
          }}>
          <GlobalIcon
            library="FontAwesome5"
            name="chevron-right"
            color={AppColors.black}
            size={hp(2.5)}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const ITEM_WIDTH = 100; // Width of each item

  const getItemLayout = (_, index) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  const handleScrollToNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < months.length) {
      flatListRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
        viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : _spacing,
        viewPosition,
      });
      setCurrentIndex(nextIndex);
    }
  };

  const renderMonthSwitcher = () => {
    const months = moment.monthsShort();
    return (
      <View style={AppStyles.rowBetween}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={currentIndex}
          ref={flatListRef}
          horizontal
          getItemLayout={getItemLayout}
          scrollEnabled
          data={months}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(moment().month(item))}
                style={
                  selectedDate.format('MMM') === item
                    ? styles.selectedMonthView
                    : {
                        paddingVertical: hp(1),
                        paddingHorizontal: hp(0.5),
                        marginHorizontal: hp(1),
                      }
                }>
                <Text
                  style={[
                    styles.monthText,
                    selectedDate.format('MMM') === item
                      ? styles.selectedMonthText
                      : null,
                  ]}>
                  {item}
                </Text>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        selectedDate.format('MMM') === item
                          ? AppColors.red
                          : AppColors.white,
                    },
                  ]}></View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  const renderDays = () => {
    const startOfWeek = selectedDate.clone().startOf('month');
    const monthss = [];
    const startOfMonth = selectedDate.clone().startOf('month');
    const daysInMonth = selectedDate.daysInMonth();

    for (let i = 0; i < daysInMonth; i++) {
      monthss.push(startOfMonth.clone().add(i, 'days'));
    }

    return monthss.map((day, index) => (
      <View
        style={[
          AppStyles.row,
          styles.dayContainer,
          {
            backgroundColor: AppColors.white,
            justifyContent: 'center',
            gap: wp(4),
            paddingHorizontal: 0,
            paddingBottom: monthss.length - 1 == index ? hp(5) : hp(1),
          },
        ]}
        key={day.format('D')}>
        <View style={styles.dateContainer}>
          <Text style={[styles.dayText, {color: AppColors.red}]}>
            {day.format('DD')}
          </Text>
          <Text style={styles.dayName}>
            {day.format('MMM').toLocaleUpperCase()}
          </Text>
        </View>

        <View
          style={[AppStyles.rowBetween, styles.tasksContainer, {gap: wp(2)}]}>
          {renderTaskBlocksForDay(day)}
        </View>
      </View>
    ));
  };

  const renderTaskBlocksForDay = (day: any) => {
    const tasks: any = getTasksForDay(day);
    const timeSlots = ['09:10 AM', '09:11 AM', '05 hrs', '04 hrs'];

    return timeSlots.map((timeSlot, index) => (
      <View key={index} style={[styles.timeSlotContainer, {gap: hp(0.3)}]}>
        {tasks[timeSlot] ? (
          <View style={[{}]}>
            <Text
              style={[
                AppStyles.title,
                {fontSize: size.s, color: AppColors.black},
              ]}>
              {tasks[timeSlot].task}
            </Text>
          </View>
        ) : (
          <View style={styles.emptyTaskBlock} />
        )}

        <Text
          style={[
            AppStyles.title,
            {fontSize: size.s, fontFamily: AppFonts.NunitoSansRegular},
          ]}>
          {timeSlot}
        </Text>
      </View>
    ));
  };

  const getTasksForDay = (day: string) => {
    return {
      '09:10 AM': {task: 'Check In', color: AppColors.red},
      '09:11 AM': {task: 'Check Out', color: AppColors.silverBlue},
      '05 hrs': {task: 'Work Time', color: AppColors.vividOrange},
      '04 hrs': {task: 'Short Time', color: AppColors.vividOrange},
    };
  };

  return (
    <View style={[styles.container, {flex: trackingDetails ? 1 : 0}]}>
      {renderHeader()}
      {renderMonthSwitcher()}

      {trackingDetails === true && (
        <View
          style={{
            marginTop: hp(1),

            // paddingTop: hp(2),
            // backgroundColor: '#EDEFF3',
            backgroundColor: AppColors.white,
          }}>
          <ScrollView
            style={[
              styles.daysContainer,
              {height: hp(53), alignSelf: 'center', paddingHorizontal: wp(1)},
            ]}>
            {renderDays()}
          </ScrollView>
          {timeOff && (
            <>
              <View style={{alignSelf: 'center'}}>
                <AppButton
                  onPress={openSheet2}
                  style={{
                    backgroundColor: AppColors.secondary,
                    width: wp(90),
                    marginTop: hp(2),
                  }}
                  title={'Request Time Off'}
                />
              </View>
            </>
          )}
          <AppBottomSheet
            bottomSheetModalRef={bottomSheetModalRef}
            enablePanDownToClose={false}
            // contentContainerStyle={{ backgroundColor: AppColors.red, borderRadius: 10, }}
            contentContainerStyle={{
              borderRadius: 10,
              paddingHorizontal: hp(5),
              backgroundColor: AppColors.red,
              marginHorizontal: hp(2),
            }}
            snapPoints={snapPoints}
            // ContainerStyle={{ marginHorizontal: wp(5), borderRadius: 10, elevation: 10, shadowColor: AppColors.transparent }}
            ContainerStyle={{borderRadius: 10}}
            backdropComponent={({style}) => <></>}>
            <View style={[AppStyles.center, {backgroundColor: AppColors.red}]}>
              <View style={{width: '95%', paddingTop: hp(2)}}>
                <Pressable style={styles.lastLine} onPress={openSheet}>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      styles.salaryBreakdownTitles,
                      styles.salaryHeading,
                    ]}>
                    Salary Details
                  </Text>
                  <GlobalIcon name={'arrowright'} library="AntDesign" />
                </Pressable>

                <View style={[styles.lastLine]}>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      styles.salaryBreakdownTitles,
                      styles.headings,
                    ]}>
                    Deduction
                  </Text>
                  {/* <Text style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>$160</Text> */}
                </View>
                <View style={styles.lastLine}>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    Deduction Hours
                  </Text>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    02 hr
                  </Text>
                </View>

                <View style={AppStyles.rowBetween}>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    Local Taxes
                  </Text>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    $12
                  </Text>
                </View>
                <View style={[styles.lastLine, styles.salaryBreakdownHeadings]}>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    Basic Pay (hourly)
                  </Text>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    $20
                  </Text>
                </View>
                <View style={[styles.lastLine, {marginBottom: hp(0.9)}]}>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      styles.salaryBreakdownTitles,
                      styles.headings,
                    ]}>
                    Total Deduction
                  </Text>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      styles.salaryBreakdownTitles,
                      styles.headings,
                    ]}>
                    $40
                  </Text>
                </View>
                <View style={[styles.lastLine]}>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      styles.salaryBreakdownTitles,
                      {fontFamily: AppFonts.NunitoSansMedium},
                    ]}>
                    Earning
                  </Text>
                  {/* <Text style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>$160</Text> */}
                </View>
                <View style={styles.lastLine}>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    Basic Pay
                  </Text>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    $20
                  </Text>
                </View>
                <View style={[styles.lastLine, styles.salaryBreakdownHeadings]}>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    Total Hours
                  </Text>
                  <Text
                    style={[AppStyles.titleHead, styles.salaryBreakdownTitles]}>
                    08
                  </Text>
                </View>
                <View style={styles.lastLine}>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      styles.salaryBreakdownTitles,
                      styles.headings,
                    ]}>
                    Net Salary
                  </Text>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      styles.salaryBreakdownTitles,
                      styles.headings,
                    ]}>
                    $160
                  </Text>
                </View>
              </View>

              <View
                style={[
                  AppStyles.rowBetween,
                  AppStyles.widthFullPercent,
                ]}></View>
            </View>
          </AppBottomSheet>

          <AppBottomSheet
            bottomSheetModalRef={bottomSheetModalRef2}
            snapPoints={snapPoints2}
            backdropComponent={({style}) => (
              <></>
              // <Pressable
              //     onPress={() => closeSheet()}
              //     style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}
              // />
            )}>
            <View
              style={{
                backgroundColor: AppColors.white,
                paddingHorizontal: hp(2),
                paddingVertical: hp(2),
                borderTopRightRadius: hp(2),
                borderTopLeftRadius: hp(2),
              }}>
              <Controller 
                name="selectdate"
                control={control}
                rules={{required: 'Date is required'}}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <CalendarPicker
                    selectedDate={value}
                    setDates={(date: string) => onChange(date)}
                    error={error?.message}
                    label="Request Time Off"
                  />
                )}
              />

              {/* <AppInput
                // multiline
                numberOfLines={1}
                container={{height: hp(6), borderRadius: hp(0.5)}}
                label="Request Time Off"
                placeholder="Select Date"
                labelStyle={{
                  marginBottom: hp(2),
                  fontFamily: AppFonts.NunitoSansBold,
                }}
                leftInnerIcon={
                  <View style={{top: 10}}>
                    <GlobalIcon
                      library="CustomIcon"
                      name="Group-2002"
                      color={AppColors.red}
                      size={hp(3)}
                    />
                  </View>
                }
                // error={error.reason}
              /> */}

              <AppInput
                multiline
                numberOfLines={7}
                container={{
                  height: hp(12),
                  borderRadius: hp(0.5),
                  marginBottom: hp(2),
                }}
                label="Reason"
                placeholder="Descripton"
                labelStyle={{
                  marginBottom: hp(2),
                  fontFamily: AppFonts.NunitoSansBold,
                }}
                // error={error.reason}
              />

              <View style={[AppStyles.rowBetween, {width: '100%'}]}>
                <AppButton
                  title="Cancel"
                  onPress={() => {
                    closeSheet2();
                  }}
                  style={styles.cancelButton}
                  titleStyle={{color: AppColors.textLightGrey}}
                />
                <AppButton
                  title="Submit"
                  onPress={() => {
                    closeSheet2();
                  }}
                  style={styles.submitButton}
                />
              </View>
            </View>
          </AppBottomSheet>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: AppColors.white,
  },
  header: {
    alignSelf: 'center',
    marginBottom: 10,
    gap: 30,
  },
  headerText: {
    fontSize: size.lg,
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.black,
  },
  monthText: {
    fontSize: size.md,
    padding: 5,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansBold,
  },
  selectedMonthText: {
    color: AppColors.red,
  },
  selectedMonthView: {
    backgroundColor: AppColors.lightRed,
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(0.8),
    borderRadius: 10,
    marginHorizontal: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotsRow: {
    marginBottom: 10,
    paddingRight: hp(2),
  },
  timeSlotText: {
    fontSize: fontSize(14),
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  daysContainer: {
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '100%',
    paddingVertical: hp(1),
    paddingHorizontal: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E9',
  },
  dateContainer: {
    borderRadius: 5,
    width: '12%',
    height: hp(6),
    elevation: 10,
    // marginLeft: wp(1),
    // borderWidth:1,
    backgroundColor: AppColors.white,
    // borderColor: AppColors.black,
    alignItems: 'center',
  },
  dayText: {
    fontSize: size.lg,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  dayName: {
    fontSize: size.s,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  tasksContainer: {
    width: '80%',
  },
  timeSlotContainer: {
    alignItems: 'flex-start',
    maxWidth: '25%',
    paddingVertical: hp(1.4),
    // backgroundColor: AppColors.white
  },
  taskBlock: {
    width: '100%',
    height: hp(3),
  },
  taskText: {
    fontSize: size.xs,
    color: AppColors.white,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  emptyTaskBlock: {
    width: '100%',
    height: hp(3),
    borderRadius: 5,
    backgroundColor: '#EDEFF3',
  },
  dot: {
    height: hp(1),
    width: hp(1),
    borderRadius: hp(1),
  },
  lastLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: hp(0),
    paddingVertical: hp(1.2),
    marginHorizontal: hp(0),
  },
  salaryBreakdownTitles: {
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansLight,
    color: AppColors.white,
  },
  salaryBreakdownHeadings: {
    width: '100%',
    borderBottomColor: AppColors.lightGrey,
    borderBottomWidth: 1,
    marginBottom: hp(1),
  },
  headings: {
    fontFamily: AppFonts.NunitoSansBold,
  },
  salaryHeading: {
    fontSize: size.xlg,
    fontFamily: AppFonts.NunitoSansBold,
  },
  cancelButton: {width: '35%', backgroundColor: AppColors.lightGrey},
  submitButton: {width: '60%', backgroundColor: AppColors.red},
});

export default DriverShiftInfo;
