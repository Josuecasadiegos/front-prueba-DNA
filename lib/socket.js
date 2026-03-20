'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiFetch } from '@/lib/api';

export default function NotificationListener() {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await apiFetch('/api/notifications');
        const data = await res.json();

        data.forEach((n) => {
          toast.success(n.message);
        });
      } catch (err) {}
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return null;
}