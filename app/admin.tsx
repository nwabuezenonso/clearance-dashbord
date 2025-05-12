import { useState } from "react";
// import { Student } from '../types';

const AdminDashboard = () => {
  const [students, setStudents] = useState<any[]>([
    {
      matricNumber: "12345",
      name: "John Doe",
      department: "Computer Science",
      status: "Pending Verification",
    },
    {
      matricNumber: "67890",
      name: "Jane Smith",
      department: "Mathematics",
      status: "Pending Verification",
    },
  ]);

  const handleVerify = (index: number) => {
    const updatedStudents = [...students];
    updatedStudents[index].status = "Verified";
    setStudents(updatedStudents);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="space-y-4">
          {students.map((student, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg">
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
              {student.status === "Pending Verification" && (
                <button
                  onClick={() => handleVerify(index)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Verify
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
