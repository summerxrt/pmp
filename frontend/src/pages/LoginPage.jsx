import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/");
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "100px auto", textAlign: "center" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 8, width: "90%", marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 8, width: "90%", marginBottom: 8 }}
        />
        <br />
        <button type="submit" style={{ padding: "8px 20px", marginTop: 8 }}>
          Log In
        </button>
      </form>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
    </div>
  );
}

export default LoginPage;

