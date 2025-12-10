import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Pressable,
} from 'react-native';
import moment, { months } from 'moment';
import GlobalIcon from './GlobalIcon';
import { AppColors } from '../utils/color';
import { hp, wp } from '../utils/constants';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import { fontSize, size } from '../utils/responsiveFonts';
import TripCard from './TripCard';
import { tripData } from '../utils/DummyData';
import { useAppDispatch } from '../store/hooks';
import { setDriverHomeStatus } from '../store/user/userSlices';
import { DriverHistoryInfoProps } from '../types/types';
import AppBottomSheet from './AppBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AppButton from './AppButton';
import UploadDoc from './UploadDoc';

const DriverHistoryInfo: React.FC<DriverHistoryInfoProps> = ({ trackingDetails }) => {
    const dispatch = useAppDispatch();
   
  
    const [selectedDate, setSelectedDate] = useState(moment());





    const renderDays = () => {
        const startOfWeek = selectedDate.clone().startOf('month');
        const monthss = [];
        const startOfMonth = selectedDate.clone().startOf('month');
        const daysInMonth = selectedDate.daysInMonth();


        for (let i = 0; i < daysInMonth; i++) {
            monthss.push(startOfMonth.clone().add(i, 'days'));
        }

        return monthss.map((day, index) => (
            <View
                style={[
                    AppStyles.row,
                    styles.dayContainer,
                    {  justifyContent: 'center', gap: wp(4), paddingHorizontal: 0, paddingBottom: monthss.length - 1 == index ? hp(5) : hp(1) },
                ]}
                key={day.format('D')}>

                <View style={styles.dateContainer}>
                    <Text style={[styles.dayText, { color: AppColors.red }]}>{day.format('DD')}</Text>
                    <Text style={styles.dayName}>{day.format('MMM').toLocaleUpperCase()}</Text>
                </View>

                <View style={[AppStyles.rowBetween, styles.tasksContainer, { gap: wp(2), }]}>
                    {renderTaskBlocksForDay(day)}
                </View>

            </View>
        ));
    };

    const renderTaskBlocksForDay = (day: any) => {
        const tasks: any = getTasksForDay(day);
        const timeSlots = ['09:10 AM', '09:11 AM', '05 hrs', '04 hrs'];

        return timeSlots.map((timeSlot, index) => (
            <View key={index} style={[styles.timeSlotContainer, { gap: hp(0.3) }]}>
                {tasks[timeSlot] ? (
                    <View
                        style={[
                            {},
                        ]}><Text style={[AppStyles.title, { fontSize: size.s, color: AppColors.black }]}>{tasks[timeSlot].task}</Text></View>
                ) : (
                    <View style={styles.emptyTaskBlock} />
                )}

                <Text style={[AppStyles.title, { fontSize: size.s, fontFamily: AppFonts.NunitoSansRegular, }]}>{timeSlot}</Text>
            </View>
        ));
    };

    const getTasksForDay = (day: string) => {
        return {
            '09:10 AM': { task: 'Check In', color: AppColors.red },
            '09:11 AM': { task: 'Check Out', color: AppColors.silverBlue },
            '05 hrs': { task: 'Work Time', color: AppColors.vividOrange },
            '04 hrs': { task: 'Short Time', color: AppColors.vividOrange }
        };
    };

    return (
        <View style={[styles.container, ]}>
            <ScrollView showsVerticalScrollIndicator={false} style={[styles.daysContainer, {  alignSelf: 'center' }]}>
                {renderDays()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom:hp(4),
    },
    header: {
        alignSelf: 'center',
        marginBottom: 10,
        gap: 30,
    },
    headerText: {
        fontSize: size.lg,
        fontFamily: AppFonts.NunitoSansBold,
        color: AppColors.black,
    },
    monthText: {
        fontSize: size.md,
        padding: 5,
        color: AppColors.black,
        fontFamily: AppFonts.NunitoSansBold,
    },
    selectedMonthText: {
        color: AppColors.red,
    },
    selectedMonthView: {
        backgroundColor: AppColors.lightRed,
        paddingVertical: hp(1.5),
        paddingHorizontal: hp(0.8),
        borderRadius: 10,
        marginHorizontal: hp(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeSlotsRow: {
        marginBottom: 10,
        paddingRight: hp(2),
    },
    timeSlotText: {
        fontSize: fontSize(14),
        color: AppColors.black,
        fontFamily: AppFonts.NunitoSansSemiBold,
    },
    daysContainer: {
        flexWrap: 'wrap',
    },
    dayContainer: {
        width: '100%',
        // paddingVertical: hp(1),
        // paddingHorizontal: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E9',
        


    },
    dateContainer: {
        borderRadius: 5,
        width: '12%',
        height: hp(6),
        elevation: 10,
        // marginLeft: wp(1),
        // borderWidth:1,
        backgroundColor: AppColors.white,
        // borderColor: AppColors.black,
        alignItems: 'center',
    },
    dayText: {
        fontSize: size.lg,
        color: AppColors.black,
        fontFamily: AppFonts.NunitoSansSemiBold,
    },
    dayName: {
        fontSize: size.s,
        color: AppColors.black,
        fontFamily: AppFonts.NunitoSansSemiBold,
    },
    tasksContainer: {
        width: '80%',
    },
    timeSlotContainer: {
        alignItems: 'flex-start',
        maxWidth: '25%',
        paddingVertical: hp(1.4),
        // backgroundColor: AppColors.white
    },
    taskBlock: {
        width: '100%',
        height: hp(3),
    },
    taskText: {
        fontSize: size.xs,
        color: AppColors.white,
        fontFamily: AppFonts.NunitoSansSemiBold,
    },
    emptyTaskBlock: {
        width: '100%',
        height: hp(3),
        borderRadius: 5,
        backgroundColor: '#EDEFF3',
    },
    dot: {
        height: hp(1),
        width: hp(1),
        borderRadius: hp(1),
    },
    lastLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: hp(0),
        paddingVertical: hp(1.2),
        marginHorizontal: hp(0),
    },
    salaryBreakdownTitles:
    {
        fontSize: size.md,
        fontFamily: AppFonts.NunitoSansLight,
        color: AppColors.white
    },
    salaryBreakdownHeadings: {
        width: '100%',
        borderBottomColor: AppColors.lightGrey,
        borderBottomWidth: 1,
        marginBottom: hp(1),
    },
    headings: {

        fontFamily: AppFonts.NunitoSansBold,
    },
    salaryHeading: {
        fontSize: size.xlg,
        fontFamily: AppFonts.NunitoSansBold
    }
});

export default DriverHistoryInfo;
