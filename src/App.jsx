import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MergePage from './pages/MergePage';
import SplitPage from './pages/SplitPage';
import CompressPage from './pages/CompressPage';
import RotatePage from './pages/RotatePage';
import EditPage from './pages/EditPage';
import PdfToWord from './pages/PdfToWord';
import WordToPdf from './pages/WordToPdf';

import Home from './pages/Home';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" className="px-4 shadow-sm">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
            {/* Replace with logo if available */}
            <img src="/logo192.png" alt="LazyPDF" width="30" className="me-2" />
            LazyPDF
          </Navbar.Brand>
          <div>
            <Button variant="outline-primary" size="sm" className="me-2">Login</Button>
            <Button variant="success" size="sm">Sign Up</Button>
          </div>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/merge" element={<MergePage />} />
          <Route path="/split" element={<SplitPage />} />
          <Route path="/compress" element={<CompressPage />} />
          <Route path="/rotate" element={<RotatePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
