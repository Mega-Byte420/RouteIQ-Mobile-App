import {StyleSheet} from 'react-native';
import {hp, screenHeight, screenWidth} from '../utils/constants';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {fontSize, size} from '../utils/responsiveFonts';

const AppStyles = StyleSheet.create({
  body: {
    paddingHorizontal: hp(2),
    backgroundColor: AppColors.veryLightGrey,
  },
  container: {
    flex: 1,
    paddingHorizontal: hp(2),
  },
  driverContainer: {
    flex: 1,
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(2),
  },

  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  halfFlex: {
    flex: 0.5,
  },
  flexBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
  },
  alignJustifyCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  widthFullPercent: {
    width: '100%',
  },
  screenWidthHeight: {
    width: screenWidth,
    height: screenHeight - hp(6),
  },
  titleHead: {
    fontFamily: AppFonts.NunitoSansBold,
    fontSize: size.xxvlg,
    color: AppColors.secondary,
  },
  subHeading: {
    fontFamily: AppFonts.NunitoSansRegular,
    fontSize: size.md,
    color: AppColors.secondary,
  },
  title: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    fontSize: size.md,
    color: AppColors.black,
  },
  subTitle: {
    fontFamily: AppFonts.NunitoSansMedium,
    fontSize: size.md,
    color: AppColors.taupeGray,
  },
  whiteTitle: {
    fontFamily: AppFonts.NunitoSansBold,
    fontSize: size.xlg,
    color: AppColors.white,
  },
  whiteSubTitle: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    fontSize: fontSize(14),
    color: AppColors.white,
  },
  halfWidth: {
    width: '50%',
  },
  widthHeightFullPercent: {
    width: '100%',
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  alarmIcon: {
    backgroundColor: AppColors.red,
    paddingVertical: hp(2),
    paddingHorizontal: hp(1.5),
    borderRadius: hp(1.8),
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default AppStyles;
