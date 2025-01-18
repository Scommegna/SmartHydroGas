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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData | null>(null);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost/profile", {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUserData(response.data.profile);
      setEditData(response.data.profile);
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.patch("http://localhost/editData", editData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Profile updated:", response.data);

      setUserData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editData) {
      setEditData((prevState) => ({
        ...prevState,
        [name]: value,
      }) as UserData);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "600px" }}>
        <div className="card-body">
          <h5 className="card-title text-center text-primary">Informações do Perfil</h5>
          {isEditing ? (
            <div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editData?.name || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editData?.email || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Endereço</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editData?.address || ""}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-end">
                <button onClick={handleSaveClick} className="btn btn-success">Salvar</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <strong>Nome Completo:</strong>
                <div className="border p-2 rounded bg-light">{userData ? userData.name : "Carregando..."}</div>
              </div>
              <div className="mb-3">
                <strong>E-mail:</strong>
                <div className="border p-2 rounded bg-light">{userData ? userData.email : "Carregando..."}</div>
              </div>
              <div className="mb-3">
                <strong>Endereço:</strong>
                <div className="border p-2 rounded bg-light">{userData ? userData.address : "Carregando..."}</div>
              </div>
              <div className="d-flex justify-content-end">
                <button onClick={handleEditClick} className="btn btn-warning">Editar Perfil</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
