import React, { useState } from 'react';
import axios from 'axios';

const PdfToWord = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) return alert('Please select a PDF file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('/api/pdf/convert/pdf-to-word', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '.docx');
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert('Conversion failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Convert PDF to Word</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <br />
      <button onClick={handleConvert} className="btn btn-primary mt-3" disabled={loading}>
        {loading ? 'Converting...' : 'Convert'}
      </button>
    </div>
  );
};

export default PdfToWord;
