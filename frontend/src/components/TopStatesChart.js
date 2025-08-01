import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import "./ChartStyles.css";

// Fungsi untuk memformat angka besar menjadi lebih ringkas (misal: 7.5M)
const formatNumber = (value) => {
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value;
};

const TopStatesChart = ({ selectedSegment }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/top_geography_product?segment=${selectedSegment}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        const chartData = result.top_states.map((item) => ({
          name: item.name,
          "Total Penjualan": item.value,
        }));
        setData(chartData);
        setError(null);
      } catch (error) {
        setError("Gagal memuat data. Pastikan backend berjalan.");
        console.error("Error fetching top states data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedSegment]);

  if (loading)
    return (
      <div className="chart-container">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="chart-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 50, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis type="number" stroke="#ccc" tickFormatter={formatNumber} />
          <YAxis type="category" dataKey="name" width={80} stroke="#ccc" />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            formatter={(value) => `R$ ${value.toLocaleString("id-ID")}`} // Format angka di tooltip
            contentStyle={{
              backgroundColor: "#282c34",
              border: "1px solid #555",
            }}
          />
          <Legend />
          <Bar dataKey="Total Penjualan" fill="#61dafb">
            {" "}
            {/* Ganti warna agar lebih cerah */}
            <LabelList
              dataKey="Total Penjualan"
              position="right"
              style={{ fill: "#eee" }}
              formatter={(value) => `R$ ${formatNumber(value)}`} // Tambahkan label di ujung bar
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopStatesChart;
