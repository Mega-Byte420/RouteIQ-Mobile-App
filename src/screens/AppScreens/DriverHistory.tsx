import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import {size} from '../../utils/responsiveFonts';
import {AppColors} from '../../utils/color';
import {hp, wp} from '../../utils/constants';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import DriverHistoryInfo from '../../components/DriverHistoryInfo';
import GlobalIcon from '../../components/GlobalIcon';

const DriverHistory = () => {
  const [Attendance, setAttendance] = useState(true);
  const [pto, setPto] = useState(false);
  const [feedbackType, setFeedbackType] = useState('School');

  const feedbacks = [
    {
      profilePic: require('../../assets/images/JacobJones.png'),
      name: 'Jacob Jones',
      response:
        'Studies show being critiqued can feel threatening, triggering the fight-flight-freeze stress response.',
    },
    {
      profilePic: require('../../assets/images/MeeAo.png'),
      name: 'Mee Ao',
      response:
        'Studies show being critiqued can feel threatening, triggering the fight-flight-freeze stress response.',
    },
    {
      profilePic: require('../../assets/images/ShonaMor.png'),
      name: 'Shona Mor',
      response:
        'Studies show being critiqued can feel threatening, triggering the fight-flight-freeze stress response.',
    },
  ];

  const schoolFeedbacks = [
    {
      profilePic: require('../../assets/images/JacobJones.png'),
      name: 'Jacob Jones',
      response: 'School feedback: punctual and responsible driver.',
    },
    {
      profilePic: require('../../assets/images/MeeAo.png'),
      name: 'Mee Ao',
      response: 'School feedback: maintains bus cleanliness.',
    },
    {
      profilePic: require('../../assets/images/ShonaMor.png'),
      name: 'Shona Mor',
      response: 'School feedback: great with kids.',
    },
  ];

  const vendorFeedbacks = [
    {
      profilePic: require('../../assets/images/JacobJones.png'),
      name: 'Vendor 1',
      response: 'Vendor feedback: always on time with reports.',
    },
    {
      profilePic: require('../../assets/images/MeeAo.png'),
      name: 'Vendor 2',
      response: 'Vendor feedback: communicates delays well.',
    },
    {
      profilePic: require('../../assets/images/ShonaMor.png'),
      name: 'Vendor 3',
      response: 'Vendor feedback: professional attitude.',
    },
  ];

  const parentFeedbacks = [
    {
      profilePic: require('../../assets/images/JacobJones.png'),
      name: 'Parent A',
      response: 'Parent feedback: very polite driver.',
    },
    {
      profilePic: require('../../assets/images/MeeAo.png'),
      name: 'Parent B',
      response: 'Parent feedback: helps kids board safely.',
    },
    {
      profilePic: require('../../assets/images/ShonaMor.png'),
      name: 'Parent C',
      response: 'Parent feedback: always greets with a smile.',
    },
  ];

  const getCurrentFeedbacks = () => {
    switch (feedbackType) {
      case 'School':
        return schoolFeedbacks;
      case 'Vendor':
        return vendorFeedbacks;
      case 'Parent':
        return parentFeedbacks;
      default:
        return [];
    }
  };

  const renderData = (type: any) => {
    return (
      <>
        {type == 'Absent' ? (
          <View
            style={[styles.container, {backgroundColor: AppColors.palePink}]}>
            {/* <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}> */}

            <Text style={styles.title}>{type}</Text>
            <View style={[AppStyles.row, {gap: hp(1), marginTop: hp(0)}]}>
              <Text
                style={[
                  styles.subTitle,
                  {backgroundColor: AppColors.red, color: AppColors.white},
                ]}>
                8:00 AM
              </Text>
              <Text
                style={[
                  styles.subTitle,
                  {backgroundColor: AppColors.red, color: AppColors.white},
                ]}>
                Feb 25, 2024
              </Text>
            </View>
            {/* </View> */}

            {/* <View style={styles.absentTitleContainer}>
          <Text style={styles.absentTitle}>Reason:</Text>
          <Text style={styles.absentSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</Text>
        </View> */}
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={styles.title}>{type}</Text>
            <View style={[AppStyles.row, {gap: hp(1), marginTop: hp(0)}]}>
              <Text
                style={[
                  styles.subTitle,
                  type == 'Check In' || type == 'Check Out'
                    ? {backgroundColor: AppColors.green, color: AppColors.white}
                    : {backgroundColor: AppColors.yellow},
                ]}>
                8:00 AM
              </Text>
              <Text
                style={[
                  styles.subTitle,
                  type == 'Check In' || type == 'Check Out'
                    ? {backgroundColor: AppColors.green, color: AppColors.white}
                    : {backgroundColor: AppColors.yellow},
                ]}>
                Feb 25, 2024
              </Text>
            </View>
          </View>
        )}
      </>
    );
  };
  return (
    <AppLayout statusbackgroundColor={AppColors.red}>
      <AppHeader
        role="Driver"
        title={'Driver History'}
        enableBack={true}
        rightIcon={false}
      />
      <View
        style={[
          AppStyles.container,
          {backgroundColor: AppColors.profileBg, paddingTop: hp(2)},
        ]}>
        {/* <Text style={styles.title}>Shift History</Text> */}

        <View style={styles.btnContainer}>
          <Pressable
            onPress={() => setAttendance(!Attendance)}
            style={[
              styles.btn,
              {backgroundColor: Attendance ? AppColors.black : 'transparent'},
            ]}>
            <Text
              style={[
                styles.title,
                {
                  color: Attendance ? AppColors.white : AppColors.black,
                  fontFamily: AppFonts.NunitoSansSemiBold,
                },
              ]}>
              Attendance
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setAttendance(!Attendance)}
            style={[
              styles.btn,
              {
                backgroundColor:
                  Attendance === false ? AppColors.black : 'transparent',
              },
            ]}>
            <Text
              style={[
                styles.title,
                {
                  color:
                    Attendance === false ? AppColors.white : AppColors.black,
                  fontFamily: AppFonts.NunitoSansSemiBold,
                },
              ]}>
              FeedBack
            </Text>
          </Pressable>
        </View>

        {Attendance ? (
          <>
            <View
              style={[styles.daysInfoContainerBlack, {alignItems: 'center'}]}>
              <Text
                style={[
                  AppStyles.titleHead,
                  {fontSize: size.lg, textAlign: 'center'},
                ]}>
                01 Days Absent
              </Text>
            </View>
            <Pressable
              onPress={() => setPto(prv => !prv)}
              style={[
                !pto ? styles.daysInfoContainer : styles.daysInfoContainerRed,
                {alignItems: 'center'},
              ]}>
              <View style={styles.btnIconView}>
                <View style={{position: 'relative', right: hp(12)}}>
                  <GlobalIcon
                    library="FontAwesome6"
                    name="angle-up"
                    size={24}
                    color={AppColors.white}
                  />
                </View>

                <Text
                  style={[
                    AppStyles.titleHead,
                    {
                      fontSize: size.lg,
                      textAlign: 'center',
                      color: pto ? AppColors.white : AppColors.black,
                    },
                  ]}>
                  15 Days PTO
                </Text>
              </View>
            </Pressable>
            {!pto && (
              <>
                {renderData('Check Out - Pending')}
                {renderData('Check In')}
                {renderData('Absent')}
                {renderData('Check Out')}
                {renderData('Check In')}
                {renderData('Check Out')}
              </>
            )}
            {pto && (
              <>
                <DriverHistoryInfo trackingDetails={true} />
              </>
            )}
          </>
        ) : (
          <>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {['School', 'Vendor', 'Parent'].map(type => (
                <Pressable
                  key={type}
                  onPress={() => setFeedbackType(type)}
                  style={[
                    styles.daysInfoContainer,
                    feedbackType === type && {borderColor: AppColors.black},
                  ]}>
                  <Text style={[AppStyles.titleHead, {fontSize: size.lg}]}>
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
            <FlatList
              data={getCurrentFeedbacks()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View
                  style={[
                    styles.container,
                    {flexDirection: 'column', alignItems: 'flex-start'},
                  ]}>
                  <View style={styles.imgNTextContainer}>
                    <Image
                      source={item.profilePic}
                      resizeMode="cover"
                      style={{
                        width: wp(12),
                        height: wp(12),
                        borderRadius: 100,
                      }}
                    />
                    <Text
                      style={[styles.title, {backgroundColor: 'transparent'}]}>
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.subTitle,
                      {
                        backgroundColor: 'transparent',
                        lineHeight: 20.72,
                        marginTop: 7,
                      },
                    ]}>
                    {item.response}
                  </Text>
                </View>
              )}
            />
          </>
        )}
      </View>
    </AppLayout>
  );
};

export default DriverHistory;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: AppColors.white,
    padding: hp(2),
    borderRadius: hp(1),
    marginVertical: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  daysInfoContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // width: hp(13),
    height: hp(6.2),
    paddingHorizontal: hp(2),
    // paddingVertical: hp(2),
    elevation: 10,
    borderLeftWidth: 5,
    borderColor: AppColors.red,
    shadowColor: AppColors.gradientGrey,
    backgroundColor: AppColors.white,
    borderRadius: 5,
    gap: hp(0.5),
    marginVertical: hp(3),
  },
  daysInfoContainerBlack: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // width: hp(13),
    height: hp(6.2),
    paddingHorizontal: hp(2),
    // paddingVertical: hp(2),
    borderWidth: 1,
    elevation: 10,
    // borderLeftWidth: 5,
    borderColor: AppColors.black,
    shadowColor: AppColors.gradientGrey,
    backgroundColor: AppColors.white,
    borderRadius: 4,
    gap: hp(0.5),
    // marginVertical: hp(3)
  },
  daysInfoContainerRed: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    // width: hp(13),
    height: hp(6.2),
    paddingHorizontal: hp(2),
    // paddingVertical: hp(2),
    borderWidth: 1,
    elevation: 10,
    // borderLeftWidth: 5,
    borderColor: AppColors.red,
    shadowColor: AppColors.gradientGrey,
    backgroundColor: AppColors.red,
    borderRadius: 4,
    gap: hp(0.5),
    marginVertical: hp(3),
  },

  title: {
    fontFamily: AppFonts.NunitoSansBold,
    color: AppColors.black,
    fontSize: size.default,
  },
  subTitle: {
    backgroundColor: AppColors.yellow,
    padding: hp(0.5),
    borderRadius: hp(0.5),
    color: AppColors.black,
    fontSize: size.s,
    fontFamily: AppFonts.NunitoSansMedium,
  },
  absentTitle: {
    color: '#560b10',
    fontFamily: AppFonts.NunitoSansBold,
    marginBottom: hp(1),
  },
  absentSubTitle: {
    color: AppColors.lightBlack,
    fontFamily: AppFonts.NunitoSansMedium,
    fontSize: size.sl,
  },
  absentTitleContainer: {
    marginTop: hp(1),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  btn: {
    padding: hp(2),
    borderRadius: 5,
    backgroundColor: AppColors.black,
  },

  imgNTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: wp(3),
  },
  btnIconView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
