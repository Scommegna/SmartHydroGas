import React from "react";
import FaturaList from "../../components/FaturaList";
import "./FaturaPage.css";

export default function FaturaPage() {
  return (
    <div className="fatura-page">
      <main className="fatura-main">
        <h1 className="fatura-title">Faturas</h1>
        <FaturaList />
      </main>
    </div>
  );
}
