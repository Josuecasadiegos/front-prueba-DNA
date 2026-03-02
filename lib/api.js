// lib/api.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';  // fallback a '' (mismo origen) si no está definida

export async function apiFetch(endpoint, options = {}) {
  if (!API_BASE && typeof window !== 'undefined') {
    console.warn('NEXT_PUBLIC_API_URL no está definida → usando mismo origen (puede fallar si backend es separado)');
  }

  const url = `${API_BASE}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
}