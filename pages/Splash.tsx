/* eslint-disable react-native/no-inline-styles */
// pages/PermissionsScreen.js
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';
import {useNavigation} from '@react-navigation/native';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
    ],
  },
} as HealthKitPermissions;

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!', error);
        return;
      }
      navigation.navigate('Home');
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Requesting HealthKit Permissions...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Splash;
