/* eslint-disable react/react-in-jsx-scope */
import {PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {getTheme} from './theme';
import Home from './pages/Home';
import {Notifications} from 'react-native-notifications';

import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';
import {useEffect} from 'react';

/* Permission options */
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.MindfulSession,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.WalkingHeartRateAverage,
      AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      AppleHealthKit.Constants.Permissions.DistanceCycling,
      AppleHealthKit.Constants.Permissions.DistanceSwimming,
      AppleHealthKit.Constants.Permissions.BloodGlucose,
    ],
  },
} as HealthKitPermissions;

AppleHealthKit?.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!', error);
    return;
  }
});

export default function App() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    // Request permissions on mount
    Notifications.registerRemoteNotifications();
    Notifications.events().registerRemoteNotificationsRegistered(event => {
      console.log('Device Token Received', event.deviceToken);
    });

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log(
          `Notification received in foreground: ${notification.title} : ${notification.body}`,
        );
        completion({alert: true, sound: true, badge: false});
      },
    );
  }, []);
  return (
    <PaperProvider theme={getTheme(colorScheme)}>
      <Home />
    </PaperProvider>
  );
}
