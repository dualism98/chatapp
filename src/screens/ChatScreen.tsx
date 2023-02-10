import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MessageInput from '../components/MessageInput';
import colors from '../theme/colors';

const ChatScreen: React.FC = () => {

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <FlatList
        data={[]}
        renderItem={() => null}
        contentContainerStyle={{backgroundColor: 'red', flexGrow: 1}}
      />
      <MessageInput />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ChatScreen;
