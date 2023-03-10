import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';

import NavigationKeys from './NavigationKeys';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';
import colors from '../theme/colors';
import {fontFamily} from '../theme/fonts';
import ChatScreenHeader from '../components/ChatScreenHeader';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    Keychain.getGenericPassword().then(res => {
      setIsLoggedIn(!!res);
    });
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isLoggedIn
            ? NavigationKeys.ChatsListScreen
            : NavigationKeys.WelcomeScreen
        }
        screenOptions={{
          headerTintColor: colors.label,
          headerTitleStyle: {fontFamily: fontFamily.bold},
          headerStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen
          options={{headerShown: false}}
          name={NavigationKeys.WelcomeScreen}
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{title: 'Chats'}}
          name={NavigationKeys.ChatsListScreen}
          component={ChatsListScreen}
        />
        <Stack.Screen
          options={({route}) => ({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerTitle: () => (
              //@ts-expect-error
              <ChatScreenHeader chatId={route?.params?.chatId} />
            ),
          })}
          name={NavigationKeys.ChatScreen}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
