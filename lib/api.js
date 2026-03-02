const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.error || `HTTP ${res.status}`);
    error.status = res.status;
    error.response = res;
    throw error;
  }

  return res;
}