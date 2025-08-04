import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./ChartStyles.css";

const SatisfactionDeliveryChart = ({ selectedSegment }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/satisfaction_vs_delivery?segment=${selectedSegment}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        setData(result.data);
        setError(null);
      } catch (error) {
        setError("Gagal memuat data kepuasan.");
        console.error("Error fetching satisfaction data:", error);
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
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis
            dataKey="score"
            stroke="#ccc"
            label={{
              value: "Skor Ulasan",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            stroke="#ccc"
            label={{ value: "Hari", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            cursor={{ stroke: "#61dafb", strokeWidth: 1 }}
            formatter={(value) => `${value} hari`}
            contentStyle={{
              backgroundColor: "#282c34",
              border: "1px solid #555",
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="avg_duration"
            name="Rata-rata Durasi Pengiriman"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SatisfactionDeliveryChart;
