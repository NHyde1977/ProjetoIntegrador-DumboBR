import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import api from "../services/api";

export default function MinhaContaScreen() {
  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregarMinhaConta() {
    try {
      const response = await api.get("/me");

      console.log("MINHA CONTA:", response.data);

      setId(response.data.id);
      setNome(response.data.nome);
      setCpf(response.data.cpf);
      setEmail(response.data.email);
      setTelefone(response.data.telefone);
    } catch (error: any) {
      console.log("ERRO MINHA CONTA:", error?.response?.data || error?.message);
      window.alert("Erro ao carregar dados da conta.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleSalvarAlteracoes() {
    if (!id) {
      window.alert("Usuário não identificado.");
      return;
    }

    if (!nome.trim()) {
      window.alert("Informe o nome.");
      return;
    }

    if (cpf.length < 14) {
      window.alert("Informe um CPF válido.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      window.alert("Informe um email válido.");
      return;
    }

    if (telefone.length < 15) {
      window.alert("Informe um telefone válido.");
      return;
    }

    if (!senha.trim()) {
      window.alert("Informe a senha para salvar as alterações.");
      return;
    }

    try {
      const body = {
        nome: nome.trim(),
        cpf,
        email: email.trim(),
        telefone,
        senha,
      };

      console.log("ATUALIZANDO CONTA:", body);

      const response = await api.put(`/usuarios/${id}`, body);

      console.log("CONTA ATUALIZADA:", response.data);

      window.alert("Dados atualizados com sucesso!");

      setSenha("");

      carregarMinhaConta();
    } catch (error: any) {
      console.log(
        "ERRO ATUALIZAR CONTA:",
        error?.response?.data || error?.message,
      );

      window.alert(JSON.stringify(error?.response?.data || error?.message));
    }
  }

  function formatCpf(value: string) {
    const onlyNumbers = value.replace(/\D/g, "");

    return onlyNumbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }

  function formatPhone(value: string) {
    const onlyNumbers = value.replace(/\D/g, "");

    return onlyNumbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  useEffect(() => {
    carregarMinhaConta();
  }, []);

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando conta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>

      <View style={styles.formArea}>
        <CustomInput
          placeholder="Nome e Sobrenome"
          value={nome}
          onChangeText={setNome}
        />

        <CustomInput
          placeholder="CPF"
          value={cpf}
          onChangeText={(text) => setCpf(formatCpf(text))}
          keyboardType="numeric"
        />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Número de telefone celular"
          value={telefone}
          onChangeText={(text) => setTelefone(formatPhone(text))}
          keyboardType="phone-pad"
        />

        <CustomInput
          placeholder="Digite sua senha para confirmar"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <CustomButton
          title="Salvar alterações"
          onPress={handleSalvarAlteracoes}
        />
      </View>

      <CustomButton
        title="Voltar"
        variant="secondary"
        style={styles.backButton}
        onPress={() => router.push("/configuracoes")}
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
