import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GuestList() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("All Guest");

  const [showAddGuestForm, setShowAddGuestForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    idNumber: "",
    orderDate: "",
    status: "Booked",
    checkIn: "",
    checkOut: "",
    room: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const fallbackGuests = [
    {
      id: 1,
      name: "Ann Culhane",
      idNumber: "5844325562",
      orderDate: "November 20th 09:00 AM",
      status: "Booked",
      checkIn: "02-12-2021",
      checkOut: "11-12-2021",
      room: "Family Room A-01",
    },
    {
      id: 2,
      name: "Ahmad Rosser",
      idNumber: "6844325562",
      orderDate: "November 30th 10:00 AM",
      status: "Booked",
      checkIn: "02-12-2021",
      checkOut: "11-12-2021",
      room: "Delux Room D-02",
    },
    {
      id: 3,
      name: "Corey Stanton",
      idNumber: "6944325562",
      orderDate: "November 20th 09:00 AM",
      status: "Canceled",
      checkIn: "02-12-2021",
      checkOut: "11-12-2021",
      room: "Family Room D-12",
    },
  ];

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/guests");
        setGuests(res.data);
      } catch (err) {
        console.error("API fetch failed, using fallback data.");
        setGuests(fallbackGuests);
        setError("Failed to load from backend, showing sample data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const statusColors = {
    Booked: "text-green-600 bg-green-100",
    Pending: "text-yellow-600 bg-yellow-100",
    Canceled: "text-red-600 bg-red-100",
    Refund: "text-blue-600 bg-blue-100",
  };

  const filteredGuests =
    activeTab === "All Guest"
      ? guests
      : guests.filter((g) => g.status === activeTab);

  const validateForm = () => {
    const errors = {};
    if (!newGuest.name) errors.name = "Name is required.";
    if (!newGuest.idNumber) errors.idNumber = "ID Number is required.";
    if (!newGuest.orderDate) errors.orderDate = "Order Date is required.";
    if (!newGuest.checkIn) errors.checkIn = "Check-in date is required.";
    if (!newGuest.checkOut) errors.checkOut = "Check-out date is required.";
    if (!newGuest.room) errors.room = "Room Type is required.";
    return errors;
  };

  const handleAddGuest = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newId = guests.length ? guests[guests.length - 1].id + 1 : 1;
    const guestToAdd = { ...newGuest, id: newId };

    setGuests([...guests, guestToAdd]);
    setNewGuest({
      name: "",
      idNumber: "",
      orderDate: "",
      status: "Booked",
      checkIn: "",
      checkOut: "",
      room: "",
    });
    setFormErrors({});
    setShowAddGuestForm(false);
    setActiveTab("Booked"); // Show in Booked tab
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500 text-lg">
        Loading Guest List...
      </div>
    );

  return (
    <div className="flex flex-col w-full p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Guest List</h1>
        <input
          type="text"
          placeholder="Search"
          className="border rounded-full px-4 py-2 text-sm w-56 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Bookings Summary */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-1">Bookings</h2>
        <p className="text-sm text-slate-500 mb-4">
          You have <span className="font-medium text-slate-700">{guests.length}</span> total guests
        </p>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-slate-200 mb-4">
          {["All Guest", "Booked", "Canceled", "Pending", "Refund"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setShowAddGuestForm(true)}
            className="ml-auto bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 text-sm"
          >
            + Add Guest
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-500 mb-3 italic">{error}</p>
        )}

        {/* Add Guest Form */}
        {showAddGuestForm && (
          <div className="bg-slate-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-md mb-3">Add New Guest</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border p-2 w-full rounded"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                />
                {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="ID Number"
                  className="border p-2 w-full rounded"
                  value={newGuest.idNumber}
                  onChange={(e) => setNewGuest({ ...newGuest, idNumber: e.target.value })}
                />
                {formErrors.idNumber && <p className="text-xs text-red-500">{formErrors.idNumber}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Order Date (e.g. October 22nd 09:00 AM)"
                  className="border p-2 w-full rounded"
                  value={newGuest.orderDate}
                  onChange={(e) => setNewGuest({ ...newGuest, orderDate: e.target.value })}
                />
                {formErrors.orderDate && <p className="text-xs text-red-500">{formErrors.orderDate}</p>}
              </div>
              <div>
                <select
                  className="border p-2 w-full rounded"
                  value={newGuest.status}
                  onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value })}
                >
                  <option>Booked</option>
                  <option>Pending</option>
                  <option>Canceled</option>
                  <option>Refund</option>
                </select>
              </div>
              <div>
                <input
                  type="date"
                  className="border p-2 w-full rounded"
                  value={newGuest.checkIn}
                  onChange={(e) => setNewGuest({ ...newGuest, checkIn: e.target.value })}
                />
                {formErrors.checkIn && <p className="text-xs text-red-500">{formErrors.checkIn}</p>}
              </div>
              <div>
                <input
                  type="date"
                  className="border p-2 w-full rounded"
                  value={newGuest.checkOut}
                  onChange={(e) => setNewGuest({ ...newGuest, checkOut: e.target.value })}
                />
                {formErrors.checkOut && <p className="text-xs text-red-500">{formErrors.checkOut}</p>}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Room Type"
                  className="border p-2 w-full rounded"
                  value={newGuest.room}
                  onChange={(e) => setNewGuest({ ...newGuest, room: e.target.value })}
                />
                {formErrors.room && <p className="text-xs text-red-500">{formErrors.room}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setShowAddGuestForm(false);
                  setFormErrors({});
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGuest}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b text-slate-600">
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Guest</th>
                <th className="py-2 px-3">Order Date</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Check-In</th>
                <th className="py-2 px-3">Check-Out</th>
                <th className="py-2 px-3">Room Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest, idx) => (
                <tr key={guest.id} className="border-b hover:bg-slate-50 transition">
                  <td className="py-2 px-3">{idx + 1}</td>
                  <td className="py-2 px-3">
                    <div>
                      <p className="font-medium">{guest.name}</p>
                      <p className="text-xs text-slate-500">{guest.idNumber}</p>
                    </div>
                  </td>
                  <td className="py-2 px-3">{guest.orderDate}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[guest.status]}`}
                    >
                      {guest.status}
                    </span>
                  </td>
                  <td className="py-2 px-3">{guest.checkIn}</td>
                  <td className="py-2 px-3">{guest.checkOut}</td>
                  <td className="py-2 px-3">{guest.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (static demo) */}
        <div className="flex justify-between items-center mt-4 text-xs text-slate-500">
          <span>1-10 of {filteredGuests.length}</span>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded hover:bg-slate-100">‹</button>
            <span>1 / 1</span>
            <button className="px-2 py-1 border rounded hover:bg-slate-100">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
