import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import NavigationKeys from './NavigationKeys';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={NavigationKeys.WelcomeScreen}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name={NavigationKeys.ChatsListScreen}
          component={ChatsListScreen}
        />
        <Stack.Screen name={NavigationKeys.ChatScreen} component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
