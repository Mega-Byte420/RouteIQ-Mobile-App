import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { AppColors } from '../utils/color';
import { hp } from '../utils/constants';

interface AppCalendarProps {
  setDates?: any;
  error?: string;
  selectionDays?: string;
  dates?: string | string[] | Date[] | null,
}

const AppCalender: React.FC<AppCalendarProps> = ({
  setDates,
  error,
  selectionDays,
}) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [multiSelectedDates, setMultiSelectedDates] = useState<any>({});
  const today = new Date().toISOString().split('T')[0];
  const red = AppColors.red;

  const onDayPress = (day: any) => {
    const dateString = day.dateString;

    if (!startDate || (startDate && endDate)) {
      setStartDate(dateString);
      setEndDate(null);
      setMarkedDates({
        [dateString]: {
          startingDay: true,
          endingDay: true,
          color: red,
          textColor: 'white',
        },
      });
    } else {
      let marked: any = {};
      let [start, end] = [startDate, dateString].sort();
      let current = new Date(start);
      const lastDate = new Date(end);

      while (current <= lastDate) {
        const key = current.toISOString().split('T')[0];
        marked[key] = {
          color: red,
          textColor: 'white',
          startingDay: key === start,
          endingDay: key === end,
        };
        current.setDate(current.getDate() + 1);
      }

      setEndDate(dateString);
      setMarkedDates(marked);
    }
  };

  const onOneDayPress = (day: any) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    setDates && setDates(dateString);
  };

  const onMultidaysDayPress = (day: any) => {
    const dateString = day.dateString;
    const updatedDates = { ...multiSelectedDates };

    if (updatedDates[dateString]) {
      delete updatedDates[dateString];
    } else {
      updatedDates[dateString] = {
        customStyles: {
          container: {
            backgroundColor: red,
          },
          text: {
            color: 'white',
          },
        },
      };
    }

    setMultiSelectedDates(updatedDates);
    const selectedKeys = Object.keys(updatedDates);
    setDates && setDates(selectedKeys);
  };

  useEffect(() => {
    if (selectionDays === 'All Week' && startDate && endDate) {
      setDates && setDates([startDate, endDate]);
    } else if (selectionDays === 'Multi Days') {
      const selectedKeys = Object.keys(multiSelectedDates);
      setDates && setDates(selectedKeys);
    } else if (selectedDate) {
      setDates && setDates(selectedDate);
    }
  }, [startDate, endDate, selectedDate, selectionDays, multiSelectedDates]);

  const getMarkingType = () => {
    if (selectionDays === 'All Week') return 'period';
    if (selectionDays === 'Multi Days') return 'custom';
    return 'period';
  };

  const getMarkedDates = () => {
    if (selectionDays === 'All Week') return markedDates;
    if (selectionDays === 'Multi Days') return multiSelectedDates;
    if (selectedDate) {
      return {
        [selectedDate]: {
          startingDay: true,
          endingDay: true,
          color: red,
          textColor: 'white',
        },
      };
    }
    return {};
  };

  const getOnDayPressHandler = () => {
    if (selectionDays === 'All Week') return onDayPress;
    if (selectionDays === 'Multi Days') return onMultidaysDayPress;
    return onOneDayPress;
  };

  return (
    <>
      <Calendar
        style={styles.calendar}
        headerStyle={styles.headerStyle}
        current={Date()}
        minDate={today}
        maxDate={'2030-12-31'}
        onDayPress={getOnDayPressHandler()}
        markingType={getMarkingType()}
        markedDates={getMarkedDates()}
        hideExtraDays
        theme={{
          calendarBackground: 'white',
          textSectionTitleColor: '#000',
          monthTextColor: '#000',
          arrowColor: '#000',
          textDayFontSize: 12,
          textMonthFontSize: 15,
          textDayHeaderFontSize: 12,
        }}
      />
      {error && <Text style={{ color: AppColors.red }}>{error}</Text>}
    </>
  );
};

export default AppCalender;

const styles = StyleSheet.create({
  calendar: {
    margin: 0,
    marginBottom: hp(2),
  },
  headerStyle: {
    backgroundColor: AppColors.white,
    width: '100%',
  },
});
