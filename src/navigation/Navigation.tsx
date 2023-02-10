import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationKeys from './NavigationKeys';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';
import colors from '../theme/colors';
import {fontFamily} from '../theme/fonts';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen name={NavigationKeys.ChatScreen} component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
