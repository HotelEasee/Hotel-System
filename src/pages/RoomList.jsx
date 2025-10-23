import React from 'react'

const rooms = [
  { id: 'r1', number: '101', type: 'Single', status: 'available' },
  { id: 'r2', number: '102', type: 'Double', status: 'taken' },
]

export default function RoomList(){
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Room List</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full">
          <thead><tr className="border-b"><th>Number</th><th>Type</th><th>Status</th></tr></thead>
          <tbody>
            {rooms.map(r => (
              <tr key={r.id} className="border-b">
                <td className="py-2">{r.number}</td>
                <td>{r.type}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
