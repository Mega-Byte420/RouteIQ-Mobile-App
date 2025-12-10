import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import {AppColors} from '../../utils/color';
import AppStyles from '../../styles/AppStyles';
import {size} from '../../utils/responsiveFonts';
import {hp} from '../../utils/constants';
import AppInput from '../../components/AppInput';
import GlobalIcon from '../../components/GlobalIcon';
import GridIcon from '../../assets/svgs/GridIcon';
import StudentCard from '../../components/StudentCard';
import {studentsData} from '../../utils/DummyData';
import { useIsFocused } from '@react-navigation/native';

const DriverStudentsScreen = () => {
  // const isFocused = useIsFocused();
  const [grid, setGrid] = useState('row');
  const numColumns = grid === 'row' ? 2 : 1;

  // useEffect(() => {
  //   setGrid('row')
  // }, [isFocused])
  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.driverScreen}}>
      <AppHeader
        role="Driver"
        title="Students"
        enableBack={false}
        profile_image={true}
        rightIcon={true}
      />
      <View style={AppStyles.driverContainer}>
        <View style={[styles.studentContainer, AppStyles.boxShadow]}>
          <View style={[AppStyles.rowBetween, styles.titleContainer]}>
            <View style={AppStyles.center}>
              <Text style={[AppStyles.whiteSubTitle, {color: AppColors.black}]}>
                Students On Bus:
              </Text>
              <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
                10 out of 12
              </Text>
            </View>
            <View style={AppStyles.center}>
              <Text style={[AppStyles.whiteSubTitle, {color: AppColors.black}]}>
                Total Students:
              </Text>
              <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>12</Text>
            </View>
          </View>
        </View>
        <View
          style={[
            AppStyles.rowBetween,
            {marginTop: hp(2), paddingBottom: hp(1)},
          ]}>
          <View style={{width: '83%'}}>
            <AppInput
              placeholder="Search..."
              container={[AppStyles.boxShadow, {borderWidth: 0}]}
              inputStyle={{paddingLeft: hp(1)}}
              containerStyle={{marginBottom: 0}}
              rightInnerIcon={
                <GlobalIcon
                  library="Fontisto"
                  name="search"
                  color={AppColors.black}
                  size={hp(2.5)}
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => (grid == 'row' ? setGrid('column') : setGrid('row'))}
            style={[AppStyles.boxShadow, styles.gridIcon]}>
            {grid == 'row' ? (
              <GridIcon />
            ) : (
              <GlobalIcon
                library="Ionicons"
                name="grid-sharp"
                color={AppColors.dimGray}
                size={hp(2.5)}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={[AppStyles.rowBetween, AppStyles.rowBetween]}>
          <FlatList
            key={numColumns}
            numColumns={numColumns}
            data={studentsData}
            renderItem={({item, index}) => <StudentCard position={grid} item={item} index={index} />}
            columnWrapperStyle={numColumns > 1 ? styles.row : null}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: hp(20)}}
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default DriverStudentsScreen;

const styles = StyleSheet.create({
  studentContainer: {
    backgroundColor: AppColors.red,
    paddingTop: hp(0.3),
    borderRadius: 12,
  },
  titleContainer: {
    backgroundColor: AppColors.white,
    paddingHorizontal: hp(3),
    paddingVertical: hp(1.5),
    borderRadius: 10,
  },
  gridIcon: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    height: hp(5.7),
    width: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
