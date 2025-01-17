import React from "react";
import "./Header.css";
import axios from "axios";
import SmartHydroGas from "../assets/smart-hydro-gas.png";

export default function Header({ onLogout, onProfileClick, onFaturaClick }) {
  const handleAction = async (action) => {
    if (action === "logout") {
      try {
        const response = await axios.post("http://localhost/logout");
        console.log(response.data.message);
        onLogout();
      } catch (error) {
        console.error("Erro ao realizar logout:", error);
      }
    } else if (action === "profile") {
      if (onProfileClick) {
        onProfileClick(); // Garantindo que onProfileClick seja uma função
      } else {
        console.error("onProfileClick não é uma função");
      }
    } else if (action === "faturas") {
      if (onFaturaClick) {
        onFaturaClick(); // Garantindo que onFaturaClick seja uma função
      } else {
        console.error("onFaturaClick não é uma função");
      }
    }
  };

  return (
    <header className="header">
      <img alt="Logo" className="logo-header" src={SmartHydroGas} />
      <div className="logo-inner" />
      <nav className="navigation">
        <a href="#" className="nav-link" onClick={() => handleAction("profile")}>
          Meu Perfil
        </a>
        <a href="#" className="nav-link" onClick={() => handleAction("faturas")}>
          Visualizar Faturas
        </a>
      </nav>
      <button className="user-icon" onClick={() => handleAction("logout")} />
    </header>
  );
}
