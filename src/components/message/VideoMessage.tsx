/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Message from '../../store/Message/Message';
import {rootStore} from '../../store/RootStore';

interface Props {
  message: Message;
}

const VideoMessage: React.FC<Props> = ({message}) => {
  const videoRef = React.useRef<Video>(null);
  const isUserMessage = useMemo(
    () => message.from === rootStore.userStore.userId,
    [],
  );

  const handleVideoPress = useCallback(
    () => videoRef.current?.presentFullscreenPlayer(),
    [],
  );

  return (
    <Pressable
      onPress={handleVideoPress}
      style={
        isUserMessage ? styles.userMessageContainer : styles.messageContainer
      }>
      <Video
        ref={videoRef}
        source={{uri: message.src}}
        style={styles.video}
        resizeMode={'contain'}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  userMessageContainer: {
    alignSelf: 'flex-end',
  },

  messageContainer: {
    alignSelf: 'flex-start',
  },

  video: {width: 160, height: 90, alignSelf: 'flex-end'},
});

export default VideoMessage;
