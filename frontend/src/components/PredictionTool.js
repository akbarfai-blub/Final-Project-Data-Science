import React, { useState } from "react";
import "./ChartStyles.css";

const PredictionTool = () => {
  const [frequency, setFrequency] = useState(1);
  const [monetary, setMonetary] = useState(200);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Recency: 0,
          Frequency: parseInt(frequency),
          Monetary: parseFloat(monetary),
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Gagal menghubungi server backend." });
    }
    setLoading(false);
  };

  return (
    <div className="prediction-tool-container">
      <div className="form-container chart-container">
        <h2>Simulasi Pelanggan Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Frequency (jumlah transaksi)</label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Monetary (total belanja R$)</label>
            <input
              type="number"
              step="0.01"
              value={monetary}
              onChange={(e) => setMonetary(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Memprediksi..." : "Jalankan Prediksi"}
          </button>
        </form>
      </div>

      {result && (
        <div className="result-container chart-container">
          <h2>Hasil Prediksi</h2>
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <>
              <p
                className={`prediction ${
                  result.prediction === 1 ? "risk" : "safe"
                }`}
              >
                Status: {result.prediction === 1 ? "BERISIKO" : "AMAN"}
              </p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${result.probability_churn.toFixed(2)}%` }}
                >
                  {result.probability_churn.toFixed(2)}%
                </div>
              </div>
              <small>Probabilitas Churn</small>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionTool;
