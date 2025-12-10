import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/AppButton';
import GlobalIcon from '../../components/GlobalIcon';
import AuthLayout from '../../layout/AuthLayout';
import AppStyles from '../../styles/AppStyles';
import {hp} from '../../utils/constants';
import {handleSetRole} from '../../utils/functions';
import {useAppDispatch} from '../../store/hooks';

const LoginAs = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  return (
    <AuthLayout>
      <View>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <View style={[AppStyles.center, {marginTop: hp(3)}]}>
          <Text style={AppStyles.titleHead}>Log In As</Text>
          <View style={styles.setMargin}>
            <AppButton
              onPress={() => handleSetRole('Driver', navigation, dispatch)}
              title="Driver"
              titleStyle={{marginTop: hp(-0.6)}}
              style={{paddingTop: hp(0.9)}}
              leftIcon={
                <GlobalIcon
                  library="FontelloIcon"
                  name="group-1961"
                  size={20}
                />
              }
            />
            <AppButton
              onPress={() => handleSetRole('Parents', navigation, dispatch)}
              title="Parent"
              titleStyle={{marginTop: hp(-1)}}
              style={{paddingTop: hp(0.9)}}
              leftIcon={
                <GlobalIcon library="FontelloIcon" name="group1" size={20} />
              }
            />
            <AppButton
              onPress={() => handleSetRole('Retail', navigation, dispatch)}
              title="Retail"
              titleStyle={{marginTop: hp(-1)}}
              style={{paddingTop: hp(0.9)}}
              leftIcon={
                <GlobalIcon
                  library="FontelloIcon"
                  name="group-1961"
                  size={20}
                />
              }
            />
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

export default LoginAs;

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    height: hp(50),
    width: hp(50),
    resizeMode: 'contain',
  },
  setMargin: {
    marginTop: hp(3),
    gap: hp(1.2),
  },
});
