'use client';

import { useState } from 'react';

export default function GradeForm({
  students,
  subjects,
  editingGrade,
  onSubmit,
}) {
  const [student, setStudent] = useState(editingGrade?.student?._id || '');
  const [subject, setSubject] = useState(editingGrade?.subject?._id || '');
  const [grade, setGrade] = useState(editingGrade?.grade || '');
  const [comments, setComments] = useState(editingGrade?.comments || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student || !subject || grade === '') return;

    const data = {
      student,
      subject,
      grade: Number(grade),
      comments,
    };

    if (editingGrade) {
      onSubmit(editingGrade._id, data);
    } else {
      onSubmit(data);
    }
  };

  return (
    <form className="bg-gray-900 p-6 rounded-xl border border-gray-800 mb-8" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">
        {editingGrade ? 'Editar Nota' : 'Nueva Nota'}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <select
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          className="bg-gray-800 p-2 rounded border border-gray-700"
        >
          <option value="">Seleccionar estudiante</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-gray-800 p-2 rounded border border-gray-700"
        >
          <option value="">Seleccionar materia</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          max="100"
          placeholder="Nota"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="bg-gray-800 p-2 rounded border border-gray-700"
        />

        <input
          type="text"
          placeholder="Comentarios"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="bg-gray-800 p-2 rounded border border-gray-700"
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded"
      >
        {editingGrade ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}