/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {useDate} from '../../context/Date';
import {getMinsDifference} from '../../utils';

const Mindfulness = () => {
  const [mindfulness, setMindfulness] = useState(0);
  const {startDate, endDate} = useDate();

  const options = {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  const getTotalMindfulness = (results: HealthValue[]) =>
    results?.reduce(
      (sum, {endDate, startDate}) =>
        sum + getMinsDifference(startDate, endDate),
      0,
    ) || 0;

  const fetchMindFullness = useCallback(() => {
    AppleHealthKit?.getMindfulSession(
      options,
      (callbackError: string, results: HealthValue[]) => {
        setMindfulness(getTotalMindfulness(results));
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
      icon="brain"
      title="Mindfulness"
      value={mindfulness}
      unit="mins"
    />
  );
};

export default Mindfulness;
