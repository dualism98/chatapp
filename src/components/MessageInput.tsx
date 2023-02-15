/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {rootStore} from '../store/RootStore';
import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';
import {indent} from '../theme/layout';

interface Props {
  chatId: string;
}

const MessageInput: React.FC<Props> = ({chatId}) => {
  const [text, setText] = React.useState('');

  const textInputRef = React.useRef<TextInput>(null);

  const handleSendMessage = useCallback(() => {
    rootStore.messagesStore.sendTextMessage(text, chatId);
    textInputRef?.current?.clear();
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        value={text}
        onChangeText={value => setText(value)}
        placeholder={'Enter message...'}
        placeholderTextColor={colors.greyTertiary}
        selectionColor={colors.label}
        style={styles.input}
        multiline
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSendMessage}
        hitSlop={{left: 5, top: 5, right: 5, bottom: 5}}>
        <Image
          source={require('../assets/images/arrow.png')}
          style={styles.sendArrow}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.greyCell,
    marginHorizontal: indent.s,
    alignSelf: 'center',
    margin: indent.s,
    paddingHorizontal: indent.xxs,
    borderRadius: 20,
  },

  input: {
    flex: 1,
    maxHeight: 100,
    fontSize: fontSize.m,
    fontFamily: fontFamily.regular,
    paddingHorizontal: indent.xs,
    color: colors.label,
    lineHeight: 20,
    paddingVertical: 10,
  },

  sendButton: {
    height: 32,
    width: 32,
    marginVertical: indent.xxs,
    padding: indent.xs,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },

  sendArrow: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default MessageInput;
