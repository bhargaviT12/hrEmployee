import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HRDashboard from "./components/HRDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PersonApp from "./PersonApp";
import EmployeeDetails from "./headers/EmployeeDetails"; // ✅ Import new component

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Employee Dashboard */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <PersonApp />
            </ProtectedRoute>
          }
        />

        {/* HR Dashboard */}
        <Route
          path="/hr"
          element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Employee Details Page */}
        <Route
          path="/hr/employee/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
