import * as React from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {AppTabsViewProps} from '../types/types';
import AppFonts from '../utils/appFonts';
import {AppColors} from '../utils/color';
import {fontSize} from '../utils/responsiveFonts';

const AppTabsView: React.FC<AppTabsViewProps> = ({routes, renderScene}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        style={styles.container}
        indicatorStyle={styles.indicatorStyle}
        activeColor={AppColors.black}
        inactiveColor={AppColors.black}
        tabStyle={styles.tabStyle}
        labelStyle={styles.labelStyle}
      />
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
};

export default AppTabsView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    width: '100%',
    alignSelf: 'center',
  },
  indicatorStyle: {
    borderWidth: 1,
    borderColor: AppColors.black,
  },
  tabStyle: {
    borderRadius: 10,
    padding: 0,
  },
  labelStyle: {
    color: AppColors.black,
    fontSize: fontSize(14),
    fontFamily: AppFonts.NunitoSansSemiBold,
    textTransform: 'capitalize',
  },
});
