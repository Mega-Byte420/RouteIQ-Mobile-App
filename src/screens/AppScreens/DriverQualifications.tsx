import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  PressableAndroidRippleConfig,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image,
  Pressable,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
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
import {Scene, Event} from 'react-native-tab-view/lib/typescript/src/types';
import {SelectList} from 'react-native-dropdown-select-list';
import {
  DegreeData,
  HighSchoolData,
  leaveDropdownData,
} from '../../utils/DummyData';
import AppBottomSheet from '../../components/AppBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import UploadDoc from '../../components/UploadDoc';
import AppDoc from '../../components/AppDoc';
import {Controller, useForm} from 'react-hook-form';
import CalendarPicker from '../../components/CalendarPicker';

export default function DriverQualifications() {
  const [docUploaded, setDocUploaded] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['34%', '90%'], []);
  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const snapPoints2 = useMemo(() => ['45%', '90%'], []);
  const openSheet2 = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const closeSheet2 = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);

  const bottomSheetModalRef3 = useRef<BottomSheetModal>(null);
  const snapPoints3 = useMemo(() => ['34%', '90%'], []);
  const openSheet3 = useCallback(() => {
    bottomSheetModalRef3.current?.present();
  }, []);
  const closeSheet3 = useCallback(() => {
    bottomSheetModalRef3.current?.close();
  }, []);

  const [selectAbsence, setSelectAbsence] = useState('');

  const [selected, setSelected] = useState(false);
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      jobtitle: '',
      startdate: '',
      enddate: '',
      description: '',
    },
  });

  const onSubmit = () => {
    closeSheet2();
  };

  const SecondRoute = () => (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <View style={styles.subContainer}>
        <View style={styles.experienceContainer}>
          <View style={[styles.dotnDashContainer, {}]}>
            <View style={styles.circle}>
              <View style={styles.innerCircle}></View>
            </View>

            <View style={styles.dashedLine}></View>
          </View>

          <View style={styles.experienceInfoContainer}>
            <Text
              style={[
                AppStyles.titleHead,
                {fontSize: size.lg, alignSelf: 'flex-start'},
              ]}>
              Van Driver
            </Text>
            <Text
              style={[
                AppStyles.title,
                {fontFamily: AppFonts.NunitoSansLight, fontSize: size.default},
              ]}>
              Adventure calling! Stay in the loop with real-time updates on your
              favorite outdoor activities
            </Text>
            <Text
              style={[
                AppStyles.title,
                {
                  fontFamily: AppFonts.NunitoSansLight,
                  fontSize: size.s,
                  color: AppColors.dimGray,
                },
              ]}>
              1 day ago
            </Text>
          </View>
        </View>

        <View style={styles.experienceContainer}>
          <View style={[styles.dotnDashContainer, {}]}>
            <View style={styles.circle}>
              <View style={styles.innerCircle}></View>
            </View>

            <View style={styles.dashedLine}></View>
          </View>

          <View style={styles.experienceInfoContainer}>
            <Text
              style={[
                AppStyles.titleHead,
                {fontSize: size.lg, alignSelf: 'flex-start'},
              ]}>
              Office Boy
            </Text>
            <Text
              style={[
                AppStyles.title,
                {fontFamily: AppFonts.NunitoSansLight, fontSize: size.default},
              ]}>
              Your Bus is Approaching!
            </Text>
            <Text
              style={[
                AppStyles.title,
                {
                  fontFamily: AppFonts.NunitoSansLight,
                  fontSize: size.s,
                  color: AppColors.dimGray,
                },
              ]}>
              1 day ago
            </Text>
          </View>
        </View>

        <View style={styles.experienceContainer}>
          <View style={[styles.dotnDashContainer, {}]}>
            <View style={styles.circle}>
              <View style={styles.innerCircle}></View>
            </View>

            <View style={styles.dashedLine}></View>
          </View>

          <View style={styles.experienceInfoContainer}>
            <Text
              style={[
                AppStyles.titleHead,
                {fontSize: size.lg, alignSelf: 'flex-start'},
              ]}>
              Junior Chef{' '}
            </Text>
            <Text
              style={[
                AppStyles.title,
                {fontFamily: AppFonts.NunitoSansLight, fontSize: size.default},
              ]}>
              Your Bus is Approaching!
            </Text>
            <Text
              style={[
                AppStyles.title,
                {
                  fontFamily: AppFonts.NunitoSansLight,
                  fontSize: size.s,
                  color: AppColors.dimGray,
                },
              ]}>
              1 day ago
            </Text>
          </View>
        </View>
      </View>

      <AppButton
        title="Upload CV"
        onPress={() => openSheet3()}
        style={{
          // width: '100%',
          width: '90%',
          backgroundColor: AppColors.red,
          // height: hp(6),
          marginHorizontal: wp(7),
          alignSelf: 'center',
          position: 'relative',
          top: 30,
        }}
        titleStyle={{
          fontSize: size.md,
        }}
      />

      <AppButton
        title="Add Experience"
        onPress={() => openSheet2()}
        style={{
          // width: '100%',
          width: '90%',
          backgroundColor: AppColors.red,
          height: hp(6),
          marginHorizontal: wp(7),
          alignSelf: 'center',
          position: 'relative',
          top: -40,
        }}
        titleStyle={{
          fontSize: size.md,
        }}
      />

      <AppBottomSheet
        bottomSheetModalRef={bottomSheetModalRef2}
        snapPoints={snapPoints2}
        backdropComponent={({style}) => (
          <Pressable
            onPress={() => closeSheet2()}
            style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}
          />
        )}>
        <View
          style={{
            backgroundColor: AppColors.white,
            paddingHorizontal: hp(2),
            paddingVertical: hp(2),
            borderTopRightRadius: hp(2),
            borderTopLeftRadius: hp(2),
          }}>
          <Controller
            name="jobtitle"
            control={control}
            rules={{required: 'Job Title is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <AppInput
                value={value}
                container={{
                  height: hp(6),
                  borderRadius: hp(0.5),
                  marginBottom: hp(2),
                }}
                label="Job Title"
                placeholder="Enter Job Title"
                onChangeText={(text: string) => onChange(text)}
                error={errors.jobtitle?.message}
                labelStyle={{
                  marginBottom: hp(2),
                  fontFamily: AppFonts.NunitoSansBold,
                }}
              />
            )}
          />

          <Controller
            name="startdate"
            control={control}
            rules={{required: 'Start Date is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CalendarPicker
                selectedDate={value}
                setDates={(date: string) => onChange(date)}
                error={error?.message}
                label="Select Start Date"
              />
            )}
          />

          <Controller
            name="enddate"
            control={control}
            rules={{required: 'End Date is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <CalendarPicker
                selectedDate={value}
                setDates={(date: string) => onChange(date)}
                error={error?.message}
                label="Select End Date"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{required: 'Description is required'}}
            render={({field: {onChange, value}, fieldState: {error}}) => (
              <AppInput
                multiline
                numberOfLines={7}
                container={{
                  height: hp(12),
                  borderRadius: hp(0.5),
                  marginBottom: hp(2),
                }}
                value={value}
                label="Description"
                placeholder="Descripton"
                onChangeText={(text: string) => onChange(text)}
                error={errors.description?.message}
                labelStyle={{
                  marginBottom: hp(2),
                  fontFamily: AppFonts.NunitoSansBold,
                }}
              />
            )}
          />

          <View style={[AppStyles.rowBetween, {width: '100%'}]}>
            <AppButton
              title="Cancel"
              onPress={() => {
                closeSheet2();
              }}
              style={styles.backButton}
              titleStyle={{color: AppColors.textLightGrey}}
            />
            <AppButton
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              //   onPress={() => closeSheet2()}
              style={styles.submitButton}
            />
          </View>
        </View>
      </AppBottomSheet>
    </View>
  );

  const FirstRoute = () => (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <View style={styles.subContainer}>
        <View
          style={{
            flexDirection: selected1 ? 'row' : 'column',
            justifyContent: 'space-between',
            gap: hp(2),
          }}>
          <Text
            style={[
              AppStyles.titleHead,
              {fontSize: size.lg, alignSelf: 'flex-start'},
            ]}>
            Bachelors
          </Text>

          {selected1 ? (
            <Text
              style={[
                AppStyles.title,
                AppStyles.halfWidth,
                {verticalAlign: 'bottom'},
              ]}>
              {selected1}
            </Text>
          ) : (
            <SelectList
              search={false}
              setSelected={setSelected1}
              data={DegreeData}
              save="value"
              placeholder="Select your Degree"
              boxStyles={styles.boxStyle}
              dropdownTextStyles={{color: AppColors.black}}
              onSelect={() => setSelected1(true)}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: selected2 ? 'row' : 'column',
            justifyContent: 'space-between',
            gap: hp(2),
          }}>
          <Text
            style={[
              AppStyles.titleHead,
              {fontSize: size.lg, alignSelf: 'flex-start'},
            ]}>
            High School {selected2 === false ? 'Certificate' : ''}
          </Text>

          {
            selected2 ? (
              <Text
                style={[
                  AppStyles.title,
                  AppStyles.halfWidth,
                  {verticalAlign: 'bottom'},
                ]}>
                {selected2}
              </Text>
            ) : (
              <AppInput placeholder="Enter your Certificate" />
            )
            // <SelectList
            //     search={false}

            //     setSelected={setSelected2}
            //     data={HighSchoolData}
            //     save="value"
            //     placeholder="Select your Certificate"
            //     boxStyles={styles.boxStyle}
            //     dropdownTextStyles={{ color: AppColors.black }}
            //     onSelect={() => setSelected2(true)}
            // />
          }
        </View>

        {docUploaded === true && (
          <>
            <AppDoc
              containerStyle={{width: '100%'}}
              title="Bachelor's Degree"
            />
            <AppDoc
              containerStyle={{width: '100%'}}
              title="School Certificate"
            />
          </>
        )}
      </View>

      <AppButton
        title="Upload Documents"
        onPress={() => openSheet()}
        style={{
          // width: '100%',
          width: '90%',
          backgroundColor: AppColors.red,
          height: hp(6),
          marginHorizontal: wp(7),
          alignSelf: 'center',
          position: 'relative',
          top: -10,
        }}
        titleStyle={{
          fontSize: size.md,
        }}
      />

      <AppBottomSheet
        bottomSheetModalRef={bottomSheetModalRef3}
        snapPoints={snapPoints3}
        backdropComponent={({style}) => (
          <Pressable
            onPress={() => closeSheet3()}
            style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}
          />
        )}>
        <View style={AppStyles.center}>
          <View style={{width: '90%'}}>
            <Text
              style={[
                AppStyles.titleHead,
                {fontSize: size.lg, alignSelf: 'flex-start'},
              ]}>
              Upload CV
            </Text>

            <UploadDoc
              title="Tap and Upload Files"
              containerStyle={{
                marginHorizontal: hp(2),
                alignSelf: 'center',
                borderRadius: 15,
                backgroundColor: 'transparent',
              }}
              textStyle={{fontSize: size.default}}
            />
          </View>

          <View style={[AppStyles.rowBetween, AppStyles.widthFullPercent]}>
            <AppButton
              title="Cancel"
              style={styles.backButton}
              titleStyle={{color: AppColors.textLightGrey}}
              onPress={() => closeSheet3()}
            />
            <AppButton
              title="Upload"
              style={styles.submitButton}
              onPress={() => {
                closeSheet();
                setDocUploaded(true);
              }}
            />
          </View>
        </View>
      </AppBottomSheet>

      <AppBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <Pressable
            onPress={() => closeSheet()}
            style={[style, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]}
          />
        )}>
        <View style={AppStyles.center}>
          <View style={{width: '90%'}}>
            <Text
              style={[
                AppStyles.titleHead,
                {fontSize: size.lg, alignSelf: 'flex-start'},
              ]}>
              Upload Documents
            </Text>

            <UploadDoc
              title="Tap and Upload Files"
              containerStyle={{
                marginHorizontal: hp(2),
                alignSelf: 'center',
                borderRadius: 15,
                backgroundColor: 'transparent',
              }}
              textStyle={{fontSize: size.default}}
            />
          </View>

          <View style={[AppStyles.rowBetween, AppStyles.widthFullPercent]}>
            <AppButton
              title="Cancel"
              style={styles.backButton}
              titleStyle={{color: AppColors.textLightGrey}}
              onPress={() => closeSheet()}
            />
            <AppButton
              title="Upload"
              style={styles.submitButton}
              onPress={() => {
                closeSheet();
                setDocUploaded(true);
              }}
            />
          </View>
        </View>
      </AppBottomSheet>
    </View>
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Education'},
    {key: 'second', title: 'Experience'},
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (
    props: React.JSX.IntrinsicAttributes &
      SceneRendererProps & {
        navigationState: NavigationState<Route>;
        scrollEnabled?: boolean | undefined;
        bounces?: boolean | undefined;
        activeColor?: string | undefined;
        inactiveColor?: string | undefined;
        pressColor?: string | undefined;
        pressOpacity?: number | undefined;
        getLabelText?:
          | ((scene: Scene<Route>) => string | undefined)
          | undefined;
        getAccessible?:
          | ((scene: Scene<Route>) => boolean | undefined)
          | undefined;
        getAccessibilityLabel?:
          | ((scene: Scene<Route>) => string | undefined)
          | undefined;
        getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined;
        renderLabel?:
          | ((
              scene: Scene<Route> & {focused: boolean; color: string},
            ) => React.ReactNode)
          | undefined;
        renderIcon?:
          | ((
              scene: Scene<Route> & {focused: boolean; color: string},
            ) => React.ReactNode)
          | undefined;
        renderBadge?: ((scene: Scene<Route>) => React.ReactNode) | undefined;
        renderIndicator?:
          | ((props: TabBarIndicatorProps<Route>) => React.ReactNode)
          | undefined;
        renderTabBarItem?:
          | ((
              props: TabBarItemProps<Route> & {key: string},
            ) => React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
            >)
          | undefined;
        onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined;
        onTabLongPress?: ((scene: Scene<Route>) => void) | undefined;
        tabStyle?: StyleProp<ViewStyle>;
        indicatorStyle?: StyleProp<ViewStyle>;
        indicatorContainerStyle?: StyleProp<ViewStyle>;
        labelStyle?: StyleProp<TextStyle>;
        contentContainerStyle?: StyleProp<ViewStyle>;
        style?: StyleProp<ViewStyle>;
        gap?: number | undefined;
        testID?: string | undefined;
        android_ripple?: PressableAndroidRippleConfig | undefined;
      },
  ) => (
    <TabBar
      {...props}
      // pressColor={colors.blue}
      indicatorStyle={{backgroundColor: AppColors.red}}
      style={{
        paddingVertical: 0,
        backgroundColor: AppColors.white,
        height: hp(6),
        //  width: wp(100),
        margin: 0,
      }}
      labelStyle={[styles.subTitle]}
      activeColor={AppColors.red}
      inactiveColor="#666"
      renderLabel={({route, focused, color}) => (
        <Text
          style={[
            styles.subTitle,
            {
              padding: 0,
              backgroundColor: 'transparent',
              //  fontFamily: focused? AppFonts.NunitoSansBold : AppFonts.NunitoSansSemiBold,
              fontFamily: AppFonts.NunitoSansBold,
              color: focused ? AppColors.red : AppColors.black,
            },
          ]}>
          {route.title}
          {/* {route.title.split(' ').map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(' ')} */}
        </Text>
      )}
    />
  );

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.veryLightGrey}}>
      <AppHeader
        role="Driver"
        title={'Qualification'}
        enableBack={true}
        rightIcon={false}
      />

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
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  backButton: {width: '36%', backgroundColor: AppColors.screenColor},
  submitButton: {width: '60%'},
  dropdownButtonStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: 12,
    marginVertical: hp(2),
    backgroundColor: AppColors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: AppColors.grey,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    height: 150,
  },
  title: {
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.black,
    fontSize: size.default,
  },
  subTitle: {
    backgroundColor: AppColors.yellow,
    padding: hp(0.5),
    borderRadius: hp(1),
    color: AppColors.black,
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
  },

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
  uploadDocBox: {
    width: '100%',
    marginVertical: hp(3),
    marginTop: hp(2),
    height: hp(15),
    gap: hp(1),
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: AppColors.red,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.veryLightPink,
  },

  tapText: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    fontSize: size.s,
    lineHeight: 20,
    color: AppColors.red,
    alignSelf: 'center',
  },
  notifEach: {
    fontSize: size.default,
    fontFamily: AppFonts.NunitoSansSemiBold,
    padding: wp(0),
    height: hp(4),
    // width: wp(20),
    // borderBottomWidth: 1,
    textAlign: 'center',
    // color: colors.black,
    borderBottomColor: AppColors.red,
  },

  boxStyle: {
    width: '100%',
    marginBottom: hp(1.6),
    backgroundColor: AppColors.white,
    alignItems: 'center',
    borderColor: AppColors.black,
    height: hp(6),
    borderRadius: hp(0.5),
    borderBottomColor: AppColors.black,
    borderWidth: 1,
  },
  circle: {
    width: hp(3),
    height: hp(3),
    borderWidth: 1,
    borderColor: AppColors.red,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerCircle: {
    width: hp(1.5),
    height: hp(1.5),
    backgroundColor: AppColors.red,
    borderRadius: 100,
  },
  dotnDashContainer: {
    marginTop: hp(0.2),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dashedLine: {
    borderStyle: 'dashed',
    // height: '20%',
    flexGrow: 1,
    marginTop: hp(1.5),
    borderColor: AppColors.grey,
    borderWidth: 2,
    width: 0,
    // paddingBottom: hp(8),
    // marginBottom: hp(2)
  },
  experienceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: wp(6),
  },
  experienceInfoContainer: {
    width: wp(83),
    gap: hp(1),
    paddingBottom: hp(3),
  },
});
