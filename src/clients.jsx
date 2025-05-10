import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Mail, Phone } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add New Customer
          </button>
        </div>

        {/* Grid / Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">No customers found</div>
          ) : (
            users.map((user, index) => (
              <div key={user._id || index} className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <FaUserCircle className="text-gray-400 w-12 h-12" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{user.fullName || 'N/A'}</h2>
                    <p className="text-sm text-gray-500">Customer #{index + 1}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{user.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{user.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

       
      </div>
    </div>
  );
}
