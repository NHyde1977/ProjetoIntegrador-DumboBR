import React, { useState } from 'react';
import {  View,Text,TextInput,TouchableOpacity,StyleSheet,} from 'react-native';
import CustomButton from '../components/CustomButton';

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>DumboBR</Text>
        </View>
      </View>

      <View style={styles.formArea}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9B4C2"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#A9B4C2"
            secureTextEntry={hidePassword}
          />

          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Text style={styles.showPasswordText}>
              {hidePassword ? 'Mostrar' : 'Ocultar'}
            </Text>
          </TouchableOpacity>
        </View>

        <CustomButton title="Entrar" />
      </View>

      <View style={styles.actionsArea}>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallButton}>
            <Text style={styles.smallButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.smallButtonText}>Fale Conosco</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D2B45',
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: 28,
    backgroundColor: '#1A3B5C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoText: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  formArea: {
    width: '100%',
    marginBottom: 26,
  },
  input: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderColor: '#8FA4B7',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 17,
    marginBottom: 18,
    backgroundColor: 'transparent',
  },
  passwordContainer: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderColor: '#8FA4B7',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 17,
  },
  showPasswordText: {
    color: '#C9B8FF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  loginButton: {
    width: '100%',
    height: 54,
    borderRadius: 12,
    backgroundColor: '#E9E9E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loginButtonText: {
    color: '#5E42D8',
    fontSize: 16,
    fontWeight: '700',
  },
  actionsArea: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  actionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  smallButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#F2EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  contactButton: {
    minWidth: 170,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#F2EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  smallButtonText: {
    color: '#5E42D8',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});