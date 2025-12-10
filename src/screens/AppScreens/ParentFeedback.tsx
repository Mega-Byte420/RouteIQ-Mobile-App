import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/AppButton';
import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';
import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import {AppColors} from '../../utils/color';
import {hp} from '../../utils/constants';
import AppModal from '../../components/AppModal';
import {useNavigation} from '@react-navigation/native';
import AppCheckBox from '../../components/AppCheckBox';
import {size} from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';
import {Controller, useForm} from 'react-hook-form';
import CalendarPicker from '../../components/CalendarPicker';

const ParentFeedback = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [selectedCheckBox, setSelectedCheckBox] = useState<number | null>(null);

  // const handleSubmit = () => {
  //   setVisible(true);
  //   setTimeout(() => {
  //     setVisible(false);
  //     navigation.navigate('HomeSreen');
  //   }, 2000);
  // };

  

  const [selectedItems, setSelectedItems] = useState<number[]>([]); // allow multiple selections

  const checkboxItems = [
    {id: 1, label: 'Driver'},
    {id: 2, label: 'School'},
    {id: 3, label: 'Bus Terminal'},
    {id: 4, label: 'All'},
  ];

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      feedback: '',
      date: '',
    },
  });

  const onSubmit = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      navigation.navigate('HomeSreen');
    }, 2000);
  };

  // const handleCheckBox = (index: number) => {
  //   if (selectedCheckBox == index) {
  //     setSelectedCheckBox(null);
  //   } else {
  //     setSelectedCheckBox(index);
  //   }
  // };

  const handleCheckBox = (id: number) => {
    if (selectedItems.includes(id)) {
      // if already selected, remove it
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      // else add it
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <AppLayout>
      <AppHeader enableBack={true} title="Parent Feedback" rightIcon={false} />
      <View style={[AppStyles.container, styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Controller
              name="date"
              control={control}
              rules={{required: 'Date is required'}}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CalendarPicker
                  selectedDate={value}
                  setDates={(date: string) => onChange(date)}
                  error={error?.message}
                  label="Select Date"
                />
              )}
            />
            {/* <AppInput label="Select Date" placeholder="Micky Snow" /> */}

            <AppInput label="Bus Number (Optional)" placeholder="KBA-2024" />
            <AppInput label="Driver Name" placeholder="Driver Name" />
            <View style={styles.sendToContainer}>
              <Text style={styles.label}>Send To</Text>
              {/* <View style={styles.checkBoxContainer}>
                <AppCheckBox
                  isChecked={selectedCheckBox == 1}
                  onClick={() => handleCheckBox(1)}
                  rightText="Driver"
                  uncheckedCheckBoxColor={AppColors.dimGray}
                />
                <AppCheckBox
                  isChecked={selectedCheckBox == 2}
                  onClick={() => handleCheckBox(2)}
                  rightText="School"
                  uncheckedCheckBoxColor={AppColors.dimGray}
                />
                <AppCheckBox
                  isChecked={selectedCheckBox == 3}
                  onClick={() => handleCheckBox(3)}
                  rightText="Bus Terminal"
                  uncheckedCheckBoxColor={AppColors.dimGray}
                />
                <AppCheckBox
                  isChecked={selectedCheckBox == 4}
                  onClick={() => handleCheckBox(4)}
                  rightText="All"
                  uncheckedCheckBoxColor={AppColors.dimGray}
                />
              </View> */}
              <View style={styles.checkBoxContainer}>
                {checkboxItems.map(item => (
                  <AppCheckBox
                    key={item.id}
                    isChecked={selectedItems.includes(item.id)}
                    onClick={() => handleCheckBox(item.id)}
                    rightText={item.label}
                    uncheckedCheckBoxColor={AppColors.dimGray}
                  />
                ))}
              </View>
            </View>
            <Controller
              name="feedback"
              control={control}
              rules={{required: 'Feedback is required'}}
              render={({field: {onChange, value}}) => (
                <AppInput
                  label="Feedback"
                  placeholder="Description"
                  multiline={true}
                  value={value}
                  onChangeText={onChange}
                  inputStyle={styles.inputStyle}
                  error={errors.feedback?.message}
                />
              )}
            />
            {/* <AppInput
              label="Feedback"
              placeholder="Description"
              multiline={true}
              inputStyle={styles.inputStyle}
            /> */}
          </View>
          <AppButton
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          />
          <AppButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={styles.button}
          />
        </ScrollView>
      </View>

      <AppModal visible={visible} setVisible={setVisible} />
    </AppLayout>
  );
};

export default ParentFeedback;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    paddingTop: hp(2),
    justifyContent: 'space-between',
    paddingBottom: hp(2),
  },
  inputStyle: {
    minHeight: hp(18),
    maxHeight: hp(20),
  },
  button: {backgroundColor: AppColors.black, width: '100%'},
  label: {
    marginBottom: 5,
    color: AppColors.black,
    fontSize: size.md,
    alignSelf: 'flex-start',
    fontFamily: AppFonts.NunitoSansBold,
  },
  sendToContainer: {
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  checkBoxContainer: {
    marginLeft: hp(1),
    gap: 5,
  },
});
