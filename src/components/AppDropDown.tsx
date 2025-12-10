import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import {fontSize, size} from '../utils/responsiveFonts';

interface AppDropdownProps {
  label?: string;
  optional?: boolean;
  placeholder?: string;
  value?: string | string[];
  onChangeText?: (value: string | string[]) => void;
  style?: StyleProp<ViewStyle>;
  data?: any[];
  onConfirmSelectItem?: any;
  error?: string;
  labelContainer?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: any;
  labelType?: boolean;
  multiple?: boolean;
}

const AppDropdown: React.FC<AppDropdownProps> = ({
  label,
  optional = false,
  placeholder,
  value,
  onChangeText,
  style = {},
  data = [],
  onConfirmSelectItem,
  error,
  labelContainer,
  labelStyle,
  inputStyle,
  labelType = false,
  multiple = false,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <View style={[styles.labelContainer, labelContainer]}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {optional && <Text style={{color: 'red'}}>*</Text>}
          </Text>
        </View>
      )}
      <Dropdown
        iconStyle={{marginRight: hp(1)}}
        placeholderStyle={{
          fontFamily: AppFonts.InterLight,
        }}
        style={[styles.input, inputStyle]}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField={labelType ? 'label' : 'value'}
        placeholder={placeholder}
        multiple={multiple}
        value={value}
        onChange={onChangeText}
        selectedTextStyle={{color: AppColors.black}}
        showsVerticalScrollIndicator={false}
        onConfirmSelectItem={onConfirmSelectItem}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AppDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: hp(2),
  },
  labelContainer: {
    marginTop: hp(1),
  },
  label: {
    color: AppColors.black,
    fontSize: size.md,
    alignSelf: 'flex-start',
    fontFamily: AppFonts.NunitoSansBold,
  },
  input: {
    width: '100%',
    height: hp(5),
    color: AppColors.black,
    borderColor: AppColors.black,
    borderWidth: 1,
    backgroundColor: AppColors.white,
    fontSize: fontSize(12),
    fontFamily: AppFonts.NunitoSansRegular,
    borderRadius: 7,
    paddingLeft: 12,
    marginTop: hp(1),
  },
  error: {
    fontSize: size.sl,
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansMedium,
    paddingLeft: hp(0.2),
    paddingTop: hp(0.5),
  },
});
