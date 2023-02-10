/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import NavigationKeys from '../navigation/NavigationKeys';
import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';
import {indent} from '../theme/layout';

interface Props {
  chat: Chat;
}

const ChatCard: React.FC<Props> = ({chat}) => {
  const navigation = useNavigation();

  const handleCardPress = useCallback(() => {
    // @ts-expect-error
    navigation.navigate(NavigationKeys.ChatScreen, {chat});
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
          <Text style={styles.lastMessageTitle}>{chat.lastMessage}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

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
});

export default ChatCard;
