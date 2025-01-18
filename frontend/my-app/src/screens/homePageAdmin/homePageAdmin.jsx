import React, { useState } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './AdminPage.css'; 
import ReportOne from '../../components/ReportOne'; // Importando o componente

const AdminPage = ({ onLogout }) => {
  const [showReportOne, setShowReportOne] = useState(false); // Estado para controlar a exibição do ReportOne

  const handleReportOneClick = () => {
    setShowReportOne(true); // Atualiza o estado para exibir o ReportOne
  };

  return (
    <div className="container-fluid bg-water py-5">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="display-3 text-white font-weight-bold text-shadow">
            Administração
          </h1>
        </header>

        {/* Botão de Logout */}
        <div className="text-end mb-4">
          <button className="btn btn-danger btn-lg shadow-lg" onClick={onLogout}>Sair</button>
        </div>

        {/* Seção Faturas */}
        <div className="section mb-5 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="h3 text-primary mb-4 text-center">Faturas</h2>
          <div className="d-flex justify-content-center gap-5">
            {/* Botões para Água */}
            <div className="card p-4 shadow-sm border-0">
              <h5 className="card-title text-secondary text-center">Água</h5>
              <div className="d-flex justify-content-center gap-4">
                <button className="btn btn-outline-primary btn-lg">Em aberto</button>
                <button className="btn btn-outline-danger btn-lg">Vencidas</button>
              </div>
            </div>

            {/* Botões para Gás */}
            <div className="card p-4 shadow-sm border-0">
              <h5 className="card-title text-secondary text-center">Gás</h5>
              <div className="d-flex justify-content-center gap-4">
                <button className="btn btn-outline-primary btn-lg">Em aberto</button>
                <button className="btn btn-outline-danger btn-lg">Vencidas</button>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Clientes */}
        <div className="section mb-5 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="h3 text-primary mb-4 text-center">Clientes</h2>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success btn-lg shadow-lg">Visualizar Todos os Clientes</button>
          </div>
        </div>

        {/* Seção Relatórios */}
        <div className="section mb-5 p-5 bg-white rounded-lg shadow-lg">
          <h2 className="h3 text-primary mb-4 text-center">Relatórios</h2>
          <div className="d-flex justify-content-center gap-4">
            <button className="btn btn-info btn-lg shadow-lg" onClick={handleReportOneClick}>
              Gráfico
            </button>
            <button className="btn btn-info btn-lg shadow-lg">Relatório Tipo 2</button>
          </div>
        </div>

        {/* Renderizando o ReportOne se o estado estiver ativado */}
        {showReportOne && <ReportOne />}
      </div>
    </div>
  );
};

export default AdminPage;
