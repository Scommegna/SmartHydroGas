import React, { useState } from "react";
import { LoginSmartHydrogas } from "./screens/login/LoginSmartHydroGas";
import Main from "./screens/main/main";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const handleLoginSuccess = () => {
    setCurrentPage("main");
  };

  return (
    <div>
      {currentPage === "login" && <LoginSmartHydrogas onLoginSuccess={handleLoginSuccess} />}
      {currentPage === "main" && <Main />}
    </div>
  );
}

export default App;
