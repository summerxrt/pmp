import React, { useState, useEffect } from "react";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const accessToken = localStorage.getItem("access_token");

  // Fetch notes
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/notes/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated or API error");
        return res.json();
      })
      .then((data) => setNotes(data))
      .catch(() => setError("Please log in to Django API in your browser."));
  }, [accessToken]);

  // Add note
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetch("http://127.0.0.1:8000/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not create note (auth?)");
        return res.json();
      })
      .then((newNote) => {
        setNotes([newNote, ...notes]);
        setTitle("");
        setContent("");
      })
      .catch(() =>
        setError("Could not create note. Are you logged in to the API?")
      );
  };

  // Delete note
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not delete note");
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch(() => setError("Could not delete note. Try re-logging in."));
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
      <h1>Notes Module</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 8, width: "45%", marginRight: "2%" }}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ padding: 8, width: "45%" }}
        />
        <br />
        <button type="submit" style={{ marginTop: 12, padding: "8px 16px" }}>
          Add Note
        </button>
      </form>
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
      <ul style={{ textAlign: "left", listStyle: "none", padding: 0 }}>
        {notes.length === 0 ? (
          <li>No notes yet.</li>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              style={{
                background: "#232323",
                padding: 16,
                borderRadius: 8,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{note.title}</strong>
                <p style={{ margin: 0 }}>{note.content}</p>
                <span style={{ fontSize: "0.8em", color: "#888" }}>
                  Created: {new Date(note.created_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => handleDelete(note.id)}
                style={{
                  marginLeft: 16,
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default NotesPage;
