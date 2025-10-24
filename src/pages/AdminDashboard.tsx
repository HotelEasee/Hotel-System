import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p>This page will contain admin panel functionality for managing hotels and reservations.</p>
        <Link to="/hotels" className="btn btn-primary">View Hotels</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

