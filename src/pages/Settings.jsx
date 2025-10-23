import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Settings() {
  // 🔹 Current logged-in admin (can be loaded from backend or localStorage)
  const [admin, setAdmin] = useState(() => {
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

  // 🔹 State for which tab is active
  const [activeTab, setActiveTab] = useState("Personal Details");

  // 🔹 Editable form data
  const [formData, setFormData] = useState(admin);

  // Update localStorage whenever admin changes
  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Save changes
  const handleSave = () => {
    setAdmin(formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 p-6">
      {/* Left Panel */}
      <div className="bg-white w-full md:w-1/4 rounded-2xl shadow-md p-6 mb-6 md:mb-0">
        <div className="flex flex-col items-center mb-6">
          {admin.avatar ? (
            <img
              src={admin.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
            />
          ) : (
            <FaUserCircle className="text-6xl text-gray-400 mb-2" />
          )}
          <h2 className="text-lg font-semibold text-gray-800">{admin.name}</h2>
          <p className="text-sm text-gray-500">{admin.email}</p>
        </div>

        <ul className="space-y-3 w-full">
          {[
            "Personal Details",
            "Payment Method",
            "Notification Settings",
            "Change Password",
            "Terms & Conditions",
          ].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left py-2 px-3 rounded-lg font-medium text-sm ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-8 ml-0 md:ml-6">
        {activeTab === "Personal Details" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </>
        )}

        {/* Payment Method */}
        {activeTab === "Payment Method" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Payment Method
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Choose or update how you receive admin payments or process refunds.
            </p>
            <select className="border p-2 rounded-lg w-full mb-4">
              <option>Visa **** 8923</option>
              <option>MasterCard **** 1033</option>
              <option>PayPal</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Update Payment Method
            </button>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === "Notification Settings" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Notification Settings
            </h2>
            <div className="space-y-3">
              {["Email Alerts", "System Messages", "Weekly Reports"].map(
                (label) => (
                  <label key={label} className="flex items-center space-x-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>{label}</span>
                  </label>
                )
              )}
            </div>
          </div>
        )}

        {/* Change Password */}
        {activeTab === "Change Password" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Change Password
            </h2>
            <input
              type="password"
              placeholder="Current Password"
              className="border p-2 rounded-lg w-full mb-3"
            />
            <input
              type="password"
              placeholder="New Password"
              className="border p-2 rounded-lg w-full mb-3"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="border p-2 rounded-lg w-full mb-4"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Change Password
            </button>
          </div>
        )}

        {/* Terms & Conditions */}
        {activeTab === "Terms & Conditions" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Terms & Conditions
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              This system is for authorized administrators only. Any misuse of
              data or unauthorized actions are subject to system logs and audit
              control.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
