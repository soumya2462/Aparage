/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeartRate from '../components/HeartRate';
import Steps from '../components/Steps';
import Mindfulness from '../components/Mindfulness';

const HomeContent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{paddingTop: insets.top + 24, paddingBottom: 0}}>
      <View
        style={{
          alignItems: 'center',
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#000',
            fontWeight: '500',
            fontSize: 20,
            marginHorizontal: 20,
          }}>
          Today's Achievement
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            gap: 16,
          }}>
          <Steps />
          <HeartRate />
          {/* <Sleep /> */}
          <Mindfulness />
        </View>
      </ScrollView>
    </View>
  );
};

const Home = () => <HomeContent />;

export default Home;
