/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {HealthValue} from 'react-native-health';
//import {useDate} from '../../context/Date';

const HeartRate = () => {
  const [heartRate, setHeartRate] = useState<number>(0);
  // const {startDate, endDate} = useDate();

  // const options = {
  //   startDate: startDate.toISOString(),
  //   endDate: endDate.toISOString(),
  //   unit: 'bpm', // Assuming the unit is beats per minute
  // };
  const options = {
    unit: 'bpm', // optional; default 'bpm'
    startDate: new Date(2024, 5, 14).toISOString(), // required
    // endDate: new Date().toISOString(), // optional; default now
    // ascending: false, // optional; default false
    //limit: 10, // optional; default no limit
  };
  // useEffect(() => {
  //   new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
  //     'healthKit:HeartRate:new',
  //     async () => {
  //       console.log('--> observer triggered');
  //     },
  //   );
  // });
  const fetchHeartRate = useCallback(() => {
    // console.log('options', options);

    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        if (callbackError) {
          console.error(callbackError);
          return;
        }

        if (results && results.length > 0) {
          const latestHeartRate = results[results.length - 1].value;
          // console.error('results', results[results.length - 1]);

          setHeartRate(latestHeartRate);
        } else {
          setHeartRate(0);
        }
      },
    );
  }, [options]);

  useEffect(() => {
    fetchHeartRate();
  }, [fetchHeartRate]);

  return (
    <BiometricCard
      icon="heart"
      title="last Heart Rate record "
      value={heartRate}
      unit="bpm"
    />
  );
};

export default HeartRate;
