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
  if (data.access) {
    localStorage.setItem("access_token", data.access);
    return data.access;
  }
  return null;
}

// Main authFetch function
export async function authFetch(url, options = {}, retry = true) {
  // Always use full URL for local API calls
  const base = "http://127.0.0.1:8000";
  const fullUrl = url.startsWith("http") ? url : base + url;

  const accessToken = localStorage.getItem("access_token");
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  let res = await fetch(fullUrl, { ...options, headers });

  if (res.status === 401 && retry) {
    // Try to refresh token
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      const retryHeaders = {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      res = await fetch(fullUrl, { ...options, headers: retryHeaders });
    }
  }

  return res;
}
