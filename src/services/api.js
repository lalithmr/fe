const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "https://chess-backend-ijaq.onrender.com";

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "string"
        ? data
        : data?.message || "Request failed. Please try again.";
    throw new Error(message);
  }

  return data;
}

export async function createRegistration(payload) {
  const response = await fetch(`${API_BASE_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function getRegistrations() {
  const response = await fetch(`${API_BASE_URL}/api/registrations`);
  return parseResponse(response);
}

export async function deleteRegistration(id) {
  const response = await fetch(`${API_BASE_URL}/api/registrations/${id}`, {
    method: "DELETE",
  });

  return parseResponse(response);
}

export { API_BASE_URL };