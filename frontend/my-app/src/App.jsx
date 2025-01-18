import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LoginSmartHydrogas } from "./screens/login/LoginSmartHydroGas";
import Main from "./screens/main/Main";
import HomePageUser from "./screens/homePageUsers/homePage";
import HomePageAdmin from "./screens/homePageAdmin/homePageAdmin";
import FaturaPage from "./screens/bill/FaturaPage";

function App() {
  return (
    <Router>
      <AppWithHeaderAndFooter />
    </Router>
  );
}

function AppWithHeaderAndFooter() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setRole(null); // Limpa o estado de autenticação
    navigate("/login"); // Redireciona para a página de login
  };

  // Chama o handleLogout sempre que a página de login for acessada
  useEffect(() => {
    if (location.pathname === "/login") {
      handleLogout(); // Chama o logout se a página de login for acessada
    }
  }, [location.pathname]); // Só dispara quando a rota mudar

  const handleLoginSuccess = (role) => {
    setRole(role);
    if (role === "CLIENT") {
      navigate("/main");
    } else if (role === "ADMIN") {
      navigate("/admin");
    }
  };

  const goToProfilePage = () => {
    navigate("/profile");
  };

  const goToFaturaPage = () => {
    navigate("/faturas");
  };

  const hideHeaderAndFooterPaths = ["/login", "/admin"];

  return (
    <>
      {!hideHeaderAndFooterPaths.includes(location.pathname) && (
        <Header
          onLogout={handleLogout}
          onProfileClick={goToProfilePage}
          onFaturaClick={goToFaturaPage}
        />
      )}

      <Routes>
        <Route path="/login" element={<LoginSmartHydrogas onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/main" element={<Main onLogout={handleLogout} />} />
        <Route path="/profile" element={<HomePageUser onLogout={handleLogout} />} />
        <Route path="/admin" element={<HomePageAdmin onLogout={handleLogout} />} />
        <Route path="/faturas" element={<FaturaPage onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {!hideHeaderAndFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
