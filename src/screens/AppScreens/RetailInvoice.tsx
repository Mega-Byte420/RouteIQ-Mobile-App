import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {screenWidth, hp, wp} from '../../utils/constants';
import {AppColors} from '../../utils/color';
import {size} from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';
import GlobalIcon from '../../components/GlobalIcon';
import AppHeader from '../../components/AppHeader';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

const InvoiceScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <AppHeader
        role="Driver"
        title="Invoice"
        enableBack={true}
        rightIcon={true}
        switchIcon={false}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Invoice Details Section */}
        <View style={styles.invoiceContainer}>
          <Text style={styles.invoiceTitle}>Invoice</Text>
          <Text style={styles.clientText}>Client – Zing</Text>
          <Text style={styles.dateText}>Date Period - Jan 1-31, 2023</Text>

          {/* Invoice Body */}
          <View style={styles.invoiceBody}>
            <View style={styles.invoiceContent}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.subTitle}>Rate (Monthly)</Text>
              <Text style={styles.subTitle}>Subtotal</Text>
            </View>

            <View style={styles.invoiceContentLeft}>
              <View style={{flex: 1}}>
                <Text style={styles.designServicesText}>Design Services</Text>
                <Text style={styles.designConsultingText}>Consulting</Text>
              </View>

              {/* Right Side - Prices */}
              <View style={styles.invoiceItemRight}>
                <Text style={styles.priceText}>$12,345.00</Text>
                <Text style={styles.priceText}>$12,345.00</Text>
              </View>
            </View>

            <View style={styles.ExpensesView}>
              <View style={styles.invoiceContentLeft}>
                <View style={{flex: 1}}>
                  <Text style={styles.designServicesText}>Expenses</Text>
                  <Text style={styles.designConsultingText}>Expenses One</Text>
                  <Text style={styles.designConsultingText}>Expenses Two</Text>
                  <Text style={styles.designConsultingText}>
                    Expenses Three
                  </Text>
                </View>

                {/* Right Side - Prices */}
                <View style={styles.invoiceItemExpenses}>
                  <Text style={styles.priceText}>$123.45</Text>
                  <Text style={styles.priceText}>$123.45</Text>
                  <Text style={styles.priceText}>$123.45</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Total Amount Section */}
        <View style={styles.totalContainer}>
          <View style={styles.additionalInfoView}>
            <Text style={styles.totalLabel}>Additional Information</Text>
            <Text style={styles.totalLabel}>Total Due</Text>
          </View>

          <View style={styles.invoiceContentLeft}>
            <View style={{flex: 1}}>
              <Text style={styles.additionalInfoText}>Account #: 0000-000</Text>
              <Text style={styles.additionalInfoText}>Transit #: 000000</Text>
              <Text style={styles.additionalInfoText}>Institution: 000</Text>
            </View>

            {/* Right Side - Prices */}
            <View style={styles.invoiceItemExpenses}>
              <Text style={styles.priceTextAdditionalInfo}>$12,345.00</Text>
              <Text style={styles.additionalInfoDec}>
                Total payment due in 30 days.
              </Text>
            </View>
          </View>

          <View style={styles.additionalInfoBottomView}>
            <Image
              source={require('../../assets/images/pinkBgRound.png')}
              style={styles.additionalInfoBottomImg}
            />
            <Text style={styles.emailText}>
              Thank you! – invoicename@gmail.com
            </Text>
            <Text style={styles.emailText}>$CAD</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <AppButton
            title="Share"
            style={styles.shareButton}
            leftIcon={
              <GlobalIcon
                library="Entypo"
                name="share"
                size={24}
                color={AppColors.white}
              />
            }
          />

          <AppButton
            title="Download"
            style={styles.downloadButton}
            leftIcon={
              <GlobalIcon
                library="Feather"
                name="download"
                color={AppColors.white}
                size={24}
              />
            }
          />
        </View>

        <AppButton 
          title="Pay" 
          style={styles.payButton} 
          onPress={()=>navigation.navigate('RetailPayment')}
          />
      </ScrollView>
    </>
  );
};

export default InvoiceScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: AppColors.profileBg,
    alignItems: 'center',
    paddingBottom: hp(5),
  },
  invoiceContainer: {
    width: screenWidth * 0.9,
    backgroundColor: AppColors.white,
    padding: wp(5),
    elevation: 5,
    marginTop: hp(4),
  },
  invoiceTitle: {
    color: AppColors.black,
    fontSize: size.lg,
    fontFamily: AppFonts.NunitoSansBold,
  },
  clientText: {
    color: AppColors.black,
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
    marginTop: hp(0.5),
  },
  dateText: {
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansRegular,
    color: AppColors.black,
  },
  invoiceBody: {
    marginTop: hp(2),
  },
  sectionTitle: {
    color: AppColors.black,
    fontSize: 14,
    fontFamily: AppFonts.NunitoSansBold,
  },
  subTitle: {
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansSemiBold,
    color: AppColors.black,
  },
  invoiceItemRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(40),
  },

  invoiceItemExpenses: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansRegular,
  },
  expensesContainer: {
    marginTop: hp(1),
  },
  expenseItem: {
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
  },
  totalContainer: {
    width: screenWidth * 0.9,
    backgroundColor: AppColors.red,
    padding: wp(5),
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.white,
  },
  totalAmount: {
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.white,
    marginTop: hp(1),
  },
  additionalInfo: {
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
    color: AppColors.white,
    marginTop: hp(0.5),
  },
  emailText: {
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
    color: AppColors.white,
    marginTop: hp(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth * 0.9,
    marginTop: hp(2),
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.red,
    flex: 1,
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    marginRight: wp(2),
    borderRadius: hp(1),
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.red,
    flex: 1,
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    marginLeft: wp(2),
    borderRadius: hp(1),
  },
  buttonText: {
    color: AppColors.white,
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
    marginLeft: wp(1),
  },
  payButton: {
    backgroundColor: AppColors.red,
    width: screenWidth * 0.9,
    alignItems: 'center',
    marginTop: hp(2),
    borderRadius: hp(1),
  },
  payText: {
    color: AppColors.white,
    fontSize: size.lg,
    fontFamily: AppFonts.NunitoSansBold,
  },
  invoiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: AppColors.black,
  },
  invoiceContentLeft: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1),
  },
  designServicesText: {
    color: AppColors.black,
    fontSize: 14,
    fontFamily: AppFonts.NunitoSansBold,
  },
  designConsultingText: {
    color: AppColors.black,
    fontSize: 14,
    fontFamily: AppFonts.NunitoSansRegular,
  },
  ExpensesView: {
    marginTop: hp(4),
  },
  additionalInfoView: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: AppColors.white,
  },
  additionalInfoText: {
    color: AppColors.white,
    fontSize: 12,
    fontFamily: AppFonts.NunitoSansRegular,
  },
  priceTextAdditionalInfo: {
    color: AppColors.white,
    fontSize: 25,
    fontFamily: AppFonts.NunitoSansBold,
  },
  additionalInfoDec: {
    color: AppColors.white,
    fontSize: 10,
    fontFamily: AppFonts.NunitoSansBold,
  },
  additionalInfoBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1.5,
    borderTopColor: AppColors.white,
    marginTop: hp(2),
  },
  additionalInfoBottomImg: {
    width: 20,
    height: 20,
    marginTop: hp(1),
  },
});
