import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import colors from '../theme/colors';
import { indent } from '../theme/layout';

const messages = [
  {
    text: 'fdsfsk dfsl;d fs ;dfjsdf jsdlf jslkjflskd fjklj',
    type: '',
    from: 'me',
    to: 'user',
  },
  {
    text: 'dfsdfsfd',
    type: '',
    from: 'user',
    to: 'me',
  },
];

const ChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <FlatList
        data={messages}
        renderItem={data => <Message message={data.item} />}
        contentContainerStyle={styles.contentContainer}
        inverted
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

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: indent.s,
  },
});

export default ChatScreen;
