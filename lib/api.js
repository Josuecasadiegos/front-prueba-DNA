'use client';

import toast from 'react-hot-toast';

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

  const data = await res.json().catch(() => ({}));

  // 🔥 NOTIFICACIONES AUTOMÁTICAS
  if (res.ok) {
    if (data?.message) {
      toast.success(data.message);
    }
  } else {
    const errorMsg = data?.error || `HTTP ${res.status}`;
    toast.error(errorMsg);

    const error = new Error(errorMsg);
    error.status = res.status;
    error.response = res;
    throw error;
  }

  return data; // 👈 ahora devuelves el JSON directamente
}