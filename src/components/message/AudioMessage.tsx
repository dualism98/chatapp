/* eslint-disable react-hooks/exhaustive-deps */
import {observer} from 'mobx-react-lite';
import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

import Message from '../../store/Message/Message';
import {rootStore} from '../../store/RootStore';
import colors from '../../theme/colors';

interface Props {
  message: Message;
}

const AudioMessage: React.FC<Props> = observer(({message}) => {
  const [paused, setPaused] = React.useState(true);
  const [currentPosition, setCurrentPosition] = React.useState('0%');

  const isUserMessage = useMemo(
    () => message.from === rootStore.userStore.userId,
    [],
  );

  const handlePlayPress = useCallback(() => {
    setPaused(!paused);
  }, [paused]);

  return (
    <View
      style={
        isUserMessage ? styles.userMessageContainer : styles.messageContainer
      }>
      <TouchableOpacity disabled={!message.src} onPress={handlePlayPress} style={styles.playButton}>
        {!!message.src ? (
          <Image
            source={
              paused
                ? require('../../assets/images/play.png')
                : require('../../assets/images/pause.png')
            }
            style={styles.playIcon}
          />
        ) : (
          <ActivityIndicator color={colors.label} size={'small'} />
        )}
      </TouchableOpacity>
      <View style={styles.progressBar}>
        <View style={[styles.progressBarInner, {width: currentPosition}]} />
      </View>
      {!!message.src && (
        <Video
          source={{uri: message.src}}
          playInBackground
          paused={paused}
          repeat
          onEnd={() => {
            setPaused(true);
            setCurrentPosition('0%');
          }}
          onProgress={data =>
            setCurrentPosition(
              `${Math.floor(
                (data.currentTime / data.seekableDuration) * 100,
              )}%`,
            )
          }
          style={styles.audio}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },

  messageContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },

  playButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
  },

  playIcon: {
    width: 50,
    height: 50,
  },

  audio: {
    width: 0,
    height: 0,
  },

  progressBar: {
    height: 6,
    width: 100,
    borderRadius: 3,
    backgroundColor: colors.greyCell,
    overflow: 'hidden',
  },

  progressBarInner: {
    height: 6,
    backgroundColor: colors.primary,
  },
});

export default AudioMessage;
