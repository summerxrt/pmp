import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import DashboardPage from "./pages/DashboardPage";
import SecurityPage from "./pages/SecurityPage";
import AIAggregatorPage from "./pages/AIAggregatorPage";
import CVScannerPage from "./pages/CVScannerPage";
import LinktreePage from "./pages/LinktreePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import { parseJwt } from "./api/jwtUtils";
import "./App.css";

// Auth checker: redirect to login if no token
function RequireAuth({ children }) {
  const accessToken = localStorage.getItem("access_token");
  return accessToken ? children : <Navigate to="/login" replace />;
}

function NavBar({ onLogout }) {
  const loggedIn = !!localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    onLogout && onLogout();
    navigate("/login");
  };

  let username = "";
  const token = localStorage.getItem("access_token");
  if (token) {
    const payload = parseJwt(token);
    username = payload?.username || "";
  }

  return (
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
      <Link to="/linktree" style={{ marginRight: 18, color: "#61dafb" }}>Linktree</Link>
      {loggedIn && (
        <>
          <Link to="/profile" style={{ color: "#44cc44", marginRight: 18, fontWeight: "bold" }}>Profile</Link>
          <span style={{ color: "#44cc44", marginRight: 18 }}>
            Logged in as <b>{username}</b>
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "#232323",
              color: "#fff",
              padding: "7px 20px",
              borderRadius: 7,
              border: "none",
              fontWeight: 600,
              marginLeft: 8,
              cursor: "pointer"
            }}
          >
            Log Out
          </button>
        </>
      )}
    </nav>
  );
}


function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RequireAuth><NotesPage /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/security" element={<RequireAuth><SecurityPage /></RequireAuth>} />
          <Route path="/ai-aggregator" element={<RequireAuth><AIAggregatorPage /></RequireAuth>} />
          <Route path="/cv-scanner" element={<RequireAuth><CVScannerPage /></RequireAuth>} />
          <Route path="/linktree" element={<RequireAuth><LinktreePage /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/security" element={<RequireAuth><SecurityPage /></RequireAuth>} />

    
        </Routes>
      </div>
    </Router>
  );
}

export default App;
