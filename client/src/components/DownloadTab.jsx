import React from 'react';

const DownloadTab = ({ chartRef }) => {
  const downloadChart = (format = 'png') => {
    const chart = chartRef.current?.getChart();
    if (!chart) {
      alert('Chart not available. Please generate a chart first.');
      return;
    }

    const link = document.createElement('a');
    link.href = chart.toBase64Image();
    link.download = `chart.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white/80 rounded-lg shadow p-6 text-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Download Your Chart</h3>
      <p className="text-gray-600 mb-6">
        Click the button below to download the currently displayed chart as a PNG image.
      </p>
      <button
        onClick={() => downloadChart('png')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        ⬇️ Download Chart as PNG
      </button>
    </div>
  );
};

export default DownloadTab; 