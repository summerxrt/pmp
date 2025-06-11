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
                <li key={idx} style={{ marginBottom: "1em" }}>
                  <b>{widget.type.replace('_', ' ')}:</b>{" "}
                  {Array.isArray(widget.value) ? (
                    <ul>
                      {widget.value.map((item, i) => (
                        <li key={i}>
                          {/* For recent_notes array: show title + created, else dump as string */}
                          {item.title ? (
                            <>
                              <b>{item.title}</b> ({item.created})
                            </>
                          ) : (
                            JSON.stringify(item)
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : typeof widget.value === "object" && widget.value !== null ? (
                    <ul style={{ marginTop: "0.5em" }}>
                      {Object.entries(widget.value).map(([k, v]) => (
                        <li key={k}>
                          <b>{k.replace('_', ' ')}:</b> {v}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    widget.value
                  )}
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
