import React from "react";
import "./Header.css";
import axios from "axios";
import SmartHydroGas from '../assets/smart-hydro-gas.png';

export default function Header({ onLogout }) {
  const handleLogout = async () => {
    try {
      const response = await axios.post('/logout');
      console.log(response.data.message);
      onLogout();
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <header className="header">
      <img alt="Logo" class="logo-header" src={SmartHydroGas}/>
        <div className="logo-inner" />
      <nav className="navigation">
        <a href="../screens/homePageUsers/homePage.tsx" className="nav-link">Meu Perfil</a>
        <a href="../screens/bill/bill.jsx" className="nav-link">Visualizar Faturas</a>
      </nav>
      <button className="user-icon" onClick={handleLogout} />
    </header>
  );
}
