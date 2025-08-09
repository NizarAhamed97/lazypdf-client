import React, { useState } from 'react';
import { Button, Container, Form, Spinner, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const RotatePage = () => {
    const [file, setFile] = useState(null);
    const [angle, setAngle] = useState('90');
    const [pages, setPages] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRotate = async () => {
        if (!file || !angle) {
            alert("Please select a file and rotation angle.");
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('angle', angle);
        if (pages) formData.append('pages', pages);

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/pdf/rotate", formData, {
                responseType: "blob",
            });

            const url = URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.download = "rotated.pdf";
            link.click();
        } catch (err) {
            alert("Rotation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="text-center py-5">
            <h1 className="fw-bold mb-3" style={{ fontSize: '2.8rem' }}>Rotate PDF</h1>
            <p className="text-muted mb-4 fs-5">
                Rotate selected or all pages of your PDF by 90°, 180°, or 270°
            </p>

            <Form.Group className="mb-4">
                <Form.Control
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </Form.Group>

            <Row className="mb-3">
                <Col md={4} className="mx-auto">
                    <Form.Select value={angle} onChange={(e) => setAngle(e.target.value)}>
                        <option value="90">Rotate 90°</option>
                        <option value="180">Rotate 180°</option>
                        <option value="270">Rotate 270°</option>
                    </Form.Select>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Control
                    placeholder="Pages to rotate (e.g. 1,3,5) — leave empty for all"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                />
            </Form.Group>

            <Button
                onClick={handleRotate}
                disabled={loading || !file}
                variant="primary"
                size="lg"
                className="mb-4"
            >
                {loading ? <Spinner animation="border" size="sm" /> : 'Rotate Now'}
            </Button>

            {/* Info Cards */}
            <Row xs={1} md={3} className="g-4 mt-4 pt-4 border-top">
                {[
                    { icon: '🔄', title: 'Rotate as needed', text: 'Apply rotation to all pages or choose specific ones like 1,3,5.' },
                    { icon: '🚀', title: 'Fast & Secure', text: "Instant rotation in browser. No watermark. Files auto-deleted." },
                    { icon: '💡', title: 'Simple UI', text: 'Drag & drop PDF and select how you want it rotated.' }
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

export default RotatePage;
