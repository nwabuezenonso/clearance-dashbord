import { useState } from "react";
// import { Student } from '../types';

const Register = () => {
  const [students, setStudents] = useState<any>([]);
  const [form, setForm] = useState({ matricNumber: "", name: "", department: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudents([...students, { ...form, status: "Pending Verification" }]);
    setForm({ matricNumber: "", name: "", department: "" });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Student Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="matricNumber" className="block text-sm font-medium">
              Matric Number
            </label>
            <input
              type="text"
              name="matricNumber"
              id="matricNumber"
              value={form.matricNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium">
              Department
            </label>
            <input
              type="text"
              name="department"
              id="department"
              value={form.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
            Register
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Registered Students</h2>
          <ul className="space-y-2">
            {students.map((student: any, index: any) => (
              <li key={index} className="bg-gray-200 p-4 rounded-lg">
                <p>
                  <strong>Name:</strong> {student.name}
                </p>
                <p>
                  <strong>Matric Number:</strong> {student.matricNumber}
                </p>
                <p>
                  <strong>Department:</strong> {student.department}
                </p>
                <p>
                  <strong>Status:</strong> {student.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
