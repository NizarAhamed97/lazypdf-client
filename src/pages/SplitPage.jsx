import React, { useState } from 'react';
import { Button, Container, Form, Spinner, Row, Col, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const SplitPage = () => {
    const [file, setFile] = useState(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const uploaded = e.target.files[0];
        if (uploaded?.type === 'application/pdf') {
            setFile(uploaded);
        }
    };

    const removeFile = () => {
        setFile(null);
        setFrom('');
        setTo('');
    };

    const handleSplit = async () => {
        if (!file || !from || !to) {
            alert("Please upload a PDF and enter valid page range");
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('from', from);
        formData.append('to', to);

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/pdf/split", formData, {
                responseType: "blob"
            });

            const url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = "split.pdf";
            link.click();
        } catch (err) {
            alert("Split failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="text-center py-5">
            <h1 className="fw-bold mb-3" style={{ fontSize: '2.8rem' }}>Split PDF</h1>
            <p className="text-muted mb-4 fs-5">
                Extract specific pages from your PDF easily
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

            {/* Upload and Range Input */}
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
                <Row className="justify-content-center mb-4">
                    <Col xs={6} md={3}>
                        <Form.Control
                            type="number"
                            placeholder="From page"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </Col>
                    <Col xs={6} md={3}>
                        <Form.Control
                            type="number"
                            placeholder="To page"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </Col>
                </Row>
            )}

            {file && (
                <Button
                    onClick={handleSplit}
                    disabled={loading}
                    variant="primary"
                    className="mb-5"
                >
                    {loading ? <Spinner animation="border" size="sm" /> : 'Split Now'}
                </Button>
            )}

            {/* 🔽 Feature Blocks (same as Merge) */}
            <Row xs={1} md={3} className="g-4 mt-4 pt-4 border-top">
                {[
                    { icon: '✂️', title: 'Smart Split', text: 'Choose exact page ranges and extract cleanly.' },
                    { icon: '🛡️', title: 'Your PDFs are safe', text: 'Deleted automatically after 2 hours. Private always.' },
                    { icon: '⚡', title: 'Quick download', text: 'Get your extracted file within seconds.' },
                    { icon: '📱', title: 'Cross-device support', text: 'Works on phones, tablets, and PCs.' },
                    { icon: '📚', title: 'No size limit', text: 'Split even large PDF books or scanned files.' },
                    { icon: '🛠️', title: 'Simple interface', text: 'Easy-to-use with minimal steps.' }
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

export default SplitPage;
