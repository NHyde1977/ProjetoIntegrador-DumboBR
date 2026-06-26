import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import api from "../services/api";

type Endereco = {
  id: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  usuarioId: number;
};

export default function MeusEnderecosScreen() {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarEnderecos() {
    try {
      const response = await api.get("/me/enderecos");
      console.log("ENDERECOS:", response.data);
      setEnderecos(response.data);
    } catch (error: any) {
      console.log("ERRO ENDERECOS:", error?.response?.data || error?.message);
      window.alert("Erro ao carregar endereços.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEnderecos();
  }, []);

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando endereços...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Endereços</Text>

      <ScrollView
        style={styles.addressList}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {enderecos.map((endereco) => (
          <View key={endereco.id} style={styles.addressCard}>
            <Text style={styles.addressTitle}>
              {endereco.logradouro}, {endereco.numero}
            </Text>

            <Text style={styles.addressText}>{endereco.bairro}</Text>

            <Text style={styles.addressText}>
              {endereco.cidade} - {endereco.estado}
            </Text>

            <Text style={styles.addressText}>CEP: {endereco.cep}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.actionsArea}>
        <CustomButton
          title="Adicionar endereço"
          onPress={() => router.push("/adicionar-endereco")}
        />

        <CustomButton
          title="Voltar"
          variant="secondary"
          style={styles.backButton}
          onPress={() => router.push("/configuracoes")}
        />
      </View>
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
    marginBottom: 24,
  },
  addressList: {
    flex: 1,
    gap: 14,
  },
  addressCard: {
    backgroundColor: "#163652",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#244766",
  },
  addressTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  addressText: {
    color: "#D7DCE2",
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    color: "#D7DCE2",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },
  actionsArea: {
    gap: 12,
    marginTop: 18,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: "center",
  },
  addressListContent: {
    gap: 14,
    paddingBottom: 20,
  },
});
