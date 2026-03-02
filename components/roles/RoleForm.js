'use client';

import { useState, useRef } from 'react';

export default function RoleForm({ onSubmit, editingRole }) {
  const [name, setName] = useState(editingRole?.name || '');
  const prevIdRef = useRef(editingRole?._id);

  // Si cambia el rol que estamos editando, actualizamos manualmente
  if (editingRole?._id !== prevIdRef.current) {
    prevIdRef.current = editingRole?._id;
    setName(editingRole?.name || '');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingRole) {
      onSubmit(editingRole._id, name);
    } else {
      onSubmit(name);
    }

    setName('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingRole ? 'Editar Rol' : 'Crear Nuevo Rol'}
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nombre del rol"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition"
        >
          {editingRole ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}