import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./ChartStyles.css";

const COLORS = ["#0088FE", "#00C49F"];

const RetentionPieChart = ({ selectedSegment }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/retention_summary?segment=${selectedSegment}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        setData(result.data);
        setError(null);
      } catch (error) {
        setError("Gagal memuat data retensi.");
        console.error("Error fetching retention data:", error);
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
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={60} // Ini yang membuatnya menjadi Donut Chart
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(1)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value.toLocaleString("id-ID")} Pelanggan`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RetentionPieChart;
