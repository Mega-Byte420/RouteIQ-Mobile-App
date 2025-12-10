import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import { AppColors } from '../../utils/color';
import AppStyles from '../../styles/AppStyles';
import { hp, wp } from '../../utils/constants';
import AppButton from '../../components/AppButton';
import { useNavigation } from '@react-navigation/native';
import GlobalIcon from '../../components/GlobalIcon';
import { size } from '../../utils/responsiveFonts';
import AppFonts from '../../utils/appFonts';
import UploadDoc from '../../components/UploadDoc';
import AppInput from '../../components/AppInput';
import EmergencyContact from '../../components/EmergencyContact';

const DriverEmergencyContact = () => {
    const navigation = useNavigation();

    const [editDetails1, setEditDetails1] = useState(false);
    const [editDetails2, setEditDetails2] = useState(false);

const emergencyContact = [
    {
        name: 'Esther Howard',
        relation: 'Aunty',
        phone_number: '+1-424-271-8337'
    },
    {
        name: 'Robert Fox',
        relation: 'Grandpa',
        phone_number: '+1-424-271-8337'
    },
]

    return (
        <AppLayout
            statusbackgroundColor={AppColors.red}
            style={{ backgroundColor: AppColors.white }}>
            <AppHeader
                role="Driver"
                title="Emrgency Contact"
                enableBack={true}
                rightIcon={false}
            />
            <ScrollView style={[AppStyles.driverContainer, AppStyles.flex, { backgroundColor: AppColors.profileBg, paddingHorizontal: 0 }]} showsVerticalScrollIndicator={false}>
                {/* <EmergencyContact /> */}

                <FlatList scrollEnabled={false} data={emergencyContact} renderItem={({item, index}) => <EmergencyContact item={item} index={index} />} />
                {/* <View style={{ backgroundColor: AppColors.white, paddingHorizontal: hp(2), paddingVertical: hp(2) }}>
                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, { fontSize: size.lg, fontFamily: AppFonts.NunitoSansBold }]}>Emergency Contact 1:</Text>
                        <Pressable onPress={() => setEditDetails1(!editDetails1)}>
                            {editDetails1 ?
                                <Text style={[AppStyles.title, { color: AppColors.red }]}>Save</Text>
                                :
                                <GlobalIcon library='FontelloIcon' name={'frame-(3)'} color={AppColors.red} />
                            }
                        </Pressable>
                    </View>
                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, AppStyles.halfWidth]}>Name</Text>

                        {editDetails1 === false ?
                            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
                                Esther Howard
                            </Text>
                            :
                            <AppInput
                                placeholder="Esther Howard"
                                containerStyle={AppStyles.halfWidth}
                                container={[styles.inputContainer, { height: 40 }]}
                                inputStyle={styles.inputStyle}
                            />
                        }
                    </View>
                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, AppStyles.halfWidth]}>Relation</Text>
                        {editDetails1 === false ?
                            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>Aunty</Text>
                            :
                            <AppInput
                                placeholder="Aunty"
                                containerStyle={AppStyles.halfWidth}
                                container={[styles.inputContainer, { height: 40 }]}
                                inputStyle={styles.inputStyle}
                            />
                        }

                    </View>

                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                            Phone Number
                        </Text>
                        {editDetails1 === false ?
                            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
                                +1-424-271-8337
                            </Text>
                            :
                            <AppInput
                                placeholder="+1-424-271-8337"
                                containerStyle={AppStyles.halfWidth}
                                container={[styles.inputContainer, { height: 40 }]}
                                inputStyle={styles.inputStyle}
                                keyboardType='number-pad'
                            />
                        }
                    </View>

                </View> */}





                {/* <View style={{ backgroundColor: AppColors.white, paddingHorizontal: hp(2), paddingVertical: hp(2), marginVertical: hp(1) }}>
                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, { fontSize: size.lg, fontFamily: AppFonts.NunitoSansBold }]}>Emergency Contact 2:</Text>
                        <Pressable onPress={() => setEditDetails2(!editDetails2)}>
                            {editDetails2 ?
                                <Text style={[AppStyles.title, AppStyles.halfWidth, { color: AppColors.red, width: '100%' }]}>Save</Text>
                                :
                                // <GlobalIcon library='Ionicons' name={'eyedrop-outline'} color={AppColors.red} />
                                <GlobalIcon library='FontelloIcon' name={'frame-(3)'} color={AppColors.red} />
                            }
                        </Pressable>
                    </View>
                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, AppStyles.halfWidth]}>Name</Text>
                        {editDetails2 ===false?
                            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
                                Robert Fox
                            </Text>
                            :
                            <AppInput
                                placeholder="Esther Howard"
                                containerStyle={AppStyles.halfWidth}
                                container={[styles.inputContainer, { height: 40 }]}
                                inputStyle={styles.inputStyle}
                            />
                        }

                    </View>
                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, AppStyles.halfWidth]}>Relation</Text>
                        {editDetails2 ===false?
                            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>Grandpa</Text>
                            :
                            <AppInput
                                placeholder="Grandpa"
                                containerStyle={AppStyles.halfWidth}
                                container={[styles.inputContainer, { height: 40 }]}
                                inputStyle={styles.inputStyle}
                            />
                        }
                    </View>

                    <View style={[AppStyles.rowBetween, { marginBottom: hp(2) }]}>
                        <Text style={[AppStyles.title, AppStyles.halfWidth]}>
                            Phone Number
                        </Text>
                        {editDetails2===false?
                            <Text style={[AppStyles.subTitle, AppStyles.halfWidth]}>
                                +1-424-271-8337
                            </Text>
                            :
                            <AppInput
                                placeholder="+1-424-271-8337"
                                containerStyle={AppStyles.halfWidth}
                                container={[styles.inputContainer, { height: 40 }]}
                                inputStyle={styles.inputStyle}
                                keyboardType='number-pad'
                            />
                        }
                    </View>



                </View> */}

                <UploadDoc title='Add New' containerStyle={{ marginHorizontal: hp(2), alignSelf: 'center', width: '80%', borderRadius: 15 }} textStyle={{ fontSize: size.default, marginTop: hp(-3) }} />



            </ScrollView>
        </AppLayout>
    );
};

export default DriverEmergencyContact;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: AppColors.white,
        borderColor: AppColors.red,
        borderWidth: 1.5,
        marginBottom: hp(2),
        alignSelf: 'center'
    },
    buttonTitle: {
        color: AppColors.black,
    },
    inputContainer: {
        borderColor: AppColors.graySuit,
        borderWidth: 1,
        paddingHorizontal: 2,
        borderRadius: 5
    },
    inputStyle: { color: AppColors.graySuit },
});
