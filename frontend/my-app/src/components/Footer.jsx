import React from "react";
import "./Footer.css";
import SmartHydroGas from '../assets/smart-hydro-gas.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-container">
          <img alt="Logo" class="logo-footer" src={SmartHydroGas}/>
        </div>
        <div className="slogan">tecnologia que simplifica, inovação que transforma</div>
      </div>
      <p className="copyright">
        2024 | By Érika Mara, Lucas Scommegna e Verônica França
      </p>
    </footer>
  );
}
