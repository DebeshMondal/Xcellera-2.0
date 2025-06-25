import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import Loader from './Loader';

const FileUpload = forwardRef(({ onDataParsed }, ref) => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openFileDialog: () => {
      fileInputRef.current.click();
    }
  }));

  const handleFileChange = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        onDataParsed(json);

        // POST to backend
        const postData = async () => {
          try {
            console.log('Posting to backend...', {
              fileName: file.name,
              data: json.slice(1),
              headers: json[0],
              uploadedBy: user?.primaryEmailAddress?.emailAddress || user?.emailAddress || 'anonymous'
            });
            const res = await axios.post('http://localhost:5000/api/excel', {
              fileName: file.name,
              data: json.slice(1),
              headers: json[0],
              uploadedBy: user?.primaryEmailAddress?.emailAddress || user?.emailAddress || 'anonymous'
            });
            console.log('Backend response:', res.data);
            alert('File uploaded and saved to backend!');
          } catch (err) {
            console.error('Backend error:', err);
            alert('Failed to save data to backend.');
          } finally {
            setLoading(false);
          }
        };
        postData();
      } catch (err) {
        setError('Failed to parse file. Please upload a valid Excel file.');
        setLoading(false);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {loading ? (
        <Loader message="Uploading and parsing file..." />
      ) : (
        <>
          <input
            type="file"
            accept=".xlsx,.xls"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mb-2"
          />
          {fileName && <span className="text-sm text-gray-600">Selected: {fileName}</span>}
          {error && <span className="text-sm text-red-500">{error}</span>}
        </>
      )}
    </div>
  );
});

export default FileUpload;
