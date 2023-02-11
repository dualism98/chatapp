/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';

import NavigationKeys from '../navigation/NavigationKeys';
import ApiService from '../services/api/Api.service';
import axiosInstance from '../services/api/axiosInstance';

const useUserCreation = () => {
  const [isCreating, setIsCreating] = React.useState(false);

  const navigation = useNavigation();

  const createUser = useCallback(async (name: string) => {
    setIsCreating(true);
    try {
      const user = await ApiService.userApiService.createUser(name);
      await Keychain.setGenericPassword(user.name, user._id);
      axiosInstance.defaults.headers.authorization = user._id;
      navigation.dispatch(StackActions.replace(NavigationKeys.ChatsListScreen));
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error of creating user',
        text2: 'Try again',
      });
    } finally {
      setIsCreating(false);
    }
  }, []);

  return {isCreating, createUser};
};

export default useUserCreation;
