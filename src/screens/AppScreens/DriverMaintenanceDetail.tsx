import React, {useState} from 'react';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import {AppColors} from '../../utils/color';
import {useAppSelector} from '../../store/hooks';
import AppStyles from '../../styles/AppStyles';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppInput from '../../components/AppInput';
import {hp, screenHeight} from '../../utils/constants';
import AppFonts from '../../utils/appFonts';
import {size} from '../../utils/responsiveFonts';
import {Image} from 'react-native';
import CleaningCard from '../../components/CleaningCard';
import AnimatedDriverMapView from '../../components/AnimatedDriverMapView';
import CleaningCollapsableCard from '../../components/CleaningCollapsableCard';
import { cleaningCollapsedCard } from '../../utils/DummyData';

const DriverMaintenanceDetail = () => {
  const maintenanceDetail = useAppSelector(
    state => state.driverSlices.maintenanceDetail,
  );
  const [mileage, setMileage] = useState('');

  const fuelItem = () => {
    return (
      <>
        <AppInput
          label="Enter Current Mileage"
          value={mileage}
          placeholder="e.g 201569"
          onChangeText={(text: string) => setMileage(text)}
          keyboardType="number-pad"
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
        />
        <View style={[styles.containerStyle, {marginTop: hp(1)}]}>
          <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
            Fuel Card
          </Text>
          <Image
            style={styles.image}
            source={require('../../assets/images/Credit-Card-Design.png')}
          />
        </View>
      </>
    );
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.driverScreen}}
      alarmIcon={true}>
      <AppHeader
        role="Driver"
        title={maintenanceDetail || ''}
        enableBack={true}
        rightIcon={true}
      />
      <ScrollView>
        <View style={[AppStyles.driverContainer, {paddingTop: hp(4)}]}>
          {maintenanceDetail == 'Fuel' && fuelItem()}
          {/* {maintenanceDetail == 'Cleaning' && <CleaningCard />} */}
          {/* {maintenanceDetail == 'Cleaning' && <FlatList data={cleaningCollapsedCard} renderItem={({item}) => <CleaningCollapsableCard item={item} />} contentContainerStyle={{gap: hp(2)}} />} */}

            {maintenanceDetail == 'Cleaning' && (
              <FlatList
                data={cleaningCollapsedCard}
                renderItem={({item}) => <CleaningCollapsableCard item={item} />}
                contentContainerStyle={{gap: hp(2)}}
              />
            )}


          {maintenanceDetail == 'Mileage Record' && (
            <>
            <CleaningCard mileage={true} />
            <View style={{marginTop:hp(2)}}>
            <CleaningCard mileage={true} />
            </View>
            <View style={{marginTop:hp(2)}}>
            <CleaningCard mileage={true} />
            </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* {maintenanceDetail == 'Cleaning' && <AnimatedDriverMapView />} */}
    </AppLayout>
  );
};

export default DriverMaintenanceDetail;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: AppColors.white,
    padding: hp(2),
    borderRadius: 16,
  },
  inputStyle: {
    height: hp(5.5),
  },
  labelStyle: {
    fontFamily: AppFonts.NunitoSansSemiBold,
  },
  image: {
    height: hp(30),
    width: '100%',
    resizeMode: 'contain',
    marginTop: hp(1),
  },
});
