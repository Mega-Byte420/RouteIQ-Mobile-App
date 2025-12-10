import {View, Text, FlatList, StyleSheet, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from '../utils/color';
import {size} from '../utils/responsiveFonts';
import AppFonts from '../utils/appFonts';
import {hp} from '../utils/constants';
import GlobalIcon from './GlobalIcon';
import AppInput from './AppInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {set} from 'react-hook-form';

// Define User Type
type User = {
  id: string;
  name: string;
  avatar: keyof typeof localImages;
};

// Local images mapping
const localImages = {
  select1: require('../assets/images/select1.png'),
  select2: require('../assets/images/select2.png'),
};

// Initial user data
const initialData: User[] = [
  {id: '1', name: 'NYU', avatar: 'select1'},
  {id: '2', name: 'Johan', avatar: 'select2'},
  {id: '3', name: 'Taft Public School', avatar: 'select1'},
  {id: '4', name: 'Berkeley Haas', avatar: 'select2'},
  {id: '5', name: 'Marie Moores', avatar: 'select1'},
  {id: '6', name: 'Bobby Langford', avatar: 'select2'},
];

const GroupChat = ({arrayData}) => {
  const navigation = useNavigation();
  const [showCreateGroup, setShowCreateGroup] = useState<boolean>(false);
  const [showGroup, setShowGroup] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<User[]>([]);

  const toggleSelection = (item: User) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.some(i => i.id === item.id)) {
        return prevSelected.filter(i => i.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const toggleGroup = () => {
    setShowGroup(!showGroup);
    setShowCreateGroup(false);
  };
  return (
    <View style={styles.container}>
      {showCreateGroup ? (
        <>
          <AppInput
            placeholder="Search..."
            container={[
              {
                borderWidth: 0,
                backgroundColor: AppColors.diffGrey,
                width: '97%',
              },
            ]}
            inputStyle={{paddingLeft: hp(1), paddingVertical: hp(1.8)}}
            rightInnerIcon={
              <GlobalIcon
                library="Fontisto"
                name="search"
                color={AppColors.black}
                size={hp(2.5)}
              />
            }
          />
          <Text style={styles.header}>Selected</Text>
          <FlatList
            data={selectedItems}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.selectedItem}>
                <Image
                  source={localImages[item.avatar]}
                  style={styles.avatar}
                />
                <TouchableOpacity
                  onPress={() => toggleSelection(item)}
                  style={styles.removeButton}>
                  <GlobalIcon
                    library="MaterialIcons"
                    name="cancel"
                    size={24}
                    color={AppColors.grey}
                  />
                </TouchableOpacity>
                <Text style={styles.selectedUserName}>
                  {item.name.length > 4
                    ? item.name.slice(0, 4) + '...'
                    : item.name}
                </Text>
              </View>
            )}
          />

          <FlatList
            data={initialData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => toggleSelection(item)}
                style={styles.userItem}>
                <Image
                  source={localImages[item.avatar]}
                  style={styles.avatar}
                />
                <Text style={styles.userName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.arrowButton} onPress={toggleGroup}>
            <GlobalIcon
              library="FontAwesome6"
              name="arrow-right-long"
              size={24}
              color={AppColors.white}
            />
          </TouchableOpacity>
        </>
      ) : showGroup ? (
        <>
          <View style={styles.GroupChatIconView}>
            <Image
              source={require('../assets/images/Groupchat.png')}
              style={{width: 60, height: 60, marginRight: 10}}
            />
            <AppInput
              placeholder="Group Name"
              container={[styles.inputContainer]}
              inputStyle={{
                fontSize: 18,
                paddingVertical: 10,
                fontFamily: AppFonts.NunitoSansBold,
              }}
            />
          </View>

          <Text style={styles.header}>Members</Text>
          <FlatList
            data={selectedItems}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.selectedItem}>
                <Image
                  source={localImages[item.avatar]}
                  style={styles.avatar}
                />
                <Text style={styles.userName}>
                  {item.name.length > 4
                    ? item.name.substring(0, 4) + '...'
                    : item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleSelection(item)}
                  style={styles.removeButtonGroupIcon}>
                  <GlobalIcon
                    library="MaterialIcons"
                    name="cancel"
                    size={20}
                    color={AppColors.grey}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.checkButton}
            onPress={() => setShowCreateGroup(true)}>
            <GlobalIcon
              library="FontAwesome5"
              name="check"
              size={24}
              color={AppColors.white}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Default Group Chat List */}
          <Pressable style={styles.headerCenterItem}>
            <AppInput
              placeholder="Search..."
              container={[
                {borderWidth: 0, backgroundColor: AppColors.diffGrey},
              ]}
              inputStyle={{paddingLeft: hp(1), paddingVertical: hp(1.8)}}
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
          </Pressable>
          <FlatList
            data={arrayData}
            keyExtractor={item => item.id?.toString() || item.title}
            renderItem={({item}) => (
              <View style={styles.groupchatView}>
                <View style={styles.groupChat}>
                  <Text style={styles.groupChatText}>PS</Text>
                </View>
                <View style={styles.chatItem}>
                  <View style={styles.chatItemStyle}>
                    <Text style={styles.groupName}>{item.title}</Text>
                    <Text style={styles.lastMessage}>{item.time}</Text>
                  </View>
                  <Text style={styles.lastMessage}>{item.message}</Text>
                </View>
              </View>
            )}
          />
          {/* Create New Group Button */}
          <View style={styles.createNewGroupView}>
            <GlobalIcon
              library="Entypo"
              name="plus"
              size={24}
              color={AppColors.red}
            />
            <TouchableOpacity onPress={() => setShowCreateGroup(true)}>
              <Text style={styles.createNewGroupText}>Create New Group</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default GroupChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: 10,
  },
  backButton: {
    marginBottom: 10,
  },

  selectedAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  selectedName: {
    fontSize: 12,
    marginTop: 5,
  },
  chatItem: {
    padding: 15,
  },
  groupName: {
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.black,
  },
  lastMessage: {
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
    color: AppColors.dimGray,
    marginTop: 5,
  },
  groupchatView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupChat: {
    backgroundColor: AppColors.red,
    width: 50,
    height: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupChatText: {
    color: AppColors.white,
    fontSize: 16,
  },
  createNewGroupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  createNewGroupText: {
    color: AppColors.red,
    fontSize: 24,
    fontFamily: AppFonts.NunitoSansBold,
  },
  headerCenterItem: {
    width: '100%',
    marginBottom: hp(1),
  },
  header: {
    fontSize: 18,
    fontFamily: AppFonts.NunitoSansSemiBold,
    marginBottom: 10,
    color: AppColors.black,
    paddingHorizontal: 12,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansBold,
  },
  selectedUserName: {
    fontSize: 16,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansBold,
    position: 'relative',
    bottom: 14,
  },

  selectedItem: {
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  removeButton: {
    bottom: 20,
    left: 10,
    borderRadius: 10,
    padding: 2,
  },

  removeButtonGroupIcon: {
    bottom: 40,
    left: 10,
    borderRadius: 10,
    padding: 2,
  },
  arrowButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: AppColors.red,
    padding: 10,
    borderRadius: 2,
  },
  checkButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: AppColors.red,
    padding: 10,
    borderRadius: 2,
  },
  inputContainer: {
    borderBottomWidth: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: 300,
    borderColor: AppColors.red,
  },
  GroupChatIconView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  chatItemStyle: {
    flexDirection: 'row',
    gap: hp(14),
    alignItems: 'center',
  },
});
