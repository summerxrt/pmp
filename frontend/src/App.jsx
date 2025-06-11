import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import DashboardPage from "./pages/DashboardPage";
import SecurityPage from "./pages/SecurityPage";
import AIAggregatorPage from "./pages/AIAggregatorPage";
import CVScannerPage from "./pages/CVScannerPage";
import LinktreePage from "./pages/LinktreePage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav style={{
        margin: "24px 0",
        padding: "16px",
        background: "#191d24",
        borderRadius: "10px",
        textAlign: "center",
        fontSize: "1.1em"
      }}>
        <Link to="/" style={{ marginRight: 18, color: "#61dafb" }}>Notes</Link>
        <Link to="/dashboard" style={{ marginRight: 18, color: "#61dafb" }}>Dashboard</Link>
        <Link to="/security" style={{ marginRight: 18, color: "#61dafb" }}>Security Tools</Link>
        <Link to="/ai-aggregator" style={{ marginRight: 18, color: "#61dafb" }}>API Aggregator</Link>
        <Link to="/cv-scanner" style={{ marginRight: 18, color: "#61dafb" }}>CV Scanner</Link>
        <Link to="/linktree" style={{ color: "#61dafb" }}>Linktree</Link>
      </nav>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/ai-aggregator" element={<AIAggregatorPage />} />
          <Route path="/cv-scanner" element={<CVScannerPage />} />
          <Route path="/linktree" element={<LinktreePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
