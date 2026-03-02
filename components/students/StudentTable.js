'use client';

import { Pencil, Trash2 } from 'lucide-react';

export default function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold mb-6">Listado de Estudiantes</h2>

      {students.length === 0 ? (
        <p className="text-gray-400">No hay estudiantes registrados</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th>Fecha creación</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b border-gray-800">
                <td>{student.name}</td>
                <td>{student.email || '-'}</td>
                <td>{student.age || '-'}</td>
                <td>
                  {new Date(student.createdAt).toLocaleDateString()}
                </td>
                <td className="text-right flex gap-3 justify-end">
                  <button onClick={() => onEdit(student)}>
                    <Pencil size={18} className="text-yellow-400" />
                  </button>
                  <button onClick={() => onDelete(student._id)}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}