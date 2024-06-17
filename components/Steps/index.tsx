/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import React, {useCallback, useEffect, useState} from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {useDate} from '../../context/Date';
import {Notifications} from 'react-native-notifications';
import BackgroundFetch from 'react-native-background-fetch';
import {NativeEventEmitter, NativeModules} from 'react-native';

const STEP_THRESHOLD = 2000;
const POLLING_INTERVAL = 10000; // Poll every minute

const Steps = () => {
  const [steps, setSteps] = useState(0);
  const {startDate, endDate} = useDate();

  const fetchSteps = useCallback(() => {
    const startDate = new Date();
    // startDate.setDate(startDate.getDate());
    const options = {
      //unit: HealthUnit.bpm, // optional; default 'bpm'
      date: startDate.toISOString(), // required
      includeManuallyAdded: false,
      // startDate: new Date(2024, 5, 14).toISOString(),
      // endDate: new Date().toISOString(), // optional; default now
      //  ascending: false, // optional; default false
      //limit: 1, // optional; default no limit
    };

    AppleHealthKit.getStepCount(
      options,
      (callbackError: string, result: HealthValue) => {
        setSteps(result?.value || 0);
        console.log(result);
        console.log('console.log(result);', options);
        if (callbackError) {
          console.error(callbackError);
        }
      },
    );
  }, []);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps, startDate, endDate]);

  useEffect(() => {
    // Register for notifications on mount
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
        minimumFetchInterval: 15, // Fetch every 15 minutes
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

  // Add a useEffect to poll for step count updates
  useEffect(() => {
    const interval = setInterval(fetchSteps, POLLING_INTERVAL);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [fetchSteps]);
  useEffect(() => {
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:StepCount:new',
      async () => {
        console.log('--> observer triggered');
        fetchSteps();
      },
    );
  });
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
      holdvalue={STEP_THRESHOLD}
      unit="steps"
    />
  );
};

export default Steps;
