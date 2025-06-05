interface Teachers {
  id: number;
  ism: string;
  familiya: string;
  email: string;
  fan: string;
  holat: string;
}

const [teachers, setTeachers] = useState<Teachers[]>([]);
