import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function ConfiguracoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.optionsArea}>
        <TouchableOpacity
        style={styles.optionCard}
        onPress={() => router.push('/minha-conta')}>
          <Text style={styles.optionTitle}>Minha Conta</Text>
          <Text style={styles.optionDescription}>
            Visualize e edite seu cadastro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.optionCard}
        onPress={() => router.push('/meus-enderecos')}>
          <Text style={styles.optionTitle}>Meus Endereços</Text>
          <Text style={styles.optionDescription}>
            Visualize e edite seus endereços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <Text style={styles.optionTitle}>Sincronizar objetos</Text>
          <Text style={styles.optionDescription}>
            Forçar atualização geral de objetos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <Text style={styles.optionTitle}>Tema do aplicativo</Text>
          <Text style={styles.optionDescription}>
            Configure suas preferências
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard}>
          <Text style={styles.optionTitle}>Editar minha home</Text>
          <Text style={styles.optionDescription}>
            Preferências na sua página inicial
          </Text>
        </TouchableOpacity>
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
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsArea: {
    flex: 1,
    gap: 14,
  },
  optionCard: {
    backgroundColor: '#163652',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#244766',
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  optionDescription: {
    color: '#D7DCE2',
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: 'center',
    marginTop: 18,
  },
});