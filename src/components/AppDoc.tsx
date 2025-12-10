import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { executeOnUIRuntimeSync } from 'react-native-reanimated'
import GlobalIcon from './GlobalIcon'
import { size } from '../utils/responsiveFonts'
import AppFonts from '../utils/appFonts'
import { AppColors } from '../utils/color'
import { hp, wp } from '../utils/constants'
import { AppDocProps } from '../types/types'

const AppDoc: React.FC<AppDocProps> = ({ title, containerStyle }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.docName, { fontSize: size.sl }]}>{title}</Text>
            <View style={{transform: [{ rotate: '-50deg' }]}}><GlobalIcon library='MaterialIcons' name={'attachment'} color={AppColors.black} /></View>
            {/* <GlobalIcon library='CustomIcon' name={'attachment_svgrepocom'} color={AppColors.brightGrey} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        borderRadius: 10,
        elevation:10,
        justifyContent: 'space-between', width: '90%', paddingHorizontal: wp(4), paddingVertical: hp(2), backgroundColor: AppColors.white
    },
    docName: {
        fontFamily: AppFonts.NunitoSansMedium,
        fontSize: size.default,
        lineHeight: 20,
        color: AppColors.black,
    },
})

export default AppDoc