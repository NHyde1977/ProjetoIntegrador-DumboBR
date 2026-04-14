<<<<<<< HEAD
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
=======
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
>>>>>>> a6dae8663b18bc07cb5f1e4090e4e049e98a671c
import CustomButton from '../components/CustomButton';

export default function MeusObjetosScreen() {
  const [statusSelecionado, setStatusSelecionado] = useState('Sem registro');

  const objetos = [
    {
      id: 1,
      nome: 'Objeto 1',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      id: 2,
      nome: 'Objeto 2',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
    {
      id: 3,
      nome: 'Objeto 3',
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Objeto</Text>

      <View style={styles.tabsContainer}>
        {['Sem registro', 'Em trânsito', 'Entregue'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.tabButton,
              statusSelecionado === status && styles.tabButtonAtiva,
            ]}
            onPress={() => setStatusSelecionado(status)}
          >
            <Text
              style={[
                styles.tabText,
                statusSelecionado === status && styles.tabTextAtivo,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton
        title="Cadastrar Objeto"
        style={styles.registerButton}
        onPress={() => router.push('/cadastrar-objeto')}
      />

      <ScrollView
        style={styles.listArea}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {objetos.map((objeto) => (
          <View key={objeto.id} style={styles.card}>
            <Text style={styles.cardTitle}>{objeto.nome}</Text>
            <Text style={styles.cardDescription}>{objeto.descricao}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.actionsArea}>
<<<<<<< HEAD
            <View style={styles.actionsRow}>
        <CustomButton
          title="Gerar relatório"
          variant="secondary"
          style={styles.smallButton}
        />
        <CustomButton
          title="Configurações"
          variant="secondary"
          style={styles.smallButton}
          onPress={() => router.push('/configuracoes')}
        />
=======
        <View style={styles.actionsRow}>
          <CustomButton
            title="Gerar relatório"
            variant="secondary"
            style={styles.smallButton}
          />
          <CustomButton
            title="Meus objetos"
            variant="secondary"
            style={styles.smallButton}
          />
>>>>>>> a6dae8663b18bc07cb5f1e4090e4e049e98a671c
        </View>

        <CustomButton
          title="Filtrar status"
          variant="secondary"
          style={styles.bottomButton}
<<<<<<< HEAD
          onPress={() => router.push('/filtrar-status')}
=======
>>>>>>> a6dae8663b18bc07cb5f1e4090e4e049e98a671c
        />
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
    marginBottom: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
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
  tabButtonAtiva: {
    backgroundColor: '#F2EEFF',
    borderColor: '#F2EEFF',
  },
  tabText: {
    color: '#D7DCE2',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabTextAtivo: {
    color: '#5E42D8',
  },
  listArea: {
    flex: 1,
    marginBottom: 18,
  },
  listContent: {
    gap: 14,
    paddingBottom: 8,
  },
  card: {
    backgroundColor: '#163652',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#244766',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  cardDescription: {
    color: '#D7DCE2',
    fontSize: 14,
    lineHeight: 20,
  },
  actionsArea: {
    marginBottom: 14,
    gap: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  smallButton: {
    flex: 1,
  },
  bottomButton: {
    alignSelf: 'center',
    minWidth: 180,
  },
  backButton: {
    maxWidth: 200,
    alignSelf: 'center',
  },
  registerButton: {
    marginBottom: 18,
  }
});