import React, { useEffect, useState } from 'react';

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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Barbers</h1>

      <div className="overflow-x-auto">
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
            {barbers.map((barber, index) => (
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
    </div>
  );
}
