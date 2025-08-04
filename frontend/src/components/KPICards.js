import React, { useState, useEffect } from "react";
import "./KPICards.css";

const KPICards = ({ selectedSegment }) => {
  const [kpiData, setKpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKpiData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/kpi?segment=${selectedSegment}`
        );
        const data = await response.json();
        setKpiData(data);
      } catch (error) {
        console.error("Gagal memuat data KPI:", error);
      }
      setLoading(false);
    };
    fetchKpiData();
  }, [selectedSegment]);

  // tampilkan 'skeleton' saat loading
  if (loading) {
    return (
      <div className="kpi-container">
        <div className="kpi-card-loading"></div>
        <div className="kpi-card-loading"></div>
        <div className="kpi-card-loading"></div>
      </div>
    );
  }

  return (
    <div className="kpi-container">
      <div className="kpi-card">
        <div className="kpi-value">
          {kpiData?.total_customers.toLocaleString("id-ID")}
        </div>
        <div className="kpi-label">Total Pelanggan</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-value">
          {kpiData?.repeat_buyer_percent.toFixed(1)}%
        </div>
        <div className="kpi-label">Repeat Buyer Rate</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-value">
          {kpiData?.churn_rate_percent.toFixed(1)}%
        </div>
        <div className="kpi-label">Churn Rate (Berisiko)</div>
      </div>
    </div>
  );
};

export default KPICards;
