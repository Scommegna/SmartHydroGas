import React, { useState } from "react";
import { LoginSmartHydrogas } from "./screens/login/LoginSmartHydroGas";
import Main from "./screens/main/Main.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const handleLoginSuccess = () => {
    setCurrentPage("main");
  };

  const handleLogout = () => {
    setCurrentPage("login");
  };

  return (
    <div>
      {currentPage === "login" && <LoginSmartHydrogas onLoginSuccess={handleLoginSuccess} />}
      {currentPage === "main" && <Main onLogout={handleLogout} />}
    </div>
  );
}

export default App;
