'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await apiFetch('/api/auth/me', { method: 'GET' });
        setUser(data.user);
      } catch (err) {
        setError('Sesión no válida');
        clearSessionAndRedirect();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const clearSessionAndRedirect = () => {
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    router.refresh();
    router.replace('/login');
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
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
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">{error || 'No autenticado'}</p>
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 underline">
            Ir al login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:py-5 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/roles"
                className="px-4 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Roles
              </Link>
              <Link
                href="/dashboard/grades"
                className="px-4 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Notas
              </Link>
              <Link
                href="/dashboard/subjects"
                className="px-4 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Materias
              </Link>
              <Link
                href="/dashboard/students"
                className="px-4 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Estudiantes
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/90 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex items-center gap-1.5 ml-2 sm:ml-4"
              >
                <LogOut size={16} />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            Bienvenido, <span className="text-indigo-400">{user.username}</span>
          </h2>
          <div className="flex items-center gap-3 text-gray-400">
            <span className="text-sm font-medium px-3 py-1 bg-gray-800 rounded-full">
              Rol: {user.role}
            </span>
          </div>
        </div>

        {/* Aquí puedes agregar más secciones / tarjetas / estadísticas */}
      </main>
    </div>
  );
}