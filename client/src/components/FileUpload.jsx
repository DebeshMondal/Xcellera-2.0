import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';

const FileUpload = ({ onDataParsed }) => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        onDataParsed(json);
      } catch (err) {
        setError('Failed to parse file. Please upload a valid Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="file"
        accept=".xlsx,.xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-2"
      />
      {fileName && <span className="text-sm text-gray-600">Selected: {fileName}</span>}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FileUpload;
