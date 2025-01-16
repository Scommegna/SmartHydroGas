import React from "react";
import SmartHydroGas from '../assets/smart-hydro-gas.png';

export default function Footer() {
  return (
    <footer
      className="footer bg-dark d-flex flex-column justify-content-center align-items-center text-light position-relative"
      style={{
        width: "100%",
        height: "172px",
        backgroundImage: "url('../assets/rectangle-footer.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "20px",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center h-100">
        {/* Logo */}
        <div
          className="logo-container d-flex justify-content-center align-items-center bg-white"
          style={{
            width: "185px",
            height: "172px",
            zIndex: 1,
            marginTop: "22px",
          }}
        >
          <img
            alt="Logo"
            src={SmartHydroGas}
            className="logo-footer"
            style={{ width: "150%", height: "150%" }}
          />
        </div>

        {/* Slogan */}
        <div
          className="slogan text-center"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "35px",
            fontWeight: 400,
            color: "#ffffff",
          }}
        >
          tecnologia que simplifica, inovação que transforma
        </div>
      </div>

      {/* Créditos */}
      <div
        className="w-100 text-center mt-auto"
        style={{
          fontFamily: "Raleway, sans-serif",
          fontSize: "16px",
          fontWeight: 200,
          lineHeight: 1.5,
          color: "#ffffff",
        }}
      >
        2024 | By Érika Mara, Lucas Scommegna e Verônica França
      </div>
    </footer>
  );
}
