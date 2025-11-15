// import React from 'react';
import React from 'react';
import './EmployeeList.css';

interface Employee {
id: number;
name: string;
role: string;
phone: string;
salary: string;
}

const employees: Employee[] = [
{ id:1, name: 'Andrew Smith', role: 'Manager', phone: '+27 71 123 4567', salary: '$2,500' },
{ id:2, name: 'Samantha', role: 'Reception', phone: '+27 71 987 6543', salary: '$1,800' },
{ id:3, name: 'Kevin', role: 'Housekeeping', phone: '+27 71 555 4444', salary: '$1,200' },
];

const EmployeeList: React.FC = () => {
return (
<div className="employee-list-wrapper">
<h2 className="employee-list-title">Employees</h2>
<div className="table-container">
<table className="employee-table">
<thead>
<tr className="table-header-row">
<th className="text-left py-2">Name</th>
<th>Role</th>
<th>Phone</th>
<th className="text-right">Salary</th>
</tr>
</thead>
<tbody>
{employees.map((e) => (
<tr key={e.id} className="table-row">
<td className="table-cell">{e.name}</td>
<td className="table-cell">{e.role}</td>
<td className="table-cell">{e.phone}</td>
<td className="table-cell text-right">{e.salary}</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
};

export default EmployeeList;