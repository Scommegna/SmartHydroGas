import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FaturaList.css";
import PDF from "../assets/pdf.png";
import Upload from "../assets/upload.png";

export default function FaturaList() {
  const [faturaData, setFaturaData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [measureType, setMeasureType] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFaturas = async () => {
      try {
        const response = await axios.get("http://localhost/list", { withCredentials: true });
        setFaturaData(response.data.userBillings);
      } catch (error) {
        console.error("Erro ao buscar dados das faturas:", error);
      }
    };

    fetchFaturas();
  }, []);

  const gerarPDF = async (faturaId) => {
    try {
      const response = await axios.post(`http://localhost/faturas/${faturaId}/gerar-pdf`, {}, { responseType: 'blob' });
      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      console.error("Erro ao gerar o PDF da fatura:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!measureType || !file) {
      alert("Por favor, selecione o tipo de medição e uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("measure_type", measureType);
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Fatura criada com sucesso!");
      setModalVisible(false);  
      setMeasureType(null);
      setFile(null);  
    } catch (error) {
      console.error("Erro ao enviar a medição:", error);
      alert("Erro ao criar a fatura.");
    }
  };

  const handleCheckboxChange = (value) => {
    setMeasureType(value);
  };

  return (
    <div>
      <div className="fatura-list">
        <div className="fatura-header-row">
          <span className="fatura-header-cell">Número da Fatura</span>
          <span className="fatura-header-cell">Mês de Referência</span>
          <span className="fatura-header-cell">Visualizar</span>
          <span className="fatura-header-cell">Enviar Comprovante</span>
        </div>

        {/* Lista de Faturas */}
        {faturaData.map((fatura, index) => (
          <div key={fatura._id} className={`fatura-row ${index % 2 === 0 ? 'fatura-row-dark' : 'fatura-row-light'}`}>
            <span className="fatura-cell">{fatura._id}</span>
            <span className="fatura-cell">{new Date(fatura.measure_datetime).toLocaleDateString()}</span>
            <button
              className="fatura-action-button view-button"
              aria-label="Visualizar fatura"
              onClick={() => gerarPDF(fatura._id)}
            >
              <img src={PDF} alt="Visualizar" />
            </button>
            <button
              className="fatura-action-button upload-button"
              aria-label="Enviar comprovante"
              onClick={() => setModalVisible(true)}
            >
              <img src={Upload} alt="Enviar comprovante" />
            </button>
          </div>
        ))}
      </div>

      {/* Div com o botão "Nova Fatura" */}
      <div className="new-fatura-container">
        <button
          className="new-fatura-button"
          onClick={() => setModalVisible(true)}
        >
          Nova Fatura
        </button>
      </div>

      {/* Modal de tipo de medição */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tipo de Medição</h2>
            <div>
              <label>
                <input
                  type="radio"
                  name="measureType"
                  value="Água"
                  checked={measureType === "Água"}
                  onChange={() => handleCheckboxChange("Água")}
                />
                Água
              </label>
              <label>
                <input
                  type="radio"
                  name="measureType"
                  value="Gás"
                  checked={measureType === "Gás"}
                  onChange={() => handleCheckboxChange("Gás")}
                />
                Gás
              </label>
            </div>
            <div>
              <label>
                Foto do medidor de consumo:
                <input type="file" onChange={handleFileChange} />
                <p>Por favor, tire uma foto legível do medidor de consumo para que possamos registrar a medição corretamente.</p>
              </label>
            </div>
            <button onClick={handleSubmit}>Enviar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
