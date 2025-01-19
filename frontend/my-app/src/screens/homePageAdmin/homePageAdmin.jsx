import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css";
import axios from "axios";

const handleDownload = async () => {
  console.log("Iniciando a requisição...");
  try {
    const response = await axios.get(
      "http://localhost:80/api/billingsReportData",
      {
        withCredentials: true,
      }
    );
    console.log("Resposta recebida:", response);
    const contentType = response.headers["content-type"];
    if (contentType && contentType.includes("application/pdf")) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (contentType && contentType.includes("application/json")) {
      const errorMessage = await response.data;
      console.error("Erro na API:", errorMessage.message);
    } else {
      console.error("Formato de resposta inesperado. Esperado PDF ou JSON.");
    }
  } catch (error) {
    console.error("Erro ao realizar o download do relatório:", error);
  }
};

const AdminPage = ({ onLogout }) => {
  const [clients, setClients] = useState([]);
  const [unpaidBillings, setUnpaidBillings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUnpaidModal, setShowUnpaidModal] = useState(false);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/clients", {
        withCredentials: true,
      });
      setClients(response.data.clients);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
    }
  };

  const fetchUnpaidBillings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/api/unpaidBillings",
        {
          withCredentials: true,
        }
      );
      setUnpaidBillings(response.data.unpaidBillings);
      setShowUnpaidModal(true);
    } catch (error) {
      console.error("Erro ao buscar as faturas não pagas:", error);
    }
  };

  const markAsPaid = async (billingId) => {
    try {
      await axios.patch(
        `http://localhost:80/api/billing/${billingId}/mark-paid`,
        {},
        {
          withCredentials: true,
        }
      );
      setUnpaidBillings(
        unpaidBillings.filter((billing) => billing._id !== billingId)
      );
      alert("Fatura marcada como paga!");
    } catch (error) {
      console.error("Erro ao marcar a fatura como paga:", error);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      await axios.delete(`http://localhost:80/api/deleteUser`, {
        data: { userId: clientId },
        withCredentials: true,
      });
      setClients(clients.filter((client) => client._id !== clientId));
      alert("Cliente excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o cliente:", error);
    }
  };

  return (
    <div className="container-fluid bg-water py-5">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="display-3 text-white font-weight-bold text-shadow">
            Administração
          </h1>
        </header>
        <div className="text-end mb-4">
          <button
            className="btn btn-danger btn-lg shadow-lg"
            onClick={onLogout}
          >
            Sair
          </button>
        </div>
        <div className="section mb-5 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="h3 text-primary mb-4 text-center">Faturas</h2>
          <div className="d-flex justify-content-center gap-5">
            <div className="card p-4 shadow-sm border-0">
              <h5 className="card-title text-secondary text-center">Faturas</h5>
              <div className="d-flex justify-content-center gap-4">
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={fetchUnpaidBillings}
                >
                  Em aberto
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="section mb-5 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="h3 text-primary mb-4 text-center">Clientes</h2>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success btn-lg shadow-lg"
              onClick={fetchClients}
            >
              Visualizar Todos os Clientes
            </button>
          </div>
        </div>
        {showModal && (
          <div
            className="modal fade show custom-modal-backdrop"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="custom-modal-dialog modal-dialog-centered">
              <div className="custom-modal-content">
                <div className="custom-modal-header">
                  <h5 className="custom-modal-title">Clientes</h5>
                  <button
                    type="button"
                    className="custom-btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <div className="custom-modal-body">
                  <ul className="list-group">
                    {clients.map((client) => (
                      <li key={client._id} className="custom-list-group-item">
                        {client.name}
                        <button
                          className="custom-btn-danger"
                          onClick={() => deleteClient(client._id)}
                        >
                          Excluir
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {showUnpaidModal && (
          <div
            className="modal fade show custom-modal-backdrop"
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div className="custom-modal-dialog modal-dialog-centered">
              <div className="custom-modal-content">
                <div className="custom-modal-header">
                  <h5 className="custom-modal-title">Faturas Não Pagas</h5>
                  <button
                    type="button"
                    className="custom-btn-close"
                    onClick={() => setShowUnpaidModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
                <div className="custom-modal-body">
                  <ul className="list-group">
                    {Array.isArray(unpaidBillings) &&
                    unpaidBillings.length > 0 ? (
                      unpaidBillings.map((billing) => (
                        <li
                          key={billing._id}
                          className="custom-list-group-item"
                        >
                          Fatura ID: {billing._id} - Tipo:{" "}
                          {billing.measure_type} - Valor Medido:{" "}
                          {billing.measured_value} - Valor:{" "}
                          {billing.billingValue}
                          <button
                            className="btn btn-success ms-2"
                            onClick={() => markAsPaid(billing._id)}
                          >
                            Dar baixa
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="custom-list-group-item">
                        Nenhuma fatura não paga encontrada.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="section mb-5 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="h3 text-primary mb-4 text-center">Relatórios</h2>
          <div className="d-flex justify-content-center gap-4">
            <button
              className="btn btn-info btn-lg shadow-lg"
              onClick={handleDownload}
            >
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
