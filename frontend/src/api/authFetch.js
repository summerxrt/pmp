// src/api/authFetch.js

// Helper: Refresh the access token using the refresh token
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;

  const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  localStorage.setItem("access_token", data.access);
  return data.access;
}

// Main authFetch function
export async function authFetch(url, options = {}, retry = true) {
  const accessToken = localStorage.getItem("access_token");
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const res = await fetch(url, { ...options, headers, credentials: "include" });

  if (res.status === 401 && retry) {
    // Try to refresh token
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      // Retry original request
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      return fetch(url, { ...options, headers: retryHeaders, credentials: "include" });
    }
  }

  return res;
}
