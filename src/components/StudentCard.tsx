import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { hp } from '../utils/constants';
import { AppColors } from '../utils/color';
import AppButton from './AppButton';
import { fontSize, size } from '../utils/responsiveFonts';
import AppStyles from '../styles/AppStyles';
import { StudentCardProps } from '../types/types';
import AppFonts from '../utils/appFonts';
import { truncateString } from '../utils/functions';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { setStudentDetail } from '../store/driver/driverSlices';
import { studentsData } from '../utils/DummyData';
import GlobalIcon from './GlobalIcon';

const StudentCard: React.FC<StudentCardProps> = ({ position, item, index }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'present' | 'absent' | null>(null);
  const lastIndex = studentsData.length - 1 === index;

  return (
    <View
      style={[
        styles.container,
        position === 'row' ? styles.rowContainer : styles.columnContainer,
      ]}>
      <View
        style={
          position === 'row' ? styles.imgContainer : styles.columnImgContainer
        }>
        <Image style={styles.img} source={item?.image} />
        {status === 'present' && (
          <View style={[styles.overlay, { backgroundColor: 'rgba(34, 139, 34, 0.4)' }]}>
            <AppButton disabled={true} title="Present" style={styles.overlayBtn} titleStyle={styles.presentText} />
          </View>
        )}
        
        {status === 'absent' && (
          <View style={[styles.overlay, { backgroundColor: 'rgba(255, 0, 0, 0.4)' }]}>
            <AppButton disabled={true} title="Absent" style={styles.overlayBtn} titleStyle={styles.absentText} />
          </View>
        )}
      </View>

      <View style={position === 'row' ? { height: hp(18), gap: 8, paddingTop: hp(0.5) } : { marginLeft: hp(1) }}>
        <View style={position === 'row' ? AppStyles.alignJustifyCenter : { bottom: 10 }}>
          <Text style={[AppStyles.titleHead, { fontSize: size.md }]}>
            {position === 'row' ? truncateString(item?.name, 12) : truncateString(item?.name, 20)}
          </Text>
          <Text style={[AppStyles.whiteSubTitle, { color: AppColors.dimGray }]}>{item?.age} years</Text>
        </View>

        <View style={position === 'row' ? styles.btnContainer : styles.columnBtnContainer}>
          <TouchableOpacity onPress={() => setStatus('present')} style={[styles.statusButton, { backgroundColor: AppColors.green }]}>
            <GlobalIcon library='FontAwesome' name='check' size={24} color={AppColors.white}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setStatus('absent')} style={[styles.statusButton, { backgroundColor: AppColors.red }]}>
          <GlobalIcon library='Entypo' name='cross' size={30} color={AppColors.white}/>
          </TouchableOpacity>
        </View>

        {/* Details Button */}
        <AppButton
          title="Details"
          style={position === 'row' ? styles.detailBtn : { ...styles.detailColumnBtn }}
          titleStyle={styles.detailTitle}
          onPress={() => {
            dispatch(setStudentDetail(item));
            navigation.navigate('DriverStudentDetail');
          }}
        />
      </View>
    </View>
  );
};

export default StudentCard;

const styles = StyleSheet.create({
  container: {
    marginTop: hp(2),
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  rowContainer: {
    width: '48%',
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
  },
  columnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(1.5),
  },
  imgContainer: {
    height: hp(13),
    width: '100%',
  },
  columnImgContainer: {
    height: hp(17),
    width: hp(14),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
  },
  overlayBtn: {
    backgroundColor: AppColors.white,
    borderRadius: 50,
    borderWidth: 1.5,
    height: hp(3.5),
    bottom: hp(0.5),
    width: hp(9),
  },
  presentText: {
    color: AppColors.green,
    fontSize: size.sl,
    fontFamily: AppFonts.NunitoSansBold,
  },
  absentText: {
    color: AppColors.red,
    fontSize: size.sl,
    fontFamily: AppFonts.NunitoSansBold,
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    gap: 3
  },
  columnBtnContainer: {
    width: '80%',
    top: hp(2),
    flexDirection: 'row',
    gap: 5,
  },
  statusButton: {
    width: '50%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  detailBtn: {
    width: '100%',
    height: hp(4),
    borderRadius: 5,
    backgroundColor: AppColors.transparent,
    borderWidth: 1,
    borderColor: AppColors.dimGray,
    marginTop: 8,
  },
  detailColumnBtn: {
    width: '82%',
    height: hp(4),
    borderRadius: 5,
    backgroundColor: AppColors.transparent,
    borderWidth: 1,
    borderColor: AppColors.dimGray,
    marginTop: hp(3)
  },
  detailTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: fontSize(14),
    color: AppColors.black,
  },
});
