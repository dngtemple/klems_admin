import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="overflow-x-auto p-4">
      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No bookings for today</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Appointment</th>
              <th>Barber</th>
              <th>Haircut</th>
              <th>Customer</th>
              <th>Price</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <th>{index + 1} - {appointment._id}</th>
                <td>{appointment.barberID?.fullName || 'N/A'}</td>
                <td>{appointment.haircutID?.name || 'N/A'}</td>
                <td>{appointment.userID?.fullName || 'N/A'}</td>
                <td>GHS{appointment.haircutID?.price || '0.00'}</td>
                <td>{appointment.time}</td>
                <td>{new Date(appointment.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Appointment</th>
              <th>Barber</th>
              <th>Haircut</th>
              <th>Customer</th>
              <th>Price</th>
              <th>Time</th>
              <th>Updated At</th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
