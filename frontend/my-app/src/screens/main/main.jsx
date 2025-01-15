import React from "react";
import "./main.css";

export default function Main() {
  return (
    <div className="main-container">
      <div className="flex-row-ee">
        <div className="blue-minimalist-water">
          <div className="rectangle" />
        </div>
        <div className="material-symbols-light" />
        <span className="meu-perfil">Meu Perfil</span>
        <span className="visualizar-faturas">Visualizar Faturas</span>
        <div className="rectangle-1">
          <span className="bem-vindo-smart-hydrogas">
            Bem-vindo ao Smart HydroGas
          </span>
          <span className="simplifique-gestao-monitoramento">
            Simplifique a gestão e o monitoramento das suas contas de água e gás
            com o Smart HydroGas, a solução web inteligente que combina
            tecnologia de processamento de imagem e inteligência artificial para
            transformar sua experiência.
          </span>
        </div>
      </div>
      <div className="rectangle-2">
        <span className="como-funciona">Como funciona?</span>
        <span className="como-funciona-3">Como funciona?</span>
        <span className="capture-envie-fotos">
          Capture e envie fotos do seu medidor de consumo diretamente pelo
          sistema. Nossa tecnologia avançada processa a imagem automaticamente,
          registrando seu consumo com precisão. Com base nesses dados, geramos
          suas faturas de maneira prática e confiável.
        </span>
      </div>
      <div className="flex-row-ed">
        <div className="rectangle-4">
          <span className="transform-gestao-consumo">
            Transforme sua Gestão de Consumo
          </span>
          <span className="smart-hydrogas">
            Com o Smart HydroGas, você ganha mais tempo para o que importa.
            Experimente a tecnologia que alia simplicidade e inovação para
            tornar sua rotina mais eficiente.
          </span>
        </div>
        <div className="blue-minimalist-logo">
          <div className="rectangle-5" />
        </div>
        <span className="tecnologia-transforma">
          tecnologia que simplifica, inovação que transforma.
        </span>
        <span className="by-erika-lucas-veronica">
          2024 | By Érika Mara, Lucas Scommegna e Verônica França
        </span>
      </div>
      <div className="rectangle-6" />
      <div className="rectangle-7" />
    </div>
  );
}
