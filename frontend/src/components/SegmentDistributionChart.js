import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import "./ChartStyles.css";

const SegmentDistributionChart = ({ selectedSegment }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/segment_distribution?segment=${selectedSegment}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();

        // Data dari API sudah dalam format yang baik, kita hanya perlu menggunakannya
        setData(result.data);
        setError(null);
      } catch (error) {
        setError("Gagal memuat data segmentasi.");
        console.error("Error fetching segment distribution data:", error);
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
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 50, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis type="number" stroke="#ccc" />
          <YAxis
            type="category"
            dataKey="name"
            width={120} // Perlebar sedikit untuk nama segmen
            stroke="#ccc"
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            formatter={(value) => `${value.toLocaleString("id-ID")} Pelanggan`}
            contentStyle={{
              backgroundColor: "#282c34",
              border: "1px solid #555",
            }}
          />
          <Bar dataKey="value" fill="#82ca9d">
            <LabelList
              dataKey="value"
              position="right"
              style={{ fill: "#eee" }}
              formatter={(value) => value.toLocaleString("id-ID")}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SegmentDistributionChart;
