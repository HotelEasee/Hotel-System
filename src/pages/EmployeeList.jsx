import React from 'react'

const employees = [
  { id:1, name: 'Andrew Smith', role: 'Manager', phone: '+27 71 123 4567', salary: '$2,500' },
  { id:2, name: 'Samantha', role: 'Reception', phone: '+27 71 987 6543', salary: '$1,800' },
  { id:3, name: 'Kevin', role: 'Housekeeping', phone: '+27 71 555 4444', salary: '$1,200' },
]

export default function EmployeeList(){
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Employees</h2>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th className="text-right">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(e => (
              <tr key={e.id} className="border-b">
                <td className="py-2">{e.name}</td>
                <td>{e.role}</td>
                <td>{e.phone}</td>
                <td className="text-right">{e.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
