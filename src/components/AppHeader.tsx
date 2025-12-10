import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import NotificationIcon from '../assets/svgs/NotificationIcon';
import AppStyles from '../styles/AppStyles';
import {AppHeaderProps} from '../types/types';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import {size} from '../utils/responsiveFonts';
import GlobalIcon from './GlobalIcon';
import AppSwitchButton from './AppSwitchButton';
import SelectDropdown from 'react-native-select-dropdown';
import {childDropDown} from '../utils/DummyData';
import { useAppDispatch } from '../store/hooks';
import { setSelectedChild } from '../store/user/userSlices';

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  greetTitle,
  enableBack,
  rightIcon = true,
  bookmarkIcon = false,
  onPressLeftIcon,
  onPressRightIcon,
  titleStyle,
  containerStyle,
  role = 'Parents',
  switchIcon = false,
  backFunctionEnable = false,
  handleBack,
  profile_image,
  createRightIcon,
}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const handleToggle = (newValue: boolean) => {
    setIsSwitchOn(newValue);
  };

  return (
    <>
      {role == 'Parents' && (
        <View style={[styles.mainContainer, containerStyle]}>
          {greetTitle && <Text style={styles.greetTitle}>{greetTitle}</Text>}
          <View style={AppStyles.rowBetween}>
            <View style={styles.iconContainer}>
              {!enableBack && (
                <Pressable
                  style={[styles.icon, {marginBottom: hp(-1)}]}
                  onPress={onPressLeftIcon}>
                  <GlobalIcon
                    library="FontelloIcon"
                    name="settings"
                    color={AppColors.white}
                    size={hp(3.5)}
                  />
                </Pressable>
              )}
              {enableBack && (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="chevron-back"
                    color={AppColors.white}
                    size={hp(3)}
                  />
                </Pressable>
              )}
            </View>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <View style={[styles.iconContainer, {alignItems: 'flex-end'}]}>
              {!bookmarkIcon && rightIcon && (
                <Pressable style={styles.icon} onPress={onPressRightIcon}>
                  <NotificationIcon />
                </Pressable>
              )}
              {!rightIcon && bookmarkIcon && (
                <Pressable style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="bookmarks"
                    color={AppColors.black}
                    size={hp(2.5)}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}

      {role == 'ParentsDropDown' && (
        <View style={[styles.mainContainer, containerStyle]}>
          {greetTitle && <Text style={styles.greetTitle}>{greetTitle}</Text>}
          <View style={AppStyles.rowBetween}>
            <View style={styles.iconContainer}>
              {!enableBack && (
                <Pressable
                  style={[styles.icon, {marginBottom: hp(-1)}]}
                  onPress={onPressLeftIcon}>
                  <GlobalIcon
                    library="FontelloIcon"
                    name="settings"
                    color={AppColors.white}
                    size={hp(3.5)}
                  />
                </Pressable>
              )}
              {enableBack && (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="chevron-back"
                    color={AppColors.white}
                    size={hp(3)}
                  />
                </Pressable>
              )}
            </View>
            <View>
              <SelectDropdown
                data={childDropDown}
                defaultValue={childDropDown[0]}
                onSelect={(selectedItem, index) => {
                  dispatch(setSelectedChild(selectedItem))
                  console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text
                        style={styles.dropdownButtonTxtStyle}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {(selectedItem && selectedItem.title) ||
                          'Select your child'}
                      </Text>
                      <GlobalIcon library="FontAwesome" name="caret-down" />
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && {backgroundColor: '#D2D9DF'}),
                      }}>
                      <Image style={styles.dropdownImage} source={item.image} />
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
            <View style={[styles.iconContainer, {alignItems: 'flex-end'}]}>
              {!bookmarkIcon && rightIcon && (
                <Pressable style={styles.icon} onPress={onPressRightIcon}>
                  <NotificationIcon />
                </Pressable>
              )}
              {!rightIcon && bookmarkIcon && (
                <Pressable style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="bookmarks"
                    color={AppColors.black}
                    size={hp(2.5)}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}

      {role == 'Driver' && (
        <View style={[styles.driverMainContainer, containerStyle]}>
          <View style={[AppStyles.rowBetween, {marginBottom: hp(-2)}]}>
            <View style={styles.iconContainer}>
              {enableBack && (
                <Pressable
                  onPress={() =>
                    backFunctionEnable ? handleBack() : navigation.goBack()
                  }
                  style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="chevron-back"
                    color={AppColors.white}
                    size={hp(3)}
                  />
                </Pressable>
              )}
              {profile_image && (
                <Pressable onPress={() => navigation.navigate('DriverProfile')} style={styles.icon}>
                  <Image
                    style={{height: hp(5), width: hp(5), borderRadius: 50}}
                    source={require('../assets/images/profile_image.webp')}
                  />
                </Pressable>
              )}
            </View>
            <View style={{width: '70%'}}>
              {title && !switchIcon && (
                <Text style={[styles.driverTitle, titleStyle]}>{title}</Text>
              )}
              {switchIcon && (
                <AppSwitchButton
                  isOn={isSwitchOn}
                  onToggle={handleToggle}
                  offTitle="Offline"
                  switchBackgroundColor={
                    isSwitchOn ? AppColors.black : '#d3d2d5'
                  }
                  circleBackgroundColor={
                    isSwitchOn ? AppColors.white : '#9f9ca3'
                  }
                  titleColor={isSwitchOn ? AppColors.white : AppColors.black}
                />
              )}
            </View>
            <View style={[styles.iconContainer, {alignItems: 'flex-end'}]}>
              {!bookmarkIcon && rightIcon && (
                <Pressable
                  style={styles.icon}
                  onPress={() => navigation.navigate('Notification')}>
                  <NotificationIcon />
                </Pressable>
              )}
              {!rightIcon && bookmarkIcon && (
                <Pressable style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="bookmarks"
                    color={AppColors.black}
                    size={hp(2.5)}
                  />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      )}

      {role == 'Create' && (
        <View style={[styles.mainContainer, containerStyle]}>
          {greetTitle && <Text style={styles.greetTitle}>{greetTitle}</Text>}
          <View style={AppStyles.rowBetween}>
            <View style={styles.iconContainer}>
              {!enableBack && (
                <Pressable
                  style={[styles.icon, {marginBottom: hp(-1)}]}
                  onPress={onPressLeftIcon}>
                  <GlobalIcon
                    library="FontelloIcon"
                    name="settings"
                    color={AppColors.white}
                    size={hp(3.5)}
                  />
                </Pressable>
              )}
              {enableBack && (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="chevron-back"
                    color={AppColors.white}
                    size={hp(3)}
                  />
                </Pressable>
              )}
            </View>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <View style={[styles.iconContainer, {alignItems: 'flex-end'}]}>
              {createRightIcon}
            </View>
          </View>
        </View>
      )}

      

      {role == 'Retail' && (
        <View style={[styles.driverMainContainer, containerStyle]}>
          {greetTitle && <Text style={styles.greetTitle}>{greetTitle}</Text>}
          <View style={AppStyles.rowBetween}>
            <View style={styles.iconContainer}>
              {!enableBack && (
                <Pressable
                  style={[styles.icon, {marginBottom: hp(-1)}]}
                  onPress={onPressLeftIcon}>
                  <GlobalIcon
                    library="FontelloIcon"
                    name="settings"
                    color={AppColors.white}
                    size={hp(3.5)}
                  />
                </Pressable>
              )}
              {enableBack && (
                <Pressable
                  onPress={() => navigation.goBack()}
                  style={styles.icon}>
                  <GlobalIcon
                    library="Ionicons"
                    name="chevron-back"
                    color={AppColors.white}
                    size={hp(3)}
                  />
                </Pressable>
              )}
            </View>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <View style={[styles.iconContainer, {alignItems: 'flex-end'}]}>
              {createRightIcon}
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginTop: hp(2.1),
    marginBottom: hp(2.1),
    backgroundColor: AppColors.black,
    paddingHorizontal: hp(1),
  },
  title: {
    width: '70%',
    textAlign: 'center',
    fontSize: size.vxlg,
    color: AppColors.white,
    fontFamily: AppFonts.NunitoSansBold,
  },
  iconContainer: {width: '15%'},
  icon: {padding: hp(1)},
  greetTitle: {
    textAlign: 'center',
    fontSize: size.md,
    color: AppColors.black,
  },
  driverMainContainer: {
    width: '100%',
    height: hp(11),
    backgroundColor: AppColors.red,
    paddingHorizontal: hp(1),
    justifyContent: 'center',
  },
  driverTitle: {
    textAlign: 'center',
    fontSize: size.lg,
    color: AppColors.white,
    fontFamily: AppFonts.NunitoSansBold,
  },

  dropdownButtonStyle: {
    width: '100%',
    backgroundColor: '#141516',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: size.lg,
    fontFamily: AppFonts.NunitoSansSemiBold,
    color: AppColors.white,
    textAlign: 'center',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginTop: hp(-2),
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownImage: {
    height: hp(4),
    width: hp(4),
    borderRadius: hp(4),
    marginRight: hp(1),
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: size.sl,
    fontFamily: AppFonts.NunitoSansSemiBold,
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
