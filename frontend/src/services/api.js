// Reusable API service. All requests go through here so the base URL is
// configured once, from an environment variable, instead of being
// hardcoded throughout the app.

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (networkError) {
    throw new ApiError(
      "Could not reach the server. Please check your connection and try again.",
      0
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Response had no JSON body — leave data as null.
  }

  if (!response.ok) {
    const message =
      (data && (data.detail || JSON.stringify(data.errors))) ||
      "Something went wrong. Please try again.";
    throw new ApiError(message, response.status);
  }

  return data;
}

// Some DRF list views may still be paginated; normalize either shape
// (plain array or { results: [...] }) into a plain array.
function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export const api = {
  getProjects: async (category = "all") => {
    const query = category && category !== "all" ? `?category=${category}` : "";
    const data = await request(`/projects/${query}`);
    return normalizeList(data);
  },
  getProject: (id) => request(`/projects/${id}/`),
  getSkills: async () => normalizeList(await request("/skills/")),
  getExperience: async () => normalizeList(await request("/experience/")),
  getCertificates: async () => normalizeList(await request("/certificates/")),
  sendContactMessage: (payload) =>
    request("/contact/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export { ApiError };
