import React, { useState } from "react";
import axios from "axios";
import blueMinimalistWaterSystemsLogoRemovebgPreview1 from "../../assets/blue-minimalist-water-systems-logo-removebg-preview-1.png";
import image from "../../assets/image.svg";
import mdiPasswordOutline from "../../assets/mdi-password-outline.svg";
import riEyeCloseLine from "../../assets/ri-eye-close-line.svg";
import riUserLine from "../../assets/ri-user-line.svg";
import "./style.css";

const CreateUserModal = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  if (!visible) return null;

  const handleSubmit = async () => {
    if (!name || !cpf || !address || !email || !password) {
      setStatus("Todos os campos são obrigatórios.");
      return;
    }

    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    const userData = {
      firstName,
      lastName,
      cpf,
      address,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:80/api/createAccount",
        userData,
        { withCredentials: false }
      );

      if (response.status === 201) {
        alert("Usuário criado com sucesso!");
        onClose();
      } else {
        throw new Error("Erro ao criar o usuário.");
      }
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
      alert("Erro ao criar o usuário.");
    }
  };

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title">
      <div className="modal-content">
        <h2 id="modal-title">Criar Usuário</h2>
        <div>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            CPF:
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Endereço:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleSubmit}>Criar</button>
        <button onClick={onClose}>Cancelar</button>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
};

export const LoginSmartHydrogas = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    try {
      const response = await axios.post(
        "http://localhost:80/api/login",
        { email, password },
        { withCredentials: true }
      );
      const { typeOfClient } = response.data.typeOfClient;
      onLoginSuccess(typeOfClient);
    } catch (err) {
      console.error(
        "Erro ao fazer login:",
        err.response ? err.response.data.message : err.message
      );
      setError("Falha ao fazer login, tente novamente.");
    }
  };

  return (
    <div className="login-smart-hydrogas">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="wave" />
          <img
            className="blue-minimalist-water"
            alt="Blue minimalist"
            src={blueMinimalistWaterSystemsLogoRemovebgPreview1}
          />

          <div className="login-rectangle" />
          <div className="login-rectangle-2" />
          <div className="login-rectangle-1" />
          <div className="blob-5" />
          <img className="blob" alt="Blob" src={image} />

          <p className="esqueceu-sua-senha">
            <span
              className="login-span"
              onClick={() => setCreateUserModalVisible(true)}
            >
              Criar usuário
            </span>
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            <label htmlFor="email" className="text-wrapper-3">
              E-mail:
            </label>
            <img className="ri-user-line" alt="Ri user line" src={riUserLine} />
            <div className="login-rectangle-3">
              <input
                type="email"
                id="email"
                className="input-field email-input"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label htmlFor="password" className="text-wrapper-2">
              Senha:
            </label>
            <img
              className="mdi-password-outline"
              alt="Mdi password outline"
              src={mdiPasswordOutline}
            />
            <img
              className="ri-eye-close-line"
              alt="Ri eye close line"
              src={riEyeCloseLine}
            />
            <div className="login-rectangle-4">
              <input
                type="password"
                id="password"
                className="input-field password-input"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-rectangle-5 submit-button">
              <div className="text-wrapper-6">Entrar</div>
            </button>
          </form>

          <div className="text-wrapper-4">Bem-Vindo!</div>

          <div className="text-wrapper-5">Explore a plataforma!</div>

          <p className="p">
            Faça login e gerencie suas medições, consulte faturas e acompanhe
            seu consumo de forma simples e segura.
          </p>
        </div>
      </div>

      {/* Modal de criação de usuário */}
      <CreateUserModal
        visible={createUserModalVisible}
        onClose={() => setCreateUserModalVisible(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default LoginSmartHydrogas;
