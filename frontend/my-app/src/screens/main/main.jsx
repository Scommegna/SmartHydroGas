import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./main.css";

export default function Main({ onLogout }) { 
  return (
    <div className="main-container">
      <Header onLogout={onLogout} />
      <main>
        <section className="welcome">
          <h1 className="welcome-title">Bem-vindo ao Smart HydroGas</h1>
            <p className="welcome-description">
              Simplifique a gestão e o monitoramento das suas contas de água e gás
              com o Smart HydroGas, a solução web inteligente que combina
              tecnologia de processamento de imagem e inteligência artificial para
              transformar sua experiência.
            </p>
        </section>


        <section className="how-it-works">
          <h2 className="how-it-works-title">Como funciona?</h2>
          <p className="how-it-works-description">
            Capture e envie fotos do seu medidor de consumo diretamente pelo
            sistema. Nossa tecnologia avançada processa a imagem automaticamente,
            registrando seu consumo com precisão. Com base nesses dados, geramos
            suas faturas de maneira prática e confiável.
          </p>
        </section>

        <section className="transform-consumption">
          <div className="content-wrapper">
            <h2 className="transform-title">Transforme sua Gestão de Consumo</h2>
            <p className="transform-description">
              Com o Smart HydroGas, você ganha mais tempo para o que importa.
              Experimente a tecnologia que alia simplicidade e inovação para
              tornar sua rotina mais eficiente.
            </p>
          </div>
          <div className="image-wrapper">
            <div className="image-inner" />
          </div>
          <p className="tagline">
            tecnologia que simplifica, inovação que transforma.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
