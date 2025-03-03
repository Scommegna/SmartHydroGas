import axios from "axios";

// Cria uma instância personalizada
export const api = axios.create({
  baseURL: "http://localhost:80/api",
  timeout: 10000, // Timeout opcional (10 segundos)
  headers: { "Content-Type": "application/json" },
});
