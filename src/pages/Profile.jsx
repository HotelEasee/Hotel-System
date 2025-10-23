import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // ✅ Load user data from localStorage (you can replace this with API later)
  const [profile, setProfile] = useState({
    name: localStorage.getItem("currentUser") || "Admin User",
    email: localStorage.getItem("userEmail") || "admin@example.com",
    role: "Administrator",
    profilePic: localStorage.getItem("profilePic") || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [newProfile, setNewProfile] = useState({ ...profile });

  // ✅ Handle text field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle profile picture change
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProfile((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Save profile updates
  const handleSave = () => {
    setProfile(newProfile);
    localStorage.setItem("currentUser", newProfile.name);
    localStorage.setItem("userEmail", newProfile.email);
    localStorage.setItem("profilePic", newProfile.profilePic);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  // ✅ Go back to dashboard
  const goToDashboard = () => navigate("/dashboard");

  useEffect(() => {
    document.title = "Profile | Admin Panel";
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <button
          onClick={goToDashboard}
          className="text-blue-500 text-sm hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          <img
            src={
              newProfile.profilePic ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          {editMode && (
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-600">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePictureChange}
              />
            </label>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700">
            {profile.name}
          </h3>
          <p className="text-sm text-gray-500">{profile.role}</p>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
      </div>

      <hr className="my-4" />

      {editMode ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              name="name"
              value={newProfile.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={newProfile.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="text-right">
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
