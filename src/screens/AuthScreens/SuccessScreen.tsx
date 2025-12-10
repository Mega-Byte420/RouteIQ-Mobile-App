import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthLayout from '../../layout/AuthLayout';
import {ScrollView} from 'react-native-gesture-handler';
import SuccessIcon from '../../assets/svgs/SuccessIcon';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {size} from '../../utils/responsiveFonts';
import {hp} from '../../utils/constants';
import AppButton from '../../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import { useAppSelector } from '../../store/hooks';

const SuccessScreen = () => {
  const navigation = useNavigation();
  const type = useAppSelector(state => state.userSlices.forgotType);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AuthLayout>
        <View
          style={[
            AppStyles.alignJustifyCenter,
            {flex: 1, paddingHorizontal: hp(3)},
          ]}>
          <SuccessIcon />
          <View style={{marginVertical: hp(2)}}>
            <Text style={styles.heading}>Successfully</Text>
            <Text style={styles.subTitle}>
              Your {type} has been reset successfully
            </Text>
          </View>

          <AppButton
            title="Okay"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </AuthLayout>
    </ScrollView>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  heading: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    color: AppColors.red,
    fontSize: size.extraxlg,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    color: '#2C2F32',
    fontSize: size.md,
    textAlign: 'center',
  },
});
