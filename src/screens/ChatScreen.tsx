/* eslint-disable react-hooks/exhaustive-deps */
import {RouteProp} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Message from '../components/Message';
import MessageInput from '../components/MessageInput';
import GRPCService from '../services/grpc/GRPC.service';
import {rootStore} from '../store/RootStore';
import colors from '../theme/colors';
import {indent} from '../theme/layout';

interface Props {
  route: RouteProp<{params: {chatId: string}}>;
}

const ChatScreen: React.FC<Props> = observer(({route}) => {
  const chatId = route.params.chatId;
  const messagesIds = rootStore.messagesStore.messagesIdsByChatId(chatId);

  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    loadChatMessages();
    GRPCService.messagesGRPCService.receiveMessages();
  }, []);

  const loadChatMessages = useCallback(() => {
    rootStore.messagesStore.loadChatMessages(chatId);
  }, []);

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <FlatList
        data={messagesIds}
        renderItem={data => <Message messageId={data.item} />}
        keyExtractor={item => item}
        contentContainerStyle={styles.contentContainer}
        inverted
      />
      <MessageInput chatId={chatId} />
    </View>
  );
});

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
