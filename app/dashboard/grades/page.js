'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import GradeForm from '@/components/grades/GradeForm';
import GradeTable from '@/components/grades/GradeTable';

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [editingGrade, setEditingGrade] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [grades, students, subjects] = await Promise.all([
        apiFetch('/api/grades'),
        apiFetch('/api/students'),
        apiFetch('/api/subjects'),
      ]);

      setGrades(grades);
      setStudents(students);
      setSubjects(subjects);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = async (data) => {
    try {
      await apiFetch('/api/grades', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      fetchAll();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await apiFetch('/api/grades', {
        method: 'PUT',
        body: JSON.stringify({ id, ...data }),
      });
      setEditingGrade(null);
      fetchAll();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta nota?')) return;

    try {
      await apiFetch('/api/grades', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      fetchAll();
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gestión de Notas</h1>

        <GradeForm
          key={editingGrade?._id || 'new'}
          students={students}
          subjects={subjects}
          editingGrade={editingGrade}
          onSubmit={editingGrade ? handleUpdate : handleCreate}
        />

        <GradeTable
          grades={grades}
          onEdit={setEditingGrade}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}