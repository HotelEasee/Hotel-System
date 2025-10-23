export default function Help() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
      <p className="text-gray-600 mb-4">
        Welcome to the help center. Here you can find information on how to use the HotelEase Admin Dashboard.
      </p>

      <ul className="list-disc list-inside text-gray-700">
        <li>To view rooms, go to <strong>Room List</strong>.</li>
        <li>To manage guests, open the <strong>Guest List</strong>.</li>
        <li>To change account settings, open the <strong>Settings</strong> page.</li>
      </ul>
    </div>
  );
}
