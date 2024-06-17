/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useCallback, useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import BiometricCard from '../BiometricCard';
import AppleHealthKit, {
  HealthInputOptions,
  HealthValue,
} from 'react-native-health';
const healthEvent = new NativeEventEmitter(NativeModules.AppleHealthKit);
//import {useDate} from '../../context/Date';
enum HealthUnit {
  bpm = 'bpm',
  calorie = 'calorie',
  celsius = 'celsius',
  count = 'count',
  day = 'day',
  fahrenheit = 'fahrenheit',
  foot = 'foot',
  gram = 'gram',
  hour = 'hour',
  inch = 'inch',
  joule = 'joule',
  kilocalorie = 'kilocalorie',
  meter = 'meter',
  mgPerdL = 'mgPerdL',
  mile = 'mile',
  minute = 'minute',
  mmhg = 'mmhg',
  literPerMinute = 'literPerMinute',
  mmolPerL = 'mmolPerL',
  percent = 'percent',
  pound = 'pound',
  second = 'second',
}
const HeartRate = () => {
  const [heartRate, setHeartRate] = useState<number>(0);
  // const {startDate, endDate} = useDate();

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
    // const options = {
    //   startDate: startDate.toISOString(),
    //   endDate: endDate.toISOString(),
    //   unit: 'bpm', // Assuming the unit is beats per minute
    // };
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    const options: HealthInputOptions = {
      unit: HealthUnit.bpm, // optional; default 'bpm'
      startDate: startDate.toISOString(), // required
      // startDate: new Date(2024, 5, 14).toISOString(),
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 1, // optional; default no limit
    };

    AppleHealthKit.getHeartRateSamples(
      options,
      (callbackError: string, results: HealthValue[]) => {
        if (callbackError) {
          console.error(callbackError);
          return;
        }
        console.log(results[0]);

        if (results && results.length > 0) {
          const latestHeartRate = results[results.length - 1].value;
          // console.error('results', results[results.length - 1]);

          setHeartRate(latestHeartRate);
        } else {
          setHeartRate(0);
        }
      },
    );
  });

  useEffect(() => {
    fetchHeartRate();
  }, [fetchHeartRate]);

  useEffect(() => {
    new NativeEventEmitter(NativeModules.AppleHealthKit).addListener(
      'healthKit:HeartRate:new',
      async () => {
        console.log('trigggg');
        fetchHeartRate();
      },
    );
    // return () => {
    //   console.log('removddt trr');
    //   healthEvent.removeAllListeners('healthKit:HeartRate:new');
    // };
  }, []);

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
