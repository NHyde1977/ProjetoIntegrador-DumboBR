import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
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

      Alert.alert("Erro", "Erro ao carregar objetos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarObjetos();
  }, []);

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function calcularTotal(objeto: ObjetoRastreado) {
    return (
      objeto.valorBem +
      objeto.valorFrete +
      objeto.taxaAlfandegaria +
      objeto.outrosCustos
    );
  }

  function somarCampo(campo: keyof ObjetoRastreado) {
    return objetos.reduce((total, objeto) => {
      const valor = objeto[campo];

      if (typeof valor === "number") {
        return total + valor;
      }

      return total;
    }, 0);
  }

  function gerarRelatorio() {
    const totalObjetos = objetos.length;
    const totalValorBem = somarCampo("valorBem");
    const totalFrete = somarCampo("valorFrete");
    const totalTaxas = somarCampo("taxaAlfandegaria");
    const totalOutrosCustos = somarCampo("outrosCustos");

    const totalGeral =
      totalValorBem + totalFrete + totalTaxas + totalOutrosCustos;

    const entregues = objetos.filter(
      (objeto) => objeto.status === "ENTREGUE",
    ).length;

    const emTransito = objetos.filter(
      (objeto) => objeto.status === "EM_TRANSITO",
    ).length;

    const postados = objetos.filter(
      (objeto) => objeto.status === "POSTADO",
    ).length;

    const semRegistro = objetos.filter(
      (objeto) => objeto.status === "SEM_REGISTRO",
    ).length;

    window.alert(
      `RELATÓRIO GERAL DUMBOBR

Objetos cadastrados: ${totalObjetos}

Status:
- Sem registro: ${semRegistro}
- Postados: ${postados}
- Em trânsito: ${emTransito}
- Entregues: ${entregues}

Custos:
- Valor dos bens: ${formatarMoeda(totalValorBem)}
- Fretes: ${formatarMoeda(totalFrete)}
- Taxas alfandegárias: ${formatarMoeda(totalTaxas)}
- Outros custos: ${formatarMoeda(totalOutrosCustos)}

TOTAL GERAL:
${formatarMoeda(totalGeral)}`,
    );
  }

  function traduzirStatus(status: string) {
    switch (status) {
      case "SEM_REGISTRO":
        return "⚪ Sem registro";
      case "POSTADO":
        return "🔵 Postado";
      case "EM_TRANSITO":
        return "🟡 Em trânsito";
      case "AGUARDANDO_PAGAMENTO":
        return "🟠 Aguardando pagamento";
      case "LIBERADO_PELA_ALFANDEGA":
        return "🟣 Liberado pela alfândega";
      case "SAIU_PARA_ENTREGA":
        return "🚚 Saiu para entrega";
      case "ENTREGUE":
        return "🟢 Entregue";
      case "DEVOLVIDO":
        return "🔴 Devolvido";
      default:
        return status;
    }
  }

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
              {status === "Todos" ? "Todos" : traduzirStatus(status)}
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
            <Text style={styles.codigo}>📦 {item.codigoRastreio}</Text>

            <Text style={styles.status}>{traduzirStatus(item.status)}</Text>

            <View style={styles.divisor} />

            <View style={styles.linha}>
              <Text style={styles.label}>Valor do bem</Text>
              <Text style={styles.valor}>{formatarMoeda(item.valorBem)}</Text>
            </View>

            <View style={styles.linha}>
              <Text style={styles.label}>Frete</Text>
              <Text style={styles.valor}>{formatarMoeda(item.valorFrete)}</Text>
            </View>

            <View style={styles.linha}>
              <Text style={styles.label}>Taxa alfandegária</Text>
              <Text style={styles.valor}>
                {formatarMoeda(item.taxaAlfandegaria)}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text style={styles.label}>Outros custos</Text>
              <Text style={styles.valor}>
                {formatarMoeda(item.outrosCustos)}
              </Text>
            </View>

            <View style={styles.divisor} />

            <View style={styles.linha}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValor}>
                {formatarMoeda(calcularTotal(item))}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.actionsArea}>
        <View style={styles.actionsRow}>
          <CustomButton
            title="Gerar relatório"
            variant="secondary"
            style={styles.smallButton}
            onPress={gerarRelatorio}
          />

          <CustomButton
            title="Configurações"
            variant="secondary"
            style={styles.smallButton}
            onPress={() => router.push("/configuracoes")}
          />
        </View>
      </View>

      <CustomButton
        title="Voltar"
        variant="secondary"
        style={styles.backButton}
        onPress={() => router.push("/")}
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
  registerButton: {
    marginBottom: 18,
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
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#244766",
  },
  codigo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  status: {
    color: "#F2EEFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  divisor: {
    height: 1,
    backgroundColor: "#244766",
    marginVertical: 12,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  label: {
    color: "#D7DCE2",
    fontSize: 14,
    flex: 1,
  },
  valor: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  totalValor: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "right",
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
  backButton: {
    maxWidth: 200,
    alignSelf: "center",
  },
});
