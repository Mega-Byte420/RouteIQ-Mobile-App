import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FuelCardProps} from '../types/types';
import {Image} from 'react-native';
import AppStyles from '../styles/AppStyles';
import {size} from '../utils/responsiveFonts';
import {AppColors} from '../utils/color';
import {Modal} from 'react-native';
import AppFonts from '../utils/appFonts';
import DropIcon from '../assets/svgs/DropIcon';
import LocationIcon from '../assets/svgs/LocationIcon';

const FuelCard: React.FC<FuelCardProps> = ({
  glNumber,
  date,
  price,
  gallons,
  pricePerGallon,
  location,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View
          style={[styles.logoPlaceholder, {backgroundColor: 'transparent'}]}>
          <Image
            style={[
              styles.logoPlaceholder,
              {width: wp('10%'), marginRight: hp(2)},
            ]}
            source={require('../assets/images/iconfuel.png')}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={[
                AppStyles.title,
                {fontSize: size.lg, fontFamily: AppFonts.NunitoSansBold},
              ]}>
              {glNumber}
            </Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.viewReceipt}>View Receipt</Text>
          <Text style={styles.price}>${price.toFixed(3)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoRow}>
        <DropIcon />
        <Text style={styles.infoText}>
          {gallons.toFixed(2)} gal → ${pricePerGallon.toFixed(3)}/gal
        </Text>
      </View>
      <View style={[styles.infoRow, {marginTop: hp(1)}]}>
        <LocationIcon />
        <Text style={styles.location}>{location}</Text>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Image
            source={require('../assets/images/recipt.png')}
            style={styles.modalImage}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: hp(1),
    marginHorizontal: hp(2),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  logoPlaceholder: {
    flexDirection: 'row',
    height: wp('10%'),
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },

  viewReceipt: {
    fontSize: size.default,
    color: AppColors.red,
    fontFamily: AppFonts.NunitoSansBold,
  },
  date: {
    fontSize: size.md,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
    marginBottom: hp('0.5%'),
  },
  price: {
    fontSize: size.lg,
    color: AppColors.black,
    marginBottom: hp('1%'),
    fontFamily: AppFonts.NunitoSansBold,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  infoText: {
    fontSize: size.default,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
    marginLeft: hp(0.5),
  },
  location: {
    fontSize: size.default,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
    marginLeft: hp(0.5),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: hp('5%'),
    right: wp('5%'),
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: size.lg,
  },
  modalImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default FuelCard;
