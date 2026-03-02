// src/app/verify/page.js
import { Suspense } from 'react';
import VerifyClient from './VerifyClient';

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <p className="text-white text-2xl">Cargando...</p>
      </div>
    }>
      <VerifyClient />
    </Suspense>
  );
}