import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function MeusEnderecosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Endereços</Text>

      <View style={styles.addressList}>
        <View style={styles.addressCard}>
          <Text style={styles.addressTitle}>Endereço Principal</Text>
          <Text style={styles.addressText}>Rua Exemplo, 123</Text>
          <Text style={styles.addressText}>Copacabana - Rio de Janeiro/RJ</Text>
          <Text style={styles.addressText}>CEP: 22000-000</Text>
        </View>

        <View style={styles.addressCard}>
          <Text style={styles.addressTitle}>Endereço Secundário</Text>
          <Text style={styles.addressText}>Av. Modelo, 456</Text>
          <Text style={styles.addressText}>Centro - Rio de Janeiro/RJ</Text>
          <Text style={styles.addressText}>CEP: 20000-000</Text>
        </View>
      </View>

      <View style={styles.actionsArea}>
      <CustomButton
        title="Adicionar endereço"
        onPress={() => router.push('/adicionar-endereco')}/>
        <CustomButton
          title="Voltar"
          variant="secondary"
          style={styles.backButton}
          onPress={() => router.back()}
        />
      </View>
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
  addressList: {
    flex: 1,
    gap: 14,
  },
  addressCard: {
    backgroundColor: '#163652',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#244766',
  },
  addressTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  addressText: {
    color: '#D7DCE2',
    fontSize: 14,
    lineHeight: 20,
  },
  actionsArea: {
    gap: 12,
    marginTop: 18,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: 'center',
  },
});