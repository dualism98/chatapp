/* eslint-disable react-hooks/exhaustive-deps */
import {observer} from 'mobx-react-lite';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {rootStore} from '../store/RootStore';
import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';
import {borderRadius, indent} from '../theme/layout';

interface Props {
  messageId: string;
}

const Message: React.FC<Props> = observer(({messageId}) => {
  const message = rootStore.messagesStore.messageById[messageId];
  const isUserMessage = useMemo(
    () => message.from === '63eb3189bd5824de8d5fc502',
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
});

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

export default Message;
