import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";




export default function Dashboard() {
  const data = [
    { name: "Monday", checkIn: 40, checkOut: 24 },
    { name: "Tuesday", checkIn: 30, checkOut: 13 },
    { name: "Wednesday", checkIn: 20, checkOut: 18 },
    { name: "Thursday", checkIn: 27, checkOut: 20 },
    { name: "Friday", checkIn: 18, checkOut: 32 },
    { name: "Saturday", checkIn: 23, checkOut: 10 },
    { name: "Sunday", checkIn: 34, checkOut: 22 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome Hotel, <span className="text-blue-600">HotelEase</span>
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Guests</div>
          <div className="text-2xl font-semibold">8,751</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Reservations</div>
          <div className="text-2xl font-semibold">8,751</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Available Rooms</div>
          <div className="text-2xl font-semibold">751</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Employees</div>
          <div className="text-2xl font-semibold">516</div>
        </div>
      </div>

      {/* ✅ Chart Section */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="mb-4 font-semibold text-lg">Reservation Stats</h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="checkIn" fill="#3b82f6" name="Check In" />
              <Bar dataKey="checkOut" fill="#8b5cf6" name="Check Out" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
