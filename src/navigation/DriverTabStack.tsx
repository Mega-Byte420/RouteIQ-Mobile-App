import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import DriverHomeScreen from '../screens/AppScreens/DriverHomeScreen';
import DriverStudentsScreen from '../screens/AppScreens/DriverStudentsScreen';
import DriverProfile from '../screens/AppScreens/DriverProfile';
import DriverInspection from '../screens/AppScreens/DriverInspection';
import DriverMapView from '../screens/AppScreens/DriverMapView';
import DriverMaintenanceDetail from '../screens/AppScreens/DriverMaintenanceDetail';
import DriverMaintenanceScreen from '../screens/AppScreens/DriverMaintenanceScreen';
import DriverStudentDetail from '../screens/AppScreens/DriverStudentDetail';
import DriverAllChats from '../screens/AppScreens/DriverAllChats';
import DriverCertification from '../screens/AppScreens/DriverCertification';
import DriverChangePassword from '../screens/AppScreens/DriverChangePassword';
import DriverChats from '../screens/AppScreens/DriverChats';
import DriverEmergencyContact from '../screens/AppScreens/DriverEmergencyContact';
import DriverHistory from '../screens/AppScreens/DriverHistory';
import DriverIncident from '../screens/AppScreens/DriverIncident';
import DriverMedicalRecord from '../screens/AppScreens/DriverMedicalRecord';
import DriverProfileInfo from '../screens/AppScreens/DriverProfileInfo';
import DriverQualifications from '../screens/AppScreens/DriverQualifications';
import DriverShiftTracking from '../screens/AppScreens/DriverShiftTracking';
import DriverShiftTrackingDetails from '../screens/AppScreens/DriverShiftTrackingDetails';
import AlertScreen from '../screens/AppScreens/AlertScreen';
import Notifications from '../screens/AppScreens/Notification';
import UpdateDriveProfile from '../screens/AppScreens/UpdateDriveProfile';
import FuelCodeScreen from '../screens/AppScreens/FuelCodeScreen';
import FuelRecordsScreen from '../screens/AppScreens/FuelRecordsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DriverHomeScreen" component={DriverHomeScreen} />
      <Stack.Screen name="DriverInspection" component={DriverInspection} />
      <Stack.Screen name="DriverMapView" component={DriverMapView} />
    </Stack.Navigator>
  );
};

export const TasksStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DriverMaintenanceScreen" component={DriverMaintenanceScreen} />
      <Stack.Screen name="DriverMaintenanceDetail" component={DriverMaintenanceDetail} />
      <Stack.Screen name="DriverInspection" component={DriverInspection} />
      <Stack.Screen name="DriverMapView" component={DriverMapView} />
      <Stack.Screen name="FuelRecordsScreen" component={FuelRecordsScreen} />

    </Stack.Navigator>
  );
};

export const StudentStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DriverStudentsScreen" component={DriverStudentsScreen} />
        <Stack.Screen name="DriverStudentDetail" component={DriverStudentDetail} />
      </Stack.Navigator>
    );
  };

  export const ChatStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DriverChats" component={DriverChats} />
      </Stack.Navigator>
    );
  };

  export const ProfileStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DriverProfile" component={DriverProfile} />
        <Stack.Screen name="DriverProfileInfo" component={DriverProfileInfo} />
        <Stack.Screen name="UpdateDriveProfile" component={UpdateDriveProfile} />
        <Stack.Screen name="DriverCertification" component={DriverCertification} />
        <Stack.Screen name="DriverChangePassword" component={DriverChangePassword} />
        <Stack.Screen name="DriverMedicalRecord" component={DriverMedicalRecord} />
        <Stack.Screen name="DriverHistory" component={DriverHistory} />
        <Stack.Screen name="DriverIncident" component={DriverIncident} />
        <Stack.Screen name="AlertScreen" component={AlertScreen} />
        <Stack.Screen name="Notification" component={Notifications} />
        <Stack.Screen name="DriverEmergencyContact" component={DriverEmergencyContact} />
        <Stack.Screen name="DriverQualifications" component={DriverQualifications} />
        <Stack.Screen name="DriverShiftTracking" component={DriverShiftTracking} />
        <Stack.Screen name="DriverShiftTrackingDetails" component={DriverShiftTrackingDetails} />
        {/* <Stack.Screen name="DriverChats" component={DriverChats} /> */}
        {/* <Stack.Screen name="DriverAllChats" component={DriverAllChats} /> */}

        <Stack.Screen name="FuelCodeScreen" component={FuelCodeScreen} />


      </Stack.Navigator>
    );
  };
  