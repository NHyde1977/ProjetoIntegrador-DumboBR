import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../components/CustomButton";
import api from "../services/api";

type ObjetoRastreado = {
  id: number;
  codigoRastreio: string;
  valorFrete: number;
  valorBem: number;
  taxaAlfandegaria: number;
  outrosCustos: number;
  status: string;
  usuarioId: number;
};

export default function MeusObjetosScreen() {
  const [statusSelecionado, setStatusSelecionado] = useState("Todos");
  const [objetos, setObjetos] = useState<ObjetoRastreado[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarObjetos() {
    try {
      const response = await api.get("/me/objetos");
      console.log("OBJETOS:", response.data);
      setObjetos(response.data);
    } catch (error: any) {
      console.log("ERRO OBJETOS:", error?.response?.data || error?.message);
      window.alert("Erro ao carregar objetos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarObjetos();
  }, []);

  const objetosFiltrados =
    statusSelecionado === "Todos"
      ? objetos
      : objetos.filter((objeto) => objeto.status === statusSelecionado);

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando objetos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Objetos</Text>

      <View style={styles.tabsContainer}>
        {["Todos", "SEM_REGISTRO", "EM_TRANSITO", "ENTREGUE"].map((status) => (
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
        onPress={() => router.push("/cadastrar-objeto")}
      />

      <FlatList
        data={objetosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listArea}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum objeto encontrado.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.codigoRastreio}</Text>
            <Text style={styles.cardDescription}>Status: {item.status}</Text>
            <Text style={styles.cardDescription}>
              Valor do bem: R$ {item.valorBem}
            </Text>
            <Text style={styles.cardDescription}>
              Frete: R$ {item.valorFrete}
            </Text>
            <Text style={styles.cardDescription}>
              Taxa alfandegária: R$ {item.taxaAlfandegaria}
            </Text>
            <Text style={styles.cardDescription}>
              Outros custos: R$ {item.outrosCustos}
            </Text>
          </View>
        )}
      />

      <View style={styles.actionsArea}>
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
            onPress={() => router.push("/configuracoes")}
          />
        </View>

        <CustomButton
          title="Filtrar status"
          variant="secondary"
          style={styles.bottomButton}
          onPress={() => router.push("/filtrar-status")}
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
    backgroundColor: "#0D2B45",
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8FA4B7",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  tabButtonAtiva: {
    backgroundColor: "#F2EEFF",
    borderColor: "#F2EEFF",
  },
  tabText: {
    color: "#D7DCE2",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  tabTextAtivo: {
    color: "#5E42D8",
  },
  listArea: {
    flex: 1,
    marginBottom: 18,
  },
  listContent: {
    gap: 14,
    paddingBottom: 8,
  },
  emptyText: {
    color: "#D7DCE2",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
  card: {
    backgroundColor: "#163652",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#244766",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardDescription: {
    color: "#D7DCE2",
    fontSize: 14,
    lineHeight: 20,
  },
  actionsArea: {
    marginBottom: 14,
    gap: 12,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  smallButton: {
    flex: 1,
  },
  bottomButton: {
    alignSelf: "center",
    minWidth: 180,
  },
  backButton: {
    maxWidth: 200,
    alignSelf: "center",
  },
  registerButton: {
    marginBottom: 18,
  },
});
