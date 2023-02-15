/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Message from '../../store/Message/Message';
import {rootStore} from '../../store/RootStore';
import colors from '../../theme/colors';
import {fontFamily, fontSize} from '../../theme/fonts';
import {borderRadius, indent} from '../../theme/layout';

interface Props {
  message: Message;
}

const TextMessage: React.FC<Props> = ({message}) => {
  const isUserMessage = useMemo(
    () => message.from === rootStore.userStore.userId,
    [],
  );

  return (
    <View
      style={[styles.container, isUserMessage && styles.userMessageContainer]}>
      <Text
        style={[styles.messageText, isUserMessage && styles.userMessageText]}>
        {message.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    backgroundColor: colors.greyCell,
    marginVertical: indent.xxs,
    padding: indent.xs,
    borderRadius: borderRadius.xl,
    alignSelf: 'flex-start',
  },

  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },

  messageText: {
    color: colors.label,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.m,
  },

  userMessageText: {
    color: colors.background,
  },
});

export default TextMessage;
