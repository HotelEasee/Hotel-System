import React, { useState, useEffect, ChangeEvent } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Settings.css";

interface Admin {
  name: string;
  email: string;
  avatar: string | null;
  mobile: string;
  address: string;
  city: string;
  country: string;
}

const TABS = [
  "Personal Details",
  "Payment Method",
  "Notification Settings",
  "Change Password",
  "Terms & Conditions",
];

const Settings: React.FC = () => {
  // Current logged-in admin (loaded from localStorage or default)
  const [admin, setAdmin] = useState<Admin>(() => {
    const saved = localStorage.getItem("admin");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Andrew Smith",
          email: "andrew@hoteleaze.com",
          avatar: null,
          mobile: "",
          address: "",
          city: "",
          country: "",
        };
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>("Personal Details");

  // Editable form data
  const [formData, setFormData] = useState<Admin>(admin);

  // Update localStorage whenever admin changes
  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes handler
  const handleSave = () => {
    setAdmin(formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="settings-wrapper">
      {/* Left Panel */}
      <div className="settings-sidebar">
        <div className="admin-profile">
          {admin.avatar ? (
            <img
              src={admin.avatar}
              alt="avatar"
              className="admin-avatar"
            />
          ) : (
            <FaUserCircle className="admin-icon" />
          )}
          <h2 className="admin-name">{admin.name}</h2>
          <p className="admin-email">{admin.email}</p>
        </div>

        <ul className="tabs-list">
          {TABS.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                type="button"
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="settings-content">
        {activeTab === "Personal Details" && (
          <>
            <h2 className="settings-heading">Personal Details</h2>
            <div className="form-grid">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button onClick={handleSave} className="btn-save">
                Save Changes
              </button>
            </div>
          </>
        )}

        {activeTab === "Payment Method" && (
          <div>
            <h2 className="settings-heading">Payment Method</h2>
            <p className="description">
              Choose or update how you receive admin payments or process refunds.
            </p>
            <select className="form-input full-width">
              <option>Visa **** 8923</option>
              <option>MasterCard **** 1033</option>
              <option>PayPal</option>
            </select>
            <button className="btn-save mt-4">Update Payment Method</button>
          </div>
        )}

        {activeTab === "Notification Settings" && (
          <div>
            <h2 className="settings-heading">Notification Settings</h2>
            <div className="checkbox-group">
              {["Email Alerts", "System Messages", "Weekly Reports"].map((label) => (
                <label key={label} className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Change Password" && (
          <div>
            <h2 className="settings-heading">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              className="form-input full-width mb-3"
            />
            <input
              type="password"
              placeholder="New Password"
              className="form-input full-width mb-3"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="form-input full-width mb-4"
            />
            <button className="btn-save">Change Password</button>
          </div>
        )}

        {activeTab === "Terms & Conditions" && (
          <div>
            <h2 className="settings-heading">Terms & Conditions</h2>
            <p className="terms-text">
              This system is for authorized administrators only. Any misuse of
              data or unauthorized actions are subject to system logs and audit
              control.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
