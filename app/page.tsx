"use client";

import { useState } from "react";
import { AlertCircle, Book, CheckCircle, FileText, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginType, setLoginType] = useState("student");

  const handleLoginClick = (type: any) => {
    setLoginType(type);
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">Paul University Awka</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleLoginClick("student")}
              className="px-4 py-2 bg-white text-purple-800 font-medium rounded hover:bg-purple-100 flex items-center"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Student Login
            </button>
            <button
              onClick={() => handleLoginClick("admin")}
              className="px-4 py-2 bg-purple-900 text-white font-medium rounded hover:bg-purple-700 flex items-center"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Online Clearance System</h2>
          <p className="text-xl mb-8">Streamlining the clearance process for final year students</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleLoginClick("student")}
              className="px-6 py-3 bg-white text-purple-700 font-bold rounded hover:bg-purple-50"
            >
              Get Started
            </button>
            <button>
              <Link href="#learn-more">
                <span className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded hover:bg-purple-600">
                  Learn More
                </span>
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="learn-more" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium text-center mb-12">System Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-purple-600 mb-4">
                <FileText className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Clearance Forms</h3>
              <p className="text-gray-600">
                Complete your clearance forms online without the need for paper documentation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-purple-600 mb-4">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Status Updates</h3>
              <p className="text-gray-600">
                Track your clearance progress and receive notifications at every step.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-purple-600 mb-4">
                <AlertCircle className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">Automated Verification</h3>
              <p className="text-gray-600">
                Quick verification of eligibility status and document authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-medium text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-8 p-4 bg-white rounded-lg shadow">
              <div className="bg-purple-100 rounded-full p-4 text-purple-700 mb-4 md:mb-0 md:mr-6">
                <UserPlus className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Step 1: Register on the Platform</h3>
                <p className="text-gray-600">
                  Create an account using your university credentials.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-8 p-4 bg-white rounded-lg shadow">
              <div className="bg-purple-100 rounded-full p-4 text-purple-700 mb-4 md:mb-0 md:mr-6">
                <FileText className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Step 2: Fill Out Digital Clearance Form</h3>
                <p className="text-gray-600">
                  Complete all required information and upload necessary documents.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-8 p-4 bg-white rounded-lg shadow">
              <div className="bg-purple-100 rounded-full p-4 text-purple-700 mb-4 md:mb-0 md:mr-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Step 3: Verification Process</h3>
                <p className="text-gray-600">
                  Administrators verify your submission and update your clearance status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-bold flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Paul University Awka
              </p>
              <p className="text-sm">Online Clearance System Demo</p>
            </div>
            <div className="text-sm">
              <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black opacity-70 absolute top-0 h-full w-full"></div>
          <div className="bg-white rounded-lg p-8 max-w-md w-full border border-black absolute z-10">
            <h2 className="text-2xl font-bold mb-6">
              {loginType === "student" ? "Student Login" : "Administrator Login"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">
                  {loginType === "student" ? "Matric Number" : "Admin ID"}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder={
                    loginType === "student" ? "Enter your matric number" : "Enter your admin ID"
                  }
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                  onClick={() => setShowLoginModal(false)}
                >
                  Cancel
                </button>
                <Link href={loginType === "student" ? "/dashboard/student" : "/dashboard/admin"}>
                  <span className="px-4 py-2 bg-purple-700 text-white rounded">Login</span>
                </Link>
              </div>
            </form>
            <div className="mt-4 text-center">
              {loginType === "student" && (
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link href="/register">
                    <span className="text-purple-600 hover:underline">Register here</span>
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
