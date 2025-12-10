import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Platform, StyleSheet, Text, View} from 'react-native';
import HomeIcon from '../assets/svgs/HomeIcon';
import ProfileIcon from '../assets/svgs/ProfileIcon';
import StudentIcon from '../assets/svgs/StudentIcon';
import TaskIcon from '../assets/svgs/TaskIcon';
import GlobalIcon from '../components/GlobalIcon';
import {useAppSelector} from '../store/hooks';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {hp} from '../utils/constants';
import {size} from '../utils/responsiveFonts';
import {
  ChatStack,
  HomeStack,
  ProfileStack,
  StudentStack,
  TasksStack,
} from './DriverTabStack';

const Tab = createBottomTabNavigator();

type DriverBottomTabsProps = {
  children?: React.ReactNode;
  focused: any;
  title: string;
};

const BottomIcon: React.FC<DriverBottomTabsProps> = ({
  focused,
  children,
  title,
}) => {
  return (
    <View style={[styles.container, focused ? styles.activeTab : null]}>
      <View style={[styles.bottomContainer]}>{children}</View>
      <Text
        style={[
          styles.textStyle,
          {
            color: focused ? AppColors.primary : AppColors.charcoal,
            fontFamily: focused
              ? AppFonts.NunitoSansBold
              : AppFonts.NunitoSansSemiBold,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

function DriverBottomTabs() {
  const driverHomeStatus = useAppSelector(
    state => state.userSlices.driverHomeStatus,
  );
  const screens = [
    {
      name: 'HomeStack',
      component: HomeStack,
      headerShown: false,
      label: '',
    },
    {
      name: 'TasksStack',
      component: TasksStack,
      headerShown: false,
      label: '',
    },
    {
      name: 'StudentStack',
      component: StudentStack,
      headerShown: false,
      label: '',
    },
    {
      name: 'ChatStack',
      component: ChatStack,
      headerShown: false,
      label: '',
    },
    {
      name: 'ProfileStack',
      component: ProfileStack,
      headerShown: false,
      label: '',
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#16E6EF',
        tabBarHideOnKeyboard: true,
      }}>
      {screens.map(({name, component, headerShown, label}, index) => {
        return (
          <Tab.Screen
            key={`bottom-tabs-${index}`}
            name={name}
            component={component}
            options={({route}) => {
              console.log(route, 'route');

              return {
                headerShown,
                tabBarLabel: label,
                tabBarStyle: {
                  display: [
                    'DriverInspection',
                    driverHomeStatus == true && 'DriverHomeScreen',
                    'DriverStudentDetail',
                    'DriverProfileInfo',
                    'UpdateDriveProfile',
                    'DriverEmergencyContact',
                    'DriverQualifications',
                    'DriverCertification',
                    'DriverMedicalRecord',
                    'DriverHistory',
                    'DriverIncident',
                    'DriverShiftTracking',
                    'DriverShiftTrackingDetails',
                    'DriverChangePassword',
                    'DriverChats',
                    'FuelCodeScreen',
                    // 'FuelRecordsScreen',
                  ].includes(getFocusedRouteNameFromRoute(route) as any)
                    ? 'none'
                    : 'flex',
                  borderTopWidth: 0,
                  zIndex: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: Platform.OS === 'ios' ? hp(12) : hp(9),
                  backgroundColor: AppColors.white,
                  paddingHorizontal: hp(1),
                },
                tabBarIcon: ({color, focused}: any) => {
                  if (name.includes('HomeStack')) {
                    return (
                      <BottomIcon focused={focused} title="Home">
                        <View style={styles.iconWrapper}>
                          {focused ? (
                            <HomeIcon color={AppColors.red} />
                          ) : (
                            <HomeIcon />
                          )}
                        </View>
                      </BottomIcon>
                    );
                  }
                  if (name.includes('TasksStack')) {
                    return (
                      <BottomIcon focused={focused} title="Maintenance">
                        <View style={styles.iconWrapper}>
                          {focused ? (
                            <TaskIcon color={AppColors.red} />
                          ) : (
                            <TaskIcon />
                          )}
                        </View>
                      </BottomIcon>
                    );
                  }
                  if (name.includes('StudentStack')) {
                    return (
                        <BottomIcon focused={focused} title="Students">
                        <View style={styles.iconWrapper}>
                          {focused ? (
                            <StudentIcon color={AppColors.red} />
                          ) : (
                            <StudentIcon />
                          )}
                        </View>
                      </BottomIcon>
                    );
                  }
                  if (name.includes('ChatStack')) {
                    return (
                      <BottomIcon
                        focused={focused}
                        title="Chat"
                        children={
                          focused ? (
                            <GlobalIcon
                              library="Ionicons"
                              name="chatbubble-ellipses"
                              color={AppColors.red}
                            />
                          ) : (
                            // <ChatIcon color={AppColors.red} />
                            <GlobalIcon
                              library="Ionicons"
                              name="chatbubble-ellipses"
                              color={AppColors.charcoal}
                            />
                            // <ChatIcon color={AppColors.charcoal} />
                          )
                        }
                      />
                    );
                  }
                  if (name.includes('ProfileStack')) {
                    return (
                      <BottomIcon
                        focused={focused}
                        title="My Profile"
                        children={
                          focused ? (
                            <ProfileIcon color={AppColors.red} />
                          ) : (
                            <ProfileIcon />
                          )
                        }
                      />
                    );
                  }
                },
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default DriverBottomTabs;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 10,
    lineHeight: size.vxlg,
    width: '100%',
    fontFamily: AppFonts.NunitoSansExtraBold,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? hp(2) : hp(3),
    paddingBottom: hp(1),
    borderTopWidth: 2,
    borderTopColor: AppColors.white,
    width: '90%',
  },
  bottomContainer: {
    borderRadius: 50,
  },
  imageContainer: {
    height: hp(3.2),
    width: hp(3.2),
    backgroundColor: AppColors.white,
    borderRadius: hp(3.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp(3),
    width: hp(3),
    borderRadius: hp(3),
  },
  activeTab: {borderTopWidth: 2, borderTopColor: AppColors.red},
  iconWrapper: {
  justifyContent: 'center',
  alignItems: 'center',
  height: hp(3.2),
  width: hp(3.2),
},
});
