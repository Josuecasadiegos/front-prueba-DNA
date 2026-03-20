'use client';

import { useEffect, useState } from 'react';
import { Loader2, ArrowLeft, Plus } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import SubjectForm from '@/components/subjects/SubjectForm';
import SubjectTable from '@/components/subjects/SubjectTable';
import Link from 'next/link';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiFetch('/api/subjects');
      setSubjects(data);
    } catch (err) {
      setError(err.message || 'Error al cargar materias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubjects(); }, []);

  const handleSubmit = async (name) => {
    try {
      if (editingSubject) {
        await apiFetch('/api/subjects', {
          method: 'PUT',
          body: JSON.stringify({ id: editingSubject._id, name }),
        });
      } else {
        await apiFetch('/api/subjects', {
          method: 'POST',
          body: JSON.stringify({ name }),
        });
      }
      setIsModalOpen(false);
      setEditingSubject(null);
      fetchSubjects();
    } catch (err) {
      alert(err.message || 'Error al guardar materia');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta materia?')) return;
    try {
      await apiFetch('/api/subjects', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      fetchSubjects();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                <ArrowLeft size={20} />
                <span>Volver al Dashboard</span>
              </Link>
              <h1 className="text-2xl font-bold">Gestión de Materias</h1>
            </div>
            <button
              onClick={() => { setEditingSubject(null); setIsModalOpen(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-sm"
            >
              <Plus size={18} /> Nueva Materia
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <SubjectTable subjects={subjects} onEdit={(s) => { setEditingSubject(s); setIsModalOpen(true); }} onDelete={handleDelete} />
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setIsModalOpen(false); setEditingSubject(null); }} />
          <div className="relative bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{editingSubject ? 'Editar Materia' : 'Crear Materia'}</h2>
                <button onClick={() => { setIsModalOpen(false); setEditingSubject(null); }} className="text-gray-400 hover:text-white text-xl">✕</button>
              </div>
              <SubjectForm editingSubject={editingSubject} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}