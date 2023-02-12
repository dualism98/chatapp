/* eslint-disable react-hooks/exhaustive-deps */
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ChatCard from '../components/ChatCard';
import {rootStore} from '../store/RootStore';
import colors from '../theme/colors';

const ChatsListScreen: React.FC = observer(() => {
  const [loading, setLoading] = React.useState(false);
  const chatIds = rootStore.chatsStore.chatIds;

  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    loadChats();
  }, []);

  const loadChats = useCallback(async () => {
    setLoading(true);
    await rootStore.chatsStore.loadChats();
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatIds}
        refreshControl={
          <RefreshControl
            tintColor={colors.label}
            onRefresh={loadChats}
            refreshing={loading}
          />
        }
        keyExtractor={item => item}
        contentContainerStyle={{paddingBottom: insets.bottom}}
        renderItem={data => <ChatCard chatId={data.item} />}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ChatsListScreen;
