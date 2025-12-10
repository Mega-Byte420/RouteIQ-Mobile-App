import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {size} from '../utils/responsiveFonts';
import GlobalIcon from './GlobalIcon';
import AppFonts from '../utils/appFonts';
import { AppColors } from '../utils/color';

interface AppInputProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  togglePasswordVisibility?: boolean;
  iconRight?: boolean;
  onValidation?: (isValid: boolean) => void;
  validationPattern?: RegExp;
  iconRightName?: any;
  libraryName?: any;
  iconColor?: any;
  rightInnerIcon?: React.ReactElement;
  container?: StyleProp<ViewStyle>;
  error?: string;
  leftInnerIcon?: any
}

const AppInput: React.FC<AppInputProps> = ({
  containerStyle,
  inputStyle,
  iconStyle,
  label,
  labelStyle,
  secureTextEntry,
  togglePasswordVisibility,
  iconRightName,
  iconColor,
  libraryName,
  iconRight,
  onValidation,
  validationPattern,
  multiline,
  rightInnerIcon,
  container,
  error,
  leftInnerIcon,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [value, setValue] = useState('');

  const handleToggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const handleTextChange = (text: string) => {
    setValue(text);
    if (onValidation && validationPattern) {
      const isValid = validationPattern.test(text);
      onValidation(isValid);
    }
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  return (
    <View style={[styles.outerContainer, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.container, container]}>
        {rightInnerIcon}
        <TextInput
          style={[styles.input, multiline && styles.multilineInput, inputStyle]}
          secureTextEntry={isSecure}
          onChangeText={handleTextChange}
          multiline={multiline}
          value={value}
          placeholderTextColor={AppColors.textGrey}
          selectionColor={AppColors.primary}
          {...props}
        />
        {togglePasswordVisibility && (
          <TouchableOpacity
            onPress={handleToggleSecureEntry}
            style={[styles.iconStyle, iconStyle]}>
            <GlobalIcon
              name={!isSecure ? 'eye' : 'eye-off'}
              library="Feather"
              color={AppColors.black}
            />
          </TouchableOpacity>
        )}
          {leftInnerIcon}
      </View>
      {error && <Text style={{color: AppColors.red}}>{error}</Text>}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 0,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: AppColors.inputColor,
    borderColor: AppColors.black
  },
  multilineInput: {
    height: 'auto',
    textAlignVertical: 'top',
  },
  input: {
    flex: 1,
    fontSize: size.sl,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  label: {
    marginBottom: 5,
    color: AppColors.black,
    fontSize: size.md,
    alignSelf: 'flex-start',
    fontFamily: AppFonts.NunitoSansBold,
  },
  iconStyle: {
    padding: 5,
  },
});
