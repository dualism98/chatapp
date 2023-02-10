/* eslint-disable react-hooks/exhaustive-deps */
import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NavigationKeys from '../navigation/NavigationKeys';
import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';
import {borderRadius, indent} from '../theme/layout';

const WelcomeScreen: React.FC = () => {
  const [nickname, setNickname] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const navigation = useNavigation();

  const handleNicknameInput = useCallback((value: string) => {
    setNickname(value);
  }, []);

  const handleContinuePress = useCallback(() => {
    setLoading(true);
    // something is going here
    navigation.dispatch(StackActions.replace(NavigationKeys.ChatsListScreen));
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={nickname}
        onChangeText={handleNicknameInput}
        placeholder={'Enter your nickname...'}
        placeholderTextColor={colors.greyTertiary}
        style={styles.input}
        selectionColor={colors.label}
        cursorColor={colors.label}
      />
      <TouchableOpacity
        style={[styles.continueButton, loading && styles.disabledButton]}
        disabled={loading}
        onPress={handleContinuePress}>
        {loading ? (
          <ActivityIndicator size={'small'} color={colors.background} />
        ) : (
          <Text style={styles.buttonLabel}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: '90%',
    backgroundColor: colors.greyCell,
    fontSize: fontSize.l,
    fontFamily: fontFamily.semibold,
    paddingVertical: indent.s,
    paddingHorizontal: indent.m,
    borderRadius: borderRadius.xxl,
    color: colors.label,
  },

  continueButton: {
    width: '90%',
    height: 40,
    backgroundColor: colors.primary,
    marginTop: indent.l,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xxl,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonLabel: {
    color: colors.background,
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.l,
  },
});

export default WelcomeScreen;
