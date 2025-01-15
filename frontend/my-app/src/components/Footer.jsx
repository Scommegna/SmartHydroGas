import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-container">
          <img src="../assets/smart-hydro-gas.png" alt="Logo" className="logo" />
        </div>
        <div className="slogan">tecnologia que simplifica, inovação que transforma</div>
      </div>
      <p className="copyright">
        2024 | By Érika Mara, Lucas Scommegna e Verônica França
      </p>
    </footer>
  );
}
