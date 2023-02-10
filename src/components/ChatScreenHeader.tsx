import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';

interface Props {
  chat: Chat;
}

const ChatScreenHeader: React.FC<Props> = ({chat}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: chat.avatar}} style={styles.avatar} />
      </View>
      <Text style={styles.nameTitle}>{chat.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.greyCell,
    marginRight: 10,
    overflow: 'hidden',
  },

  avatar: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

  nameTitle: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.m,
    color: colors.label,
  },
});

export default ChatScreenHeader;
