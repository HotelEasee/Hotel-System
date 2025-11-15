import { useState, useEffect } from "react";
import axios from "axios";
import "./GuestList.css";

interface Guest {
  id: number;
  name: string;
  idNumber: string;
  orderDate: string;
  status: "Booked" | "Pending" | "Canceled" | "Refund";
  checkIn: string;
  checkOut: string;
  room: string;
}

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All Guest");

  const [showAddGuestForm, setShowAddGuestForm] = useState(false);
  const [newGuest, setNewGuest] = useState<Omit<Guest, "id">>({
    name: "",
    idNumber: "",
    orderDate: "",
    status: "Booked",
    checkIn: "",
    checkOut: "",
    room: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const fallbackGuests: Guest[] = [
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
        const res = await axios.get<Guest[]>("http://localhost:5000/api/guests");
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

  const filteredGuests =
    activeTab === "All Guest"
      ? guests
      : guests.filter((g) => g.status === activeTab);

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};
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
    const guestToAdd: Guest = { ...newGuest, id: newId };

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
      <div className="loading-text">
        Loading Guest List...
      </div>
    );

  return (
    <div className="guest-list-wrapper">
      {/* Header */}
      <div className="guest-header">
        <h1>Guest List</h1>
        <input
          type="text"
          placeholder="Search"
          className="guest-search-input"
        />
      </div>

      {/* Bookings Summary */}
      <div className="bookings-summary">
        <h2>Bookings</h2>
        <p>You have <span className="guest-count">{guests.length}</span> total guests</p>

        {/* Tabs */}
        <div className="tabs">
          {["All Guest", "Booked", "Canceled", "Pending", "Refund"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setShowAddGuestForm(true)}
            className="add-guest-button"
          >
            + Add Guest
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="error-message">{error}</p>
        )}

        {/* Add Guest Form */}
        {showAddGuestForm && (
          <div className="add-guest-form">
            <h3>Add New Guest</h3>
            <div className="form-grid">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-input"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                />
                {formErrors.name && <p className="form-error">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="ID Number"
                  className="form-input"
                  value={newGuest.idNumber}
                  onChange={(e) => setNewGuest({ ...newGuest, idNumber: e.target.value })}
                />
                {formErrors.idNumber && <p className="form-error">{formErrors.idNumber}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Order Date (e.g. October 22nd 09:00 AM)"
                  className="form-input"
                  value={newGuest.orderDate}
                  onChange={(e) => setNewGuest({ ...newGuest, orderDate: e.target.value })}
                />
                {formErrors.orderDate && <p className="form-error">{formErrors.orderDate}</p>}
              </div>
              <div>
                <select
                  className="form-input"
                  value={newGuest.status}
                  onChange={(e) => setNewGuest({ ...newGuest, status: e.target.value as Guest["status"] })}
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
                  className="form-input"
                  value={newGuest.checkIn}
                  onChange={(e) => setNewGuest({ ...newGuest, checkIn: e.target.value })}
                />
                {formErrors.checkIn && <p className="form-error">{formErrors.checkIn}</p>}
              </div>
              <div>
                <input
                  type="date"
                  className="form-input"
                  value={newGuest.checkOut}
                  onChange={(e) => setNewGuest({ ...newGuest, checkOut: e.target.value })}
                />
                {formErrors.checkOut && <p className="form-error">{formErrors.checkOut}</p>}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Room Type"
                  className="form-input"
                  value={newGuest.room}
                  onChange={(e) => setNewGuest({ ...newGuest, room: e.target.value })}
                />
                {formErrors.room && <p className="form-error">{formErrors.room}</p>}
              </div>
            </div>
            <div className="form-actions">
              <button
                onClick={() => {
                  setShowAddGuestForm(false);
                  setFormErrors({});
                }}
                className="button cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGuest}
                className="button save-button"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="table-wrapper">
          <table className="guest-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Guest</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Room Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest, idx) => (
                <tr key={guest.id} className="table-row">
                  <td>{idx + 1}</td>
                  <td>
                    <div>
                      <p className="font-medium">{guest.name}</p>
                      <p className="text-muted">{guest.idNumber}</p>
                    </div>
                  </td>
                  <td>{guest.orderDate}</td>
                  <td>
                    <span className={`status-badge ${guest.status.toLowerCase()}`}>
                      {guest.status}
                    </span>
                  </td>
                  <td>{guest.checkIn}</td>
                  <td>{guest.checkOut}</td>
                  <td>{guest.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (static demo) */}
        <div className="pagination-footer">
          <span>1-10 of {filteredGuests.length}</span>
          <div className="pagination-controls">
            <button className="page-button">‹</button>
            <span>1 / 1</span>
            <button className="page-button">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestList;
