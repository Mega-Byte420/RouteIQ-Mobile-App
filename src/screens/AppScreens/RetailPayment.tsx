import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import {AppColors} from '../../utils/color';
import AppFonts from '../../utils/appFonts';

// Sample Data
const savedCards = [
  {
    id: '1',
    type: 'mastercard',
    number: '4589 45** **** 7589',
    selected: true,
    logo: require('../../assets/images/mastercard.png'),
  },
  {
    id: '2',
    type: 'visa',
    number: '5268 74** **** 5416',
    selected: false,
    logo: require('../../assets/images/visa.png'),
  },
];

const paymentMethods = [
  {
    id: '1',
    type: 'visa',
    name: 'Credit/Debit Card',
    logo: require('../../assets/images/visa.png'),
  },
  {
    id: '2',
    type: 'stripe',
    name: 'Stripe',
    logo: require('../../assets/images/stripe.png'),
  },
];

// Payment Screen Component
const RetailPayment = () => {
  const [cards, setCards] = useState(savedCards);

  const handleSelectCard = (id: string) => {
    setCards(cards.map(card => ({...card, selected: card.id === id})));
  };

  const renderCard = ({item}: {item: (typeof savedCards)[0]}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectCard(item.id)}>
      <View style={styles.cardInfo}>
        <Image source={item.logo} style={styles.logo} />
        <Text style={styles.cardText}>{item.number}</Text>
      </View>
      {item.selected && (
        <FontAwesome name="check-circle" size={18} color="red" />
      )}
    </TouchableOpacity>
  );

  const renderPaymentMethod = ({item}: {item: (typeof paymentMethods)[0]}) => (
    <View style={styles.paymentOption}>
      <Image source={item.logo} style={styles.logo} />
      <Text style={styles.methodText}>{item.name}</Text>
    </View>
  );

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{backgroundColor: AppColors.profileBg}}>
      <AppHeader
        role="Driver"
        title="Payment"
        enableBack={true}
        rightIcon={true}
      />
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved payment methods</Text>
          <FlatList
            data={cards}
            keyExtractor={item => item.id}
            renderItem={renderCard}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment methods</Text>
          <FlatList
            data={paymentMethods}
            keyExtractor={item => item.id}
            renderItem={renderPaymentMethod}
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default RetailPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE7DA',
    padding: 16,
  },
  section: {
    backgroundColor: AppColors.white,
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily:AppFonts.NunitoSansBold,
    marginBottom: 8,
    color:AppColors.black
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color:AppColors.black,
    fontSize: 14,
    marginLeft: 8,
    fontFamily:AppFonts.NunitoSansRegular
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  methodText: {
    color:AppColors.black,
    fontSize: 15,
    marginLeft: 8,
    fontFamily:AppFonts.NunitoSansRegular
  },
  logo: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
});
