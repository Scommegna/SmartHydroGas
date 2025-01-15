import axios from "axios";

// URL do backend
const backendBaseUrl = "http://localhost:80/";

// Exemplo de requisição GET
axios
  .get(`${backendBaseUrl}/rota`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
