import React, { useEffect, useState } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { Mail, Phone } from 'lucide-react';

export default function Barbers() {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const res = await fetch('https://klemz-backend.onrender.com/barber/barbers/all');
        const data = await res.json();
        if (Array.isArray(data)) {
          setBarbers(data);
        }
      } catch (error) {
        console.error('Error fetching barbers:', error);
      }
    };

    fetchBarbers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Barbers</h1>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Add New Barber
          </button>
        </div>

        {/* Grid / Card View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbers.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">No barbers found</div>
          ) : (
            barbers.map((barber, index) => (
              <div key={barber._id || index} className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <FaUserTie className="text-gray-400 w-12 h-12" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{barber.fullName || 'N/A'}</h2>
                    <p className="text-sm text-gray-500">Barber #{index + 1}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{barber.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{barber.phone || 'N/A'}</span>
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
