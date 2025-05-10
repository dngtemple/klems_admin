import React, { useEffect, useState } from 'react';
import { Download, Eye } from 'lucide-react';

const Revenue = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://klemz-backend.onrender.com/appointment/appointments/get/all');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAppointments(data);

          const total = data.reduce((sum, appointment) => {
            const price = parseFloat(appointment?.haircutID?.price) || 0;
            return sum + price;
          }, 0);
          setTotalRevenue(total);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleExportCSV = () => {
    const csvContent = [
      ['#', 'Customer', 'Barber', 'Haircut', 'Price', 'Date'],
      ...appointments.map((a, index) => [
        index + 1,
        a.userID?.fullName || 'N/A',
        a.barberID?.fullName || 'N/A',
        a.haircutID?.name || 'N/A',
        `₵${a.haircutID?.price || '0.00'}`,
        new Date(a.updatedAt).toLocaleDateString()
      ])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revenue_report.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Revenue Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Eye size={16} />
              View Full Report
            </button>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h2 className="text-lg text-gray-500">Total Revenue</h2>
            <p className="text-3xl font-bold text-green-600 mt-1">₵{totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h2 className="text-lg text-gray-500">Appointments</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{appointments.length}</p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h2 className="text-lg text-gray-500">Avg. Revenue</h2>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              ₵{appointments.length > 0 ? (totalRevenue / appointments.length).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left"></th>
                {/* <th className="px-4 py-3 text-left">Customer</th> */}
                <th className="px-4 py-3 text-left">Barber</th>
                <th className="px-4 py-3 text-left">Haircut</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {appointments.map((a, index) => (
                <tr key={a._id || index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  {/* <td className="px-4 py-2">{a.userID?.fullName || 'N/A'}</td> */}
                  <td className="px-4 py-2">{a.barberID?.fullName || 'N/A'}</td>
                  <td className="px-4 py-2">{a.haircutID?.name || 'N/A'}</td>
                  <td className="px-4 py-2">₵{a.haircutID?.price || '0.00'}</td>
                  <td className="px-4 py-2">{new Date(a.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {appointments.length === 0 && (
            <p className="text-center text-gray-500 py-8">No revenue data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Revenue;
