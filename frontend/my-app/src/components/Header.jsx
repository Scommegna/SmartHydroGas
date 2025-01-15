import React from "react";
import "./Header.css";
import axios from "axios";

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
      <div className="logo-header">
        <div className="logo-inner" />
      </div>
      <nav className="navigation">
        <a href="#profile" className="nav-link">Meu Perfil</a>
        <a href="#invoices" className="nav-link">Visualizar Faturas</a>
      </nav>
      <button className="user-icon" onClick={handleLogout} />
    </header>
  );
}
