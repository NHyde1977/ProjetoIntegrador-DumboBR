import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ConfiguracoesScreen() {
  async function handleLogout() {
    await AsyncStorage.removeItem("@DumboBR:token");

    window.alert("Você saiu da sua conta.");

    router.replace("/");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.optionsArea}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push("/minha-conta")}
        >
          <Text style={styles.optionTitle}>Minha Conta</Text>
          <Text style={styles.optionDescription}>
            Visualize os dados do seu cadastro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => router.push("/meus-enderecos")}
        >
          <Text style={styles.optionTitle}>Meus Endereços</Text>
          <Text style={styles.optionDescription}>
            Visualize e cadastre seus endereços
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, styles.logoutCard]}
          onPress={handleLogout}
        >
          <Text style={styles.optionTitle}>Sair</Text>
          <Text style={styles.optionDescription}>
            Encerrar sessão e voltar para o login
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
  logoutCard: {
    borderColor: "#C94C4C",
  },
  optionTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  optionDescription: {
    color: "#D7DCE2",
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: "center",
    marginTop: 18,
  },
});