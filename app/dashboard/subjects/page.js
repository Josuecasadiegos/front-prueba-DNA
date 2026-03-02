'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import SubjectForm from '@/components/subjects/SubjectForm';
import SubjectTable from '@/components/subjects/SubjectTable';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [editingSubject, setEditingSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/subjects');
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      setError(err.message || 'Error al cargar materias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleCreate = async (name) => {
    try {
      await apiFetch('/api/subjects', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      fetchSubjects();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (id, name) => {
    try {
      await apiFetch('/api/subjects', {
        method: 'PUT',
        body: JSON.stringify({ id, name }),
      });
      setEditingSubject(null);
      fetchSubjects();
    } catch (err) {
      alert(err.message);
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
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gestión de Materias</h1>

        <SubjectForm
          key={editingSubject?._id || 'new'}
          editingSubject={editingSubject}
          onSubmit={editingSubject ? handleUpdate : handleCreate}
        />

        {error && (
          <div className="bg-red-600 p-3 rounded mt-4">{error}</div>
        )}

        <SubjectTable
          subjects={subjects}
          onEdit={setEditingSubject}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}