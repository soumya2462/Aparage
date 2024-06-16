/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {useDate} from '../../context/Date';

const HeartRate = () => {
  const [heartRate, setHeartRate] = useState(0);
  const {startDate, endDate} = useDate();

  const options = {
    unit: 'bpm', // optional; default 'bpm'
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    ascending: false, // optional; default false
    limit: 10, // optional; default no limit
  };

  const getAverageHeartRate = (results: HealthValue[]) => {
    const heartRateSum = results?.reduce((sum, {value}) => sum + value, 0);

    return heartRateSum ? heartRateSum / results.length : 0;
  };

  const fetchHeartRate = useCallback(() => {
    AppleHealthKit?.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        setHeartRate(getAverageHeartRate(results));

        if (callbackError) {
          console.error(callbackError);
        }
      },
    );
  }, [options]);

  useEffect(() => {
    fetchHeartRate();
  }, [fetchHeartRate, startDate, endDate]);

  return (
    <BiometricCard
      icon="heart"
      iconColor="red"
      title="Heart Rate"
      value={heartRate}
      unit="bpm"
    />
  );
};

export default HeartRate;
