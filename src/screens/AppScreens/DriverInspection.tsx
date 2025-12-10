import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import CircleCheckBoxIcon from '../../assets/svgs/CircleCheckBoxIcon';
import CircleUnCheckBoxIcon from '../../assets/svgs/CircleUnCheckBoxIcon';
import SquareCheckBoxIcon from '../../assets/svgs/SquareCheckBoxIcon';
import AppButton from '../../components/AppButton';
import AppCheckBox from '../../components/AppCheckBox';
import AppHeader from '../../components/AppHeader';
import AppSwitchButton from '../../components/AppSwitchButton';
import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp} from '../../utils/constants';
import {
  handleInspectionButtonTitle,
  handleSetFrontInspention,
} from '../../utils/functions';
import {front_inspection} from '../../utils/objects';
import {size} from '../../utils/responsiveFonts';
import {useNavigation} from '@react-navigation/native';
import SquareCheckedIcon from '../../assets/svgs/SquareCheckedIcon';
import { useAppDispatch } from '../../store/hooks';
import { setShowStartMileAgeSheet } from '../../store/user/userSlices';

const DriverInspection = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [index, setIndex] = useState(0);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isChecked, setIsChecked] = useState<any>({
    frontSide: false,
    passengerSide: false,
    backSide: false,
    driverSide: false,
    inCab: false,
  });
  const [isBoxChecked, setIsBoxChecked] = useState({
    hazardLight: false,
    headLight: false,
    workProperly: false,
  });

  const handleToggle = (newValue: boolean) => {
    setIsSwitchOn(newValue);
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.driverScreen}}>
      <AppHeader
        role="Driver"
        title="Inspections"
        enableBack={true}
        rightIcon={false}
        backFunctionEnable={index == 0 ? false : true}
        handleBack={() => setIndex(index - 1)}
      />
      <View style={[AppStyles.driverContainer, {paddingHorizontal: 0}]}>
        <View style={AppStyles.flexBetween}>
          <View style={AppStyles.flex}>
            {index == 0 && (
              <View
                style={[
                  AppStyles.flex,
                  AppStyles.alignJustifyCenter,
                  styles.container,
                ]}>
                <Image
                  style={styles.image}
                  source={require('../../assets/images/scan_image.png')}
                />
              </View>
            )}
            {index == 1 && (
              <View style={styles.container}>
                <Text style={[AppStyles.titleHead, {fontSize: size.slg}]}>
                  Move to FRONT SIDE
                </Text>
                <FlatList
                  data={front_inspection}
                  renderItem={({item}) => {
                    const removeSpace = item.replace(/\s+/g, '');
                    const smallFirstLetter =
                      removeSpace.charAt(0).toLowerCase() +
                      removeSpace.slice(1);
                    return (
                      <View style={{marginTop: hp(2)}}>
                        <AppCheckBox
                          isChecked={isChecked[smallFirstLetter]}
                          onClick={() =>
                            handleSetFrontInspention(
                              smallFirstLetter,
                              setIsChecked,
                            )
                          }
                          rightText={item}
                          checkedImage={<CircleCheckBoxIcon />}
                          unCheckedImage={<CircleUnCheckBoxIcon />}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            )}
            {index == 2 && (
              <View>
                <View style={[styles.container, {gap: 5}]}>
                  <Text style={[AppStyles.titleHead, {fontSize: size.slg}]}>
                    Lights and light covers
                  </Text>
                  <Text
                    style={[
                      AppStyles.title,
                      {fontFamily: AppFonts.NunitoSansMedium},
                    ]}>
                    Choose all issues that are present
                  </Text>
                </View>
                <View style={[styles.lightsContainer, {marginTop: hp(5)}]}>
                  <AppCheckBox
                    isChecked={isBoxChecked.hazardLight}
                    onClick={() =>
                      setIsBoxChecked(prev => ({
                        ...prev,
                        hazardLight: !prev.hazardLight,
                      }))
                    }
                    rightText="Hazard light is not working"
                    checkedImage={<SquareCheckedIcon />}
                    unCheckedImage={<SquareCheckBoxIcon />}
                  />
                </View>
                <View style={styles.lightsContainer}>
                  <AppCheckBox
                    isChecked={isBoxChecked.headLight}
                    onClick={() =>
                      setIsBoxChecked(prev => ({
                        ...prev,
                        headLight: !prev.headLight,
                      }))
                    }
                    rightText="Headlight is not working"
                    checkedImage={<SquareCheckedIcon />}
                    unCheckedImage={<SquareCheckBoxIcon />}
                  />
                </View>
                <View style={[styles.lightsContainer]}>
                  <AppCheckBox
                    isChecked={isBoxChecked.workProperly}
                    onClick={() =>
                      setIsBoxChecked(prev => ({
                        ...prev,
                        workProperly: !prev.workProperly,
                      }))
                    }
                    rightText="Lights of light covers damaged (leaving hole or void), missing, or not working properly"
                    checkedImage={<SquareCheckedIcon />}
                    unCheckedImage={<SquareCheckBoxIcon />}
                  />
                </View>
              </View>
            )}
            {index == 3 && (
              <View>
                <View style={{gap: 5, marginTop: hp(2)}}>
                  <Text
                    style={[
                      AppStyles.titleHead,
                      {fontSize: size.slg, paddingHorizontal: hp(2)},
                    ]}>
                    Inspection results
                  </Text>
                  <View style={[AppStyles.rowBetween, styles.reportContainer]}>
                    <Text style={AppStyles.subHeading}>Show full report</Text>
                    <AppSwitchButton
                      isOn={isSwitchOn}
                      onToggle={handleToggle}
                      onTitle=""
                      switchBackgroundColor={
                        isSwitchOn ? AppColors.red : '#e3e0e8'
                      }
                      switchBackgroundStyle={styles.switchStyle}
                      outputRange={[hp(0.2), hp(2.4)]}
                      circleStyle={styles.circleStyle}
                    />
                  </View>
                  <Text
                    style={[
                      AppStyles.subHeading,
                      {paddingHorizontal: hp(2), paddingVertical: hp(2)},
                    ]}>
                    You didn’t report any issues with the vehicle.
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View style={{paddingHorizontal: hp(2)}}>
            {index >= 1 && (
              <View
                style={[AppStyles.rowCenter, {gap: 10, marginBottom: hp(2)}]}>
                <View
                  style={[
                    styles.slider,
                    {
                      backgroundColor:
                        index == 1 || index == 2 || index == 3
                          ? AppColors.red
                          : AppColors.dimGray,
                    },
                  ]}></View>
                <View
                  style={[
                    styles.slider,
                    {
                      backgroundColor:
                        index == 2 || index == 3
                          ? AppColors.red
                          : AppColors.dimGray,
                    },
                  ]}></View>
                <View
                  style={[
                    styles.slider,
                    {
                      backgroundColor:
                        index == 3 ? AppColors.red : AppColors.dimGray,
                    },
                  ]}></View>
              </View>
            )}
            <AppButton
              title={handleInspectionButtonTitle(index)}
              style={{width: '100%'}}
              onPress={() => {
                if (index <= 2) {
                  setIndex(index + 1);
                } else {
                  navigation.navigate('DriverMapView');
                  dispatch(setShowStartMileAgeSheet(true))
                }
              }}
            />
          </View>
        </View>
      </View>
    </AppLayout>
  );
};

export default DriverInspection;

const styles = StyleSheet.create({
  image: {height: hp(50), width: '100%', resizeMode: 'contain'},
  slider: {
    height: hp(1),
    width: hp(6),
    backgroundColor: AppColors.red,
  },
  lightsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.dimGray,
    paddingBottom: hp(2),
    marginTop: hp(2),
    paddingHorizontal: hp(4),
  },
  container: {
    paddingHorizontal: hp(4),
    paddingTop: hp(2),
  },
  switchStyle: {
    backgroundColor: AppColors.red,
    width: hp(5.5),
    height: hp(3.5),
  },
  circleStyle: {
    width: hp(2.8),
    height: hp(2.8),
  },
  reportContainer: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.dimGray,
    paddingBottom: hp(2),
    paddingHorizontal: hp(2),
  },
});
