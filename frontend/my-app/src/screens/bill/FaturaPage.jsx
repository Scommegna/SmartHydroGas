import React from "react";
import Header from "../../components/Header";
import FaturaList from "../../components/FaturaList";
import Footer from "../../components/Footer";
import "./FaturaPage.css";

export default function FaturaPage() {
  return (
    <div className="fatura-page">
      <Header />
      <main className="fatura-main">
        <h1 className="fatura-title">Faturas</h1>
        <FaturaList />
        <button className="new-fatura-button">Nova Fatura</button>
      </main>
      <Footer />
    </div>
  );
}
