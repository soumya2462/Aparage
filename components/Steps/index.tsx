/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {useDate} from '../../context/Date';
import {Notifications} from 'react-native-notifications';
import BackgroundFetch from 'react-native-background-fetch';

const STEP_THRESHOLD = 100;

const Steps = () => {
  const [steps, setSteps] = useState(0);
  const {startDate, endDate} = useDate();

  const options = {
    date: startDate.toISOString(),
    includeManuallyAdded: false, // optional: default true
  };

  const fetchSteps = useCallback(() => {
    AppleHealthKit?.getStepCount(
      options,
      (callbackError: string, result: HealthValue) => {
        setSteps(result?.value || 0);

        if (callbackError) {
          console.error(callbackError);
        }
      },
    );
  }, [options]);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps, startDate, endDate]);

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

    // Schedule the notification after 2000 milliseconds (2 seconds)
    const timer = setTimeout(() => {
      scheduleNotification(steps);
    }, 2000);

    // Cleanup the timer if the component unmounts before the timer completes
    return () => clearTimeout(timer);
  }, [steps]);

  useEffect(() => {
    // Configure Background Fetch
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 5, // Fetch every 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
      },
      async taskId => {
        console.log('[BackgroundFetch] taskId:', taskId);
        fetchSteps();

        // Check if step count exceeds threshold and schedule a notification
        if (steps > STEP_THRESHOLD) {
          scheduleNotification(steps);
        }

        BackgroundFetch.finish(taskId);
      },
      error => {
        console.error('[BackgroundFetch] failed to start', error);
      },
    );

    // Optional: start immediately for the first time
    BackgroundFetch.start();

    return () => {
      BackgroundFetch.stop();
    };
  }, [steps, fetchSteps]);

  const scheduleNotification = (value: number) => {
    Notifications.postLocalNotification({
      title: 'Step Count Alert',
      body: `Congratulations! You've crossed ${value} steps today!`,
      extra: 'data',
      silent: false,
      category: 'STEP_COUNT',
      userInfo: {},
    });
  };

  return (
    <BiometricCard
      icon="walk"
      title="Steps"
      value={Math.round(steps)}
      unit="steps"
    />
  );
};

export default Steps;
