import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FaturaList.css";
import Upload from "../assets/upload.png";

function Modal({
  visible,
  onClose,
  onSubmit,
  onFileChange,
  onTypeChange,
  measureType,
  file,
}) {
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
            <p>
              Por favor, tire uma foto legível do medidor de consumo para
              registro correto.
            </p>
          </label>
        </div>
        <button className="submit" onClick={onSubmit}>
          Enviar
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

function ModalComprovante({ visible, onClose, faturaId, onUploadImage }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  if (!visible) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setStatus("");
    } else {
      setStatus("Por favor, selecione uma imagem válida.");
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setStatus("Por favor, selecione um arquivo.");
      return;
    }

    setIsUploading(true);
    await onUploadImage(faturaId, file);
    setIsUploading(false);
  };

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title">
      <div className="modal-content">
        <h2 id="modal-title">Enviar Comprovante</h2>
        <div>
          <label>
            Foto do comprovante:
            <input type="file" onChange={handleFileChange} />
            <p>
              Por favor, selecione uma imagem legível do comprovante de
              pagamento.
            </p>
          </label>
        </div>
        <button onClick={handleSubmit} disabled={isUploading} className="send">
          {isUploading ? "Enviando..." : "Salvar"}
        </button>
        <button onClick={onClose}>Cancelar</button>
        {status && <p>{status}</p>}
      </div>
    </div>
  );
}

function FaturaRow({ fatura, onUpload }) {
  return (
    <div className="fatura-row">
      <span className="fatura-cell">{fatura._id}</span>
      <span className="fatura-cell">
        {new Date(fatura.measure_datetime).toLocaleDateString()}
      </span>
      <span className="fatura-cell">
        <button
          className="fatura-action-button upload-button"
          aria-label="Enviar comprovante"
          onClick={() => onUpload(fatura)}
        >
          <img src={Upload} alt="Enviar comprovante" />
        </button>
      </span>
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
  const [status, setStatus] = useState("");

  const fetchFaturas = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/list", {
        withCredentials: true,
      });
      setFaturaData(response.data.userBillings);
    } catch (error) {
      console.error("Erro ao buscar dados das faturas:", error);
    }
  };

  useEffect(() => {
    fetchFaturas();
  }, []);

  const handleUploadImage = async (faturaId, file) => {
    console.log("Enviando comprovante para a fatura:", faturaId);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("faturaId", faturaId);

    try {
      const response = await axios.post(
        "http://localhost:80/api/proof",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Comprovante enviado com sucesso!");
        setModalComprovanteVisible(false);
        fetchFaturas();
      } else {
        throw new Error("Falha ao enviar o comprovante.");
      }
    } catch (error) {
      console.error("Erro ao enviar o comprovante:", error);
      alert("Erro ao enviar o comprovante.");
    }
  };

  const handleUpload = (fatura) => {
    setFaturaId(fatura._id);
    setModalComprovanteVisible(true);
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
      const response = await axios.post(
        "http://localhost:80/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const file = new Blob([response.data], { type: "application/pdf" });

        const fileURL = URL.createObjectURL(file);

        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `Fatura.pdf`;

        link.click();

        alert("Fatura criada com sucesso!");
        setModalFaturaVisible(false);
        setMeasureType(null);
        setFile(null);

        fetchFaturas();
      } else {
        throw new Error("Erro ao gerar o PDF.");
      }
    } catch (error) {
      console.error("Erro ao enviar a medição:", error);
      alert("Erro ao criar a fatura.");
    }
  };

  return (
    <div>
      <div className="fatura-list">
        <div className="fatura-header-row">
          <span className="fatura-header-cell">Número da Fatura</span>
          <span className="fatura-header-cell">Mês de Referência</span>
          <span className="fatura-header-cell">Enviar Comprovante</span>
        </div>
        {faturaData.map((fatura) => (
          <FaturaRow key={fatura._id} fatura={fatura} onUpload={handleUpload} />
        ))}
      </div>

      <div className="new-fatura-container">
        <button
          className="new-fatura-button"
          onClick={() => setModalFaturaVisible(true)}
        >
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
        onUploadImage={handleUploadImage}
      />
    </div>
  );
}
