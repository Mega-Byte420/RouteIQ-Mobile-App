import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import { AppColors } from '../../utils/color';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import GlobalIcon from '../../components/GlobalIcon';
import AppStyles from '../../styles/AppStyles';
import { hp } from '../../utils/constants';

const RetailHistory = () => {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState([
    { id: '1', trip: '#125481', price: '$256', daysAgo: '05 day ago' },
    { id: '2', trip: '#125481', price: '$256', daysAgo: '01 day ago' },
    { id: '3', trip: '#125481', price: '$256', daysAgo: '05 day ago' },
  ]);

  const handleDelete = (id: string) => {
    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this trip?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => handleDelete(id) },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.card, item.daysAgo.includes('01') && styles.redCard]}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
          <GlobalIcon library='AntDesign' name='delete' size={24} color={AppColors.black}/>
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.tripText}>Trip {item.trip}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <Text style={styles.dateText}>{item.daysAgo}</Text>
        </View>
        
      </View>
    );
  };

  return (
    <AppLayout
      statusbackgroundColor={AppColors.red}
      style={{ backgroundColor: AppColors.white }}>
      <AppHeader
        role="Retail"
        title="History"
        enableBack={true}
        rightIcon={false}
        createRightIcon={
          <Menu>
            <MenuTrigger>
              <View style={styles.icon}>
                <GlobalIcon
                  library="Entypo"
                  name="dots-three-vertical"
                  color={AppColors.white}
                  size={hp(3)}
                />
              </View>
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.menuOptions}>
              <MenuOption onSelect={() => console.log('Mark all as read')}>
                <Text style={AppStyles.title}>Mark all as read</Text>
              </MenuOption>
              <MenuOption
                style={{ marginBottom: hp(2) }}
                onSelect={() => console.log('Delete all')}>
                <Text style={AppStyles.title}>Delete all</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        }
      />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Trip History List */}
        <FlatList
          data={history}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </AppLayout>
  );
};

export default RetailHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f2e8',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: hp(2),
  },
  card: {
    backgroundColor: '#f5f2e8',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  redCard: {
    backgroundColor: '#f8d7da',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceText: {
    color: AppColors.red,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#888',
    fontSize: 14,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    alignItems: 'flex-end',
  },
  icon: {
    padding: hp(1),
  },
  menuOptions: {
    marginTop: hp(2.5),
    marginLeft: hp(-2.4),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: hp(1),
    paddingVertical: hp(1.5),
  },
});
