import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginSmartHydrogas } from "./screens/login/LoginSmartHydroGas";
import Main from "./screens/main/Main";
import NewBill from "./screens/newBill/newBill";
import HomePageUser from "./screens/homePageUsers/homePage";
import HomePageAdmin from "./screens/homePageAdmin/homePageAdmin";
import FaturaPage from "./screens/bill/FaturaPage";
import Header from "./components/Header";
import Footer from "./components/Footer"; 

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

  const handleLoginSuccess = (role) => {
    setRole(role);
    if (role === "CLIENT") {
      navigate("/main");
    } else if (role === "ADMIN") {
      navigate("/admin");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const goToProfilePage = () => {
    navigate("/profile");
  };

  const goToFaturaPage = () => {
    navigate("/faturas");
  };

  const hideHeaderAndFooterPaths = ["/login"]; // Não renderiza o Header e Footer na página de login

  return (
    <>
      {/* Exibe o Header apenas em páginas que não sejam a de login */}
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
        <Route path="/new-bill" element={<NewBill onLogout={handleLogout} />} />
        <Route path="/profile" element={<HomePageUser onLogout={handleLogout} />} />
        <Route path="/admin" element={<HomePageAdmin onLogout={handleLogout} />} />
        <Route path="/faturas" element={<FaturaPage onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Exibe o Footer apenas nas páginas que não sejam a de login */}
      {!hideHeaderAndFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
