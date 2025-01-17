import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Main({ onLogout }) {
  // Função para navegação ao perfil
  const handleProfileClick = () => {
    console.log("Navegar para a página de perfil");
    // Implementar lógica para redirecionar ou atualizar o conteúdo da página
  };

  // Função para navegação às faturas
  const handleFaturaClick = () => {
    console.log("Navegar para a página de faturas");
    // Implementar lógica para redirecionar ou atualizar o conteúdo da página
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Passar todas as funções necessárias ao Header */}
      <Header
        onLogout={onLogout}
        onProfileClick={handleProfileClick}
        onFaturaClick={handleFaturaClick}
      />
      <main
        className="main-content"
        style={{ backgroundColor: "#29417e", minHeight: "100vh", color: "black" }}
      >
        {/* Main Content */}
        <div className="container">
          <div className="row">
            {/* Profile Sidebar */}
            <div className="col-md-4">
              <div className="card bg-light">
                <div className="card-body">
                  <h5 className="card-title">Editar Perfil</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">Meu Perfil</li>
                    <li className="mb-2">Visualizar Faturas</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="col-md-8">
              <div className="card bg-white">
                <div className="card-body">
                  <h5 className="card-title">Informações do Perfil</h5>
                  <div className="mb-3">
                    <strong>Nome Completo:</strong>
                    <div className="border rounded p-2">Fulano da Silva</div>
                  </div>
                  <div className="mb-3">
                    <strong>E-mail:</strong>
                    <div className="border rounded p-2">email@email.com</div>
                  </div>
                  <div className="mb-3">
                    <strong>Telefone:</strong>
                    <div className="border rounded p-2">(01) 2345-6789</div>
                  </div>
                  <div className="mb-3">
                    <strong>Endereço:</strong>
                    <div className="border rounded p-2">
                      Rua da Alegria, 123, bairro Legal, cidade Maravilha, MG, CEP: XXXX-XXX
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
