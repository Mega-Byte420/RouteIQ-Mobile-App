import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  Touchable,
} from 'react-native';
import React from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import {AppColors} from '../../utils/color';
import AppWeeklyCalendar from '../../components/AppWeeklyCalendar';
import DriverMonthlyCalendar from '../../components/DriverMonthlyCalendar';
import AppCalendar from '../../components/AppCalendar';
import DriverShiftInfo from '../../components/DriverShiftInfo';
import {hp, wp} from '../../utils/constants';
import AppStyles from '../../styles/AppStyles';
import {size} from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function DriverShiftTracking() {
  const navigation = useNavigation();
  const [showPay, setShowPay] = React.useState(false);

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.white}}>
      <AppHeader
        role="Driver"
        title={'Shift Tracking'}
        enableBack={true}
        rightIcon={false}
      />

      <DriverShiftInfo trackingDetails={false} />

      {/* <ScrollView> */}

      <ImageBackground
        source={require('../../assets/images/pinkBgRound.png')}
        style={styles.pinkBgContainer}>
        <Image
          source={require('../../assets/images/profile_image.webp')}
          resizeMode="cover"
          style={styles.imgStyles}
        />
      </ImageBackground>

      <View style={styles.OccupationDetailsContainer}>
        <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
          MARK TOMMAY
        </Text>
        <Text style={[AppStyles.title, {fontSize: size.default}]}>
          Van Driver
        </Text>
        {/* <Text style={[AppStyles.title, {fontSize: size.default}]}>
          Basic Pay: Hourly $20 <Text style={styles.hideText} onPress={()=>navigation.navigate('DriverShiftTrackingDetails')}>Hide</Text>
        </Text> */}
        {showPay ? (
          <Text style={[AppStyles.title, {fontSize: size.default}]}>
            Basic Pay: Hourly $20{' '}
            <Text style={styles.hideText} onPress={() => setShowPay(false)}>
              Hide
            </Text>
          </Text>
        ) : (
          <Text style={[AppStyles.title, {fontSize: size.default}]}>
            Basic Pay: {'\u2022\u2022\u2022\u2022\u2022'}{' '}
            <Text style={styles.hideText} onPress={() => setShowPay(true)}>
              Show
            </Text>
          </Text>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('DriverShiftTrackingDetails')}
          activeOpacity={0.8}>
          <Text
            style={[
              AppStyles.title,
              {
                fontSize: size.md,
                color: AppColors.red,
                textDecorationLine: 'underline',
                textDecorationColor: AppColors.red,
              },
            ]}>
            View Details
          </Text>
        </TouchableOpacity>

        <View style={styles.allInfoOfDays}>
          <View style={styles.daysInfoContainer}>
            <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
              15 Days
            </Text>
            <Text style={[AppStyles.title, {fontSize: size.xs}]}>Present</Text>
          </View>

          <View style={styles.daysInfoContainer}>
            <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
              01 Days
            </Text>
            <Text style={[AppStyles.title, {fontSize: size.xs}]}>Absent</Text>
          </View>

          <View style={styles.daysInfoContainer}>
            <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
              03 Days
            </Text>
            <Text style={[AppStyles.title, {fontSize: size.xs}]}>Holiday</Text>
          </View>

          <View style={styles.daysInfoContainer}>
            <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
              14 Days
            </Text>
            <Text style={[AppStyles.title, {fontSize: size.xs}]}>
              Total Hours
            </Text>
          </View>

          <View style={styles.daysInfoContainer}>
            <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
              03 Days
            </Text>
            <Text style={[AppStyles.title, {fontSize: size.xs}]}>Leaves</Text>
          </View>

          <View style={styles.daysInfoContainer}>
            <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
              22 Days
            </Text>
            <Text style={[AppStyles.title, {fontSize: size.xs}]}>
              Working Days
            </Text>
          </View>
        </View>

        <View style={styles.lastLine}>
          <Text
            style={[
              AppStyles.titleHead,
              {fontSize: size.lg, fontFamily: AppFonts.NunitoSansExtraBold},
            ]}>
            Net Pay
          </Text>
          <Text
            style={[
              AppStyles.titleHead,
              {fontSize: size.lg, fontFamily: AppFonts.NunitoSansExtraBold},
            ]}>
            $160
          </Text>
        </View>
      </View>

      {/* </ScrollView> */}
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  imgStyles: {
    width: hp(18),
    height: hp(18),
    borderRadius: 100,
  },
  pinkBgContainer: {
    width: hp(26),
    height: hp(26),
    alignSelf: 'center',
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },

  OccupationDetailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: hp(0.5),
    backgroundColor: AppColors.white,
    position: 'relative',
    top: hp(-8),
    // borderRadius: 1000,
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 1000,
    // width: '50%',
    // width: hp(27),
    // height: hp(26),
    // height: '40%',
    alignSelf: 'center',
    paddingTop: hp(3.5),
  },
  daysInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // width: hp(13),
    height: hp(10.2),
    padding: hp(2),
    // paddingVertical: hp(2),
    elevation: 10,
    borderLeftWidth: 5,
    borderColor: AppColors.red,
    shadowColor: AppColors.gradientGrey,
    backgroundColor: AppColors.white,
    borderRadius: 15,
    gap: hp(0.5),
  },
  allInfoOfDays: {
    marginTop: hp(4),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
    // borderColor: AppColors.black,
  },
  lastLine: {
    width: '90%',
    marginTop: hp(2),
    marginHorizontal: hp(0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderTopColor: AppColors.lightGrey,
    borderTopWidth: 1,
  },
  hideText: {
    fontSize: size.sl,
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.red,
  },
});
