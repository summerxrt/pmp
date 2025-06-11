import React, { useEffect, useState } from "react";
import { authFetch } from "../api/authFetch";

const DashboardPage = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    authFetch("/api/dashboard/")
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized or fetch failed");
        return res.json();
      })
      .then(data => setOverview(data))
      .catch(e => setOverview({ error: e.message }));
  }, []);

  return (
    <div style={{
      maxWidth: 600,
      margin: "2em auto",
      padding: "2em",
      background: "#222",
      borderRadius: 16,
      color: "#fff"
    }}>
      <h2>Dashboard</h2>
      {overview ? (
        overview.error ? (
          <div style={{ color: "red" }}>{overview.error}</div>
        ) : (
          <>
            <div style={{ marginBottom: "1em" }}>{overview.message}</div>
            <ul>
              {overview.widgets.map((widget, idx) => (
                <li key={idx}>
                  <b>{widget.type}:</b> {widget.value}
                </li>
              ))}
            </ul>
          </>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DashboardPage;
