import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';


export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
  if (!email.trim()) {
    Alert.alert('Erro', 'Informe o email.');
    return;
  }

  if (!email.includes('@')) {
    Alert.alert('Erro', 'Informe um email válido.');
    return;
  }

  if (!senha.trim()) {
    Alert.alert('Erro', 'Informe a senha.');
    return;
  }

  Alert.alert('Login realizado', 'Acesso efetuado com sucesso.', [
    {
      text: 'OK',
      onPress: () => router.push('/meus-objetos'),
    },
  ]);
}

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
        <CustomInput placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />


        <CustomInput
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <CustomButton
        title="Entrar"
        onPress={handleLogin}
      />
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