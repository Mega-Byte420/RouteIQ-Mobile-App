import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {hp} from '../utils/constants';
import {AppColors} from '../utils/color';
import AppStyles from '../styles/AppStyles';
import {size} from '../utils/responsiveFonts';
import AppFonts from '../utils/appFonts';
import GlobalIcon from './GlobalIcon';
import AppInput from './AppInput';
import {EmergencyContactProps} from '../types/types';

const EmergencyContact: React.FC<EmergencyContactProps> = ({item , index}) => {
  const [editDetails, setEditDetails] = useState(false);
  return (
    <View style={styles.container}>
      <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
        <Text
          style={[
            AppStyles.title,
            {fontSize: size.lg, fontFamily: AppFonts.NunitoSansBold},
          ]}>
          Emergency Contact {index + 1}:
        </Text>
        <Pressable onPress={() => setEditDetails(!editDetails)}>
          {editDetails ? (
            <Text style={[AppStyles.title, {color: AppColors.red}]}>Save</Text>
          ) : (
            <GlobalIcon
              library="FontelloIcon"
              name={'frame-(3)'}
              color={AppColors.red}
            />
          )}
        </Pressable>
      </View>
      <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
        <Text style={[AppStyles.title, AppStyles.halfWidth]}>Name</Text>

        {editDetails === false ? (
          <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
            Esther Howard
          </Text>
        ) : (
          <AppInput
            placeholder="Esther Howard"
            containerStyle={AppStyles.halfWidth}
            container={[styles.inputContainer, {height: 40}]}
            inputStyle={styles.inputStyle}
          />
        )}
      </View>
      <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
        <Text style={[AppStyles.title, AppStyles.halfWidth]}>Relation</Text>
        {editDetails === false ? (
          <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>Aunty</Text>
        ) : (
          <AppInput
            placeholder="Aunty"
            containerStyle={AppStyles.halfWidth}
            container={[styles.inputContainer, {height: 40}]}
            inputStyle={styles.inputStyle}
          />
        )}
      </View>

      <View style={[AppStyles.rowBetween, {marginBottom: hp(2)}]}>
        <Text style={[AppStyles.title, AppStyles.halfWidth]}>Phone Number</Text>
        {editDetails === false ? (
          <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
            +1-424-271-8337
          </Text>
        ) : (
          <AppInput
            placeholder="+1-424-271-8337"
            containerStyle={AppStyles.halfWidth}
            container={[styles.inputContainer, {height: 40}]}
            inputStyle={styles.inputStyle}
            keyboardType="number-pad"
          />
        )}
      </View>
    </View>
  );
};

export default EmergencyContact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    paddingHorizontal: hp(2),
    paddingVertical: hp(2),
    marginBottom: hp(2),
  },
  buttonTitle: {
    color: AppColors.black,
  },
  inputContainer: {
    borderColor: AppColors.graySuit,
    borderWidth: 1,
    paddingHorizontal: 2,
    borderRadius: 5,
  },
  inputStyle: {color: AppColors.graySuit},
});
