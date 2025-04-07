import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function Clients() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('https://klemz-backend.onrender.com/user/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">Customers</h1>

        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((barber, index) => (
              <tr key={barber._id || index}>
                <th>{index + 1}</th>
                <td>{barber.fullName || 'N/A'}</td>
                <td>{barber.email || 'N/A'}</td>
                <td>{barber.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
  );
}
