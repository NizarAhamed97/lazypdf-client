import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please upload at least 2 PDFs to merge.');
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('pdfs', file));

    try {
      setLoading(true);
      const response = await axios.post('/api/pdf/merge', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Merge failed:', error);
      alert('Error merging PDFs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      <button onClick={handleMerge} disabled={loading}>
        {loading ? 'Merging...' : 'Merge PDFs'}
      </button>
    </div>
  );
};

export default FileUploader;