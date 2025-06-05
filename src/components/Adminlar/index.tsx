import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Search, X } from 'lucide-react';

interface Admin {
  id: number;
  ism: string;
  familiya: string;
  email: string;
  holat: string;
}

const Adminlar: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    ism: '',
    familiya: '',
    email: '',
    parol: '',
    holat: 'faol',
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

const getAdmins = async () => {
  try {
    const res = await axios.get('http://localhost:7070/api/staff/edited-admin');
    console.log('Adminlar:', res.data);
    setAdmins(res.data);
    setFilteredAdmins(res.data);
  } catch (error) {
    console.error('Adminlarni olishda xatolik:', error);
  }
};

  useEffect(() => {
    getAdmins();
  }, []);

  useEffect(() => {
    const filtered = admins.filter((admin) => {
      const fullName = (admin.ism + ' ' + admin.familiya).toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? admin.holat === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
    setFilteredAdmins(filtered);
  }, [searchTerm, statusFilter, admins]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7070/api/staff/create-admin', formData);
      setFormData({ ism: '', familiya: '', email: '', parol: '', holat: 'faol' });
      setShowModal(false);
      getAdmins();
    } catch (error) {
      console.error('Admin qo‘shishda xatolik:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  return (
    <div className="text-white relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Adminlar sahifasi</h2>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Search
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              className="pl-8 pr-4 py-2 rounded bg-neutral-800 text-white w-24"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            className="flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-4 py-2 rounded"
            onClick={() => setShowModal(true)}
          >
            <span className="text-xl">+</span> <span>Admin qo‘shish</span>
          </button>

          <select
            className="px-3 py-2 rounded bg-neutral-800 text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Barchasi</option>
            <option value="faol">Faol</option>
            <option value="nofaol">Nofaol</option>
          </select>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-[1111]">
          <div
            ref={modalRef}
            className="bg-neutral-900 p-6 rounded-lg shadow-xl w-full max-w-lg relative"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-white">
              Yangi admin qo‘shish
            </h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="ism"
                  value={formData.ism}
                  onChange={handleInputChange}
                  placeholder="Ism"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <input
                  name="familiya"
                  value={formData.familiya}
                  onChange={handleInputChange}
                  placeholder="Familiya"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <input
                  name="parol"
                  value={formData.parol}
                  onChange={handleInputChange}
                  placeholder="Parol"
                  type="password"
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none"
                />
                <select
                  name="holat"
                  value={formData.holat}
                  onChange={handleInputChange}
                  className="p-2 bg-neutral-800 rounded w-full text-white focus:outline-none col-span-2"
                >
                  <option value="faol">Faol</option>
                  <option value="nofaol">Nofaol</option>
                </select>
              </div>

         <button
  type="submit"
  className="
    w-full 
    bg-blue-600 
    hover:bg-blue-700 
    active:scale-95 
    active:bg-blue-800 
    transition 
    duration-150 
    ease-in-out
    px-4 py-2 
    rounded 
    text-white
    focus:outline-none
    focus:ring-2 
    focus:ring-blue-400
    focus:ring-opacity-50
  "
>
  Qo‘shish
</button>

            </form>
          </div>
        </div>
      )}

      <table className="w-full bg-neutral-900 rounded overflow-hidden">
        <thead>
          <tr className="bg-neutral-800 text-left">
            <th className="p-3">#</th>
            <th className="p-3">Ism</th>
            <th className="p-3">Familiya</th>
            <th className="p-3">Email</th>
            <th className="p-3">Holat</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin, index) => (
            <tr
              key={admin.id}
              className="border-t border-neutral-700 hover:bg-neutral-800 transition"
            >
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{admin.ism}</td>
              <td className="p-3">{admin.familiya}</td>
              <td className="p-3">{admin.email}</td>
              <td className="p-3 capitalize">{admin.holat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminlar;
