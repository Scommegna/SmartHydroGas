import React from "react";
import "./Header.css";
import axios from "axios";
import SmartHydroGas from "../assets/smart-hydro-gas.png";

export default function Header({ onLogout, onProfileClick, onFaturaClick }) {
  const handleAction = async (action, event) => {
    event.preventDefault();

    if (action === "logout") {
      try {
        const response = await axios.post(
          "http://localhost:80/api/logout",
          {},
          { withCredentials: true } 
        );
        onLogout();
      } catch (error) {
        console.error(
          "Erro ao realizar logout:",
          error.response?.data || error.message
        );
      }
    } else if (action === "profile") {
      onProfileClick();
    } else if (action === "faturas") {
      onFaturaClick();
    }
  };

  return (
    <header className="header">
      <img alt="Logo" className="logo-header" src={SmartHydroGas} />
      <div className="logo-inner" />
      <nav className="navigation">
        <a
          href="#"
          className="nav-link"
          onClick={(e) => handleAction("profile", e)}
        >
          Meu Perfil
        </a>
        <a
          href="#"
          className="nav-link"
          onClick={(e) => handleAction("faturas", e)}
        >
          Visualizar Faturas
        </a>
      </nav>
      <button
        className="user-icon"
        onClick={(e) => handleAction("logout", e)}
      />
    </header>
  );
}
