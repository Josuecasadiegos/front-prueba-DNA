// src/app/verify/page.js
import { Suspense } from 'react';
import VerifyClient from './VerifyClient';

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        {/* Puedes usar un Loader2 aquí también, pero como es server, mejor texto simple o nada */}
        <p className="text-white text-2xl">Cargando...</p>
      </div>
    }>
      <VerifyClient />
    </Suspense>
  );
}