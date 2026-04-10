import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';

type CustomInputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export default function CustomInput({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  keyboardType = 'default',
}: CustomInputProps) {
  const [isHidden, setIsHidden] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9B4C2"
        secureTextEntry={isHidden}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />

      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsHidden(!isHidden)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isHidden ? 'Mostrar' : 'Ocultar'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 58,
    borderWidth: 1,
    borderColor: '#8FA4B7',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 56,
    color: '#FFFFFF',
    fontSize: 17,
    paddingVertical: 0,
  },
  toggleButton: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#C9B8FF',
    fontSize: 14,
    fontWeight: '600',
  },
});