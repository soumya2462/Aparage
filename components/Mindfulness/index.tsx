/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {useDate} from '../../context/Date';

const Mindfulness = () => {
  const [mindfulness, setMindfulness] = useState(0);
  const {startDate, endDate} = useDate();

  const options = {
    startDate: startDate.toISOString(), // required
    endDate: endDate.toISOString(), // optional; default now
    ascending: false, // optional; default false
    limit: 10, // optional; default no limit
    unit: 'meter', // optional; default meter
  };

  const fetchMindFullness = useCallback(() => {
    return AppleHealthKit?.getDistanceWalkingRunning(
      options,
      (callbackError: string, results: HealthValue) => {
        setMindfulness(Math.round(results.value));
        if (callbackError) {
          console.error(callbackError);
        }
      },
    );
  }, [options]);

  useEffect(() => {
    fetchMindFullness();
  }, [fetchMindFullness, startDate, endDate]);

  return (
    <BiometricCard
      icon="run-fast"
      title="Walking & Running Distance"
      value={mindfulness}
      unit="meter"
    />
  );
};

export default Mindfulness;
