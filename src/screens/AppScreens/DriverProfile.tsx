import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppColors} from '../../utils/color';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import {hp, screenHeight, screenWidth, wp} from '../../utils/constants';
import {size} from '../../utils/responsiveFonts';
import {useNavigation} from '@react-navigation/native';
import GlobalIcon from '../../components/GlobalIcon';
import AppButton from '../../components/AppButton';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {saveToken, setLogout} from '../../store/user/userSlices';
import {Alert} from 'react-native';

const DriverProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const role = useAppSelector(state => state.userSlices.role);

  const settingItems = [
    {title: 'Profile Info', icon: 'group-2022'},
    {title: 'Emergency Contact', icon: 'group-2019'},
    {title: 'Qualification', icon: 'group-2020'},
    {title: 'Certification', icon: 'group-2021'},
    {title: 'Medical Record', icon: 'group-289239', subTitle: ' (Optional)'},
    {title: 'History', icon: 'group-2023'},
    {title: 'Incident', icon: 'group-2024'},
    {title: 'Shift Tracking', icon: 'group-2025'},
    {title: 'Fuel Code', icon: 'fuel', library: 'MaterialCommunityIcons'},
    {title: 'Account No', icon: 'lock'},
    {title: 'Change Password', icon: 'lock'},
  ];

  // Role-based filtering
  const filteredSettingItems =
    role === 'Retail'
      ? settingItems.filter(
          item => item.title === 'Profile Info' || item.title === 'History',
        )
      : settingItems;

  const handleRoute = (name: string) => {
    if (name === 'History') {
      if (role === 'Driver') {
        navigation.navigate('DriverHistory');
      } else {
        navigation.navigate('RetailHistory');
      }
      return;
    }

    const routes = {
      'Profile Info':
        role === 'Driver' ? 'DriverProfileInfo' : 'RetailProfileInfo',
      'Emergency Contact': 'DriverEmergencyContact',
      Qualification: 'DriverQualifications',
      Certification: 'DriverCertification',
      'Change Password': 'DriverChangePassword',
      'Medical Record': 'DriverMedicalRecord',
      Incident: 'DriverIncident',
      'Fuel Code': 'FuelCodeScreen',
      'Account No': 'DriverAccountNo',
      'Shift Tracking': 'DriverShiftTracking',
    };

    if (routes[name]) {
      navigation.navigate(routes[name]);
    }
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.profileBg}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{height: screenHeight}}>
        <ImageBackground
          style={styles.headerImage}
          source={require('../../assets/images/redCurvedBorderBg.png')}>
          <AppHeader
            role="Driver"
            title="Profile"
            enableBack={false}
            rightIcon={false}
            containerStyle={{height: hp(9)}}
          />
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require('../../assets/images/profile_image.webp')}
            />
          </View>

          <Text style={[AppStyles.subHeading, styles.userName]}>
            Mark Tommay
          </Text>

          {role === 'Driver' && (
            <View style={[AppStyles.rowBetween, styles.headerBottomContainer]}>
              <View style={styles.headerTitle}>
                <Text style={styles.headerSubTitle}>Employee ID:</Text>
                <Text style={[AppStyles.subHeading, styles.whiteText]}>
                  B456788
                </Text>
              </View>
              <View style={styles.headerTitle}>
                <Text style={[styles.headerSubTitle, styles.textRight]}>
                  Status:
                </Text>
                <Text style={[AppStyles.subHeading, styles.whiteText]}>
                  Part Time
                </Text>
              </View>
            </View>
          )}

          <View
            style={[
              styles.mainItemsContainer,
              role === 'Retail' && {marginTop: hp(15)},
            ]}>
            {filteredSettingItems.map((item, index) => (
              <Pressable
                onPress={() => handleRoute(item.title)}
                key={index}
                style={[AppStyles.rowBetween, styles.itemContainer]}>
                <View style={[AppStyles.row]}>
                  <GlobalIcon
                    library={item.library || 'FontelloIcon'}
                    name={item.icon}
                    color={AppColors.red}
                    size={hp(2.5)}
                  />
                  <Text style={[AppStyles.title, styles.itemTitle]}>
                    {item.title}
                    {item.subTitle && (
                      <Text style={{color: AppColors.red}}>
                        {item.subTitle}
                      </Text>
                    )}
                  </Text>
                </View>
                <GlobalIcon
                  library="Entypo"
                  name="chevron-small-right"
                  color={AppColors.red}
                  size={hp(3)}
                />
              </Pressable>
            ))}
          </View>

          {/* <AppButton
            title="Logout"
            onPress={() => {
              dispatch(setLogout(true));
              dispatch(saveToken(null));
            }}
            style={[
              styles.logoutButton,
              role === 'Retail' && {
                marginTop: hp(35),
                backgroundColor: AppColors.red,
              },
            ]}
            titleStyle={{fontSize: size.md}}
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
            style={[
              styles.logoutButton,
              role === 'Retail' && {
                marginTop: hp(35),
                backgroundColor: AppColors.red,
              },
            ]}
            titleStyle={{fontSize: size.md}}
          />
        </ImageBackground>
      </ScrollView>
    </AppLayout>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({
  mainItemsContainer: {
    paddingHorizontal: wp(6),
    marginHorizontal: wp(4),
    borderRadius: hp(2),
    backgroundColor: AppColors.white,
    top: hp(-1.3),
    borderColor: AppColors.lightGrey,
    borderWidth: 1,
    elevation: 5,
  },
  itemContainer: {
    backgroundColor: AppColors.white,
    paddingHorizontal: hp(1),
    paddingVertical: hp(1.2),
  },
  itemTitle: {
    fontSize: size.default,
    marginLeft: hp(1),
    fontFamily: AppFonts.NunitoSansSemiBold,
    top: hp(-0.4),
  },
  headerImage: {
    height: 400,
    width: screenWidth,
    position: 'absolute',
  },
  headerBottomContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: hp(2),
    height: hp(10),
    zIndex: 1,
  },
  imageContainer: {
    height: hp(9),
    width: hp(9),
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: hp(10),
    borderColor: AppColors.white,
    borderWidth: 1,
  },
  userName: {
    color: AppColors.white,
    fontFamily: AppFonts.NunitoSansBold,
    alignSelf: 'center',
    fontSize: size.lg,
    marginTop: hp(1),
  },
  whiteText: {
    color: AppColors.white,
    fontFamily: AppFonts.NunitoSansBold,
  },
  headerTitle: {
    gap: hp(0.5),
    paddingTop: hp(1),
  },
  headerSubTitle: {
    fontFamily: AppFonts.NunitoSansRegular,
    fontSize: size.sl,
    lineHeight: 20,
    color: AppColors.white,
  },
  textRight: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    textAlign: 'right',
  },
  logoutButton: {
    width: '90%',
    backgroundColor: AppColors.black,
    height: hp(6),
    marginHorizontal: wp(7),
    alignSelf: 'center',
    top: -5,
  },
});
