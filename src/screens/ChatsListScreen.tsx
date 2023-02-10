import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ChatCard from '../components/ChatCard';
import colors from '../theme/colors';

const chats: Chat[] = [
  {
    id: '1',
    name: 'Anton',
    lastMessage: 'Here',
    avatar: '',
  },
  {
    id: '2',
    name: 'Konstantin',
    lastMessage: 'Here',
    avatar: '',
  },
  {
    id: '3',
    name: 'Artyom',
    lastMessage: 'Here',
    avatar: '',
  },
];

const ChatsListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: insets.bottom}}
        renderItem={data => <ChatCard chat={data.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ChatsListScreen;
