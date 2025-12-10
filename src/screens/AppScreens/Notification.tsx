import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalIcon from '../../components/GlobalIcon';
import {AppColors} from '../../utils/color';
import AppHeader from '../../components/AppHeader';
import AppLayout from '../../layout/AppLayout';
import {useAppSelector} from '../../store/hooks';
import AppStyles from '../../styles/AppStyles';
import {NotificationData} from '../../utils/DummyData';
import AppFonts from '../../utils/appFonts';
import {hp, wp} from '../../utils/constants';
import {size} from '../../utils/responsiveFonts';
import DeleteIcon from '../../assets/svgs/DeleteIcon';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useNavigation} from '@react-navigation/native';

const Notifications = () => {
  const navigation = useNavigation();
  const role = useAppSelector(state => state.userSlices.role);
  const [selected, setSelected] = React.useState<Array<number | string>>([3]);

  return (
    <AppLayout
      statusbackgroundColor={role == 'Driver' ? AppColors.red : AppColors.red}
      style={{
        backgroundColor:
          role == 'Driver' ? AppColors.driverScreen : AppColors.black,
      }}>
      {role == 'Driver' ? (
        <AppHeader
          role="Retail"
          title="Notification"
          enableBack={true}
          rightIcon={false}
          containerStyle={styles.driverHeader}
          titleStyle={styles.titleStyle}
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
                  style={{marginBottom: hp(2)}}
                  onSelect={() => console.log('Delete all')}>
                  <Text style={AppStyles.title}>Delete all</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          }
        />
      ) : (
        <AppHeader
          role="Retail"
          title="Notification"
          enableBack={true}
          rightIcon={false}
          containerStyle={styles.driverHeader}
          titleStyle={styles.titleStyle}
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
                  style={{marginBottom: hp(2)}}
                  onSelect={() => console.log('Delete all')}>
                  <Text style={AppStyles.title}>Delete all</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          }
        />
      )}
      <View
        style={[
          AppStyles.body,
          {
            flex: 1,
            paddingHorizontal: 0,
            backgroundColor:
              role == 'Driver' || role== 'Retail' ? AppColors.profileBg : AppColors.white,
            paddingTop: hp(2),
            marginTop: hp(-2)
          },
        ]}>
        {NotificationData.length >= 0 ? (
          <FlatList
            contentContainerStyle={{padding: hp(0)}}
            data={NotificationData}
            renderItem={({item}: {item: any}) => {
              return (
                <Pressable
                  style={[
                    styles.column,
                    {
                      backgroundColor: selected.includes(item.id)
                        ? AppColors.lightRed
                        : AppColors.profileBg,
                    },
                  ]}>
                  {item.title && (
                    <View style={AppStyles.rowBetween}>
                      <Text
                        style={[
                          styles.bigtext,
                          {
                            alignSelf: 'flex-start',
                            width: '90%',
                          },
                        ]}>
                        {item?.title}
                      </Text>
                      <TouchableOpacity>
                        <DeleteIcon />
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={styles.row2}>
                    <View
                      style={[
                        AppStyles.rowBetween,
                        AppStyles.widthFullPercent,
                        {
                          alignItems: 'flex-start',
                        },
                      ]}>
                      <Text style={[styles.text, {width: '90%'}]}>
                        {item.message}
                      </Text>
                      {!item?.title && (
                        <TouchableOpacity>
                          <DeleteIcon />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  {item.new === true && (
                    <TouchableOpacity
                      onPress={() => role == 'Driver' ? navigation.navigate('DriverChats') : navigation.navigate('ChatScreen')}>
                      <Text style={[styles.replyText]}>{'Reply'}</Text>
                    </TouchableOpacity>
                  )}

                  <View style={{}}>
                    <Text
                      style={[
                        styles.text,
                        {color: AppColors.grey, alignSelf: 'flex-end'},
                      ]}>
                      {item.timeWhenArrived}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        ) : (
          <View style={styles.noNotifContainer}>
            <View style={{top: hp(4)}}>
              <GlobalIcon
                library="FontelloIcon"
                name="checkmark-1"
                color={role == 'Driver' ? AppColors.red : AppColors.black}
                size={80}
              />
            </View>
            <Text
              style={[
                styles.textWhenEmptyNotifs,
                {fontFamily: AppFonts.NunitoSansBold},
              ]}>
              All Caught Up
            </Text>
            <Text
              style={[
                styles.textWhenEmptyNotifs,
                {color: AppColors.black, fontFamily: AppFonts.NunitoSansMedium},
              ]}>
              No new notifications yet for you
            </Text>
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  column: {
    paddingHorizontal: wp(3.5),
    borderRadius: 0,
    padding: hp(2),
    backgroundColor: AppColors.lightRed,
    paddingVertical: hp(2),
    gap: hp(0.5),
  },
  row2: {
    padding: hp(0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: AppColors.black,
  },

  column2: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: size.sl,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansMedium,
    // width: wp(90),
    textAlign: 'left',
    verticalAlign: 'top',
    lineHeight: 20,
  },
  bigtext: {
    fontSize: size.md,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansSemiBold,
    // width: wp(90),
    textAlign: 'left',
    verticalAlign: 'top',
    lineHeight: 20,
  },

  replyText: {
    fontSize: size.md,
    fontFamily: AppFonts.NunitoSansSemiBold,
    textAlign: 'left',
    verticalAlign: 'top',
    lineHeight: 20,
    alignSelf: 'flex-start',
    color: AppColors.red,
    marginTop: hp(0.5),
  },
  smallCircle: {
    // borderRadius: 100,
    // width: 7,
    // height:7,
    // backgroundColor: AppColors.red
    // alignSelf: 'center'
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: AppColors.blue
  },

  textWhenEmptyNotifs: {
    fontSize: 14,
    color: AppColors.black,
    fontFamily: AppFonts.NunitoSansRegular,
  },

  noNotifContainer: {
    flex: 0.9, //need fix here
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(1),
  },
  icon: {padding: hp(1)},
  menuOptions: {
    marginTop: hp(2.5),
    marginLeft: hp(-2.4),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: hp(1),
    paddingVertical: hp(1.5),
  },
  driverHeader: {
    width: '100%',
    height: hp(11),
    backgroundColor: AppColors.red,
    paddingHorizontal: hp(1),
    justifyContent: 'center',
    marginTop: hp(0),
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: size.lg,
    color: AppColors.white,
    fontFamily: AppFonts.NunitoSansBold,
  },
});
