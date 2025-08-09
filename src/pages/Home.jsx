import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const tools = [
    { name: 'Merge PDF', route: '/merge' },
    { name: 'Split PDF', route: '/split' },
    { name: 'Compress PDF', route: '/compress' },
    { name: 'Rotate PDF', route: '/rotate' },
    { name: 'Edit PDF', route: '/edit' },
    { name: 'PDF to Word', route: '/pdf-to-word' },
    { name: 'Word to PDF', route: '/word-to-pdf' },
    { name: 'PDF to JPG', route: '/pdf-to-jpg' },
    { name: 'JPG to PDF', route: '/jpg-to-pdf' },
    { name: 'Unlock PDF', route: '/unlock' },
    { name: 'Protect PDF', route: '/protect' },
    { name: 'Delete Pages', route: '/delete-pages' },
    { name: 'Rearrange Pages', route: '/rearrange' },
    { name: 'OCR PDF', route: '/ocr' },
];

const Home = () => {
    return (
        <Container className="text-center py-5">
            <h1 className="mb-2" style={{ fontWeight: '700', color: '#6f42c1' }}>
                LazyPDF Toolkit
            </h1>
            <p className="text-muted mb-4">
                All the PDF tools you need: merge, split, compress, convert, sign, protect and more.
            </p>

            <Row xs={2} md={4} className="g-4">
                {tools.map((tool, index) => (
                    <Col key={index}>
                        <Link to={tool.route} style={{ textDecoration: 'none' }}>
                            <Card className="text-center shadow-sm h-100">
                                <Card.Body>
                                    <div
                                        className="mb-2"
                                        style={{
                                            fontSize: '2rem',
                                            color: '#6f42c1',
                                        }}
                                    >
                                        📄
                                    </div>
                                    <Card.Text style={{ fontWeight: 500, color: '#343a40' }}>
                                        {tool.name}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
