import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(async (config) => {
  const isPublicRoute =
    config.url === "/auth/login" ||
    (config.url === "/usuarios" && config.method === "post");

  if (isPublicRoute) {
    return config;
  }

  const token = await AsyncStorage.getItem("@DumboBR:token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
