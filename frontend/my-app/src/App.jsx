import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LoginSmartHydrogas } from "./screens/login/LoginSmartHydroGas";
import Main from "./screens/main/Main";
import NewBill from "./screens/newBill/newBill";
import HomePageUser from "./screens/homePageUsers/homePage";
import HomePageAdmin from "./screens/homePageAdmin/homePageAdmin";
import FaturaPage from "./screens/bill/FaturaPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <AppWithHeader />
    </Router>
  );
}

function AppWithHeader() {
  const location = useLocation();
  const [role, setRole] = useState(null); // Estado para armazenar o papel do usuário

  const handleLoginSuccess = (role) => {
    setRole(role); // Define o papel do usuário após o login
    if (role === "CLIENT") {
      window.location.pathname = "/main";
    } else if (role === "ADMIN") {
      window.location.pathname = "/admin";
    }
  };

  const handleLogout = () => {
    window.location.pathname = "/login";
  };

  const goToProfilePage = () => {
    window.location.pathname = "/profile";
  };

  const goToFaturaPage = () => {
    window.location.pathname = "/faturas";
  };

  const hideHeaderPaths = ["/login"]; // Rotas onde o Header não deve aparecer

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header
          onLogout={handleLogout}
          onProfileClick={goToProfilePage}  // Passando corretamente a função
          onFaturaClick={goToFaturaPage}    // Passando corretamente a função
        />
      )}

      <Routes>
        <Route path="/login" element={<LoginSmartHydrogas onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/main" element={<Main onLogout={handleLogout} />} />
        <Route path="/new-bill" element={<NewBill />} />
        <Route path="/profile" element={<HomePageUser onLogout={handleLogout} />} />
        <Route path="/admin" element={<HomePageAdmin onLogout={handleLogout} />} />
        <Route path="/faturas" element={<FaturaPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
