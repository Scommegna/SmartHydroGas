import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Main({ onLogout }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main
        className="main-content"
        style={{
          backgroundColor: "#29417e",
          minHeight: "100vh",
          color: "black",
          marginTop: "80px", // Ajustando a margem superior
        }}
      >
        {/* Welcome Section */}
        <section
          className="welcome text-center d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "#7b9fb1",
            height: "466px",
            paddingTop: "62px",
          }}
        >
          <h1
            className="welcome-title fw-bold"
            style={{
              color: "#ffffff",
              fontFamily: "Raleway, sans-serif",
              fontSize: "50px",
              lineHeight: "64px",
              margin: "48px auto",
            }}
          >
            Bem-vindo ao Smart HydroGas
          </h1>
          <p
            className="welcome-description"
            style={{
              color: "#ffffff",
              fontFamily: "Raleway, sans-serif",
              fontSize: "40px",
              lineHeight: "40px",
              margin: "20px auto",
            }}
          >
            Simplifique a gestão e o monitoramento das suas contas de água e gás
            com o Smart HydroGas, a solução web inteligente que combina
            tecnologia de processamento de imagem e inteligência artificial para
            transformar sua experiência.
          </p>
        </section>

        {/* How it Works Section */}
        <section
          className="how-it-works text-center d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "#c7d8e1",
            height: "466px",
          }}
        >
          <h2
            className="how-it-works-title fw-semibold"
            style={{
              color: "#507d94",
              fontFamily: "Raleway, sans-serif",
              fontSize: "64px",
              lineHeight: "64px",
              textShadow: "-6px 4px 4px rgba(0, 0, 0, 0.25)",
              margin: "64px auto 20px",
            }}
          >
            Como funciona?
          </h2>
          <p
            className="how-it-works-description"
            style={{
              color: "#000000",
              fontFamily: "Raleway, sans-serif",
              fontSize: "36px",
              lineHeight: "36px",
              margin: "64px auto",
              maxWidth: "1200px",
            }}
          >
            Capture e envie fotos do seu medidor de consumo diretamente pelo
            sistema. Nossa tecnologia avançada processa a imagem automaticamente,
            registrando seu consumo com precisão. Com base nesses dados, geramos
            suas faturas de maneira prática e confiável.
          </p>
        </section>

        {/* Transform Consumption Section */}
        <section
          className="transform-consumption text-center d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: "#7b9fb1",
            height: "407px",
            paddingTop: "48px",
          }}
        >
          <h2
            className="transform-title fw-bold"
            style={{
              color: "#ffffff",
              fontFamily: "Raleway, sans-serif",
              fontSize: "64px",
              lineHeight: "64px",
              textShadow: "-8px 4px 4px rgba(0, 0, 0, 0.25)",
              margin: "30px auto",
            }}
          >
            Transforme sua Gestão de Consumo
          </h2>
          <p
            className="transform-description"
            style={{
              color: "#ffffff",
              fontFamily: "Raleway, sans-serif",
              fontSize: "40px",
              lineHeight: "40px",
              margin: "48px auto",
              maxWidth: "1200px",
            }}
          >
            Com o Smart HydroGas, você ganha mais tempo para o que importa.
            Experimente a tecnologia que alia simplicidade e inovação para
            tornar sua rotina mais eficiente.
          </p>
        </section>
      </main>
    </div>
  );
}
