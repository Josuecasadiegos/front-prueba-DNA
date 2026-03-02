'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/50 p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">Iniciar Sesión</h1>
          <p className="text-gray-400 mt-2">Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Usuario</label>
            <input
              name="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
              placeholder="admin"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-4 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[42px] text-gray-400 hover:text-gray-200 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-800/50 text-red-300 p-4 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-indigo-900/30"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}