import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import api from "../services/api";

export default function AdicionarEnderecoScreen() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  function formatCep(value: string) {
    const onlyNumbers = value.replace(/\D/g, "");

    return onlyNumbers
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);
  }

  async function handleSalvarEndereco() {
    if (cep.length < 9) {
      window.alert("Informe um CEP válido.");
      return;
    }

    if (!logradouro.trim()) {
      window.alert("Informe o logradouro.");
      return;
    }

    if (!numero.trim()) {
      window.alert("Informe o número.");
      return;
    }

    if (!bairro.trim()) {
      window.alert("Informe o bairro.");
      return;
    }

    if (!cidade.trim()) {
      window.alert("Informe a cidade.");
      return;
    }

    if (!estado.trim()) {
      window.alert("Informe o estado.");
      return;
    }

    try {
      const body = {
        cep,
        logradouro: logradouro.trim(),
        numero: numero.trim(),
        complemento: complemento.trim(),
        bairro: bairro.trim(),
        cidade: cidade.trim(),
        estado: estado.trim().toUpperCase(),
        usuarioId: 0,
      };

      console.log("ENVIANDO ENDERECO:", body);

      const response = await api.post("/me/enderecos", body);

      console.log("ENDERECO CADASTRADO:", response.data);

      window.alert("Endereço cadastrado com sucesso!");

      router.push("/meus-enderecos");
    } catch (error: any) {
      console.log("ERRO ENDERECO:", error?.response?.data || error?.message);

      window.alert(
        JSON.stringify(error?.response?.data || error?.message)
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Endereço</Text>

      <View style={styles.formArea}>
        <CustomInput
          placeholder="CEP"
          value={cep}
          onChangeText={(text) => setCep(formatCep(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Logradouro"
          value={logradouro}
          onChangeText={setLogradouro}
        />

        <CustomInput
          placeholder="Número"
          value={numero}
          onChangeText={setNumero}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Complemento"
          value={complemento}
          onChangeText={setComplemento}
        />

        <CustomInput
          placeholder="Bairro"
          value={bairro}
          onChangeText={setBairro}
        />

        <CustomInput
          placeholder="Cidade"
          value={cidade}
          onChangeText={setCidade}
        />

        <CustomInput
          placeholder="Estado"
          value={estado}
          onChangeText={setEstado}
        />

        <CustomButton
          title="Salvar endereço"
          onPress={handleSalvarEndereco}
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
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
  },
  formArea: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    marginBottom: 18,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: "center",
  },
});