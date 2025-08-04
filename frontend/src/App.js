// frontend/src/App.js

import React, { useState } from "react";
import "./App.css";
import TopStatesChart from "./components/TopStatesChart";
import SegmentDistributionChart from "./components/SegmentDistributionChart";
import KPICards from "./components/KPICards";
import TopCategoriesChart from "./components/TopCategoriesChart";
import RetentionPieChart from "./components/RetentionPieChart";
import SatisfactionDeliveryChart from "./components/SatisfactionDeliveryChart";
import PredictionTool from "./components/PredictionTool";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // State untuk menyimpan nilai filter yang dipilih. Defaultnya 'All'.
  const [selectedSegment, setSelectedSegment] = useState("All");

  // Daftar segmen untuk dropdown filter
  const segments = [
    "All",
    "VIP/Champions",
    "Loyal Customers",
    "New/Regular Customers",
    "Lost/Hibernating",
  ];

  // Konten Untuk Dashboard
  const renderDashboard = () => (
    <>
      <KPICards selectedSegment={selectedSegment} />
      <div className="widget">
        <h2>Skala Masalah Retensi</h2>
        <RetentionPieChart selectedSegment={selectedSegment} />
      </div>
      <div className="dashboard-grid">
        <div className="widget">
          <h2>Penyebab Ketidakpuasan Pelanggan</h2>
          <SatisfactionDeliveryChart selectedSegment={selectedSegment} />
        </div>
        <div className="widget">
          <h2>Distribusi Segmen Pelanggan</h2>
          <SegmentDistributionChart selectedSegment={selectedSegment} />
        </div>
        <div className="widget">
          <h2>Top 10 Negara Bagian</h2>
          <TopStatesChart selectedSegment={selectedSegment} />
        </div>
        <div className="widget">
          <h2>Top 10 Kategori Produk</h2>
          <TopCategoriesChart selectedSegment={selectedSegment} />
        </div>
      </div>
    </>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard Analisis Pelanggan Olist</h1>
      </header>

      {/* Control Filter */}
      <div className="filter-container">
        <label htmlFor="segment-filter">Tampilkan Data untuk Segmen:</label>
        <select
          id="segment-filter"
          value={selectedSegment}
          onChange={(e) => setSelectedSegment(e.target.value)}
        >
          {segments.map((seg) => (
            <option key={seg} value={seg}>
              {seg}
            </option>
          ))}
        </select>
      </div>

      {/* Navigasi Tab */}
      <nav className="navbar">
        <button
          className={`nav-button ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard Analisis
        </button>
        <button
          className={`nav-button ${activeTab === "predictor" ? "active" : ""}`}
          onClick={() => setActiveTab("predictor")}
        >
          🔮 Alat Prediksi Churn
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === "dashboard" ? renderDashboard() : <PredictionTool />}
      </main>
    </div>
  );
}

export default App;
