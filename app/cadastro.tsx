import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

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

        <CustomButton title="Cadastrar" />
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