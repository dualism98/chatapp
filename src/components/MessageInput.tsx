import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';
import {indent} from '../theme/layout';
import SvgIcon from './ui/SvgIcon';

const MessageInput: React.FC = () => {

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Enter message...'}
        placeholderTextColor={colors.greyTertiary}
        selectionColor={colors.label}
        style={styles.input}
        multiline
      />
      <TouchableOpacity style={styles.sendButton}>
        {/* <SvgIcon source={'arrow'} /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.greyCell,
    width: '95%',
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
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
});

export default MessageInput;
