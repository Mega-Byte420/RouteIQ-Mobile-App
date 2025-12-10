import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { hp, wp } from '../../utils/constants';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import { AppColors } from '../../utils/color';
import AppFonts from '../../utils/appFonts';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';

interface RFQItem {
  id: string;
  status: 'ACCEPTED' | 'REVIEWED' | 'DECLINED';
}

const rfqData: RFQItem[] = [
  { id: '125', status: 'ACCEPTED' },
  { id: '126', status: 'REVIEWED' },
  { id: '127', status: 'DECLINED' },
  { id: '128', status: 'ACCEPTED' },
];

const RetailRFQ = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: RFQItem }) => (
    <View
      style={[
        styles.rfqItem,
        {
          borderTopWidth: 2,
          borderTopColor:
            item.status === 'ACCEPTED'
              ? '#2CD671'
              : item.status === 'REVIEWED'
              ? '#FED743'
              : AppColors.red,
        },
      ]}
    >
      <View style={styles.rfqHeader}>
        <Text style={styles.rfqText}>RFQ#{item.id}</Text>
        <View style={[styles.statusBadge, styles[item.status.toLowerCase() + 'Badge']]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => navigation.navigate('RetailDetail')}>
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
        {item.status !== 'ACCEPTED' ? (
          <TouchableOpacity onPress={() => navigation.navigate('EditRetailDetail')}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('RetailInvoice')}>
            <Text style={styles.actionText}>View Invoice</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <AppLayout statusbackgroundColor={AppColors.red} style={{ backgroundColor: AppColors.profileBg }}>
      <AppHeader role="Driver" title="RFQ" enableBack={false} rightIcon={true} switchIcon={false} />

      <View style={styles.tripView}>
        <View style={styles.tripBg}>
          <Text style={styles.tripNumber}>15</Text>
          <Text style={styles.tripText}>Pending</Text>
        </View>
        <View style={styles.tripBg}>
          <Text style={styles.tripNumber}>$1058</Text>
          <Text style={styles.tripText}>Spend</Text>
        </View>
      </View>

      <FlatList
        data={rfqData}
        keyExtractor={item => item.id + item.status}
        renderItem={renderItem}
      />

      <View style={styles.btnView}>
        <AppButton
          title="New Request for Quote"
          onPress={() => navigation.navigate('RetailRequestQuote')}
          style={styles.QuoteBtn}
        />
        <AppButton
          title="Import Terms & condition"
          style={styles.TermsConditionBtn}
        />
      </View>
    </AppLayout>
  );
};

export default RetailRFQ;

const styles = StyleSheet.create({
  subContainer: {
    width: '100%',
    justifyContent: 'center',
    marginTop: hp(3),
    gap: hp(2),
    paddingHorizontal: wp(5),
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
  rfqItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: AppColors.white,
    marginTop: hp(2),
    borderRadius: 1,
  },
  rfqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rfqText: {
    fontSize: 14,
    color: AppColors.lightBlack,
    fontFamily: AppFonts.NunitoSansRegular,
  },
  statusBadge: {
    padding: 5,
    borderRadius: 10,
  },
  acceptedBadge: {
    backgroundColor: '#2CD671',
    width: '25%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  reviewedBadge: {
    backgroundColor: '#FED743',
    width: '25%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  declinedBadge: {
    backgroundColor: AppColors.red,
    width: '25%',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  statusText: {
    color: AppColors.black,
    fontSize: 9,
    fontFamily: AppFonts.NunitoSansMedium,
    lineHeight: 11,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  actionText: {
    color: AppColors.red,
    fontSize: 14,
    fontFamily: AppFonts.NunitoSansRegular,
    marginRight: 10,
  },
  btnView: {
    alignItems: 'center',
    padding: 10,
  },
  QuoteBtn: {
    width: '100%',
  },
  TermsConditionBtn: {
    width: '100%',
  },
});
