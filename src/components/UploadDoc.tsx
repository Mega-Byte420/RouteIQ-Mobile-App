import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppColors } from '../utils/color'
import GlobalIcon from './GlobalIcon'
import { hp } from '../utils/constants'
import AppFonts from '../utils/appFonts'
import { size } from '../utils/responsiveFonts'
import { UploadDocProps } from '../types/types'

    
 const UploadDoc: React.FC<UploadDocProps> = ({title, containerStyle, textStyle}) => {

    return (
        <View style={[styles.uploadDocBox, containerStyle]}>
            <GlobalIcon library='FontelloIcon' name='group-(5)' color={AppColors.red} size={40} />
            <Text style={[styles.tapText, textStyle]} >{title}</Text>
        </View>
    )
}

export default UploadDoc;

const styles = StyleSheet.create({
    uploadDocBox: {
        width: '100%',
        marginVertical: hp(3),
        marginTop: hp(2),
        height: hp(15),
        gap: hp(2.5),
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: AppColors.red,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.veryLightPink
    },

    tapText: {

        fontFamily: AppFonts.NunitoSansSemiBold,
        fontSize: size.s,
        // lineHeight: 20,
        color: AppColors.red,
        alignSelf: 'center',
    },
})