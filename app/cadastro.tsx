import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

 function handleCadastro() {
  if (!nome.trim()) {
    Alert.alert('Erro', 'Informe o nome e sobrenome.');
    return;
  }

  if (cpf.length < 14) {
    Alert.alert('Erro', 'Informe um CPF válido.');
    return;
  }

  if (!email.trim()) {
    Alert.alert('Erro', 'Informe o email.');
    return;
  }

  if (!email.includes('@')) {
    Alert.alert('Erro', 'Informe um email válido.');
    return;
  }

  if (telefone.length < 15) {
    Alert.alert('Erro', 'Informe um telefone válido.');
    return;
  }

  Alert.alert(
    'Cadastro realizado',
    'Seu cadastro foi realizado com sucesso.'
  );
}

  function formatCpf(value: string) {
    const onlyNumbers = value.replace(/\D/g, '');

    return onlyNumbers
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  }

  function formatPhone(value: string) {
    const onlyNumbers = value.replace(/\D/g, '');

    return onlyNumbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.formArea}>
        <CustomInput
          placeholder="Nome e Sobrenome"
          value={nome}
          onChangeText={setNome}
        />

        <CustomInput
          placeholder="CPF"
          value={cpf}
          onChangeText={(text) => setCpf(formatCpf(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Número de telefone celular"
          value={telefone}
          onChangeText={(text) => setTelefone(formatPhone(text))}
          keyboardType="phone-pad"
        />

        <CustomButton title="Cadastrar"
        onPress={handleCadastro} />
      </View>

      <CustomButton
        title="Voltar"
        variant="secondary"
        style={styles.backButton}
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D2B45',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
  },
  formArea: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    marginBottom: 18,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: 'center',
  },
});