import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sen", pendapatan: 4000, withdraw: 2400 },
  { name: "Sel", pendapatan: 3000, withdraw: 1398 },
  { name: "Rab", pendapatan: 2000, withdraw: 9800 },
  { name: "Kam", pendapatan: 2780, withdraw: 3908 },
  { name: "Jum", pendapatan: 1890, withdraw: 4800 },
  { name: "Sab", pendapatan: 2390, withdraw: 3800 },
  { name: "Min", pendapatan: 3490, withdraw: 4300 },
];

const LineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pendapatan" stroke="#82ca9d" />
        <Line type="monotone" dataKey="withdraw" stroke="#8884d8" />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
