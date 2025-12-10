import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import DriverMapViewWidget from './DriverMapViewWidget';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalIcon from './GlobalIcon';
import {AppColors} from '../utils/color';
import {TouchableHighlight} from '@gorhom/bottom-sheet';
import {PanResponder} from 'react-native';
import AppStyles from '../styles/AppStyles';
import {hp, wp} from '../utils/constants';
import {useNavigation} from '@react-navigation/native';

const AnimatedDriverMapView = () => {
  const navigation = useNavigation();
  const pan = useRef(new Animated.ValueXY()).current;
  const [activeControls, setActiveControls] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
      // onMoveShouldSetPanResponderCapture: () => true,
    }),
  ).current;

  return (
    <Animated.View
      style={{
        position: 'relative',
        transform: [{translateX: pan.x}, {translateY: pan.y}],
      }}
      {...panResponder.panHandlers}>
      <TouchableHighlight
        underlayColor={AppColors.transparent}
        onPress={() => {
          setActiveControls(true);
          setTimeout(() => {
            setActiveControls(false);
          }, 1000);
        }}>
        <View
          style={{
            height: hp(23),
            width: '48%',
            alignSelf: 'flex-end',
            position: 'relative',
            //  position: 'absolute',
            bottom: 25,
            right: 10,
          }}>
          {activeControls === true ? (
            <View style={styles.controlsContainer}>
              <View
                style={[
                  AppStyles.row,
                  {
                    gap: wp(1),
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(3),
                  },
                ]}>
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

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DriverMapView');
                }}
                style={{alignSelf: 'center'}}>
                <GlobalIcon
                  library="MaterialCommunityIcons"
                  name="arrow-left-top-bold"
                  color={AppColors.red}
                  size={50}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={{flex: 1, position: 'relative'}}>
            <DriverMapViewWidget />
          </View>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};

export default AnimatedDriverMapView;

const styles = StyleSheet.create({
  controlsContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    gap: hp(3),
    justifyContent: 'flex-start',
    position: 'absolute',
    zIndex: 12,
    backgroundColor: '#0000004c',
  },
});
