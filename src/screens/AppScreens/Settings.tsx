import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import AppButton from '../../components/AppButton';
import AppHeader from '../../components/AppHeader';
import GlobalIcon from '../../components/GlobalIcon';
import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {AppColors} from '../../utils/color';
import {hp} from '../../utils/constants';
import {size} from '../../utils/responsiveFonts';
import GuardianIcon from '../../assets/svgs/GuardianIcon';
import {useAppDispatch} from '../../store/hooks';
import {saveToken, setLogout} from '../../store/user/userSlices';
import {Alert} from 'react-native';

export default function Settings() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets?.length
      ) {
        setProfileImageUri(response.assets[0].uri || null);
      }
    });
  };

  const settingItems = [
    {
      leftIcon: (
        <GlobalIcon
          library="FontelloIcon"
          name="account_circle"
          color={AppColors.red}
          size={hp(3)}
        />
      ),
      screen: 'ChildProfile',
      title: 'Child Profile',
      disabled: false,
      styleStatus: false,
    },
    {
      leftIcon: (
        <GlobalIcon
          library="FontelloIcon"
          name="domain_verification"
          color={AppColors.red}
          size={hp(3)}
        />
      ),
      screen: 'AttendanceHistory',
      title: 'Attendance History',
      disabled: false,
      styleStatus: false,
    },
    {
      leftIcon: <GuardianIcon />,
      screen: 'UpdateGuardianProfile',
      title: 'Contact 1',
      headerTitle: 'Contact 1',
      disabled: false,
      styleStatus: true,
    },
    {
      leftIcon: <GuardianIcon />,
      screen: 'UpdateGuardianProfile',
      title: 'Contact 2',
      headerTitle: 'Contact 2',
      disabled: false,
      styleStatus: true,
    },
    {
      leftIcon: (
        <GlobalIcon
          library="FontelloIcon"
          name="-icon-_lock"
          color={AppColors.red}
          size={hp(3)}
        />
      ),
      screen: 'ChangePassword',
      title: 'Change Password',
      disabled: false,
      styleStatus: false,
    },
    {
      leftIcon: (
        <GlobalIcon
          library="FontelloIcon"
          name="notifications"
          color={AppColors.red}
          size={hp(3)}
        />
      ),
      screen: 'ChildProfile',
      title: 'Push Notification',
      disabled: true,
      styleStatus: false,
    },
  ];

  return (
    <AppLayout>
      <AppHeader title="Settings" enableBack={true} rightIcon={false} />
      <View
        style={[AppStyles.container, {backgroundColor: AppColors.screenColor}]}>
        <TouchableOpacity onPress={openGallery}>
          <ImageBackground
            borderRadius={hp(15)}
            style={styles.profileImage}
            imageStyle={styles.image}
            source={
              profileImageUri
                ? {uri: profileImageUri}
                : require('../../assets/images/profile_image.webp')
            }>
            <View style={[AppStyles.alignJustifyCenter, styles.cameraIcon]}>
              <GlobalIcon
                library="FontelloIcon"
                name="group-183"
                color={AppColors.black}
                size={hp(3)}
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <View>
          {settingItems.map((item: any, index: number) => (
            <Pressable
              onPress={() =>
                item.screen == 'UpdateGuardianProfile'
                  ? navigation.navigate(item.screen, {title: item.headerTitle})
                  : navigation.navigate(item.screen)
              }
              disabled={item.disabled}
              key={index}
              style={[
                AppStyles.rowBetween,
                styles.itemContainer,
                item.styleStatus && {paddingVertical: hp(1.8)},
              ]}>
              <View style={[AppStyles.row, {top: hp(0.2)}]}>
                {item.leftIcon}
                <Text style={styles.title}>{item.title}</Text>
              </View>
              {item.title === 'Push Notification' ? (
                <Switch
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  trackColor={{false: '#767577', true: AppColors.red}}
                  thumbColor={isEnabled ? AppColors.white : '#f4f3f4'}
                  style={{transform: [{scale: 1.3}]}}
                />
              ) : (
                <GlobalIcon
                  library="Ionicons"
                  name="chevron-forward-outline"
                  color={AppColors.red}
                  size={hp(2.3)}
                />
              )}
            </Pressable>
          ))}
        </View>

        {/* <AppButton
          onPress={() => {
            dispatch(setLogout(true));
            dispatch(saveToken(null));
          }}
          title="Logout"
          style={styles.button}
        /> */}

        <AppButton
          title="Logout"
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Logout cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    dispatch(setLogout(true));
                    dispatch(saveToken(null));
                  },
                },
              ],
              {cancelable: true},
            );
          }}
          titleStyle={{fontSize: size.md}}
          style={styles.button}
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: AppColors.inputColor,
    paddingVertical: hp(1),
    borderRadius: hp(1.5),
    marginVertical: hp(1),
    paddingHorizontal: hp(1.5),
  },
  profileImage: {
    height: hp(18),
    width: hp(18),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: hp(16),
  },
  title: {
    fontSize: size.md,
    marginLeft: hp(1),
    fontFamily: AppFonts.NunitoSansSemiBold,
    color: AppColors.black,
    marginTop: hp(-0.7),
  },
  button: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: AppColors.black,
    position: 'absolute',
    bottom: hp(4),
  },
  cameraIcon: {
    borderColor: AppColors.black,
    borderWidth: 1.5,
    height: hp(5.2),
    width: hp(5.2),
    borderRadius: hp(8),
    backgroundColor: AppColors.white,
    paddingTop: hp(0.5),
    marginRight: hp(1),
  },
});
