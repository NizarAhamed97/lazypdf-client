import React, { useState } from 'react';
import { Button, Container, Form, Spinner, Row, Col, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const MergePage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    // Append new files, avoiding duplicates
    const uniqueFiles = [...files];
    newFiles.forEach(file => {
      if (!files.some(f => f.name === file.name && f.size === file.size)) {
        uniqueFiles.push(file);
      }
    });
    setFiles(uniqueFiles);
  };

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least two PDF files");
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append("pdfs", file));

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/pdf/merge", formData, {
        responseType: "blob"
      });

      const url = URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();
    } catch (error) {
      alert("Merge failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="text-center py-5">
      <h1 className="fw-bold mb-3" style={{ fontSize: '2.8rem' }}>Merge PDF</h1>
      <p className="text-muted mb-4 fs-5">
        Simple PDF merger to combine your PDF files into one
      </p>

      {/* 🧾 Preview Selected Files */}
      {files.length > 0 && (
        <div className="mb-4">
          <h5 className="text-start mb-2">Selected Files:</h5>
          <ListGroup className="text-start">
            {files.map((file, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                {file.name}
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => removeFile(index)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}

      {/* 📁 Add File Button */}
      <Form.Group className="mb-4">
        <Form.Control
          type="file"
          multiple
          accept="application/pdf"
          onChange={handleFileChange}
          className="d-none"
          id="upload"
        />
        <label htmlFor="upload">
          <Button
            variant="danger"
            size="lg"
            style={{
              padding: '16px 48px',
              fontSize: '1.4rem',
              fontWeight: 600,
              borderRadius: '8px'
            }}
            as="span"
          >
            + ADD FILE(S)
          </Button>
        </label>
        <p className="text-muted mt-3">or drag & drop</p>
      </Form.Group>

      {files.length > 0 && (
        <Button
          onClick={handleMerge}
          disabled={loading}
          variant="primary"
          className="mb-5"
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Merge Now'}
        </Button>
      )}

      {/* 🔽 Feature Blocks (Same as before) */}
      <Row xs={1} md={3} className="g-4 mt-4 pt-4 border-top">
        {[
          { icon: '🧩', title: 'Best PDF merger', text: 'Combine multiple PDFs quickly, no watermark, intuitive UI, rearrange before joining.' },
          { icon: '🛡️', title: 'Keep your files safe', text: "Files auto-delete after 2 hrs. No third-party sharing." },
          { icon: '💻', title: 'Merge on any OS', text: 'Works on all platforms: Windows, Mac, Android, Linux.' },
          { icon: '🏆', title: 'Combine with ease', text: 'Add from your device, Google Drive, or Dropbox.' },
          { icon: '⏱️', title: 'Boost productivity', text: 'Merge fast with cloud-based tools. No installs.' },
          { icon: '🛠️', title: 'User-friendly', text: 'No tech skills needed. Simple and clear interface.' }
        ].map((block, i) => (
          <Col key={i}>
            <Card className="h-100 text-center border-0">
              <Card.Body>
                <div style={{ fontSize: '2.8rem' }}>{block.icon}</div>
                <h5 className="fw-bold mt-3">{block.title}</h5>
                <p className="text-muted small">{block.text}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MergePage;
