import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ConfiguracoesScreen() {
  const [tema, setTema] = useState("escuro");

  async function carregarTema() {
    const temaSalvo = await AsyncStorage.getItem("@DumboBR:tema");

    if (temaSalvo) {
      setTema(temaSalvo);
    }
  }

  async function alterarTema(novoTema: string) {
    await AsyncStorage.setItem("@DumboBR:tema", novoTema);
    setTema(novoTema);

    window.alert(
      novoTema === "claro" ? "Tema claro ativado." : "Tema escuro ativado.",
    );
  }

  async function handleLogout() {
    await AsyncStorage.removeItem("@DumboBR:token");

    window.alert("Você saiu da sua conta.");

    router.replace("/");
  }

  useEffect(() => {
    carregarTema();
  }, []);

  const temaClaro = tema === "claro";

  return (
    <View style={[styles.container, temaClaro && styles.containerClaro]}>
      <Text style={[styles.title, temaClaro && styles.titleClaro]}>
        Configurações
      </Text>

      <View style={styles.optionsArea}>
        <TouchableOpacity
          style={[styles.optionCard, temaClaro && styles.optionCardClaro]}
          onPress={() => router.push("/minha-conta")}
        >
          <Text
            style={[styles.optionTitle, temaClaro && styles.optionTitleClaro]}
          >
            Minha Conta
          </Text>
          <Text
            style={[
              styles.optionDescription,
              temaClaro && styles.optionDescriptionClaro,
            ]}
          >
            Visualize os dados do seu cadastro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, temaClaro && styles.optionCardClaro]}
          onPress={() => router.push("/meus-enderecos")}
        >
          <Text
            style={[styles.optionTitle, temaClaro && styles.optionTitleClaro]}
          >
            Meus Endereços
          </Text>
          <Text
            style={[
              styles.optionDescription,
              temaClaro && styles.optionDescriptionClaro,
            ]}
          >
            Visualize e cadastre seus endereços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, temaClaro && styles.optionCardClaro]}
          onPress={() => alterarTema("escuro")}
        >
          <Text
            style={[styles.optionTitle, temaClaro && styles.optionTitleClaro]}
          >
            Tema Escuro
          </Text>
          <Text
            style={[
              styles.optionDescription,
              temaClaro && styles.optionDescriptionClaro,
            ]}
          >
            Ativar visual azul escuro do DumboBR
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, temaClaro && styles.optionCardClaro]}
          onPress={() => alterarTema("claro")}
        >
          <Text
            style={[styles.optionTitle, temaClaro && styles.optionTitleClaro]}
          >
            Tema Claro
          </Text>
          <Text
            style={[
              styles.optionDescription,
              temaClaro && styles.optionDescriptionClaro,
            ]}
          >
            Ativar visual claro do aplicativo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, styles.logoutCard]}
          onPress={handleLogout}
        >
          <Text
            style={[styles.optionTitle, temaClaro && styles.optionTitleClaro]}
          >
            Sair
          </Text>
          <Text
            style={[
              styles.optionDescription,
              temaClaro && styles.optionDescriptionClaro,
            ]}
          >
            Encerrar sessão e voltar para o login
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        title="Voltar"
        variant="secondary"
        style={styles.backButton}
        onPress={() => router.push("/meus-objetos")}
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
  containerClaro: {
    backgroundColor: "#F5F7FA",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  titleClaro: {
    color: "#0D2B45",
  },
  optionsArea: {
    flex: 1,
    gap: 14,
  },
  optionCard: {
    backgroundColor: "#163652",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#244766",
  },
  optionCardClaro: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D0D7DE",
  },
  logoutCard: {
    borderColor: "#C94C4C",
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  optionTitleClaro: {
    color: "#0D2B45",
  },
  optionDescription: {
    color: "#D7DCE2",
    fontSize: 14,
    lineHeight: 20,
  },
  optionDescriptionClaro: {
    color: "#455A64",
  },
  backButton: {
    maxWidth: 220,
    alignSelf: "center",
    marginTop: 18,
  },
});
