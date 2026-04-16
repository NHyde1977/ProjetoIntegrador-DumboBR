
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default function FiltrarStatusScreen() {
  const [statusObjeto, setStatusObjeto] = useState('');
  const [dataEnvio, setDataEnvio] = useState('');
  const [intervaloDatas, setIntervaloDatas] = useState('');

  function formatDate(value: string) {
    const onlyNumbers = value.replace(/\D/g, '');

    return onlyNumbers
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .slice(0, 10);
  }

  function handleBuscarFiltro() {
  if (!statusObjeto.trim()) {
    Alert.alert('Erro', 'Informe o status do objeto.');
    return;
  }

  if (dataEnvio.length < 10) {
    Alert.alert('Erro', 'Informe uma data de envio válida.');
    return;
  }

  if (!intervaloDatas.trim()) {
    Alert.alert('Erro', 'Informe o intervalo de datas.');
    return;
  }

  Alert.alert(
    'Filtro aplicado',
    'Os critérios de busca foram aplicados com sucesso.'
  );
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar Status</Text>

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
        <Text style={styles.label}>Selecione as opções de filtros abaixo:</Text>

        <CustomInput
          placeholder="Status do objeto"
          value={statusObjeto}
          onChangeText={setStatusObjeto}
        />

        <CustomInput
          placeholder="Data de envio"
          value={dataEnvio}
          onChangeText={(text) => setDataEnvio(formatDate(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Selecione o intervalo de datas"
          value={intervaloDatas}
          onChangeText={setIntervaloDatas}
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
          title="Buscar"
          style={styles.actionButton}
          onPress={handleBuscarFiltro}
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