import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppLayout from '../../layout/AppLayout';
import {AppColors} from '../../utils/color';
import AppHeader from '../../components/AppHeader';
import AppStyles from '../../styles/AppStyles';
import AlarmIcon from '../../assets/svgs/AlarmIcon';
import {hp} from '../../utils/constants';
import {fontSize, size} from '../../utils/responsiveFonts';
import {alertButtonText} from '../../utils/objects';
import GlobalIcon from '../../components/GlobalIcon';

const AlertScreen = () => {
  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.driverScreen}}>
      <AppHeader
        role="Driver"
        title="Alert"
        enableBack={true}
        rightIcon={true}
      />
      <View
        style={[AppStyles.driverContainer, {justifyContent: 'space-between'}]}>
        <View style={[AppStyles.halfFlex, AppStyles.center]}>
        <GlobalIcon library="FontelloIcon" name="vector" color={AppColors.red} size={hp(5)} />
          {/* <AlarmIcon height={hp(5)} width={hp(5)} color={AppColors.red} /> */}
          <View
            style={[
              AppStyles.alignJustifyCenter,
              styles.alertTextContainer,
              AppStyles.boxShadow,
            ]}>
            <Text
              style={[
                AppStyles.subHeading,
                {fontSize: fontSize(14), width: '70%', textAlign: 'center'},
              ]}>
              There is student name Mao che is vomiting in the bus.
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            data={alertButtonText}
            renderItem={({item}) => (
              <View style={[AppStyles.row, {marginBottom: hp(1.5)}]}>
                <Pressable
                  style={[AppStyles.alignJustifyCenter, styles.button]}>
                  <Text style={[AppStyles.whiteSubTitle, {fontSize: size.md}]}>
                    {item}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default AlertScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.charcoal,
    paddingVertical: hp(1.5),
    borderRadius: 50,
    paddingHorizontal: hp(2),
  },
  alertTextContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    width: '80%',
    height: hp(8),
    marginTop: hp(1),
  },
});
