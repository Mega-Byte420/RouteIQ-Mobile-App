import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import {size} from '../../utils/responsiveFonts';
import {AppColors} from '../../utils/color';
import {hp} from '../../utils/constants';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import AppButton from '../../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store/hooks';
import {setStudentAbsentModal} from '../../store/user/userSlices';

const AttendanceHistory = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const renderData = (type: any) => {
    return (
      <>
        {type == 'Absent' ? (
          <View
            style={[styles.container, {backgroundColor: AppColors.palePink}]}>
            <Text style={styles.title}>{type}</Text>
            <View style={styles.absentTitleContainer}>
              <Text style={styles.absentTitle}>Reason:</Text>
              <Text style={styles.absentSubTitle}>
                Due to a severe illness, Mark was unable to attend school and
                was under medical care.
              </Text>
            </View>
            <View style={[AppStyles.row, {gap: hp(1), marginTop: hp(1)}]}>
              <Text
                style={[
                  styles.subTitle,
                  {backgroundColor: AppColors.red, color: AppColors.white},
                ]}>
                8:00 AM
              </Text>
              <Text
                style={[
                  styles.subTitle,
                  {backgroundColor: AppColors.red, color: AppColors.white},
                ]}>
                Feb 25, 2024
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.title}>{type}</Text>
            <View style={[AppStyles.row, {gap: hp(1), marginTop: hp(1)}]}>
              <Text
                style={[
                  styles.subTitle,
                  type == 'Check In' || type == 'Check Out'
                    ? {backgroundColor: AppColors.green, color: AppColors.white}
                    : {backgroundColor: AppColors.yellow},
                ]}>
                8:00 AM
              </Text>
              <Text
                style={[
                  styles.subTitle,
                  type == 'Check In' || type == 'Check Out'
                    ? {backgroundColor: AppColors.green, color: AppColors.white}
                    : {backgroundColor: AppColors.yellow},
                ]}>
                Feb 25, 2024
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };
  return (
    <AppLayout>
      <AppHeader
        enableBack={true}
        title="Attendance History"
        rightIcon={false}
        titleStyle={{fontSize: size.xlg}}
      />
      <View
        style={[
          AppStyles.container,
          {backgroundColor: AppColors.offWhite, paddingTop: hp(2)},
        ]}>
        <AppButton
          title="Total 23 Days Absent"
          titleStyle={{color: AppColors.black}}
          style={[AppStyles.widthFullPercent, styles.button]}
          onPress={() => {
            navigation.navigate('HomeSreen');
            dispatch(setStudentAbsentModal(true));
          }}
        />
        {renderData('Absent')}
        {renderData('Absent')}
        {renderData('Absent')}
        {/* {renderData('Check Out - Pending')}
        {renderData('Check In')}
        {renderData('Check Out')}
        {renderData('Check In')} */}
      </View>
    </AppLayout>
  );
};

export default AttendanceHistory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    padding: hp(2),
    borderRadius: hp(1),
    marginVertical: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontFamily: AppFonts.NunitoSansExtraBold,
    color: AppColors.black,
    fontSize: size.md,
  },
  subTitle: {
    backgroundColor: AppColors.yellow,
    padding: hp(0.5),
    borderRadius: hp(1),
    color: AppColors.black,
    fontSize: size.sl,
    fontFamily: AppFonts.NunitoSansMedium,
  },
  absentTitle: {
    color: '#560b10',
    fontFamily: AppFonts.NunitoSansBold,
    marginBottom: hp(1),
  },
  absentSubTitle: {
    color: AppColors.lightBlack,
    fontFamily: AppFonts.NunitoSansMedium,
    fontSize: size.sl,
  },
  absentTitleContainer: {
    marginTop: hp(1),
  },
  button: {
    backgroundColor: AppColors.transparent,
    borderWidth: 2,
    borderColor: AppColors.black,
    marginBottom: hp(2),
  },
});
