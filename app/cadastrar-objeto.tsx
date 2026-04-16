import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function CadastrarObjetoScreen() {
  const [codigoRastreio, setCodigoRastreio] = useState('');
  const [valorFrete, setValorFrete] = useState('');
  const [valorBem, setValorBem] = useState('');
  const [taxaAlfandegaria, setTaxaAlfandegaria] = useState('');
  const [outrosCustos, setOutrosCustos] = useState('');

  function formatCurrency(value: string) {
    const onlyNumbers = value.replace(/\D/g, '');

    if (!onlyNumbers) return '';

    const numericValue = Number(onlyNumbers) / 100;

    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function handleCadastrarObjeto() {
  if (!codigoRastreio.trim()) {
    Alert.alert('Erro', 'Informe o código de rastreio.');
    return;
  }

  if (!valorFrete.trim()) {
    Alert.alert('Erro', 'Informe o valor do frete.');
    return;
  }

  if (!valorBem.trim()) {
    Alert.alert('Erro', 'Informe o valor do bem.');
    return;
  }

  Alert.alert(
    'Objeto cadastrado',
    'O objeto foi cadastrado com sucesso.'
  );
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Objeto</Text>

      <View style={styles.tabsContainer}>
        <View style={[styles.tabButton, styles.tabButtonActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Sem registro</Text>
        </View>

        <View style={styles.tabButton}>
          <Text style={styles.tabText}>Em trânsito</Text>
        </View>

        <View style={styles.tabButton}>
          <Text style={styles.tabText}>Entregue</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <Text style={styles.label}>Insira o código de rastreio:</Text>

        <CustomInput
          placeholder="Código de rastreio*"
          value={codigoRastreio}
          onChangeText={setCodigoRastreio}
        />

        <CustomInput
          placeholder="Valor do frete"
          value={valorFrete}
          onChangeText={(text) => setValorFrete(formatCurrency(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Valor do bem"
          value={valorBem}
          onChangeText={(text) => setValorBem(formatCurrency(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Taxa alfandegária"
          value={taxaAlfandegaria}
          onChangeText={(text) => setTaxaAlfandegaria(formatCurrency(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Outros custos"
          value={outrosCustos}
          onChangeText={(text) => setOutrosCustos(formatCurrency(text))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.actionsRow}>
        <CustomButton
          title="Cancelar"
          variant="secondary"
          style={styles.actionButton}
          onPress={() => router.back()}
        />

        <CustomButton
          title="Cadastrar"
          style={styles.actionButton}
          onPress={handleCadastrarObjeto}
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
    marginBottom: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8FA4B7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  tabButtonActive: {
    backgroundColor: '#F2EEFF',
    borderColor: '#F2EEFF',
  },
  tabText: {
    color: '#D7DCE2',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#5E42D8',
  },
  formArea: {
    flex: 1,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
  },
});