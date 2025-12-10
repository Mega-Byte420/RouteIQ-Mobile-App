import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import Icon from 'react-native-vector-icons/Feather'; // You can use FontAwesome, MaterialIcons, etc.

type Props = {
  selectedDate: string;
  setDates: (date: string) => void;
  error?: string;
  label?: string;
};

const CalendarPicker: React.FC<Props> = ({
  selectedDate,
  setDates,
  error,
  label,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date: Date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    setDates(formattedDate);
    setDatePickerVisibility(false);
  };

  return (
    <View style={{marginBottom: 16}}>
      {label && (
        <Text
          style={{
            marginBottom: 4,
            fontSize: 18,
            fontFamily: AppFonts.NunitoSansBold,
            color: AppColors.black,
            marginTop: hp(1),
          }}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setDatePickerVisibility(true)}
        style={{
          borderWidth: 1,
          borderColor: AppColors.black,
          borderRadius: 5,
          paddingVertical: 12,
          paddingHorizontal: 16,
          backgroundColor: AppColors.white,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 14,
            color: selectedDate ? AppColors.black : AppColors.silverBlue,
            fontFamily: AppFonts.NunitoSansRegular,
          }}>
          {selectedDate || 'Select date'}
        </Text>
        <Icon name="calendar" size={20} color={AppColors.red} />
      </TouchableOpacity>

      {error && <Text style={{color: 'red', marginTop: 4}}>{error}</Text>}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

export default CalendarPicker;
