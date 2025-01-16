import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FaturaList.css";
import PDF from "../assets/pdf.png";
import Upload from "../assets/upload.png";

export default function FaturaList() {
  const [faturaData, setFaturaData] = useState([]);

  useEffect(() => {
    const fetchFaturas = async () => {
      try {
        const response = await axios.get("80/list");
        setFaturaData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados das faturas:", error);
      }
    };

    fetchFaturas();
  }, []);

  return (
    <div className="fatura-list">
      <div className="fatura-header-row">
        <span className="fatura-header-cell">Número da Fatura</span>
        <span className="fatura-header-cell">Mês de Referência</span>
        <span className="fatura-header-cell">Visualizar</span>
        <span className="fatura-header-cell">Enviar Comprovante</span>
      </div>
      {faturaData.map((fatura, index) => (
        <div key={fatura._id} className={`fatura-row ${index % 2 === 0 ? 'fatura-row-dark' : 'fatura-row-light'}`}>
          <span className="fatura-cell">{fatura._id}</span>
          <span className="fatura-cell">{new Date(fatura.measure_datetime).toLocaleDateString()}</span>
          <button className="fatura-action-button view-button" aria-label="Visualizar fatura">
            <img src={PDF} alt="Visualizar" />
          </button>
          <button className="fatura-action-button upload-button" aria-label="Enviar comprovante">
            <img src={Upload} alt="Enviar comprovante" />
          </button>
        </div>
      ))}
    </div>
  );
}
