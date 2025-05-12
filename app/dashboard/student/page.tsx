"use client";

import { useState } from "react";
import {
  AlertCircle,
  Book,
  CheckCircle,
  FileText,
  Home,
  LogOut,
  Settings,
  Upload,
  User,
  XCircle,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const studentData = {
  name: "John Doe",
  matricNumber: "PUA/CSC/19/00001",
  department: "Computer Science",
  level: "400",
  clearanceStatus: "Completed", // Changed to "Completed" for demonstration
  completedSteps: [
    { id: 1, name: "Profile Verification", status: "completed", date: "2025-02-15" },
    { id: 2, name: "Fee Verification", status: "completed", date: "2025-02-20" },
    { id: 3, name: "Library Clearance", status: "completed", date: "2025-03-05" }, // Changed to completed
    { id: 4, name: "Department Clearance", status: "completed", date: "2025-03-10" }, // Changed to completed
    { id: 5, name: "Final Clearance", status: "completed", date: "2025-03-15" }, // Changed to completed
  ],
  notifications: [
    {
      id: 1,
      message: "Your profile has been verified successfully.",
      date: "2025-02-15",
      read: true,
    },
    { id: 2, message: "Fee verification has been completed.", date: "2025-02-20", read: true },
    {
      id: 3,
      message: "Library clearance has been approved.",
      date: "2025-03-05",
      read: true,
    },
    {
      id: 4,
      message: "Department clearance has been approved.",
      date: "2025-03-10",
      read: true,
    },
    {
      id: 5,
      message: "Congratulations! Your clearance process is now complete.",
      date: "2025-03-15",
      read: false,
    },
  ],
};

// New component for clearance completion message
const ClearanceCompletionMessage = ({ onClose }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <PartyPopper className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-center mb-2">Congratulations!</h3>
        <p className="text-gray-700 text-center mb-6">
          Your clearance process has been successfully completed. You are now fully cleared for
          graduation!
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Next Steps:</strong>
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Check your university email for your graduation ceremony details</li>
            <li>Download your clearance certificate from the documents section</li>
            <li>Contact the registrar's office to confirm your certificate collection date</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCompletionMessage, setShowCompletionMessage] = useState(
    studentData.clearanceStatus === "Completed"
  );

  const handleFileUpload = () => {
    setIsUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      }
    }, 300);
  };

  // Check if all clearance steps are completed
  const allStepsCompleted = studentData.completedSteps.every((step) => step.status === "completed");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Show completion message if clearance is completed */}
      {showCompletionMessage && allStepsCompleted && (
        <ClearanceCompletionMessage onClose={() => setShowCompletionMessage(false)} />
      )}

      {/* Sidebar */}
      <div className="bg-purple-700 text-white w-64 flex-shrink-0 hidden md:block h-screen fixed">
        <div className="p-4 flex items-center">
          <Book className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Paul University</h1>
        </div>
        <div className="px-4 py-2">
          <p className="text-sm opacity-70">Student Portal</p>
          <p className="font-medium">{studentData.name}</p>
          <p className="text-sm opacity-70">{studentData.matricNumber}</p>
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
            onClick={() => setActiveTab("profile")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "profile" ? "bg-purple-300" : "hover:bg-purple-300"
            }`}
          >
            <User className="h-5 w-5 mr-3" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "documents" ? "bg-purple-300" : "hover:bg-purple-300"
            }`}
          >
            <FileText className="h-5 w-5 mr-3" />
            Documents
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
      <div className="flex-1 md:mt-0 mt-16 pb-16 overflow-y-scroll md:ml-64">
        <div className="p-6">
          {/* Dashboard Content */}
          {activeTab === "dashboard" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

              {/* Status Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-2">Clearance Status</h3>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      studentData.clearanceStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : studentData.clearanceStatus === "In Progress"
                        ? "bg-blue-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {studentData.clearanceStatus === "Completed" ? (
                      <CheckCircle className="h-4 w-4 mr-1" />
                    ) : studentData.clearanceStatus === "In Progress" ? (
                      <AlertCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1" />
                    )}
                    {studentData.clearanceStatus}
                  </span>
                </div>

                {/* Clearance completion summary card - only shown when clearance is completed */}
                {studentData.clearanceStatus === "Completed" && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">Clearance Complete!</h4>
                        <p className="text-sm text-green-700 mt-1">
                          You have successfully completed all clearance requirements. Your clearance
                          certificate is now available in the documents section.
                        </p>
                        <button
                          onClick={() => setActiveTab("documents")}
                          className="mt-2 text-sm text-green-700 font-medium hover:underline flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Tracker */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Clearance Progress</h3>
                <div className="space-y-4">
                  {studentData.completedSteps.map((step) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          step.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : step.status === "pending"
                            ? "bg-gray-100 text-gray-400"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step.status === "pending" ? (
                          <span className="h-3 w-3 rounded-full bg-gray-300"></span>
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{step.name}</p>
                          {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                        </div>
                        <div className="mt-1">
                          {step.status === "pending" && (
                            <span className="text-sm text-gray-500">Awaiting verification</span>
                          )}
                          {step.status === "completed" && (
                            <span className="text-sm text-green-600">Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Recent Notifications</h3>
                {studentData.notifications.length === 0 ? (
                  <p className="text-gray-500">No new notifications</p>
                ) : (
                  <div className="space-y-3">
                    {studentData.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-l-4 ${
                          notification.read
                            ? "border-gray-300 bg-gray-50"
                            : "border-blue-500 bg-blue-50"
                        }`}
                      >
                        <p>{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{notification.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Profile Content */}
          {activeTab === "profile" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Student Profile</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 text-blue-700 rounded-full p-4">
                    <User className="h-12 w-12" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold">{studentData.name}</h3>
                    <p className="text-gray-500">{studentData.matricNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p>{studentData.department}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Level</p>
                    <p>{studentData.level}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>john.doe@pauluniversity.edu.ng</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>+234 801 234 5678</p>
                  </div>
                </div>
                <button className="mt-6 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600">
                  Edit Profile
                </button>
              </div>
            </>
          )}

          {/* Documents Content */}
          {activeTab === "documents" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Documents</h2>

              {/* Clearance Certificate - only shown when clearance is completed */}
              {studentData.clearanceStatus === "Completed" && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2 border-green-500">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-bold text-green-700">Clearance Certificate</h3>
                        <p className="text-sm text-gray-600">
                          Generated on {studentData.completedSteps[4].date}
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              )}

              {/* Required Documents */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Required Documents</h3>
                <div className="space-y-4">
                  {studentData.clearanceStatus !== "Completed" ? (
                    <>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Library Clearance Form</h4>
                            <p className="text-sm text-gray-500">
                              Upload your signed library clearance form
                            </p>
                          </div>
                          <div>
                            <button
                              onClick={handleFileUpload}
                              className="flex items-center px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </button>
                          </div>
                        </div>
                        {isUploading && (
                          <div className="mt-3">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Uploading... {uploadProgress}%
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">Department Clearance Form</h4>
                            <p className="text-sm text-gray-500">
                              Upload your signed department clearance form
                            </p>
                          </div>
                          <div>
                            <button className="flex items-center px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-600">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">All Required Documents</h4>
                          <p className="text-sm text-gray-500">
                            All required documents have been submitted and verified
                          </p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Fee Receipt</h4>
                        <p className="text-sm text-gray-500">School fee payment receipt</p>
                      </div>
                      <div>
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4">Your Uploaded Documents</h3>
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Document</th>
                      <th className="py-3 text-left">Date Uploaded</th>
                      <th className="py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3">Fee Receipt</td>
                      <td className="py-3">2025-02-10</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3">Student ID Card Copy</td>
                      <td className="py-3">2025-02-10</td>
                      <td className="py-3">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </span>
                      </td>
                    </tr>
                    {studentData.clearanceStatus === "Completed" && (
                      <>
                        <tr className="border-b">
                          <td className="py-3">Library Clearance Form</td>
                          <td className="py-3">2025-03-05</td>
                          <td className="py-3">
                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Department Clearance Form</td>
                          <td className="py-3">2025-03-10</td>
                          <td className="py-3">
                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Settings Content */}
          {activeTab === "settings" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
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

                <hr className="my-6" />

                <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      className="h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="email-notifications" className="ml-2">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sms-notifications"
                      className="h-4 w-4"
                      defaultChecked
                    />
                    <label htmlFor="sms-notifications" className="ml-2">
                      SMS Notifications
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
                >
                  Save Preferences
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
