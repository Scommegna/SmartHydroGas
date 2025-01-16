import React, { useState } from "react";
import { LoginSmartHydrogas } from "./screens/login/LoginSmartHydroGas";
import Main from "./screens/main/Main.jsx";
import NewBill from "./screens/newBill/newBill.jsx";
import HomePageUser from "./screens/homePageUsers/homePage.tsx";
import HomePageAdmin from "./screens/homePageAdmin/homePageAdmin.jsx";
import FaturaPage from "./screens/bill/FaturaPage.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const handleLoginSuccess = (role) => {
    if (role === "CLIENT") {
      setCurrentPage("main");
    } else if (role === "ADMIN") {
      setCurrentPage("homePageAdmin");
    }
  };

  const handleLogout = () => {
    setCurrentPage("login");
  };

  const goToNewBill = () => {
    setCurrentPage("newBill");
  };

  const goToFaturaPage = () => {
    setCurrentPage("faturaPage");
  };

  return (
    <div>
      {currentPage === "login" && <LoginSmartHydrogas onLoginSuccess={handleLoginSuccess} />}
      {currentPage === "main" && <Main onLogout={handleLogout} />}
      {currentPage === "newBill" && <NewBill />}
      {currentPage === "homePageUser" && <HomePageUser onLogout={handleLogout} />}
      {currentPage === "homePageAdmin" && <HomePageAdmin onLogout={handleLogout} />}
      {currentPage === "faturaPage" && <FaturaPage />}
    </div>
  );
}

export default App;
