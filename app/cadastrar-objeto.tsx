import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import api from "../services/api";

export default function CadastrarObjetoScreen() {
  const [codigoRastreio, setCodigoRastreio] = useState("");
  const [valorFrete, setValorFrete] = useState("");
  const [valorBem, setValorBem] = useState("");
  const [taxaAlfandegaria, setTaxaAlfandegaria] = useState("");
  const [outrosCustos, setOutrosCustos] = useState("");
  const [status, setStatus] = useState("EM_TRANSITO");

  function converterValor(valor: string) {
    return Number(valor.replace(",", "."));
  }

  async function handleCadastrarObjeto() {
    if (!codigoRastreio.trim()) {
      window.alert("Informe o código de rastreio.");
      return;
    }

    if (!valorFrete.trim() || !valorBem.trim()) {
      window.alert("Informe valor do frete e valor do bem.");
      return;
    }

    try {
      const body = {
        codigoRastreio: codigoRastreio.trim(),
        valorFrete: converterValor(valorFrete),
        valorBem: converterValor(valorBem),
        taxaAlfandegaria: taxaAlfandegaria
          ? converterValor(taxaAlfandegaria)
          : 0,
        outrosCustos: outrosCustos ? converterValor(outrosCustos) : 0,
        status,
        usuarioId: 0,
      };

      console.log("ENVIANDO OBJETO:", body);

      const response = await api.post("/me/objetos", body);

      console.log("OBJETO CADASTRADO:", response.data);

      window.alert("Objeto cadastrado com sucesso!");

      router.push("/meus-objetos");
    } catch (error: any) {
      console.log("ERRO OBJETO:", error?.response?.data || error?.message);

      window.alert(JSON.stringify(error?.response?.data || error?.message));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Objeto</Text>

      <View style={styles.formArea}>
        <CustomInput
          placeholder="Código de rastreio"
          value={codigoRastreio}
          onChangeText={setCodigoRastreio}
        />

        <CustomInput
          placeholder="Valor do frete"
          value={valorFrete}
          onChangeText={setValorFrete}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Valor do bem"
          value={valorBem}
          onChangeText={setValorBem}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Taxa alfandegária"
          value={taxaAlfandegaria}
          onChangeText={setTaxaAlfandegaria}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Outros custos"
          value={outrosCustos}
          onChangeText={setOutrosCustos}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Status</Text>

        <View style={styles.statusArea}>
          {["SEM_REGISTRO", "POSTADO", "EM_TRANSITO", "ENTREGUE"].map(
            (item) => (
              <CustomButton
                key={item}
                title={item}
                variant={status === item ? "primary" : "secondary"}
                style={styles.statusButton}
                onPress={() => setStatus(item)}
              />
            ),
          )}
        </View>

        <CustomButton
          title="Cadastrar Objeto"
          onPress={handleCadastrarObjeto}
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
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  statusArea: {
    gap: 8,
    marginBottom: 18,
  },
  statusButton: {
    minHeight: 42,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: "center",
  },
});
