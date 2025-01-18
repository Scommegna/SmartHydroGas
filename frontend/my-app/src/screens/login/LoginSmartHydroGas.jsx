import React, { useState } from "react";
import axios from "axios";
import blueMinimalistWaterSystemsLogoRemovebgPreview1 from "../../assets/blue-minimalist-water-systems-logo-removebg-preview-1.png";
import image from "../../assets/image.svg";
import mdiPasswordOutline from "../../assets/mdi-password-outline.svg";
import riEyeCloseLine from "../../assets/ri-eye-close-line.svg";
import riUserLine from "../../assets/ri-user-line.svg";
import "./style.css";

export const LoginSmartHydrogas = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    try {
      const response = await axios.post("http://localhost:80/login", {
        email,
        password
      },
      {
        withCredentials: true 
      });
        console.log(response.data)
        const { typeOfClient } = response.data.typeOfClient;
        onLoginSuccess(typeOfClient);
    } catch (err) {
      console.error("Erro ao fazer login:", err.response ? err.response.data.message : err.message);
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
            <span className="text-wrapper">
              Esqueceu sua senha? <br />
            </span>

            <span className="login-span">Clique aqui para recuperá-la</span>
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
    </div>
  );
};

export default LoginSmartHydrogas;
