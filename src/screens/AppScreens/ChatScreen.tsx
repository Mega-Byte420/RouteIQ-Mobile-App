import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppLayout from '../../layout/AppLayout';
import AppHeader from '../../components/AppHeader';
import {SceneMap} from 'react-native-tab-view';
import AppTabsView from '../../components/AppTabsView';
import SchoolChat from '../../components/SchoolChat';

const ChatScreen = () => {
  const FirstRoute = () => <SchoolChat />;

  const SecondRoute = () => <SchoolChat />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'School'},
    {key: 'second', title: 'Bus Driver'},
  ]);
  return (
    <AppLayout>
      <AppHeader enableBack={true} title="Chat" rightIcon={false} />
      <View style={{flex: 1}}>
        <AppTabsView routes={routes} renderScene={renderScene} />
      </View>
    </AppLayout>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
