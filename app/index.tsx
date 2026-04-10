import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Image
          source={require('../assets/images/logo-dumbobr.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formArea}>
        <CustomInput placeholder="Email" />
        <CustomInput placeholder="Senha" secureTextEntry />

        <CustomButton
          title="Entrar"
          onPress={() => router.push('/meus-objetos')}/>
      </View>

      <View style={styles.actionsArea}>
      <View style={styles.actionsRow}>
        <CustomButton
          title="Esqueci minha senha"
          variant="secondary"
          style={styles.smallButton}
          onPress={() => router.push('/recuperar-senha')}
        />

        <CustomButton
          title="Cadastrar"
          variant="secondary"
          style={styles.smallButton}
          onPress={() => router.push('/cadastro')}
        />
      </View>

      <CustomButton
        title="Fale Conosco"
        variant="secondary"
        style={styles.contactButton}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D2B45',
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoImage: {
    width: 260,
    height: 260,
  },
  formArea: {
    width: '100%',
    marginBottom: 26,
  },
  actionsArea: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  actionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  smallButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#F2EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  contactButton: {
    minWidth: 170,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#F2EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  smallButtonText: {
    color: '#5E42D8',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});