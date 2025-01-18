import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FaturaList.css";
import PDF from "../assets/pdf.png";
import Upload from "../assets/upload.png";

function Modal({ visible, onClose, onSubmit, onFileChange, onTypeChange, measureType, file }) {
  if (!visible) return null;

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title">
      <div className="modal-content">
        <h2 id="modal-title">Tipo de Medição</h2>
        <div>
          <label>
            <input
              type="radio"
              name="measureType"
              value="WATER"
              checked={measureType === "WATER"}
              onChange={() => onTypeChange("WATER")}
            />
            Água
          </label>
          <label>
            <input
              type="radio"
              name="measureType"
              value="GAS"
              checked={measureType === "GAS"}
              onChange={() => onTypeChange("GAS")}
            />
            Gás
          </label>
        </div>
        <div>
          <label>
            Foto do medidor de consumo:
            <input type="file" onChange={onFileChange} />
            <p>Por favor, tire uma foto legível do medidor de consumo para registro correto.</p>
          </label>
        </div>
        <button onClick={onSubmit}>Enviar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

function ModalComprovante({ visible, onClose, faturaId }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!visible) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setStatus('');
    } else {
      setStatus('Por favor, selecione uma imagem válida.');
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setStatus('Por favor, selecione um arquivo.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('comprovante', file);

    try {
      const response = await fetch('/proof', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Comprovante enviado com sucesso!');
      } else {
        setStatus(result.message || 'Falha ao enviar o comprovante.');
      }
    } catch (error) {
      setStatus('Erro ao enviar o comprovante.');
    } finally {
      setIsUploading(false);
    }
  };
}

function FaturaRow({ fatura, onGeneratePDF, onUploadImage }) {
  return (
    <div className="fatura-row">
      <span className="fatura-cell">{fatura._id}</span>
      <span className="fatura-cell">{new Date(fatura.measure_datetime).toLocaleDateString()}</span>
      <button
        className="fatura-action-button view-button"
        aria-label="Visualizar fatura"
        onClick={() => onGeneratePDF(fatura._id)}
      >
        <img src={PDF} alt="Visualizar" />
      </button>
      <button
        className="fatura-action-button upload-button"
        aria-label="Enviar comprovante"
        onClick={() => onUploadImage(fatura._id)} 
      >
        <img src={Upload} alt="Enviar comprovante" />
      </button>
    </div>
  );
}

export default function FaturaList() {
  const [faturaData, setFaturaData] = useState([]);
  const [modalFaturaVisible, setModalFaturaVisible] = useState(false); 
  const [modalComprovanteVisible, setModalComprovanteVisible] = useState(false); 
  const [faturaId, setFaturaId] = useState(null);
  const [file, setFile] = useState(null);
  const [measureType, setMeasureType] = useState(null);

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
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert("O arquivo deve ter menos de 5MB.");
      return;
    }
    setFile(selectedFile);
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
      await axios.post("http://localhost/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Fatura criada com sucesso!");
      setModalFaturaVisible(false);
      setMeasureType(null);
      setFile(null);
    } catch (error) {
      console.error("Erro ao enviar a medição:", error);
      alert("Erro ao criar a fatura.");
    }
  };

  const handleUpload = (faturaId) => {
    setFaturaId(faturaId);
    setModalComprovanteVisible(true);
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
        {faturaData.map((fatura) => (
          <FaturaRow
            key={fatura._id}
            fatura={fatura}
            onGeneratePDF={gerarPDF}
            onUpload={() => handleUpload(fatura._id)} 
          />
        ))}
      </div>

      <div className="new-fatura-container">
        <button className="new-fatura-button" onClick={() => setModalFaturaVisible(true)}>
          Nova Fatura
        </button>
      </div>

      {/* Modal para criar nova fatura */}
      <Modal
        visible={modalFaturaVisible}
        onClose={() => setModalFaturaVisible(false)}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange}
        onTypeChange={setMeasureType}
        measureType={measureType}
        file={file}
      />

      {/* Modal para enviar o comprovante de pagamento */}
      <ModalComprovante
        visible={modalComprovanteVisible}
        onClose={() => setModalComprovanteVisible(false)} 
        faturaId={faturaId} 
      />
    </div>
  );
}
