import React from 'react';
import {StyleSheet} from 'react-native';
import CheckBox, {CheckBoxProps} from 'react-native-check-box';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';

const AppCheckBox: React.FC<CheckBoxProps> = ({
  rightText,
  checkedImage,
  unCheckedImage,
  onClick,
  isChecked,
  ...props
}) => {
  return (
    <CheckBox
      onClick={onClick}
      isChecked={isChecked}
      rightText={rightText}
      checkedImage={checkedImage}
      unCheckedImage={unCheckedImage}
      rightTextStyle={[
        AppStyles.title,
        {fontFamily: AppFonts.NunitoSansMedium},
      ]}
      {...props}
    />
  );
};

export default AppCheckBox;

const styles = StyleSheet.create({});
