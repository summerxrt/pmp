import React from "react";
import { parseJwt } from "../api/jwtUtils"; // Adjust the path if needed

const ProfilePage = () => {
  const token = localStorage.getItem("access_token");
  const user = token ? parseJwt(token) : null;

  return (
    <div style={{
      maxWidth: 500,
      margin: "2em auto",
      padding: "2em",
      background: "#20232a",
      borderRadius: 16,
      color: "#fff"
    }}>
      <h2 style={{ marginBottom: "1em" }}>Account Profile</h2>
      {user ? (
        <div>
          <div>
            <b>Username:</b> {user.username}
          </div>
          <div>
            <b>User ID:</b> {user.user_id || user.id || "N/A"}
          </div>
          <div>
            <b>Token Expires:</b> {user.exp ? new Date(user.exp * 1000).toLocaleString() : "N/A"}
          </div>
        </div>
      ) : (
        <div>No user info available. Please log in.</div>
      )}
    </div>
  );
};

export default ProfilePage;
