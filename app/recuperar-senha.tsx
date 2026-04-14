import React  from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from 'expo-router';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function RecuperarSenhaScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar senha</Text>
            
            <View style={styles.formArea}>
                <CustomInput placeholder="CPF" />
                <CustomInput placeholder="Email" />

                <CustomButton title="Recuperar senha " />
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
    backgroundColor: '#0D2B45',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    color: '#D7DCE2',
    fontSize: 16,
  },
    formArea: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    marginBottom: 18,
  },
  backButton: {
    maxWidth: 220,
    alignSelf: 'center',
  },
});