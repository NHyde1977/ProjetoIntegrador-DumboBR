import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function AdicionarEnderecoScreen() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  function formatCep(value: string) {
    const onlyNumbers = value.replace(/\D/g, '');

    return onlyNumbers
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Endereço</Text>

      <View style={styles.formArea}>
        <CustomInput
          placeholder="CEP"
          value={cep}
          onChangeText={(text) => setCep(formatCep(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Logradouro"
          value={logradouro}
          onChangeText={setLogradouro}
        />

        <CustomInput
          placeholder="Número"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Complemento"
          value={complemento}
          onChangeText={setComplemento}
        />

        <CustomInput
          placeholder="Bairro"
          value={bairro}
          onChangeText={setBairro}
        />

        <CustomInput
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />

        <CustomInput
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
        />

        <CustomButton title="Salvar endereço" />
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