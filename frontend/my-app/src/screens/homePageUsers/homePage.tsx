import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserData {
  name: string;
  email: string;
  cpf: string;
  address: string;
}

export default function Main({ onLogout }) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost/profile", {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("User profile data:", response.data);
      setUserData(response.data.profile);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };
  

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleFaturaClick = () => {
    navigate("/faturas");
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ height: "100vh" }}>
      <main
        className="main-content flex-grow-1"
        style={{
          backgroundColor: "#29417e",
          color: "black",
          marginTop: "80px",
          paddingBottom: "20px",
        }}
      >
        <div className="container">
          <div className="row">
            {/* Profile Details */}
            <div className="col-md-8">
              <div className="card bg-white shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">Informações do Perfil</h5>
                  <div className="mb-3">
                    <strong>Nome Completo:</strong>
                    <div className="border rounded p-2 bg-light">
                      {userData ? userData.name : "Carregando..."}
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>E-mail:</strong>
                    <div className="border rounded p-2 bg-light">
                      {userData ? userData.email : "Carregando..."}
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Telefone:</strong>
                    <div className="border rounded p-2 bg-light">
                      {userData ? userData.cpf : "Carregando..."}
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Endereço:</strong>
                    <div className="border rounded p-2 bg-light">
                      {userData ? userData.address : "Carregando..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
