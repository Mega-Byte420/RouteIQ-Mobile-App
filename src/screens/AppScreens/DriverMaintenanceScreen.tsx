import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import CleanBusIcon from '../../assets/svgs/CleanBusIcon';
import FuelIcon from '../../assets/svgs/FuelIcon';
import MeterIcon from '../../assets/svgs/MeterIcon';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import { setMaintenanceDetail } from '../../store/driver/driverSlices';
import { useAppDispatch } from '../../store/hooks';
import AppStyles from '../../styles/AppStyles';
import { AppColors } from '../../utils/color';
import { hp, wp } from '../../utils/constants';
import { size } from '../../utils/responsiveFonts';
import AppMapView from '../../components/AppMapView';
import DriverMapView from './DriverMapView';
import DriverMapViewWidget from '../../components/DriverMapViewWidget';
import Draggable from 'react-native-draggable';
import { Animated } from 'react-native';
import GlobalIcon from '../../components/GlobalIcon';
import AnimatedDriverMapView from '../../components/AnimatedDriverMapView';


const DriverMaintenanceScreen = () => {

  const [activeControls, setActiveControls] = useState(false);

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
      // onMoveShouldSetPanResponderCapture: () => true,
    }),
  ).current;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const maintenance_data = [
    {
      title: 'Fuel Log',
      name: 'FuelRecordsScreen',
      icon: <FuelIcon />,
    },
    {
      title: 'Cleaning',
      name: 'DriverMaintenanceDetail',
      icon: <CleanBusIcon />,
    },
    {
      title: 'Mileage Record',
      name: 'DriverMaintenanceDetail',
      icon: <MeterIcon />,
    },
  ];

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{ backgroundColor: AppColors.driverScreen }}
      alarmIcon={true}>
      <AppHeader
        role="Driver"
        title="Maintenance"
        enableBack={false}
        rightIcon={true}
        profile_image={true}
      />
      <View style={AppStyles.driverContainer}>
        <Text style={[AppStyles.titleHead, { fontSize: size.lg }]}>
          Inspections & Maintenance Tasks
        </Text>

        <View
          style={[
            AppStyles.rowBetween,
            {
              flexWrap: 'wrap',
              marginTop: hp(1.5),
            },
          ]}>

          {maintenance_data.map((item : any , index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  dispatch(setMaintenanceDetail(item?.title));
                  navigation.navigate(item.name);
                }}
                style={styles.cardContainer}>
                <Text style={[AppStyles.titleHead, { fontSize: size.lg }]}>
                  {item?.title}
                </Text>
                <View style={styles.icon}>{item?.icon}</View>
              </Pressable>
            );
          })}
        </View>

        <AnimatedDriverMapView />
        {/* <Animated.View
          style={{
            position: 'relative',
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}>

          <TouchableHighlight
          underlayColor={AppColors.transparent}
          onPress={() => {
            setActiveControls(true);
            setTimeout(() => {
              setActiveControls(false)
            }, 1000)
          }}>
            <View style={{
              height: hp(23), width: '48%',
              alignSelf: 'flex-end',
              position: 'relative',
              //  position: 'absolute',
              bottom: 25,
              right: 10
            }}>


              {
                activeControls === true ?

                  <View style={styles.controlsContainer}>
                    <View style={[AppStyles.row, { gap: wp(1), justifyContent: 'space-between', paddingHorizontal: wp(3) }]}>
                      <GlobalIcon
                        library="MaterialCommunityIcons"
                        name="arrow-left-top-bold"
                        size={28}
                        color={AppColors.red}
                      />
                      <GlobalIcon
                        library="MaterialCommunityIcons"
                        name="arrow-left-top-bold"
                        color={AppColors.red}
                        size={28}
                      />
                    </View>


                    <TouchableOpacity onPress={()=>{
                      navigation.navigate('DriverMapView')
                    }} style={{alignSelf: 'center'} }>
                    <GlobalIcon
                        library="MaterialCommunityIcons"
                        name="arrow-left-top-bold"
                        color={AppColors.red}
                        size={50}
                        />
                        </TouchableOpacity>


                  </View>
                  :
                  null

              }

              <View style={{ flex: 1, position: 'relative' }}>
                <DriverMapViewWidget />
              </View>




            </View>
          </TouchableHighlight>



        </Animated.View> */}



      </View>


    </AppLayout>
  );
};

export default DriverMaintenanceScreen;

const styles = StyleSheet.create({
  // controlsContainer: {
  //   flex: 1,
  //   top: 0,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   gap: hp(3),
  //   justifyContent: 'flex-start',
  //   position: 'absolute',
  //   zIndex: 12,
  //   backgroundColor: '#0000004c',
  // },

  cardContainer: {
    backgroundColor: AppColors.white,
    width: '48%',
    justifyContent: 'space-between',
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(1.5),
    borderRadius: 15,
    gap: 15,
    marginVertical: hp(1),
  },
  icon: { alignSelf: 'flex-end' },
});
