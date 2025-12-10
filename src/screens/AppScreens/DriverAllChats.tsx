
  import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import AppHeader from '../../components/AppHeader';
import { AppColors } from '../../utils/color';
import AppStyles from '../../styles/AppStyles';
import {fontSize, size} from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts'
import {FlatList} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigationTypes';
import GlobalIcon from '../../components/GlobalIcon';
import { chats_data } from '../../utils/DummyData';
import {useAppDispatch} from '../../store/hooks';
import {setSelectedUserChatData} from '../../store/user/userSlices';
import { hp } from '../../utils/constants';
import AppInput from '../../components/AppInput';
import { DriverAllChatsProps } from '../../types/types';

const DriverAllChats: React.FC<DriverAllChatsProps> = ({arrayData, setSchoolChattingScreen}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();


  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
      </View>
      <Pressable style={styles.headerCenterItem}>
      <AppInput
              placeholder="Search..."
              container={[ {borderWidth: 0,  backgroundColor: AppColors.profileBg}]}
              inputStyle={{paddingLeft: hp(1), paddingVertical: hp(1.8) }}
              containerStyle={{marginBottom: hp(-1), }}
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
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={arrayData}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() => {
                dispatch(
                  setSelectedUserChatData({
                    name: item?.title,
                    profile_image: require('../../assets/images/profile_image.webp') || '',
                  }),
                );
                // navigation.navigate('DriverChats');
               if(setSchoolChattingScreen!==undefined){
                 setSchoolChattingScreen(true);
                }
              }}
              style={[
                AppStyles.row,
                AppStyles.widthFullPercent,
                {paddingVertical: hp(1.6)},
              ]}>
              <Image
                style={styles.image}
                source={require('../../assets/images/profile_image.webp')}
              />
              <View
                style={[
                  AppStyles.rowBetween,
                  {marginLeft: hp(2), width: '80%', alignItems: 'flex-start'},
                ]}>
                <View style={{gap: hp(0.3)}}>
                  <Text
                    style={[
                      AppStyles.title,
                      {
                        fontSize: size.md,
                        fontFamily: AppFonts.NunitoSansSemiBold,
                      },
                    ]}>
                    {item.title}
                  </Text>
                  <Text style={[AppStyles.title, {fontSize: size.s, color: AppColors.gradientGrey, fontFamily: AppFonts.NunitoSansMedium}]}>
                    {item.message}
                  </Text>
                </View>
                <Text
                  style={[
                    AppStyles.title,
                    {fontSize:size.s, marginTop: hp(0.5),color: AppColors.gradientGrey, fontFamily: AppFonts.NunitoSansMedium},
                  ]}>
                  {item.time}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

export default React.memo(DriverAllChats);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  header: {
    height: hp(3)
  },
  container: {
    backgroundColor: AppColors.inputColor,
    flex: 1,
    borderTopEndRadius: hp(5),
    borderTopStartRadius: hp(5),
    paddingHorizontal: hp(2),
    paddingTop: hp(2),
  },
  image: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(3),
  },
  headerCenterItem: {
    width: '100%',
    paddingHorizontal: hp(2),
    marginBottom: hp(1),
  },
  containerStyle: {
    height: 45,
    marginTop: hp(1),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: hp(1),
  },
  inputStyle: {paddingLeft: hp(1.5), color: AppColors.white, width: '95%'},
});
