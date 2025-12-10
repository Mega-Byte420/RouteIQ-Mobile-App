import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppStyles from '../styles/AppStyles';
import {size} from '../utils/responsiveFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import AppCheckBox from './AppCheckBox';
import GlobalIcon from './GlobalIcon';
import {CleaningCardProps} from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { setMapViewRouteBackOn } from '../store/user/userSlices';

const CleaningCard: React.FC<CleaningCardProps> = ({mileage = false}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(true);
  return (
    <Pressable onPress={() => {if(!mileage) {dispatch(setMapViewRouteBackOn('DriverMaintenanceScreen')); navigation.navigate('DriverInspection')}}} style={styles.container}>
      <View style={AppStyles.rowBetween}>
        <View>
          <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
            Bus no: KGL408
          </Text>
          <Text style={[AppStyles.title, {fontSize: size.s}]}>
            8:10 AM 31/AUG/24{' '}
          </Text>
        </View>
        {!mileage && <View style={styles.button}>
          <Text style={[AppStyles.title, {fontSize: size.md}]}>Upcoming</Text>
        </View>}
      </View>
      {mileage ? (
        <View style={{gap: 5, marginTop: hp(2)}}>
          <Text style={[AppStyles.subTitle, {color: AppColors.black}]}>
            Start Mileage: 256895{' '}
          </Text>
          <Text style={[AppStyles.subTitle, {color: AppColors.black}]}>
            End Mileage: 256895{' '}
          </Text>
        </View>
      ) : (
        <View style={{gap: 10, marginTop: hp(2)}}>
          <AppCheckBox
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            rightText="Interior"
            unCheckedImage={<View style={styles.checkContainer}></View>}
            checkedImage={
              <View style={styles.checkContainer}>
                <GlobalIcon
                  library="Feather"
                  name="check"
                  color={AppColors.green}
                  size={hp(2)}
                />
              </View>
            }
          />
          <AppCheckBox
          
            isChecked={!isChecked}
            onClick={() => setIsChecked(!isChecked)}
            rightText="Exterior"
            unCheckedImage={<View style={styles.checkContainer}></View>}
            // rightTextStyle={{}}
            checkedImage={
              <View style={styles.checkContainer}>
                <GlobalIcon
                  library="Feather"
                  name="check"
                  color={AppColors.green}
                  size={hp(2)}
                />
              </View>
            }
          />
        </View>
      )}
    </Pressable>
  );
};

export default CleaningCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    paddingVertical: hp(2),
    paddingHorizontal: hp(3),
    borderRadius: 15,
  },
  button: {
    backgroundColor: AppColors.yellow,
    paddingHorizontal: hp(2),
    paddingVertical: hp(1),
    borderRadius: 10,
  },
  checkContainer: {
    height: hp(2.5),
    width: hp(2.5),
    borderWidth: 2,
    borderColor: AppColors.grey,
    borderRadius: 5,
  },
});
