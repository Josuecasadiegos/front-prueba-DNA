'use client';

import { Pencil, Trash2 } from 'lucide-react';

export default function GradeTable({ grades, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold mb-6">Listado de Notas</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th>Estudiante</th>
            <th>Materia</th>
            <th>Nota</th>
            <th>Fecha</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((g) => (
            <tr key={g._id} className="border-b border-gray-800">
              <td>{g.student?.name}</td>
              <td>{g.subject?.name}</td>
              <td>{g.grade}</td>
              <td>{new Date(g.date).toLocaleDateString()}</td>
              <td className="text-right flex gap-3 justify-end">
                <button onClick={() => onEdit(g)}>
                  <Pencil size={18} className="text-yellow-400" />
                </button>
                <button onClick={() => onDelete(g._id)}>
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}