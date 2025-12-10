import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  PressableAndroidRippleConfig,
  StyleProp,
  TextStyle,
  ViewStyle,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import AppButton from '../../components/AppButton';
import {hp, wp} from '../../utils/constants';
import {AppColors} from '../../utils/color';
import {size} from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';
import AppInput from '../../components/AppInput';
import AppStyles from '../../styles/AppStyles';
import GlobalIcon from '../../components/GlobalIcon';
import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  Route,
  SceneRendererProps,
  TabBarIndicatorProps,
  TabBarItemProps,
} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import AppDropdown from '../../components/AppDropDown'

// Dummy Data
const selecteStudentData = [
  {label: 'Ann Co', value: 'ann-co'},
  {label: 'Yu Hin', value: 'yu-hin'},
  {label: 'Annie Harris', value: 'annie-harris'},
];

const sentToData = [
  {label: 'School', value: 'school'},
  {label: 'Vendor', value: 'vendor'},
  {label: 'Guardian', value: 'guardian'},
  {label: 'All', value: 'all'},
];

// --- Routes ---
const FirstRoute = ({
  sentTo,
  setSentTo,
}: {
  sentTo: string;
  setSentTo: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <ScrollView contentContainerStyle={styles.subContainer}>
    <AppDropdown
      label="Sent To"
      labelStyle={AppStyles.title}
      placeholder="Select"
      data={sentToData}
      value={sentTo}
      onChangeText={setSentTo}
      style={styles.dropdown}
    />
    <AppInput
      multiline
      numberOfLines={11}
      container={{
        height: hp(25),
        borderRadius: hp(0.5),
        marginBottom: hp(2),
        borderColor: AppColors.grey,
      }}
      label="Description"
      placeholder="Report Accident Details here..."
      placeholderTextColor={AppColors.black}
      labelStyle={{
        marginBottom: hp(2),
        fontFamily: AppFonts.NunitoSansBold,
      }}
    />
    <View style={{width: '100%', alignSelf: 'center', marginBottom: hp(2)}}>
      <Text
        style={[
          AppStyles.titleHead,
          {fontSize: size.lg, alignSelf: 'flex-start'},
        ]}>
        Attachments
      </Text>
      <View style={styles.uploadDocBox}>
        <GlobalIcon
          library="FontelloIcon"
          name={'group-(5)'}
          color={AppColors.red}
          size={40}
        />
        <Text style={styles.tapText}>Tap and Upload Files/Picture</Text>
      </View>
    </View>
  </ScrollView>
);

const SecondRoute = ({
  sentTo,
  setSentTo,
  selectStudent,
  setSelectStudent,
}: {
  sentTo: string;
  setSentTo: React.Dispatch<React.SetStateAction<string>>;
  selectStudent: string;
  setSelectStudent: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <ScrollView contentContainerStyle={styles.subContainer}>
    <AppDropdown
      label="Select Student"
      labelStyle={AppStyles.title}
      placeholder="Select"
      data={selecteStudentData}
      value={selectStudent}
      onChangeText={setSelectStudent}
      style={styles.dropdown}
    />
    <AppDropdown
      label="Sent To"
      labelStyle={AppStyles.title}
      placeholder="Select"
      data={sentToData}
      value={sentTo}
      onChangeText={setSentTo}
      style={styles.dropdown}
    />
    <AppInput
      multiline
      numberOfLines={11}
      container={{
        height: hp(25),
        borderRadius: hp(0.5),
        marginBottom: hp(4),
        borderColor: AppColors.grey,
      }}
      label="Description"
      placeholder="Report Accident Details here..."
      inputStyle={{fontFamily: AppFonts.NunitoSansMedium}}
      labelStyle={{
        marginBottom: hp(2),
        fontFamily: AppFonts.NunitoSansBold,
      }}
    />
    <View style={{width: '100%', alignSelf: 'center', marginBottom: hp(2)}}>
      <Text
        style={[
          AppStyles.titleHead,
          {fontSize: size.lg, alignSelf: 'flex-start'},
        ]}>
        Attachments
      </Text>
      <View style={styles.uploadDocBox}>
        <GlobalIcon
          library="FontelloIcon"
          name={'group-(5)'}
          color={AppColors.red}
          size={40}
        />
        <Text style={styles.tapText}>Tap and Upload Files/Picture</Text>
      </View>
    </View>
  </ScrollView>
);

// --- Main Component ---
export default function DriverIncident() {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Report Accident'},
    {key: 'second', title: 'Disciplinary Issues'},
  ]);

  const [sentTo, setSentTo] = useState('');
  const [selectStudent, setSelectStudent] = useState('');

  const renderScene = SceneMap({
    first: () => <FirstRoute sentTo={sentTo} setSentTo={setSentTo} />,
    second: () => (
      <SecondRoute
        sentTo={sentTo}
        setSentTo={setSentTo}
        selectStudent={selectStudent}
        setSelectStudent={setSelectStudent}
      />
    ),
  });

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: NavigationState<Route>},
  ) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: AppColors.red}}
      style={{
        paddingVertical: 0,
        backgroundColor: AppColors.white,
        height: hp(6),
        width: wp(100),
      }}
      labelStyle={styles.subTitle}
      activeColor={AppColors.red}
      inactiveColor="#666"
      renderLabel={({route, focused}) => (
        <Text
          style={[
            styles.subTitle,
            {
              fontFamily: AppFonts.NunitoSansBold,
              color: focused ? AppColors.red : AppColors.black,
            },
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.profileBg}}>
      <AppHeader
        role="Driver"
        title={'Incident'}
        enableBack={true}
        rightIcon={false}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <TabView
          style={{width: '100%'}}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
        <AppButton
          title="Send"
          onPress={() => navigation.goBack()}
          style={{
            width: '92%',
            backgroundColor: AppColors.red,
            height: hp(6),
            marginHorizontal: wp(7),
            alignSelf: 'center',
            bottom: 5,
          }}
          titleStyle={{fontSize: size.md}}
        />
      </ScrollView>
    </AppLayout>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  subContainer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: hp(3),
    gap: hp(2),
    paddingHorizontal: wp(5),
  },
  dropdown: {
    marginBottom: hp(2),
  },
  uploadDocBox: {
    width: '100%',
    marginVertical: hp(3),
    height: hp(20),
    backgroundColor: '#f5f5f5',
    borderRadius: hp(1),
    borderWidth: 1,
    borderColor: AppColors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapText: {
    marginTop: hp(1),
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
    color: AppColors.black,
  },
  subTitle: {
    color: AppColors.black,
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
  },
});
