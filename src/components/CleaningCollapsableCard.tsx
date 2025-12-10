import {
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Collapsible from 'react-native-collapsible';
import AppCheckBox from './AppCheckBox';
import { AppColors } from '../utils/color';
import { hp } from '../utils/constants';
import GlobalIcon from './GlobalIcon';
import AppStyles from '../styles/AppStyles';
import AppFonts from '../utils/appFonts';
import { size } from '../utils/responsiveFonts';
import { CleaningCollapsableCardProps } from '../types/types';

const CleaningCollapsableCard: React.FC<CleaningCollapsableCardProps> = ({
  item,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(item.options.length).fill(false)
  );
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const allChecked = checkedItems.every(Boolean);

  const handleCheckboxChange = (index: number) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);
  };

  const handleStart = () => {
    const start = Date.now();
    setStartTime(start);
    const id = setInterval(() => {
      setTimer(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    setIntervalId(id);
  };

  const handleEnd = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setEndTime(Date.now());
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  const RenderCheckBox = ({ option, index }: any) => {
    return (
      <AppCheckBox
        isChecked={checkedItems[index]}
        onClick={() => handleCheckboxChange(index)}
        rightText={option}
        style={{ marginBottom: hp(1) }}
        unCheckedImage={<View style={styles.checkContainer}></View>}
        checkedImage={
          <View style={styles.checkContainer}>
            <GlobalIcon
              library="Feather"
              name="check"
              color={AppColors.green}
              size={hp(2)}
            />
          </View>
        }
      />
    );
  };

  return (
    <>
      <Pressable
        onPress={() => setIsCollapsed(!isCollapsed)}
        style={[
          AppStyles.rowBetween,
          styles.container,
          isCollapsed && { borderRadius: 10 },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <GlobalIcon
          library="FontAwesome5"
          name={isCollapsed ? 'chevron-down' : 'chevron-up'}
        />
      </Pressable>

      <Collapsible collapsed={isCollapsed}>
        <View style={styles.cardBody}>
          <FlatList
            data={item.options}
            renderItem={({ item: option, index }) => (
              <RenderCheckBox option={option} index={index} />
            )}
            contentContainerStyle={{ gap: hp(2) }}
          />

          {/* START Button */}
          {!startTime && (
            <TouchableOpacity
              onPress={handleStart}
              disabled={!allChecked}
              style={[
                styles.buttonStart,
                { backgroundColor: allChecked ? AppColors.red : '#ccc' },
              ]}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          )}

          {/* TIMER + END Button */}
          {startTime && !endTime && (
            <View style={styles.timerRow}>
              <View style={styles.timerBox}>
                <GlobalIcon library='Ionicons' name='time-outline' size={24} color={AppColors.black}/>
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
              <TouchableOpacity
                onPress={handleEnd}
                style={[styles.button, { backgroundColor: AppColors.red }]}
              >
                <Text style={styles.buttonText}>End</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* TIME TAKEN */}
          {endTime && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>
                Time Taken: {formatTime(timer)}
              </Text>
            </View>
          )}
        </View>
      </Collapsible>
    </>
  );
};

export default CleaningCollapsableCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.red,
    padding: hp(1.5),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardBody: {
    backgroundColor: AppColors.white,
    padding: hp(1.5),
  },
  checkContainer: {
    height: hp(2.5),
    width: hp(2.5),
    borderWidth: 2,
    borderColor: AppColors.grey,
    borderRadius: 5,
    backgroundColor: AppColors.profileBg,
  },
  title: {
    fontFamily: AppFonts.NunitoSansSemiBold,
    fontSize: size.xlg,
    color: AppColors.white,
  },
  button: {
    paddingVertical: hp(1.2),
    borderRadius: 8,
    alignItems: 'center',
    width:'50%'
  },
  buttonStart:{
    paddingVertical: hp(1.2),
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.white,
    fontFamily:AppFonts.NunitoSansBold
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  timerBox: {
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    width:'45%',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    gap: hp(1)
  },
  timerText: {
    color: AppColors.black,
    fontFamily:AppFonts.NunitoSansBold
  },
  resultBox: {
    marginTop: hp(2),
    backgroundColor: '#4CAF50',
    padding: hp(1.2),
    borderRadius: 8,
  },
  resultText: {
    color: AppColors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
