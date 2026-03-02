'use client';

import { useState } from 'react';

export default function StudentForm({ editingStudent, onSubmit }) {
  const [name, setName] = useState(editingStudent?.name || '');
  const [email, setEmail] = useState(editingStudent?.email || '');
  const [age, setAge] = useState(editingStudent?.age || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const data = {
      name,
      email: email || undefined,
      age: age ? Number(age) : undefined,
    };

    if (editingStudent) {
      onSubmit(editingStudent._id, data);
    } else {
      onSubmit(data);
    }

    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingStudent ? 'Editar Estudiante' : 'Nuevo Estudiante'}
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-800 p-2 rounded border border-gray-700"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 p-2 rounded border border-gray-700"
        />

        <input
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="bg-gray-800 p-2 rounded border border-gray-700"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
      >
        {editingStudent ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}