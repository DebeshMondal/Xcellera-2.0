import React, { useState, useRef } from 'react';
import { useUser } from "@clerk/clerk-react";
import FileUpload from '../components/FileUpload';
import DataChart from '../components/DataChart';

const actions = [
  { label: 'Upload File', icon: '⬆️', tab: '' },
  { label: 'View History', icon: '📜', tab: 'history' },
  { label: 'Chart Visualization', icon: '📊', tab: 'charts' },
  { label: 'Download Charts', icon: '⬇️', tab: 'download' },
];

const Dashboard = () => {
  const { user } = useUser();
  const [tableData, setTableData] = useState([]);
  const fileUploadRef = useRef();

  const handleAction = (tab) => {
    if (tab === '') {
      // Trigger file input click
      fileUploadRef.current.openFileDialog();
    } else {
      window.location.search = `?tab=${tab}`;
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
                  className="flex items-center gap-2 px-5 py-2 bg-white/80 rounded-lg shadow hover:bg-blue-200 hover:scale-105 transition text-blue-700 font-semibold text-base"
                >
                  <span>{action.icon}</span> {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Section headers for future content */}
        <div className="mt-12 animate-fade-in-up">
          <h3 className="text-lg font-bold text-white mb-4 drop-shadow">Your Dashboard</h3>
          <div className="rounded-xl bg-white/70 shadow p-6 min-h-[200px] flex items-center justify-center text-gray-400">
            {/* Placeholder for main dashboard content (file upload, charts, etc.) */}
            Select an action above to get started.
          </div>
        </div>
        <div className="mt-8">
          <FileUpload ref={fileUploadRef} onDataParsed={setTableData} />
          {tableData.length > 0 && (
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
          )}
          {tableData.length > 1 && <DataChart tableData={tableData} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
