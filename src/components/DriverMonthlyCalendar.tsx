import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import GlobalIcon from './GlobalIcon';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import {fontSize, size} from '../utils/responsiveFonts';
import TripCard from './TripCard';
import {tripData} from '../utils/DummyData';
import {useAppDispatch} from '../store/hooks';
import {setDriverHomeStatus} from '../store/user/userSlices';

const DriverMonthlyCalendar = () => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(moment()); 

  const changeMonth = (direction: any) => {
    setSelectedDate(prev => moment(prev).add(direction, 'months'));
  };

  const selectDate = (date: any) => {
    setSelectedDay(date);
  };

  const renderHeader = () => {
    return (
      <View style={[AppStyles.row, styles.header]}>
        <TouchableOpacity style={{padding: hp(1)}} onPress={() => changeMonth(-1)}>
          <GlobalIcon
            library="FontAwesome5"
            name="chevron-left"
            color={AppColors.black}
            size={hp(2.5)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setDriverHomeStatus(false))}>
          <Text style={styles.headerText}>{selectedDate.format('YYYY')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: hp(1)}} onPress={() => changeMonth(1)}>
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

  const renderMonthSwitcher = () => {
    const months = moment.monthsShort();
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.monthScrollContainer}
        style={styles.monthScrollView}
      >
        {months.map((month, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              const newDate = moment().year(selectedDate.year()).month(index);
              setSelectedDate(newDate);
            }}
            style={
              selectedDate.format('MMM') === month
                ? styles.selectedMonthView
                : styles.monthView
            }>
            <Text
              style={[
                styles.monthText,
                selectedDate.format('MMM') === month
                  ? styles.selectedMonthText
                  : null,
              ]}>
              {month}
            </Text>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    selectedDate.format('MMM') === month
                      ? AppColors.red
                      : AppColors.white,
                },
              ]}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderDays = () => {
    const startOfWeek = selectedDate.clone().startOf('isoWeek');
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.clone().add(i, 'days'));
    }

    return days.map((day, index) => (
      <View
        style={[
          AppStyles.row,
          styles.dayContainer,
          {backgroundColor: index % 2 == 0 ? '#E2E2E9' : AppColors.transparent},
        ]}
        key={day.format('D')}>
        <TouchableOpacity 
          style={[
            styles.dateContainer,
            selectedDay.isSame(day, 'day') && styles.selectedDateContainer
          ]}
          onPress={() => selectDate(day)}
        >
          <Text style={[
            styles.dayText,
            selectedDay.isSame(day, 'day') && styles.selectedDayText
          ]}>
            {day.format('DD')}
          </Text>
          <Text style={[
            styles.dayName,
            selectedDay.isSame(day, 'day') && styles.selectedDayText
          ]}>
            {day.format('ddd')}
          </Text>
        </TouchableOpacity>
        <View style={[AppStyles.rowBetween, styles.tasksContainer]}>
          {renderTaskBlocksForDay(day)}
        </View>
      </View>
    ));
  };

  const renderTaskBlocksForDay = (day: any) => {
    const tasks: any = getTasksForDay(day);
    const timeSlots = ['8:00AM', '11:00AM', '2:00PM', '5:00PM', '8:00PM'];

    return timeSlots.map((timeSlot, index) => (
      <View key={index} style={styles.timeSlotContainer}>
        {tasks[timeSlot] ? (
          <View
            style={[
              AppStyles.alignJustifyCenter,
              styles.taskBlock,
              {backgroundColor: tasks[timeSlot].color},
            ]}></View>
        ) : (
          <View style={styles.emptyTaskBlock} />
        )}
      </View>
    ));
  };

  const getTasksForDay = (day: string) => {
    return {
      '8:00AM': {task: '', color: AppColors.sageGreen},
      '11:00AM': {task: '', color: AppColors.silverBlue},
      '2:00PM': {task: '', color: AppColors.vividOrange},
      '5:00PM': {task: '', color: AppColors.vividOrange},
      '8:00PM': {task: '', color: AppColors.red},
    };
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderMonthSwitcher()}
      <ScrollView
        style={{
          marginTop: hp(2),
          paddingTop: hp(2),
          backgroundColor: '#EDEFF3',
        }}>
        <View style={AppStyles.rowBetween}>
          <View></View>
          <View
            style={[AppStyles.rowBetween, styles.timeSlotsRow, {width: '85%'}]}>
            {['8:00AM', '11:00AM', '2:00PM', '5:00PM', '8:00PM'].map(
              (time, index) => (
                <Text key={index} style={styles.timeSlotText}>
                  {time}
                </Text>
              ),
            )}
          </View>
        </View>
        <View style={styles.daysContainer}>
          {renderDays()}
          <View style={AppStyles.driverContainer}>
            <TripCard item={tripData[0]} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    backgroundColor: AppColors.white,
  },
  header: {
    alignSelf: 'center',
    // marginBottom: 10,
    gap: 30,
  },
  headerText: {
    fontSize: size.lg,
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.black,
  },
  monthScrollView: {
    maxHeight: hp(8),
  },
  monthScrollContainer: {
    paddingHorizontal: hp(2),
    alignItems: 'center',
  },
  monthView: {
    paddingVertical: hp(1),
    paddingHorizontal: hp(0.5),
    marginHorizontal: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: hp(6),
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
    minWidth: hp(6),
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
    width: '15%',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  selectedDateContainer: {
    backgroundColor: AppColors.red,
    borderRadius: 8,
    marginHorizontal: hp(1)
  },
  dayText: {
    fontSize: size.lg,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  dayName: {
    fontSize: fontSize(14),
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  selectedDayText: {
    color: AppColors.white,
  },
  tasksContainer: {
    width: '80%',
  },
  timeSlotContainer: {
    alignItems: 'center',
    width: '15%',
    paddingVertical: hp(2),
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
});

export default DriverMonthlyCalendar;