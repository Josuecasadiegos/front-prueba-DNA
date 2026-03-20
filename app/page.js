import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          DNA Music
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          Gestión de estudiantes, materias y notas
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link 
            href="/login"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-indigo-900/30"
          >
            Iniciar Sesión
          </Link>
          
          <Link 
            href="/register"
            className="px-8 py-4 bg-transparent border-2 border-indigo-500 hover:bg-indigo-500/10 text-indigo-400 font-medium rounded-xl transition-all transform hover:scale-105"
          >
            Crear Cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}