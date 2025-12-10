
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { wp } from '../../utils/constants';
import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import AppBottomSheet from '../../components/AppBottomSheet';

import AppButton from '../../components/AppButton';

import AppHeader from '../../components/AppHeader';
import AppInput from '../../components/AppInput';

import AppLayout from '../../layout/AppLayout';
import AppStyles from '../../styles/AppStyles';
import AppFonts from '../../utils/appFonts';
import { AppColors } from '../../utils/color';
import { hp } from '../../utils/constants';

import { size } from '../../utils/responsiveFonts';



export default function DriverMedicalRecord() {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['46%', '90%'], []);
    const openSheet = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const closeSheet = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const [error, setError] = useState({
        reason: '',
        calendar: '',
    });




    const navigation = useNavigation();

    return (
        <AppLayout
            statusbackgroundColor={AppColors.red}
            style={{ backgroundColor: AppColors.profileBg }}>
            <AppHeader role="Driver"
                title={'Medical Record'}
                enableBack={true}
                rightIcon={false} />

            <View
                style={[
                    AppStyles.container,
                    { backgroundColor: AppColors.profileBg, paddingVertical: hp(3), justifyContent: 'flex-end', },
                ]}>


                <AppButton
                    title={'Add Details'}
                    style={{ width: '100%' }}
                    onPress={() =>

                        openSheet()
                        // navigation.navigate('DriverMapView')
                    }
                />

            </View>


            <AppBottomSheet
                bottomSheetModalRef={bottomSheetModalRef}
                snapPoints={snapPoints}
                backdropComponent={({ style }) => (
                    <Pressable
                        onPress={() => closeSheet()}
                        style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}
                    />
                )}>
                <View
                    style={{
                        backgroundColor: AppColors.white,
                        paddingHorizontal: hp(2),
                        paddingVertical: hp(2),
                        borderTopRightRadius: hp(2),
                        borderTopLeftRadius: hp(2),
                    }}>

                    <AppInput
                        // multiline
                        numberOfLines={1}
                        container={{ height: hp(6), borderRadius: hp(0.5), marginBottom: hp(2) }}
                        label="Condition"
                        placeholder="Example: Sever Allergy, Crohn's Disease"
                        labelStyle={{
                            marginBottom: hp(2),
                            fontFamily: AppFonts.NunitoSansBold,
                        }}
                        error={error.reason}
                    />



                    <AppInput
                        multiline
                        numberOfLines={7}
                        container={{ height: hp(12), borderRadius: hp(0.5), marginBottom: hp(2) }}
                        label="Description"
                        placeholder="Descripton"

                        labelStyle={{
                            marginBottom: hp(2),
                            fontFamily: AppFonts.NunitoSansBold,
                        }}
                        error={error.reason}
                    />

                    <View style={[AppStyles.rowBetween, { width: '100%' }]}>
                        <AppButton
                            title="Cancel"
                            onPress={() => {
                                closeSheet()
                            }}
                            style={styles.cancelButton}
                            titleStyle={{ color: AppColors.textLightGrey }}
                        />
                        <AppButton
                            title="Submit"
                            onPress={() => closeSheet()}
                            style={styles.submitButton}
                        />
                    </View>
                </View>
            </AppBottomSheet>






            {/* </View> */}


        </AppLayout>
    );
};

const styles = StyleSheet.create({
    boxStyle: {
        marginBottom: hp(1.6),
        backgroundColor: AppColors.white,
        alignItems: 'center',
        borderColor: AppColors.black,
        height: hp(6),
        borderRadius: hp(0.5),
    },
    cancelButton: { width: '35%', backgroundColor: AppColors.lightGrey },
    submitButton: { width: '60%', backgroundColor: AppColors.red },
    label: {
        marginBottom: 5,
        color: AppColors.black,
        fontSize: size.md,
        alignSelf: 'flex-start',
        fontFamily: AppFonts.NunitoSansSemiBold,
    },
    reasonContainer: {
        padding: hp(2),
        backgroundColor: '#dddde1',
        borderRadius: hp(1),
        marginBottom: hp(3),
    },
})