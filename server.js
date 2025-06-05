
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
const admins = [
  { id: 1, ism: 'Ali', familiya: 'Valiyev', email: 'ali@mail.com', rol: 'manager', holat: 'faol' },
  { id: 2, ism: 'Olim', familiya: 'Xusanov', email: 'olim@mail.com', rol: 'manager', holat: 'nofaol' },
  { id: 3, ism: 'Zara', familiya: 'Olimova', email: 'zara@mail.com', rol: 'manager', holat: 'faol' },
  { id: 4, ism: 'Dilshod', familiya: 'Karimov', email: 'dilshod@mail.com', rol: 'manager', holat: 'faol' },
  { id: 5, ism: 'Nodira', familiya: 'Matmurodova', email: 'nodira@mail.com', rol: 'manager', holat: 'nofaol' },
  { id: 6, ism: 'Shoxrux', familiya: 'Rustamov', email: 'shoxrux@mail.com', rol: 'manager', holat: 'faol' },
  { id: 7, ism: 'Kamola', familiya: 'Usmonova', email: 'kamola@mail.com', rol: 'manager', holat: 'faol' },
  { id: 8, ism: 'Javlon', familiya: 'Xolmatov', email: 'javlon@mail.com', rol: 'manager', holat: 'nofaol' },
  { id: 9, ism: 'Diyor', familiya: 'Shamsiev', email: 'diyor@mail.com', rol: 'manager', holat: 'faol' },
  { id: 10, ism: 'Nargiza', familiya: 'To‘raeva', email: 'nargiza@mail.com', rol: 'manager', holat: 'faol' },
  { id: 11, ism: 'Bekzod', familiya: 'Jo‘rayev', email: 'bekzod@mail.com', rol: 'manager', holat: 'nofaol' },
  { id: 12, ism: 'Gulbahor', familiya: 'Eshmurodova', email: 'gulbahor@mail.com', rol: 'manager', holat: 'faol' },
  { id: 13, ism: 'Temur', familiya: 'Sobirov', email: 'temur@mail.com', rol: 'manager', holat: 'faol' },
  { id: 14, ism: 'Malika', familiya: 'Sodiqova', email: 'malika@mail.com', rol: 'manager', holat: 'nofaol' },
  { id: 15, ism: 'Rustam', familiya: 'Norboev', email: 'rustam@mail.com', rol: 'manager', holat: 'faol' },
];
const teachers = [
  { id: 1, ism: 'Davron01', familiya: 'Raimjonov', email: 'raimjonov03@mail.ru', fan: '', holat: 'faol' },
  { id: 2, ism: 'Davron01', familiya: 'Raimjonov', email: 'raimjonov04@mail.ru', fan: '', holat: 'faol' },
  { id: 3, ism: 'Shahriyor', familiya: 'Boyyyyyy', email: 'malikovshahriyor929@gmail.com', fan: '', holat: 'faol' },
  { id: 4, ism: 'Davron01', familiya: 'Raimjonov', email: 'raimjonov05@mail.ru', fan: '', holat: 'faol' },
  { id: 5, ism: 'Shahriyor', familiya: 'Malikov', email: 'malikovshahriyor9@gmail.com', fan: '', holat: "ishdan bo'shatilgan" },
  { id: 6, ism: 'Davron', familiya: 'Raimjonov', email: 'davron_raimjonov46@mail.ru', fan: '', holat: "ishdan bo'shatilgan" },
  { id: 7, ism: 'Alibek', familiya: 'Tursunboyev', email: 'alibekteacher@mail.ru', fan: '', holat: 'faol' },
  { id: 8, ism: 'Alibek', familiya: 'Tursunboyev', email: 'alibekgithub01@gmail.com', fan: '', holat: 'faol' },
  { id: 9, ism: 'Shahriyor', familiya: 'Malikov', email: 'malikovs@gmail.com', fan: '', holat: 'faol' },
  { id: 10, ism: 'Alibek', familiya: 'Tursunboyev', email: 'tursunboyevfrontend@gmail.com', fan: '', holat: 'faol' },
  { id: 11, ism: 'Abdulloh', familiya: 'Zokirov', email: 'abzakirov@mail.ru', fan: '', holat: 'faol' },
];

app.get('/api/staff/edited-admin', (req, res) => {
  res.json(admins);
});

app.get('/api/staff/edited-teacher', (req, res) => {
  res.json(teachers);
});

app.post('/api/staff/create-admin', (req, res) => {
  const yangiAdmin = req.body;
  yangiAdmin.id = admins.length + 1;
  admins.push(yangiAdmin);
  console.log('Yangi admin:', yangiAdmin);
  res.json({ message: "Yangi admin qabul qilindi", data: yangiAdmin });
});

app.post('/api/staff/create-teacher', (req, res) => {
  const yangiTeacher = req.body;
  yangiTeacher.id = teachers.length + 1;
  teachers.push(yangiTeacher);
  console.log('Yangi o\'qituvchi:', yangiTeacher);
  res.json({ message: "Yangi o'qituvchi qabul qilindi", data: yangiTeacher });
});

const PORT = 7070;
app.listen(PORT, () => {
  console.log(`Backend port ${PORT} da ishlayapti`);
});
