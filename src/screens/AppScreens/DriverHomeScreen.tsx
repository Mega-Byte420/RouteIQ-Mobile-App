import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  Route,
  SceneRendererProps,
} from 'react-native-tab-view';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import AppWeeklyCalendar from '../../components/AppWeeklyCalendar';
import {AppColors} from '../../utils/color';
import {hp, wp} from '../../utils/constants';
import {fontSize, size} from '../../utils/responsiveFonts';
import TripCard from '../../components/TripCard';
import {homeTripData, routeData, tripData} from '../../utils/DummyData';
import {dayScene} from '../../utils/objects';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import AppInput from '../../components/AppInput';
import {Controller, useForm} from 'react-hook-form';
import GlobalIcon from '../../components/GlobalIcon';
import AppFonts from '../../utils/appFonts';
import DriverMonthlyCalendar from '../../components/DriverMonthlyCalendar';
import AppStyles from '../../styles/AppStyles';

export default function DriverHomeScreen() {
  const driverHomeStatus = useAppSelector(
    state => state.userSlices.driverHomeStatus,
  );
  const role = useAppSelector(state => state.userSlices.role);
  const dispatch = useAppDispatch();
  const layout = useWindowDimensions();
  const [selectedScene, setSelectedScene] = useState(2);
  const [index, setIndex] = useState(0);

  const {control} = useForm({
    defaultValues: {search: ''},
  });

  // Tabs Configuration
  const routes = useMemo(
    () => [
      {key: 'route', title: 'Route'},
      {key: 'trip', title: 'Trip'},
    ],
    [],
  );

  const dayScene = ['AM', 'PM', 'ALL'];

  // Route Tab Content (Displays Weekly Calendar)
  const RouteScreen = () => (
    <>
      <AppWeeklyCalendar />
      <ScrollView>
        <View style={AppStyles.driverContainer}>
          {role === 'Driver' && (
            <View style={AppStyles.rowBetween}>
              <View style={{minWidth: 180}}>
                {dayScene[selectedScene] === 'AM' ? (
                  <Text style={[AppStyles.title, {fontSize: fontSize(14)}]}>
                    School starts at 8:00AM
                  </Text>
                ) 
                : 
                  dayScene[selectedScene] === 'PM' ? (
                  <Text style={[AppStyles.title, {fontSize: fontSize(14)}]}>
                   School dismissal is 3:00pm
                  </Text>
                 
                ):null}
              </View>

              {/* RIGHT side: Buttons */}
              <View style={AppStyles.row}>
                {dayScene?.map((item, index) => (
                  <Pressable
                    onPress={() => setSelectedScene(index)}
                    key={index}
                    style={[
                      styles.daySceneContainer,
                      {
                        backgroundColor:
                          selectedScene === index
                            ? AppColors.black
                            : AppColors.white,
                        borderTopLeftRadius: index === 0 ? 5 : 0,
                        borderTopRightRadius: index === 2 ? 5 : 0,
                        borderBottomLeftRadius: index === 0 ? 5 : 0,
                        borderBottomRightRadius: index === 2 ? 5 : 0,
                      },
                    ]}>
                    <Text
                      style={[
                        AppStyles.title,
                        {
                          fontSize: fontSize(14),
                          color:
                            selectedScene === index
                              ? AppColors.white
                              : AppColors.black,
                        },
                      ]}>
                      {item}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </View>
        <FlatList
          data={routeData}
          renderItem={({item}) => <TripCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            marginBottom: hp(10),
            paddingHorizontal: wp(4),
          }}
        />
      </ScrollView>
    </>
  );

  // Trip Tab Content (Displays Trip List)
  const TripScreen = () => (
    <>
      <AppWeeklyCalendar />
      <ScrollView>
        <View style={AppStyles.driverContainer}>
          {/* {role == 'Driver' && (
            <View style={AppStyles.rowBetween}>
              <Text style={[AppStyles.title, {fontSize: fontSize(14)}]}>
                Morning route starts at 8 AM
              </Text>
              <View style={AppStyles.row}>
                {dayScene?.map((item, index) => {
                  return (
                    <Pressable
                      onPress={() => setSelectedScene(index)}
                      key={index}
                      style={[
                        styles.daySceneContainer,
                        {
                          backgroundColor:
                            selectedScene == index
                              ? AppColors.black
                              : AppColors.white,
                          borderTopLeftRadius: index == 0 ? 5 : 0,
                          borderTopRightRadius: index == 2 ? 5 : 0,
                          borderBottomLeftRadius: index == 0 ? 5 : 0,
                          borderBottomRightRadius: index == 2 ? 5 : 0,
                        },
                      ]}>
                      <Text
                        style={[
                          AppStyles.title,
                          {
                            fontSize: fontSize(14),
                            color:
                              selectedScene == index
                                ? AppColors.white
                                : AppColors.black,
                          },
                        ]}>
                        {item}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )} */}
        </View>
        <FlatList
          data={homeTripData}
          renderItem={({item}) => <TripCard item={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            marginBottom: hp(10),
            paddingHorizontal: wp(4),
          }}
        />
      </ScrollView>
    </>
  );

  // Render Scene Mapping
  const renderScene = SceneMap({
    route: RouteScreen,
    trip: TripScreen,
  });

  // Custom Tab Bar
  const renderTabBar = (
    props: SceneRendererProps & {navigationState: NavigationState<Route>},
  ) => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: AppColors.red}}
      style={{backgroundColor: AppColors.white, height: hp(6), width: wp(100)}}
      labelStyle={styles.tabLabel}
      activeColor={AppColors.red}
      inactiveColor={AppColors.black}
      renderLabel={({route, focused}) => (
        <Text
          style={[
            styles.tabLabel,
            {color: focused ? AppColors.red : AppColors.black},
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.driverScreen}}
      alarmIcon={false}>
      {role === 'Retail' ? (
        <AppHeader
          role="Driver"
          enableBack={false}
          rightIcon={true}
          switchIcon={false}
          title="Home"
        />
      ) : (
        <AppHeader
          role="Driver"
          enableBack={false}
          rightIcon={true}
          switchIcon={true}
        />
      )}
        <ScrollView>

      <View style={{flex: 1}}>
        {driverHomeStatus ? (
          <DriverMonthlyCalendar />
        ) : (
          <>
            {role === 'Driver' && (
              <View style={styles.container}>
                <TabView
                  style={{width: '100%'}}
                  navigationState={{index, routes}}
                  renderScene={renderScene}
                  onIndexChange={setIndex}
                  initialLayout={{width: layout.width}}
                  renderTabBar={renderTabBar}
                />
              </View>
            )}

            {role === 'Retail' && (
              <>
                <AppWeeklyCalendar />
                <View style={styles.setMargin}>
                  <Controller
                    name="search"
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <AppInput
                        value={value}
                        placeholderTextColor={AppColors.black}
                        inputStyle={styles.inputStyle}
                        placeholder="Search"
                        container={styles.inputContainer}
                        onChangeText={text => onChange(text)}
                        containerStyle={{marginBottom: hp(0)}}
                        rightInnerIcon={
                          <GlobalIcon
                            size={20}
                            library="Fontisto"
                            color={AppColors.black}
                            name="search"
                          />
                        }
                      />
                    )}
                  />
                </View>
              </>
            )}

            {role === 'Retail' && (
              <View style={styles.tripView}>
                <View style={styles.tripBg}>
                  <Text style={styles.tripNumber}>89</Text>
                  <Text style={styles.tripText}>Total Trip</Text>
                </View>
                <View style={styles.tripBg}>
                  <Text style={styles.tripNumber}>08</Text>
                  <Text style={styles.tripText}>Pending Trip</Text>
                </View>
              </View>
            )}

           

            {role === 'Retail' && (
             
                <View style={AppStyles.driverContainer}>
                  <View>
                    <FlatList
                      scrollEnabled={false}
                      data={homeTripData}
                      renderItem={({item}) => <TripCard item={item} />}
                      contentContainerStyle={{marginBottom: hp(10)}}
                    />
                  </View>
                </View>
              
            )}
          </>
          
        )}
        
      </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  daySceneContainer: {
    paddingHorizontal: hp(1),
    paddingVertical: hp(0.8),
    borderColor: AppColors.graySuit,
    borderWidth: 0.5,
  },
  setMargin: {
    marginTop: hp(2),
    width: '95%',
    alignSelf: 'center',
  },
  tripView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
  },
  tripBg: {
    backgroundColor: AppColors.white,
    width: '35%',
    padding: 6,
    borderRadius: 10,
    marginTop: hp(2),
  },
  tripNumber: {
    color: AppColors.red,
    fontSize: 24,
    fontFamily: AppFonts.NunitoSansBold,
    textAlign: 'center',
  },
  tripText: {
    color: AppColors.red,
    fontSize: 16,
    fontFamily: AppFonts.NunitoSansBold,
    textAlign: 'center',
  },
  inputContainer:{
    backgroundColor:'#EFEFEF'
  }
});
