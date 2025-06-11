import React, { useEffect, useState } from "react";
import { authFetch } from "../api/authFetch";

const SecurityPage = () => {
  const [tools, setTools] = useState(null);

  useEffect(() => {
    authFetch("/api/securitytools/")
      .then(res => res.json())
      .then(data => setTools(data));
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
      <h2>Security Tools</h2>
      {tools ? (
        <>
          <div style={{ marginBottom: "1em" }}>{tools.message}</div>
          <ul>
            {tools.tools.map((tool, idx) => (
              <li key={idx}>
                <b>{tool.name}:</b> {tool.status}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SecurityPage;
