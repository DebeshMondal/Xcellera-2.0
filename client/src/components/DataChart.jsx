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

  // Data validation for Y-axis
  const yValues = rows.map(row => Number(row[yIndex]));
  const hasValidNumericYData = yValues.every(val => !isNaN(val));

  if (!hasValidNumericYData) {
    return (
      <div className="bg-white/80 rounded-lg shadow p-6 mt-8 text-center text-red-600">
        <p className="font-semibold mb-2">Error: Invalid data for Y-axis.</p>
        <p>Please ensure the selected Y-axis column contains only numeric values.</p>
        <p className="text-sm text-gray-500 mt-2">Example: '10', '25.5', '100' (not 'Ten', '$10', or empty cells)</p>
      </div>
    );
  }

  const chartData = {
    labels: rows.map(row => row[xIndex]),
    datasets: [
      {
        label: yCol,
        data: yValues, // Use the validated numeric values here
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

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
        <Bar ref={chartRef} data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
      ) : (
        <Line ref={chartRef} data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
      )}
    </div>
  );
});

export default DataChart;
