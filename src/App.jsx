import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import Settings from "./pages/Settings";
import GuestList from "./pages/GuestList";
import RoomList from "./pages/RoomList";
import GuestDetails from "./pages/GuestDetails";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


export default function App() {
  const location = useLocation();
  const currentUser = localStorage.getItem("currentUser");

  // If not logged in → show only login
  if (!currentUser && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // If logged in → show dashboard layout
  if (location.pathname === "/login") {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/guests" element={<GuestList />} />
          <Route path="/guests/:id" element={<GuestDetails />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
         

        </Routes>
      </main>
    </div>
  );
}
