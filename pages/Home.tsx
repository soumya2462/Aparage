/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeartRate from '../components/HeartRate';
import Steps from '../components/Steps';
import Sleep from '../components/Sleep';
import Mindfulness from '../components/Mindfulness';
import {useDate, DateProvider} from '../context/Date';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeContent = () => {
  const insets = useSafeAreaInsets();
  const {startDate, setStartDate, setEndDate} = useDate();
  const [date, setDate] = useState(startDate);

  const changeDate = (numDays: number) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + numDays);
    setDate(currentDate);
    setStartDate(currentDate);
    setEndDate(currentDate);
  };

  useEffect(() => {
    setDate(startDate);
  }, [startDate]);

  return (
    <View style={{paddingTop: insets.top + 24, paddingBottom: 0}}>
      <View
        style={{
          alignItems: 'center',
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <AntDesign
          name="left"
          size={24}
          color="#000"
          onPress={() => changeDate(-1)}
        />
        <Text
          style={{
            color: '#000',
            fontWeight: '500',
            fontSize: 20,
            marginHorizontal: 20,
          }}>
          {date.toDateString()}
        </Text>
        <AntDesign
          name="right"
          size={24}
          color="#000"
          onPress={() => changeDate(1)}
        />
      </View>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            gap: 16,
          }}>
          <HeartRate />
          <Steps />
          <Sleep />
          <Mindfulness />
        </View>
      </ScrollView>
    </View>
  );
};

const Home = () => (
  <DateProvider>
    <HomeContent />
  </DateProvider>
);

export default Home;
