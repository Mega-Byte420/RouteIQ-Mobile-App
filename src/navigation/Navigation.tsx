import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import SplashScreen from '../screens/AppScreens/SplashScreen';
import { AppStack, AuthStack, DriverStack, RetailStack } from './Stack';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { isTokenExpired } from '../utils/jwt';
import { clearUserInfo } from '../store/user/userSlices';

const Navigation = () => {
  const token = useAppSelector(state => state.userSlices.token);
  const role = useAppSelector(state => state.userSlices.role);
  const dispatch = useAppDispatch();
  const [Splash, setSplash] = useState(true);
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Check token expiration when token changes
  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        // Token is expired, clear user info
        dispatch(clearUserInfo());
        setIsValidToken(false);
      } else {
        setIsValidToken(true);
      }
    } else {
      setIsValidToken(false);
    }
  }, [token, dispatch]);

  // Normalize role for comparison (handle both 'PARENT' from JWT and 'Parents' from UI)
  const normalizedRole = role?.toUpperCase();
  const isDriver = normalizedRole === 'DRIVER';
  const isRetail = normalizedRole === 'RETAIL';
  const isParent = normalizedRole === 'PARENT' || normalizedRole === 'PARENTS';

  return (
    <NavigationContainer>
      {Splash ? (
        <SplashScreen />
      ) : token && isValidToken ? (
        isDriver ? (
          <DriverStack />
        ) : isRetail ? (
          <RetailStack />
        ) : isParent ? (
          <AppStack />
        ) : (
          <AppStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
