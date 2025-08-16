import React, { useState } from 'react';
import { Button, Container, Form, Spinner, Row, Col, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const CompressPage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const uploaded = e.target.files[0];
        if (uploaded?.type === 'application/pdf') {
            setFile(uploaded);
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const handleCompress = async () => {
        if (!file) {
            alert("Please select a PDF file");
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            setLoading(true);
            const res = await axios.post("/api/pdf/compress", formData, {
                responseType: "blob"
            });

            const url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = "compressed.pdf";
            link.click();
        } catch (err) {
            alert("Compression failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="text-center py-5">
            <h1 className="fw-bold mb-3" style={{ fontSize: '2.8rem' }}>Compress PDF</h1>
            <p className="text-muted mb-4 fs-5">
                Reduce PDF file size without quality loss
            </p>

            {file && (
                <div className="mb-4">
                    <h5 className="text-start mb-2">Selected File:</h5>
                    <ListGroup className="text-start">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            {file.name}
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={removeFile}
                            >
                                Remove
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            )}

            {/* Upload File */}
            <Form.Group className="mb-4">
                <Form.Control
                    type="file"
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
                        + ADD FILE
                    </Button>
                </label>
                <p className="text-muted mt-3">or drag & drop</p>
            </Form.Group>

            {file && (
                <Button
                    onClick={handleCompress}
                    disabled={loading}
                    variant="primary"
                    className="mb-5"
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Compress Now'}
                </Button>
            )}

            {/* 🔽 Feature Info */}
            <Row xs={1} md={3} className="g-4 mt-4 pt-4 border-top">
                {[
                    { icon: '📉', title: 'Reduce PDF size', text: 'Shrink large PDFs to save storage or email faster.' },
                    { icon: '🔒', title: 'Private by design', text: 'Your files are encrypted and auto-deleted.' },
                    { icon: '🚀', title: 'Fast & efficient', text: 'Compression runs on a dedicated server.' },
                    { icon: '🌍', title: 'Works anywhere', text: 'Mobile-friendly and cross-platform.' },
                    { icon: '🧠', title: 'Smart optimization', text: 'Balance quality and size automatically.' },
                    { icon: '☁️', title: 'No installs', text: 'Fully browser-based. No app download needed.' }
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

export default CompressPage;
