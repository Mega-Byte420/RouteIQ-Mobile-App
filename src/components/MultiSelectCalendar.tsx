// MultiSelectCalendar.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { hp } from '../utils/constants';

const MultiSelectCalendar = () => {
  const [selectedDates, setSelectedDates] = useState<{ [date: string]: any }>({});

  const handleDayPress = (day: { dateString: string }) => {
    const date = day.dateString;
    const newSelectedDates = { ...selectedDates };

    if (newSelectedDates[date]) {
      delete newSelectedDates[date]; // Deselect if already selected
    } else {
      newSelectedDates[date] = {
        selected: true,
        selectedColor: '#00adf5'
      };
    }

    setSelectedDates(newSelectedDates);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        markingType={'simple'}
      />
    </View>
  );
};

export default MultiSelectCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(5)
  }
});
