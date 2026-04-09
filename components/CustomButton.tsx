import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CustomButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
};

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  primaryButton: {
    backgroundColor: '#E9E9E9',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#F2EEFF',
    minHeight: 46,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  primaryText: {
    color: '#5E42D8',
  },
  secondaryText: {
    color: '#5E42D8',
    fontSize: 14,
    textAlign: 'center',
  },
});