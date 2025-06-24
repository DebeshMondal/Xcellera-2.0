import React, { useState, useRef, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import DataChart from '../components/DataChart';
import UploadHistory from '../components/UploadHistory';
import DownloadTab from '../components/DownloadTab';

const actions = [
  { label: 'Upload File', icon: '⬆️', tab: '' },
  { label: 'View History', icon: '📜', tab: 'history' },
  { label: 'Chart Visualization', icon: '📊', tab: 'charts' },
  { label: 'Download Charts', icon: '⬇️', tab: 'download' },
];

const Dashboard = () => {
  const { user } = useUser();
  const [tableData, setTableData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const fileUploadRef = useRef();
  const chartRef = useRef();
  const [showAISummary, setShowAISummary] = useState(false);

  const currentTab = searchParams.get('tab') || '';

  const handleAction = (tab) => {
    if (tab === '') {
      // Trigger file input click from any tab
      if (fileUploadRef.current) {
        fileUploadRef.current.openFileDialog();
      }
      setSearchParams({});
    } else {
      setSearchParams({ tab });
    }
  };

  const handleSelectFile = (data) => {
    setTableData(data);
    setSearchParams({}); // Switch back to main view
  };

  const hasData = tableData.length > 1;

  const renderContent = () => {
    switch (currentTab) {
      case 'history':
        return <UploadHistory onSelectFile={handleSelectFile} />;
      case 'charts':
        return null;
      case 'download':
        return <DownloadTab chartRef={chartRef} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative px-6 py-8 transition-all duration-500" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #a21caf 100%)' }}>
      {/* Abstract SVG pattern overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" fill="none" viewBox="0 0 800 600">
        <circle cx="200" cy="100" r="80" fill="#fff" />
        <rect x="500" y="400" width="200" height="120" rx="60" fill="#fff" />
        <ellipse cx="650" cy="150" rx="60" ry="30" fill="#fff" />
        <polygon points="400,500 420,540 380,540" fill="#fff" />
      </svg>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 animate-fade-in drop-shadow-lg">Welcome, {user?.firstName || user?.username || user?.emailAddress}!</h1>
        <div className="mb-10">
          <div className="backdrop-blur-md bg-white/30 rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              {actions.map(action => (
                <button
                  key={action.label}
                  onClick={() => handleAction(action.tab)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow hover:scale-105 transition font-semibold text-base ${
                    currentTab === action.tab 
                      ? 'bg-blue-200 text-blue-700' 
                      : 'bg-white/80 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <span>{action.icon}</span> {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Main content area */}
        <div className="mt-12 animate-fade-in-up">
          {currentTab === '' && (
            <h3 className="text-lg font-bold text-white mb-4 drop-shadow">Your Dashboard</h3>
          )}
          
          {/* Render tab-specific content */}
          {renderContent()}

          {/* Always render the data table if data exists and we are on the main tab */}
          {hasData && currentTab === '' && (
            <>
              <div className="overflow-x-auto mt-6 bg-white/80 rounded-lg shadow p-4">
                <table className="min-w-full text-sm">
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className="border px-2 py-1">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* AI Summary Button */}
              <div className="mt-4 flex flex-col items-center">
                <button
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-full shadow-lg flex items-center gap-2 transition-transform duration-200 hover:scale-105 mb-2"
                  onClick={() => setShowAISummary(true)}
                >
                  <span className="text-xl">🤖</span>
                  Summarize with AI
                </button>
                {showAISummary && (
                  <div className="relative mt-4 max-w-xl mx-auto bg-white border-l-4 border-purple-400 shadow-lg p-6 rounded-lg flex items-start">
                    <span className="mr-3 text-purple-500 text-2xl">🤖</span>
                    <div className="flex-1 text-gray-800 text-center text-base">
                      <span className="font-semibold text-purple-700">AI Summary (Preview):</span>
                      <br />
                      This is a mock summary. The AI feature will be available when an API key is added. Stay tuned for updates.
                    </div>
                    <button
                      className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-lg"
                      onClick={() => setShowAISummary(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Always render chart if data exists, but hide it based on the current tab */}
          <div className={(hasData && (currentTab === '' || currentTab === 'charts')) ? 'block' : 'hidden'}>
            {hasData && <DataChart ref={chartRef} tableData={tableData} />}
          </div>
          
          {/* A message for the charts tab when there's no data */}
          {currentTab === 'charts' && !hasData && (
            <div className="bg-white/80 rounded-lg shadow p-6 text-center">
              <p className="text-gray-600">Upload a file first to view charts</p>
            </div>
          )}
        </div>
        {/* Always render FileUpload component (hidden when not needed) */}
        <div className="hidden">
          <FileUpload ref={fileUploadRef} onDataParsed={setTableData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
