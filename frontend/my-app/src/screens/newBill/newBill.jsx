import React from "react";
import "./newBill.css";

export default function Main() {
  return (
    <div className="main-container">
      <div className="frame" />
      <div className="flex-row">
        <div className="blue-minimalist-water">
          <div className="rectangle" />
        </div>
        <div className="rectangle-1" />
        <span className="meu-perfil">Meu Perfil</span>
        <span className="visualizar-faturas">Visualizar Faturas</span>
        <div className="vector" />
        <div className="line" />
        <div className="rectangle-2">
          <span className="nova-fatura-3">Nova Fatura</span>
          <div className="rectangle-4">
            <span className="tipo-de-medicao">Tipo de Medição</span>
            <div className="flex-row-e">
              <div className="circle-outline" />
              <div className="regroup">
                <div className="circle-outline-5" />
                <span className="gas">Gás</span>
              </div>
              <span className="water">Água</span>
            </div>
            <span className="meter-consumption-photo">
              Foto do Medidor de Consumo
            </span>
            <button className="rectangle-button">
              <div className="mdi-light-image" />
              <span className="arquivo-jpeg-png">Arquivo JPEG / PNG</span>
            </button>
            <button className="rectangle-button-6">
              <span className="enviar">Enviar</span>
            </button>
          </div>
        </div>
        <div className="blue-minimalist-water-7">
          <div className="rectangle-8" />
        </div>
        <span className="tecnologia-transforma">
          tecnologia que simplifica, inovação que transforma.
        </span>
        <span className="by-erika-lucas-veronica">
          2024 | By Érika Mara, Lucas Scommegna e Verônica França
        </span>
      </div>
      <div className="rectangle-9" />
      <div className="rectangle-a" />
    </div>
  );
}
