import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import moment from 'moment';
import GlobalIcon from './GlobalIcon';
import {AppColors} from '../utils/color';
import {hp, wp} from '../utils/constants';
import AppFonts from '../utils/appFonts';
import {fontSize, size} from '../utils/responsiveFonts';
import {useAppDispatch} from '../store/hooks';
import {setDriverHomeStatus} from '../store/user/userSlices';

const AppMonthlyCalendar = () => {
  const dispatch = useAppDispatch();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedDay, setSelectedDay] = useState(moment());
  const today = moment();

  const generateDaysInMonth = (date: any) => {
    const startOfMonth = date.clone().startOf('month');
    const endOfMonth = date.clone().endOf('month');
    const days = [];
    let current = startOfMonth.clone();

    while (current.isSameOrBefore(endOfMonth, 'day')) {
      days.push(current.clone());
      current.add(1, 'day');
    }

    return days;
  };

  const nextMonth = () => {
    const next = currentMonth.clone().add(1, 'months');
    setCurrentMonth(next);
    setSelectedDay(next.clone().startOf('month'));
  };

  const previousMonth = () => {
    const prev = currentMonth.clone().subtract(1, 'months');
    setCurrentMonth(prev);
    setSelectedDay(prev.clone().startOf('month'));
  };

  const daysOfMonth = generateDaysInMonth(currentMonth);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{padding: hp(1)}} onPress={previousMonth}>
          <GlobalIcon
            library="FontAwesome5"
            name="chevron-left"
            color={AppColors.black}
            size={hp(2.5)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setDriverHomeStatus(true))}>
          <Text style={styles.monthText}>
            {currentMonth.format('MMMM YYYY')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: hp(1)}} onPress={nextMonth}>
          <GlobalIcon
            library="FontAwesome5"
            name="chevron-right"
            color={AppColors.black}
            size={hp(2.5)}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={daysOfMonth}
        keyExtractor={(item) => item.format('YYYY-MM-DD')}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({item: day}) => {
          const isToday = day.isSame(today, 'day');
          const isSelected = day.isSame(selectedDay, 'day');

          return (
            <TouchableOpacity
              style={[
                styles.dayContainer,
                (isToday || isSelected) && styles.highlightedDayContainer,
              ]}
              onPress={() => setSelectedDay(day)}>
              <Text
                style={[
                  styles.dateText,
                  {
                    color: isSelected
                      ? AppColors.white
                      : isToday
                      ? AppColors.white
                      : AppColors.black,
                  },
                ]}>
                {day.format('DD')}
              </Text>
              <Text
                style={[
                  styles.dayText,
                  {
                    color: isSelected
                      ? AppColors.white
                      : isToday
                      ? AppColors.white
                      : AppColors.black,
                  },
                ]}>
                {day.format('ddd')}
              </Text>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: isSelected
                      ? AppColors.white
                      : isToday
                      ? AppColors.white
                      : AppColors.white,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: hp(1.5),
    paddingTop: hp(0.5),
    paddingBottom: hp(1.5),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.black,
  },
  scrollContainer: {
    paddingHorizontal: wp(2),
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(1),
    width: wp(14),
    height: hp(10),
    borderRadius: 8,
    gap: 4,
  },
  dateText: {
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
  },
  dayText: {
    fontSize: fontSize(14),
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  dot: {
    height: hp(1),
    width: hp(1),
    borderRadius: hp(1),
  },
  highlightedDayContainer: {
    backgroundColor: AppColors.red,
  },
});

export default AppMonthlyCalendar;
