/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import NavigationKeys from '../navigation/NavigationKeys';
import {rootStore} from '../store/RootStore';
import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';
import {indent} from '../theme/layout';

interface Props {
  chatId: string;
}

const ChatCard: React.FC<Props> = observer(({chatId}) => {
  const chat = rootStore.chatsStore.chatById[chatId] ?? {};

  const navigation = useNavigation();

  const handleCardPress = useCallback(() => {
    // @ts-expect-error
    navigation.navigate(NavigationKeys.ChatScreen, {chatId});
  }, []);

  return (
    <TouchableHighlight onPress={handleCardPress}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={{uri: chat.avatar}} />
        </View>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.nameTitle}>
            {chat.name}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: indent.m,
    paddingVertical: indent.xs,
  },

  avatarContainer: {
    height: 80,
    width: 80,
    backgroundColor: colors.greyCell,
    borderRadius: 100,
    marginRight: indent.m,
  },

  infoContainer: {
    flex: 1,
  },

  nameTitle: {
    color: colors.label,
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.l,
  },

  lastMessageTitle: {
    fontFamily: fontFamily.regular,
    color: colors.greySecondary,
    fontSize: fontSize.m,
  },

  noMessagesTitle: {
    color: colors.greyTertiary,
  },
});

export default ChatCard;
