'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import RoleForm from '@/components/roles/RoleForm';
import RoleTable from '@/components/roles/RoleTable';

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRole, setEditingRole] = useState(null);
  const [error, setError] = useState('');

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/api/roles', { method: 'GET' });
      setRoles(data);
    } catch (err) {
      setError(err.message || 'Error al cargar roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async (name) => {
    try {
      await apiFetch('/api/roles', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      fetchRoles();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdate = async (id, name) => {
    try {
      await apiFetch('/api/roles', {
        method: 'PUT',
        body: JSON.stringify({ id, name }),
      });
      setEditingRole(null);
      fetchRoles();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este rol?')) return;

    try {
      await apiFetch('/api/roles', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      fetchRoles();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gestión de Roles</h1>

        <RoleForm
          onSubmit={editingRole ? handleUpdate : handleCreate}
          editingRole={editingRole}
        />

        {error && (
          <div className="bg-red-600 p-3 rounded mt-4">{error}</div>
        )}

        <RoleTable
          roles={roles}
          onEdit={setEditingRole}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}