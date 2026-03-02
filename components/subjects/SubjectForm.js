'use client';

import { useState } from 'react';

export default function SubjectForm({ editingSubject, onSubmit }) {
  const [name, setName] = useState(editingSubject?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingSubject) {
      onSubmit(editingSubject._id, name);
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
        {editingSubject ? 'Editar Materia' : 'Nueva Materia'}
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nombre de la materia"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded transition"
        >
          {editingSubject ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
}