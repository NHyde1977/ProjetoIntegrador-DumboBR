import { router } from 'expo-router';
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function RecuperarSenhaScreen(){

  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');


  function formatCpf(value: string) {
  const onlyNumbers = value.replace(/\D/g, '');

  return onlyNumbers
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14);
}

  function handleRecuperarSenha() {
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

  Alert.alert(
    'Solicitação enviada',
    'As instruções de recuperação de senha foram enviadas.'
  );
}

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar senha</Text>
            
            <View style={styles.formArea}>
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

                <CustomButton title="Recuperar senha"
                onPress={handleRecuperarSenha}/>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    color: '#D7DCE2',
    fontSize: 16,
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