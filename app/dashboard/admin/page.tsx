"use client";

import { useState } from "react";
import {
  Book,
  CheckCircle,
  ChevronDown,
  Clock,
  FileText,
  Home,
  LogOut,
  Search,
  Settings,
  User,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const pendingClearances = [
  {
    id: 1,
    studentName: "John Doe",
    matricNumber: "PUA/CSC/19/00001",
    department: "Computer Science",
    submittedDate: "2025-02-15",
    status: "pending",
    documents: ["Fee Receipt", "Library Clearance", "Department Clearance"],
  },
  {
    id: 2,
    studentName: "Jane Smith",
    matricNumber: "PUA/CSC/19/00023",
    department: "Computer Science",
    submittedDate: "2025-02-16",
    status: "pending",
    documents: ["Fee Receipt", "Library Clearance"],
  },
  {
    id: 3,
    studentName: "Michael Johnson",
    matricNumber: "PUA/BUS/19/00045",
    department: "Business Administration",
    submittedDate: "2025-02-14",
    status: "pending",
    documents: ["Fee Receipt", "Department Clearance"],
  },
];

const recentlyApproved = [
  {
    id: 101,
    studentName: "David Wilson",
    matricNumber: "PUA/CSC/19/00010",
    department: "Computer Science",
    approvedDate: "2025-02-12",
  },
  {
    id: 102,
    studentName: "Sarah Thompson",
    matricNumber: "PUA/ENG/19/00015",
    department: "Engineering",
    approvedDate: "2025-02-10",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [action, setAction] = useState("");

  const handleStudentExpand = (id: any) => {
    setExpandedStudent(expandedStudent === id ? null : id);
  };

  const handleApproveReject = (id: any, actionType: any) => {
    setSelectedStudentId(id);
    setAction(actionType);
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    // In a real application, this would call an API to update the database
    console.log(
      `${action === "approve" ? "Approved" : "Rejected"} student ID: ${selectedStudentId}`
    );
    setShowConfirmation(false);
  };

  const filteredClearances = pendingClearances.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="bg-purple-700 text-white w-64 flex-shrink-0 hidden md:block fixed h-screen">
        <div className="p-4 flex items-center">
          <Book className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Paul University</h1>
        </div>
        <div className="px-4 py-2">
          <p className="text-sm opacity-70">Admin Portal</p>
          <p className="font-medium">Admin User</p>
        </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "dashboard" ? "bg-purple-300" : "hover:bg-purple-300"
            }`}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "students" ? "bg-purple-300" : "hover:bg-purple-300"
            }`}
          >
            <Users className="h-5 w-5 mr-3" />
            Manage Students
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "reports" ? "bg-purple-300" : "hover:bg-purple-300"
            }`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Reports
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "settings" ? "bg-purple-300" : "hover:bg-purple-300"
            }`}
          >
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Link href="/">
            <span className="flex items-center text-white hover:underline">
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-purple-700 text-white p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center">
        <div className="flex items-center">
          <Book className="h-6 w-6 mr-2" />
          <h1 className="text-lg font-bold">Paul University</h1>
        </div>
        <button className="p-1">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 md:mt-0 mt-16 pb-16">
        <div className="p-6">
          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Clearances</p>
                      <p className="text-3xl font-bold">{pendingClearances.length}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Approved This Week</p>
                      <p className="text-3xl font-bold">{recentlyApproved.length}</p>
                    </div>
                    <div className="bg-green-100 text-green-700 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Students</p>
                      <p className="text-3xl font-bold">125</p>
                    </div>
                    <div className="bg-purple-100 text-purple-700 p-3 rounded-full">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Clearances */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Pending Clearance Requests</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {filteredClearances.length === 0 ? (
                  <p className="text-gray-500">No pending requests match your search criteria.</p>
                ) : (
                  <div className="space-y-3">
                    {filteredClearances.map((student) => (
                      <div key={student.id} className="border rounded-lg overflow-hidden">
                        <div
                          className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => handleStudentExpand(student.id)}
                        >
                          <div className="flex items-center">
                            <div className="bg-blue-100 rounded-full p-2 mr-3">
                              <User className="h-5 w-5 text-blue-700" />
                            </div>
                            <div>
                              <h4 className="font-medium">{student.studentName}</h4>
                              <p className="text-sm text-gray-500">
                                {student.matricNumber} • {student.department}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-2 py-1 mr-3 bg-yellow-100 text-yellow-700 text-sm rounded">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </span>
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${
                                expandedStudent === student.id ? "transform rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>

                        {expandedStudent === student.id && (
                          <div className="p-4 border-t bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm font-medium text-gray-500">Submitted Date</p>
                                <p>{student.submittedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-500">
                                  Documents Submitted
                                </p>
                                <ul className="list-disc list-inside">
                                  {student.documents.map((doc, idx) => (
                                    <li key={idx} className="text-sm">
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleApproveReject(student.id, "approve")}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleApproveReject(student.id, "reject")}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </button>
                              <Link href={`/admin/student/${student.id}`}>
                                <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                  View Details
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recently Approved */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Recently Approved Clearances</h3>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Student Name</th>
                      <th className="py-3 text-left">Matric Number</th>
                      <th className="py-3 text-left">Department</th>
                      <th className="py-3 text-left">Approved Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentlyApproved.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="py-3">{student.studentName}</td>
                        <td className="py-3">{student.matricNumber}</td>
                        <td className="py-3">{student.department}</td>
                        <td className="py-3">{student.approvedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Students Management Content */}
          {activeTab === "students" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Manage Students</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">All Students</h3>
                  <div className="flex space-x-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search students..."
                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg"
                      />
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="">Filter by Department</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="business-admin">Business Administration</option>
                      <option value="engineering">Engineering</option>
                    </select>
                  </div>
                </div>

                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Name</th>
                      <th className="py-3 text-left">Matric Number</th>
                      <th className="py-3 text-left">Department</th>
                      <th className="py-3 text-left">Status</th>
                      <th className="py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">John Doe</td>
                      <td className="py-3">PUA/CSC/19/00001</td>
                      <td className="py-3">Computer Science</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-sm rounded">
                          Pending
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <Link href="#">
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                              View
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Jane Smith</td>
                      <td className="py-3">PUA/CSC/19/00023</td>
                      <td className="py-3">Computer Science</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-sm rounded">
                          Pending
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <Link href="#">
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                              View
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">David Wilson</td>
                      <td className="py-3">PUA/CSC/19/00010</td>
                      <td className="py-3">Computer Science</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                          Approved
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <Link href="#">
                            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                              View
                            </span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500">Showing 1 to 3 of 125 entries</p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Reports Content */}
          {activeTab === "reports" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Reports & Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4">Clearance Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Approved</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Pending</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-yellow-500 rounded-full"
                          style={{ width: "35%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Rejected</span>
                        <span className="font-medium">8%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: "8%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Not Started</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-gray-500 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold mb-4">Department Breakdown</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Computer Science</span>
                        <span className="font-medium">45 students</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: "36%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Business Administration</span>
                        <span className="font-medium">38 students</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Engineering</span>
                        <span className="font-medium">25 students</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Other Departments</span>
                        <span className="font-medium">17 students</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: "14%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Generate Reports</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                    <h4 className="font-medium mb-2">Clearance Status Report</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Generate a detailed report of all students' clearance status
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Generate Report
                    </button>
                  </div>
                  <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                    <h4 className="font-medium mb-2">Department Report</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Report on clearance progress by department
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Generate Report
                    </button>
                  </div>
                  <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                    <h4 className="font-medium mb-2">NYSC Eligibility Report</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      List of students eligible for NYSC with clearance status
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Generate Report
                    </button>
                  </div>
                  <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
                    <h4 className="font-medium mb-2">Custom Report</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Create a customized report with specific parameters
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Create Custom Report
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Settings Content */}
          {activeTab === "settings" && (
            <>
              <h2 className="text-2xl font-bold mb-6">System Settings</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Admin Account</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="admin@pauluniversity.edu.ng"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                  >
                    Update Profile
                  </button>
                </form>

                <hr className="my-6" />

                <h3 className="text-lg font-bold mb-4">Change Password</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
