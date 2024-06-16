import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {getTheme} from './theme';
import Home from './pages/Home';
import Splash from './pages/Splash';
import {Notifications} from 'react-native-notifications';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Register for remote notifications
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
  }, []);

  return (
    <PaperProvider children={undefined}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
