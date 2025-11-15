// import React from 'react';
import './RoomList.css'

interface Room {
  id: string;
  number: string;
  type: string;
  status: string;
}

const rooms: Room[] = [
  { id: 'r1', number: '101', type: 'Single', status: 'available' },
  { id: 'r2', number: '102', type: 'Double', status: 'taken' },
];

const RoomList: React.FC = () => {
  return (
    <div className="room-list-wrapper">
      <h2 className="room-list-title">Room List</h2>
      <div className="table-container">
        <table className="room-table">
          <thead>
            <tr className="table-header-row">
              <th>Number</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="table-row">
                <td className="table-cell">{r.number}</td>
                <td className="table-cell">{r.type}</td>
                <td className={`table-cell room-status ${r.status.toLowerCase()}`}>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
