import React, { useState, useEffect, useRef } from 'react';

interface Admin {
  id: number;
  ism: string;
  familiya: string;
  email: string;
  rol: string;
  holat: string;
}

const AdminlarPage: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Admin | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:7070/api/staff/edited-admin');
        if (!response.ok) throw new Error(`HTTP xatosi! Status: ${response.status}`);
        const data: Admin[] = await response.json();
        setAdmins(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openEditModal = (admin: Admin) => {
    setEditData(admin);
    setIsEditModalOpen(true);
    setOpenMenuId(null);
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setEditData(null);
  };

  const saveEdit = () => {
    if (!editData) return;
    setAdmins((prev) => prev.map((a) => (a.id === editData.id ? editData : a)));
    setIsEditModalOpen(false);
    setEditData(null);
  };

  const deleteAdmin = (id: number) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setOpenMenuId(null);
  };

  if (loading) return <div className="p-6 text-white bg-gray-900">Yuklanmoqda...</div>;
  if (error) return <div className="p-6 text-red-500 bg-gray-900">Xato: {error}</div>;

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-6">Adminlar ro'yxati</h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-[800px] w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-300 uppercase text-sm">
              <th className="py-3 px-4 text-left">Ism</th>
              <th className="py-3 px-4 text-left">Familiya</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Rol</th>
              <th className="py-3 px-4 text-left">Holat</th>
              <th className="py-3 px-4 text-center">Amallar</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm">
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-3 px-4">{admin.ism}</td>
                <td className="py-3 px-4">{admin.familiya}</td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">{admin.rol}</td>
                <td className="py-3 px-4">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${
                      admin.holat === 'faol' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {admin.holat}
                  </span>
                </td>
                <td className="py-3 px-4 text-center relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === admin.id ? null : admin.id)}
                    className="text-white hover:text-gray-400"
                  >
                    ...
                  </button>
                  {openMenuId === admin.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-32 bg-gray-900 rounded shadow-lg z-50"
                    >
                      <button
                        onClick={() => openEditModal(admin)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => deleteAdmin(admin.id)}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-700"
                      >
                        O'chirish
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">Tahrirlash</h3>
            {['ism', 'familiya', 'email', 'rol', 'holat'].map((field) => (
              <div key={field}>
                <label className="block text-gray-300 capitalize mb-1">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  value={(editData as any)[field]}
                  onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                  className="w-full mb-3 p-2 rounded bg-gray-700 text-white focus:outline-none"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminlarPage;
