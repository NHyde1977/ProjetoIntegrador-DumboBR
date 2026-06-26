import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "claro" | "escuro";

type ThemeContextData = {
  tema: Theme;
  alterarTema: (tema: Theme) => Promise<void>;
};

const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Theme>("escuro");

  useEffect(() => {
    carregarTema();
  }, []);

  async function carregarTema() {
    const temaSalvo = await AsyncStorage.getItem("@DumboBR:tema");

    if (temaSalvo === "claro" || temaSalvo === "escuro") {
      setTema(temaSalvo);
    }
  }

  async function alterarTema(novoTema: Theme) {
    await AsyncStorage.setItem("@DumboBR:tema", novoTema);
    setTema(novoTema);
  }

  return (
    <ThemeContext.Provider
      value={{
        tema,
        alterarTema,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
