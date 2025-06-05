import React, { useState } from 'react';
import { FaClock, FaUsers, FaPen } from 'react-icons/fa';

interface Course {
  id: number;
  name: string;
  price: string;
  description: string;
  duration: string;
  students: number;
}

const initialCourses: Course[] = [
  { id: 1, name: "Flutter dasturlash", price: "12,000 UZS", description: "yangi kurs", duration: "8 oy", students: 15 },
  { id: 2, name: "IOS", price: "3,300,000 UZS", description: "yangi kurs", duration: "4 yil", students: 15 },
  { id: 3, name: "Informatika", price: "1,000,000 UZS", description: "pulini tolab o'qishga qoshil", duration: "8 oy", students: 15 },
  { id: 4, name: "Android", price: "2,000,009 UZS", description: "yangi kurs", duration: "7 oy", students: 15 },
  { id: 5, name: "SMM", price: "22,000,000 UZS", description: "kunlik", duration: "8 oy", students: 15 },
];

const KurslarPage = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<Course, 'id' | 'students'>>({
    name: '',
    price: '',
    description: '',
    duration: '',
  });

  const handleAddCourse = () => {
    if (!form.name || !form.price) return;

    const newCourse: Course = {
      id: Date.now(),
      students: 0,
      ...form,
    };

    setCourses(prev => [newCourse, ...prev]);
    setForm({ name: '', price: '', description: '', duration: '' });
    setShowModal(false);
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kurslar</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          + Kurs Qo'shish
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-zinc-900 p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{course.name}</h2>
              <span className="bg-zinc-800 text-white text-sm font-semibold px-3 py-1 rounded-full">{course.price}</span>
            </div>
            <p className="text-gray-400 mb-4">{course.description}</p>
            <div className="flex items-center gap-2 text-sm mb-1">
              <FaClock /> <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-4">
              <FaUsers /> <span>{course.students} students</span>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 border border-gray-400 text-white px-3 py-1 rounded hover:bg-white hover:text-black text-sm">
                <FaPen /> Edit
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                O'chirish
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                Muzlatish
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Yangi Kurs Qo'shish</h2>
            <input
              type="text"
              placeholder="Nomi"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded bg-zinc-700 text-white"
            />
            <input
              type="text"
              placeholder="Narxi"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded bg-zinc-700 text-white"
            />
            <input
              type="text"
              placeholder="Tavsifi"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded bg-zinc-700 text-white"
            />
            <input
              type="text"
              placeholder="Davomiyligi"
              value={form.duration}
              onChange={e => setForm({ ...form, duration: e.target.value })}
              className="w-full mb-4 px-3 py-2 rounded bg-zinc-700 text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleAddCourse}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Qo'shish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KurslarPage;
