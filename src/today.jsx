import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, User, Scissors, Clock } from 'lucide-react';

export default function Today() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('https://klemz-backend.onrender.com/appointment/appointments/todayonly');
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Today's Appointments</h1>
          <div className="space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">All Bookings</button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Settings</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">No bookings for today</div>
          ) : (
            appointments.map((appointment, index) => (
              <div key={appointment._id} className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(appointment.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Confirmed</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">#{index + 1} - {appointment._id}</h2>
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Customer: {appointment.userID?.fullName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-gray-500" />
                    <span>Haircut: {appointment.haircutID?.name || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>Barber: {appointment.barberID?.fullName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Time: {new Date(appointment.updatedAt).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-green-600">GHS {appointment.haircutID?.price || '0.00'}</span>
                    <input type="checkbox" className="checkbox checkbox-success" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Table fallback view */}
        {appointments.length > 0 && (
          <div className="overflow-x-auto mt-10">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-100 text-gray-700 text-left text-sm">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Appointment ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Barber</th>
                  <th className="px-4 py-3">Haircut</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {appointments.map((appointment, index) => (
                  <tr key={appointment._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{appointment._id}</td>
                    <td className="px-4 py-2">{appointment.userID?.fullName || 'N/A'}</td>
                    <td className="px-4 py-2">{appointment.barberID?.fullName || 'N/A'}</td>
                    <td className="px-4 py-2">{appointment.haircutID?.name || 'N/A'}</td>
                    <td className="px-4 py-2">GHS {appointment.haircutID?.price || '0.00'}</td>
                    <td className="px-4 py-2">{new Date(appointment.updatedAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
