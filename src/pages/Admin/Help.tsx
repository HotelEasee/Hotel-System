import React from "react";

const Help: React.FC = () => {
  return (
    <div className="help-container">
      <h1 className="help-title">Help & Support</h1>
      <p className="help-text">
        Welcome to the [translate:help center]. Here you can find information on how to use the [translate:HotelEase Admin Dashboard].
      </p>

      <ul className="help-list">
        <li>To view rooms, go to <strong>Room List</strong>.</li>
        <li>To manage guests, open the <strong>Guest List</strong>.</li>
        <li>To change account settings, open the <strong>Settings</strong> page.</li>
      </ul>
    </div>
  );
};

export default Help;
