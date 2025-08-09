import React, { useState, useRef } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/5.3.31/pdf.worker.min.js`;

const EditPage = () => {
    const [file, setFile] = useState(null);
    const [pdfBuffer, setPdfBuffer] = useState(null);
    const [textBoxes, setTextBoxes] = useState([]);
    const [scale, setScale] = useState(1.5);
    const containerRef = useRef();

    const handleFileChange = async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        setFile(f);
        setPdfBuffer(await f.arrayBuffer());
        setTextBoxes([]);
    };

    const handleAddText = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const text = prompt("Enter text:");
        if (text) {
            setTextBoxes([...textBoxes, { text, x, y }]);
        }
    };

    const handleDownload = async () => {
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const page = pdfDoc.getPages()[0];

        textBoxes.forEach(box => {
            // Convert screen to PDF space
            const x = box.x / scale;
            const y = page.getHeight() - box.y / scale;
            page.drawText(box.text, {
                x,
                y,
                size: 12,
                font,
                color: rgb(0, 0, 0),
            });
        });

        const newPdf = await pdfDoc.save();
        const blob = new Blob([newPdf], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'edited.pdf';
        link.click();
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4 text-center">Visual PDF Text Editor</h2>

            <Form.Group className="mb-3 text-center">
                <Form.Control type="file" accept="application/pdf" onChange={handleFileChange} />
            </Form.Group>

            {file && (
                <div className="position-relative d-inline-block" onClick={handleAddText} ref={containerRef}>
                    <Document file={file}>
                        <Page pageNumber={1} scale={scale} />
                    </Document>

                    {textBoxes.map((box, idx) => (
                        <div
                            key={idx}
                            style={{
                                position: 'absolute',
                                left: box.x,
                                top: box.y,
                                fontSize: '14px',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                padding: '2px 4px',
                                borderRadius: '4px',
                                pointerEvents: 'none',
                            }}
                        >
                            {box.text}
                        </div>
                    ))}
                </div>
            )}

            {file && (
                <div className="text-center mt-4">
                    <Button variant="primary" onClick={handleDownload}>
                        Download Edited PDF
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default EditPage;
