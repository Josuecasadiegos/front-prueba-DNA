'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiFetch('/api/auth/me', {
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error('Sesión inválida');
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError('Sesión no válida');
        clearSessionAndRedirect();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  // Función auxiliar para limpiar TODO lo relacionado con la sesión en el cliente
  const clearSessionAndRedirect = () => {
    // 1. Limpiar estado local de React
    setUser(null);

    // 2. Limpiar localStorage y sessionStorage (si guardas algo ahí)
    localStorage.clear();      // o localStorage.removeItem('alguna-clave') si es selectivo
    sessionStorage.clear();

    // 3. Forzar refresh del Router Cache de Next.js (limpia caché de navegación y datos prefetch)
    router.refresh();          // Esto invalida el caché client-side sin full reload

    // 4. Redirigir a login (replace para no dejar /dashboard en history)
    router.replace('/login');
  };

  const handleLogout = async () => {
    try {
      // Llamada al backend para borrar la cookie httpOnly
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Error al cerrar sesión en backend:', err);
      // Continúa limpiando el cliente aunque falle el backend
    } finally {
      // Siempre limpia el cliente completamente
      clearSessionAndRedirect();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <p>{error || 'No autenticado'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </header>

        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold mb-4">
            Bienvenido, {user.username}
          </h2>
          <p className="text-gray-300 mb-6">Rol: {user.role}</p>
          {/* Aquí va tu contenido real */}
        </div>
      </div>
    </div>
  );
}