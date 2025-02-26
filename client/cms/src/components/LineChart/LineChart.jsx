import React, { useEffect } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {useDispatch, useSelector} from "react-redux"
import { fetchChartData } from "../../features/statistic/statisticSlice";

const LineChart = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.statistics.dataChart)

  useEffect(()=>{
    dispatch(fetchChartData())
  }, [dispatch])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="commission" stroke="#82ca9d" />
        <Line type="monotone" dataKey="withdraw" stroke="#8884d8" />
      </ReLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
