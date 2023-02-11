/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useUserCreation from '../hooks/useUserCreation';

import colors from '../theme/colors';
import {fontFamily, fontSize} from '../theme/fonts';
import {borderRadius, indent} from '../theme/layout';

const WelcomeScreen: React.FC = () => {
  const [name, setName] = React.useState('');

  const {isCreating, createUser} = useUserCreation();
  const buttonDisabled = useMemo(() => !name || isCreating, [name, isCreating]);

  const handleNameInput = useCallback((value: string) => {
    setName(value);
  }, []);

  const handleContinuePress = useCallback(() => createUser(name), [name]);

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={handleNameInput}
        placeholder={'Enter your nickname...'}
        placeholderTextColor={colors.greyTertiary}
        style={styles.input}
        selectionColor={colors.label}
        cursorColor={colors.label}
        editable={!isCreating}
      />
      <TouchableOpacity
        style={[styles.continueButton, buttonDisabled && styles.disabledButton]}
        disabled={buttonDisabled}
        onPress={handleContinuePress}>
        {isCreating ? (
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
