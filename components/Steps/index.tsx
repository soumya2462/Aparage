/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {useDate} from '../../context/Date';
import {NativeEventEmitter, NativeModules} from 'react-native';

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
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:HeartRate:new',
      async () => {
        console.log('--> observer triggered');
      },
    );
  });
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
