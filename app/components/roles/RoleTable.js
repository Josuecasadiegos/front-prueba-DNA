'use client';

import { Pencil, Trash2 } from 'lucide-react';

export default function RoleTable({ roles, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-semibold mb-6">Listado de Roles</h2>

      {roles.length === 0 ? (
        <p className="text-gray-400">No hay roles registrados</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="pb-3">Nombre</th>
              <th className="pb-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role._id}
                className="border-b border-gray-800 hover:bg-gray-800 transition"
              >
                <td className="py-3">{role.name}</td>
                <td className="py-3 text-right flex justify-end gap-4">
                  <button
                    onClick={() => onEdit(role)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(role._id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={18} />
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