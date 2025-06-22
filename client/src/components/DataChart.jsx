import React, { useState, useRef, useImperativeHandle } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartTypes = [
  { label: 'Bar', value: 'bar' },
  { label: 'Line', value: 'line' },
];

const cleanAndParseFloat = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return NaN;
  // Remove currency symbols, commas, whitespace, etc. and then parse.
  const cleanedValue = value.replace(/[^0-9.-]+/g, "");
  if (cleanedValue === '') return NaN;
  return parseFloat(cleanedValue);
};

const DataChart = React.forwardRef(({ tableData }, ref) => {
  if (!tableData || tableData.length < 2) return null;

  const headers = tableData[0];
  const rows = tableData.slice(1);

  const [xCol, setXCol] = useState(headers[0]);
  const [yCol, setYCol] = useState(headers[1]);
  const [chartType, setChartType] = useState('bar');

  const xIndex = headers.indexOf(xCol);
  const yIndex = headers.indexOf(yCol);

  const chartRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getChart: () => chartRef.current,
  }));

  // Attempt to parse both columns to determine their type
  const xValuesRaw = rows.map(row => row[xIndex]);
  const yValuesRaw = rows.map(row => row[yIndex]);

  const xValuesCleaned = xValuesRaw.map(cleanAndParseFloat);
  const yValuesCleaned = yValuesRaw.map(cleanAndParseFloat);

  const isXNumeric = xValuesCleaned.every(v => !isNaN(v));
  const isYNumeric = yValuesCleaned.every(v => !isNaN(v));

  let chartData;
  const options = {
    responsive: true,
    plugins: { legend: { display: true } },
    indexAxis: 'x', // Default to vertical bars
  };

  if (isYNumeric) {
    // Standard case: Y-axis is numeric. X-axis is categorical.
    chartData = {
      labels: xValuesRaw,
      datasets: [{
        label: yCol,
        data: yValuesCleaned,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      }],
    };
  } else if (isXNumeric) {
    // Flipped case: X-axis is numeric, Y-axis is categorical.
    options.indexAxis = 'y'; // Make it a horizontal bar chart
    chartData = {
      labels: yValuesRaw, // Use the text labels for the y-axis
      datasets: [{
        label: xCol, // The numeric data is now the main label
        data: xValuesCleaned,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      }],
    };
  } else {
    // Neither axis is consistently numeric.
    return (
      <div className="bg-white/80 rounded-lg shadow p-6 mt-8 text-center text-red-600">
        <p className="font-semibold mb-2">Chart Error: Invalid Data</p>
        <p>Please ensure at least one of the selected axes contains numeric data.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 rounded-lg shadow p-6 mt-8">
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">X Axis:</label>
          <select value={xCol} onChange={e => setXCol(e.target.value)} className="border rounded px-2 py-1">
            {headers.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y Axis:</label>
          <select value={yCol} onChange={e => setYCol(e.target.value)} className="border rounded px-2 py-1">
            {headers.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chart Type:</label>
          <select value={chartType} onChange={e => setChartType(e.target.value)} className="border rounded px-2 py-1">
            {chartTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>
      {chartType === 'bar' ? (
        <Bar ref={chartRef} data={chartData} options={options} />
      ) : (
        <Line ref={chartRef} data={chartData} options={options} />
      )}
    </div>
  );
});

export default DataChart;
