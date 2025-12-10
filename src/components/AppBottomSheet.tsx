import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {BottomSheetBackdropProps, BottomSheetModal} from '@gorhom/bottom-sheet';
import {hp} from '../utils/constants';

interface AppBottomSheetProps {
  bottomSheetModalRef?: React.MutableRefObject<BottomSheetModal | null>;
  snapPoints?: string[];
  backdropComponent?: React.FC<BottomSheetBackdropProps>;
  handleSheetChanges?: (index: number) => void;
  children?: React.ReactNode;
  enablePanDownToClose?: boolean,
  contentContainerStyle?: StyleProp<ViewStyle>,
  ContainerStyle?: StyleProp<ViewStyle>,
}

const AppBottomSheet: React.FC<AppBottomSheetProps> = ({
  bottomSheetModalRef,
  snapPoints,
  backdropComponent,
  handleSheetChanges,
  children,
  enablePanDownToClose,
  contentContainerStyle,
  ContainerStyle
}) => {
  return (
    <BottomSheetModal
      backdropComponent={backdropComponent}
      // detached={true}
      enablePanDownToClose={enablePanDownToClose}
      // enableDismissOnClose={false}
      // enableContentPanningGesture={false}
      handleComponent={() => null} 
      ref={bottomSheetModalRef}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      index={0}
      snapPoints={snapPoints}
      containerStyle={ContainerStyle}
      onChange={handleSheetChanges}>
      <View style={[styles.contentContainer, contentContainerStyle]}>{children}</View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: hp(2),
  },
});

export default AppBottomSheet;
