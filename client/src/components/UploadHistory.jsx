import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const UploadHistory = ({ onSelectFile }) => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/excel');
      setUploads(response.data);
    } catch (err) {
      setError('Failed to fetch upload history');
      console.error('Error fetching uploads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await axios.delete(`http://localhost:5000/api/excel/${id}`);
        setUploads(uploads.filter(upload => upload._id !== id));
        alert('File deleted successfully!');
      } catch (err) {
        alert('Failed to delete file');
        console.error('Error deleting file:', err);
      }
    }
  };

  const handleViewData = (upload) => {
    // Convert the stored data back to the format expected by the chart component
    const tableData = [upload.headers, ...upload.data];
    onSelectFile(tableData);
  };

  if (loading) {
    return (
      <div className="bg-white/80 rounded-lg shadow p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading upload history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 rounded-lg shadow p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={fetchUploads}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (uploads.length === 0) {
    return (
      <div className="bg-white/80 rounded-lg shadow p-6 text-center">
        <p className="text-gray-600">No uploads found. Upload your first Excel file to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Upload History</h3>
      <div className="space-y-3">
        {uploads.map((upload) => (
          <div key={upload._id} className="border rounded-lg p-4 bg-white/60">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{upload.fileName}</h4>
                <p className="text-sm text-gray-600">
                  Uploaded by: {upload.uploadedBy}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(upload.uploadedAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {upload.data.length} rows of data
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleViewData(upload)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  View Data
                </button>
                <button
                  onClick={() => handleDelete(upload._id)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadHistory; 