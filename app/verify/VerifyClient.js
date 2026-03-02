// src/app/verify/VerifyClient.js
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');
  const error = searchParams.get('error');
  const already = searchParams.get('already');

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'already' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Prioridad: ya verificado
    if (already === 'verified') {
      setStatus('already');
      setMessage('Tu cuenta ya fue confirmada anteriormente.');
      return;
    }

    // Prioridad: error explícito en query
    if (error) {
      let errMsg = 'Ocurrió un error al verificar tu correo.';
      if (error === 'no-token') errMsg = 'Falta el token de verificación.';
      if (error === 'invalid-token') errMsg = 'El enlace es inválido o ha expirado.';
      if (error === 'user-not-found') errMsg = 'Usuario no encontrado.';
      if (error === 'server-error') errMsg = 'Error en el servidor. Intenta más tarde.';
      setStatus('error');
      setMessage(errMsg);
      return;
    }

    // Caso principal: viene token desde el correo
    if (token) {
      setStatus('loading');
      verifyToken(token);
    } 
    // Sin token ni error ni already → algo raro
    else {
      setStatus('error');
      setMessage('Enlace inválido: no se encontró token de verificación.');
    }
  }, [token, error, already]);

  const verifyToken = async (tok) => {
    try {
      // URL del backend (debe estar en .env del frontend como NEXT_PUBLIC_ para que sea visible en cliente)
      const backendUrl = process.env.NEXT_PUBLIC_API_URL ;

      const response = await fetch(`${backendUrl}/api/auth/verify-email?token=${tok}`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Respuesta inválida del servidor');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Error desconocido al verificar');
      }

      // Éxito
      setStatus('success');
      setMessage('¡Tu correo ha sido verificado exitosamente! Ahora puedes disfrutar de DNA Music.');

      // Redirigir automáticamente después de 2.5 segundos (opcional)
      setTimeout(() => {
        router.push('/login');
      }, 2500);

    } catch (err) {
      console.error('Error verificando token:', err);
      setStatus('error');
      setMessage(err.message || 'No pudimos verificar tu cuenta. El enlace puede haber expirado o haber un problema temporal.');
    }
  };

  // ────────────────────────────────────────────────
  // Render según estado
  // ────────────────────────────────────────────────

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-indigo-500 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white">Verificando tu correo...</h2>
          <p className="text-gray-400 mt-2">No cierres esta página</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/50 p-10 text-center">
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
              ¡Cuenta Verificada!
            </h1>
            <p className="text-gray-300 text-lg mb-8">{message}</p>
          </div>

          <div className="space-y-4">
            <a
              href="/login"
              className="block w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-indigo-900/30"
            >
              Iniciar Sesión
            </a>
            <a
              href="/dashboard"
              className="block w-full py-4 bg-transparent border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600/10 font-medium rounded-xl transition-all duration-300"
            >
              Ir al Dashboard
            </a>
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            Gracias por unirte a DNA Music 🎵
          </p>
        </div>
      </div>
    );
  }

  if (status === 'already') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/50 p-10 text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-6">¡Ya estás verificado!</h1>
          <p className="text-gray-300 text-lg mb-8">{message}</p>
          <a
            href="/login"
            className="block w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-indigo-900/30"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    );
  }

  // Error (default)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/50 p-10 text-center">
        <h1 className="text-4xl font-bold text-red-400 mb-6">Error en la verificación</h1>
        <p className="text-gray-300 text-lg mb-8">{message}</p>
        <a
          href="/login"
          className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-900/30"
        >
          Volver al Inicio de Sesión
        </a>
      </div>
    </div>
  );
}