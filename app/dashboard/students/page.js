'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import StudentForm from '@/components/students/StudentForm';
import StudentTable from '@/components/students/StudentTable';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Error al cargar estudiantes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async (data) => {
    try {
      await apiFetch('/api/students', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      fetchStudents();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await apiFetch('/api/students', {
        method: 'PUT',
        body: JSON.stringify({ id, ...data }),
      });
      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este estudiante?')) return;

    try {
      await apiFetch('/api/students', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      fetchStudents();
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
        <h1 className="text-4xl font-bold mb-8">Gestión de Estudiantes</h1>

        <StudentForm
          key={editingStudent?._id || 'new'}
          editingStudent={editingStudent}
          onSubmit={editingStudent ? handleUpdate : handleCreate}
        />

        {error && (
          <div className="bg-red-600 p-3 rounded mt-4">{error}</div>
        )}

        <StudentTable
          students={students}
          onEdit={setEditingStudent}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}