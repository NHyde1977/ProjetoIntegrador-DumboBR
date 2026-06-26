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
import { useTheme } from "../contexts/ThemeContext";
import api from "../services/api";
import { DarkTheme, LightTheme } from "../themes/colors";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

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

  const { tema } = useTheme();

  const colors = tema === "claro" ? LightTheme : DarkTheme;

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

  async function gerarRelatorio() {
    const totalObjetos = objetos.length;
    const totalValorBem = somarCampo("valorBem");
    const totalFrete = somarCampo("valorFrete");
    const totalTaxas = somarCampo("taxaAlfandegaria");
    const totalOutrosCustos = somarCampo("outrosCustos");
    const totalGeral =
      totalValorBem + totalFrete + totalTaxas + totalOutrosCustos;

    const html = `
    <html>
      <body style="font-family: Arial; padding: 24px;">
        <h1>DumboBR - Relatório Geral</h1>

        <h2>Resumo</h2>
        <p><strong>Objetos cadastrados:</strong> ${totalObjetos}</p>
        <p><strong>Valor dos bens:</strong> ${formatarMoeda(totalValorBem)}</p>
        <p><strong>Fretes:</strong> ${formatarMoeda(totalFrete)}</p>
        <p><strong>Taxas alfandegárias:</strong> ${formatarMoeda(totalTaxas)}</p>
        <p><strong>Outros custos:</strong> ${formatarMoeda(totalOutrosCustos)}</p>

        <h2>Total Geral</h2>
        <h1>${formatarMoeda(totalGeral)}</h1>

        <hr />

        <h2>Objetos</h2>
        ${objetos
          .map(
            (objeto) => `
              <div style="margin-bottom: 16px;">
                <strong>${objeto.codigoRastreio}</strong><br/>
                Status: ${traduzirStatus(objeto.status)}<br/>
                Valor do bem: ${formatarMoeda(objeto.valorBem)}<br/>
                Frete: ${formatarMoeda(objeto.valorFrete)}<br/>
                Taxa: ${formatarMoeda(objeto.taxaAlfandegaria)}<br/>
                Outros custos: ${formatarMoeda(objeto.outrosCustos)}<br/>
                Total: ${formatarMoeda(calcularTotal(objeto))}
              </div>
            `,
          )
          .join("")}
      </body>
    </html>
  `;

    try {
      if (Platform.OS === "web") {
        await Print.printAsync({ html });
        return;
      }

      const { uri } = await Print.printToFileAsync({ html });

      const podeCompartilhar = await Sharing.isAvailableAsync();

      if (podeCompartilhar) {
        await Sharing.shareAsync(uri);
      } else {
        window.alert("PDF gerado em: " + uri);
      }
    } catch (error) {
      console.log("ERRO PDF:", error);
      window.alert("Erro ao gerar PDF.");
    }
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
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.cardTitle,
            {
              color: colors.text,
            },
          ]}
        >
          Carregando objetos...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          {
            color: colors.text,
          },
        ]}
      >
        Meus Objetos
      </Text>

      <View style={styles.tabsContainer}>
        {["Todos", "SEM_REGISTRO", "EM_TRANSITO", "ENTREGUE"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.tabButton,
              {
                borderColor: colors.border,
                backgroundColor:
                  statusSelecionado === status ? colors.primary : colors.card,
              },
            ]}
            onPress={() => setStatusSelecionado(status)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    statusSelecionado === status
                      ? colors.buttonText
                      : colors.text,
                },
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
          <Text
            style={[
              styles.emptyText,
              {
                color: colors.secondaryText,
              },
            ]}
          >
            Nenhum objeto encontrado.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.codigo,
                {
                  color: colors.text,
                },
              ]}
            >
              📦 {item.codigoRastreio}
            </Text>

            <Text
              style={[
                styles.status,
                {
                  color: colors.primary,
                },
              ]}
            >
              {traduzirStatus(item.status)}
            </Text>

            <View
              style={[
                styles.divisor,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <View style={styles.linha}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                Valor do bem
              </Text>
              <Text
                style={[
                  styles.valor,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {formatarMoeda(item.valorBem)}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                Frete
              </Text>
              <Text style={styles.valor}>{formatarMoeda(item.valorFrete)}</Text>
            </View>

            <View style={styles.linha}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                Taxa alfandegária
              </Text>
              <Text style={styles.valor}>
                {formatarMoeda(item.taxaAlfandegaria)}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text
                style={[
                  styles.label,
                  {
                    color: colors.secondaryText,
                  },
                ]}
              >
                Outros custos
              </Text>
              <Text style={styles.valor}>
                {formatarMoeda(item.outrosCustos)}
              </Text>
            </View>

            <View style={styles.divisor} />

            <View style={styles.linha}>
              <Text
                style={[
                  styles.totalLabel,
                  {
                    color: colors.text,
                  },
                ]}
              >
                TOTAL
              </Text>
              <Text
                style={[
                  styles.totalValor,
                  {
                    color: colors.text,
                  },
                ]}
              >
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
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  cardTitle: {
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  tabButtonAtiva: {
    borderColor: "#F2EEFF",
  },
  tabText: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  tabTextAtivo: {},
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
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
  totalValor: {
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
