import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import "./AdminDashboard.css";
import HotelBed from '../../assets/bed.png';

interface DataItem {
  name: string;
  checkIn: number;
  checkOut: number;
}

const data: DataItem[] = [
  { name: "Monday", checkIn: 40, checkOut: 24 },
  { name: "Tuesday", checkIn: 30, checkOut: 13 },
  { name: "Wednesday", checkIn: 20, checkOut: 18 },
  { name: "Thursday", checkIn: 27, checkOut: 20 },
  { name: "Friday", checkIn: 18, checkOut: 32 },
  { name: "Saturday", checkIn: 23, checkOut: 10 },
  { name: "Sunday", checkIn: 34, checkOut: 22 }
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="title">
          Welcome Hotel, <span className="highlight">HotelEase</span>
        </h1>

        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-label">Total Guests</div>
            <div className="stat-value">8,751</div>
            <div className="bed"><img src={HotelBed} alt="hotel bed" /></div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Reservations</div>
            <div className="stat-value">8,751</div>
            <div className="bed"><img src={HotelBed} alt="hotel bed" /></div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Available Rooms</div>
            <div className="stat-value">751</div>
            <div className="bed"><img src={HotelBed} alt="hotel bed" /></div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Employees</div>
            <div className="stat-value">516</div>
            <div className="bed"><img src={HotelBed} alt="hotel bed" /></div>
          </div>
        </div>

        <div className="chart-section">
          <h3 className="chart-title">Reservation Stats</h3>
          <div className="chart-container">
            <BarChart
              width={1000}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="checkIn" fill="#3b82f6" name="Check In" />
              <Bar dataKey="checkOut" fill="#8b5cf6" name="Check Out" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
