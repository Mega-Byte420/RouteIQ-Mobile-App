import { View, Text } from 'react-native'
import React from 'react'
import AppLayout from '../../layout/AppLayout'
import { AppColors } from '../../utils/color'
import AppHeader from '../../components/AppHeader'
import DriverShiftInfo from '../../components/DriverShiftInfo'

export default function DriverShiftTrackingDetails() {
  return (
    <AppLayout statusbackgroundColor={AppColors.red}
    style={{ backgroundColor: AppColors.white }}>
    <AppHeader role="Driver"
        title={'Shift Tracking'}
        enableBack={true}
        rightIcon={false} />


    <DriverShiftInfo timeOff={true} trackingDetails={true} />

    

    </AppLayout>
  )
}