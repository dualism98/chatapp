/* eslint-disable react-hooks/exhaustive-deps */
import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';

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
    () => message.from === rootStore.userStore.userId,
    [],
  );

  const videoRef = React.useRef<Video>(null);

  const handleVideoPress = useCallback(
    () => videoRef.current?.presentFullscreenPlayer(),
    [],
  );

  switch (message.type) {
    case 'text':
      return (
        <View
          style={[
            styles.container,
            isUserMessage && styles.userMessageContainer,
          ]}>
          <Text
            style={[
              styles.messageText,
              isUserMessage && styles.userMessageText,
            ]}>
            {message.text}
          </Text>
        </View>
      );

    case 'video':
      console.log('VIDEO', message.src);
      return (
        <Pressable
          onPress={handleVideoPress}
          style={{alignSelf: isUserMessage ? 'flex-end' : 'flex-start'}}>
          <Video
            ref={videoRef}
            source={{uri: message.src}}
            style={{width: 160, height: 90, alignSelf: 'flex-end'}}
            resizeMode={'contain'}
          />
        </Pressable>
      );

    default:
      return null;
  }
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
