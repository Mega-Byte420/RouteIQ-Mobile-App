export type RootStackParamList = {
  SplashScreen: undefined;
  LoginAs: undefined;
  Login: undefined;
  Signup: undefined;
  HomeSreen: undefined;
  Settings: undefined;
  ChildProfile: undefined;
  UpdateGuardianProfile: undefined;
  Notification: undefined;
  ChatScreen: undefined;
  AttendanceHistory: undefined;
  OnBoarding: undefined;
  ParentFeedback: undefined;
  ResetPassword: undefined;
  VerificationCode: undefined;
  NewPassword: undefined;
  SuccessScreen: undefined;
  ChangePassword: undefined;

  // Driver Stack
  DriverBottomTabs: undefined;
  DriverProfileInfo: undefined;
  UpdateDriveProfile: undefined;
  DriverHomeScreen: undefined;
  DriverMaintenanceScreen: undefined;
  DriverStudentsScreen: undefined;
  DriverChatScreen: undefined;
  DriverProfile: undefined;
  DriverCertification: undefined;
  DriverInspection: undefined;
  DriverMapView: undefined;
  DriverChangePassword: undefined;
  DriverMedicalRecord: undefined;
  DriverHistory: undefined;
  DriverIncident: undefined;
  DriverMaintenanceDetail: undefined;
  FuelRecordsScreen: undefined;
  FuelCodeScreen: undefined;
  AlertScreen: undefined;
  DriverEmergencyContact: undefined;
  DriverQualifications: undefined;
  DriverStudentDetail: undefined;
  DriverShiftTracking: undefined;
  DriverShiftTrackingDetails: undefined;
  DriverChats: undefined;
  DriverAllChats: undefined;
  DriverGroupChatSelectedList:undefined;
  DriverAccountNo: undefined;
  UpdateAccountNo: undefined;
  RetailProfileInfo:undefined;


 // Retail Stack
  RetailBottomTabs:undefined;
  RetailRFQ: undefined;
  RetailRequestQuote:undefined;
  RetailInvoice: undefined;
  RetailDetail:undefined;
  EditRetailDetail: undefined;
  RetailPayment:undefined;
  RetailHistory:undefined;
  UpdateRetailDetail: undefined;
  UpdateRetailProfile: undefined;
  

};



declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
