import './App.css';
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { FaDollarSign } from "react-icons/fa";

function App() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [view, setView] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  useEffect(() => {
    if (view === "appointments") {
      fetch("https://klemz-backend.onrender.com/appointment/todayonly")
        .then(res => res.json())
        .then(data => setAppointments(Array.isArray(data) ? data : []))
        .catch(() => setAppointments([]));
    } else if (view === "users") {
      fetch("https://klemz-backend.onrender.com/user/users")
        .then(res => res.json())
        .then(data => setUsers(data));
    } else if (view === "barbers") {
      fetch("https://klemz-backend.onrender.com/barber/barbers/all")
        .then(res => res.json())
        .then(data => setBarbers(data));
    } else if (view === "revenue") {
      fetch("https://klemz-backend.onrender.com/appointment/appointments/get/all")
        .then(res => res.json())
        .then(data => {
          const totalRevenue = data.reduce((sum, appt) => sum + appt.haircutID.price, 0);
          setRevenue(totalRevenue);
        });
    }
  }, [view]);

  const fetchAllAppointments = () => {
    fetch("https://klemz-backend.onrender.com/appointment/appointments/get/all")
      .then(res => res.json())
      .then(data => setAppointments(data));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold">Klems Admin</h2>
        <ul className="mt-5 space-y-3">
          <li className="p-2 bg-gray-700 rounded cursor-pointer" onClick={() => setView("appointments")}>Appointments</li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setView("users")}>Users</li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setView("revenue")}>Revenue</li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer" onClick={() => setView("barbers")}>Barbers</li>
        </ul>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="mt-5">
          {view === "revenue" && (
            <div className="p-4 bg-white rounded shadow-md flex items-center justify-between">
              <h2 className="text-lg font-bold">Total Revenue</h2>
              <div className="flex items-center">
                <FaDollarSign className="text-green-500 text-2xl" />
                <span className="text-xl font-bold ml-2">${revenue}</span>
              </div>
            </div>
          )}

          {view === "appointments" && (
            <div className="p-4 bg-white rounded shadow-md">
              <h2 className="text-lg font-bold mb-3">Appointments</h2>
              <button className="mb-3 p-2 bg-blue-500 text-white rounded" onClick={fetchAllAppointments}>View All</button>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    {/* <th className="border p-2">ID</th> */}
                    <th className="border p-2">Client</th>
                    <th className="border p-2">Barber</th>
                    <th className="border p-2">HairCut</th>
                    <th className="border p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt) => (
                    <tr key={appt.id} className="text-center">
                      {/* <td className="border p-2">{appt._id}</td> */}
                      <td className="border p-2">{appt.userID.fullName}</td>
                      <td className="border p-2">{appt.barberID.fullName}</td>
                      <td className="border p-2">{appt.haircutID.name}</td>
                      <td className="border p-2">{appt.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "users" && (
            <div className="p-4 bg-white rounded shadow-md">
              <h2 className="text-lg font-bold mb-3">Users</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    {/* <th className="border p-2">ID</th> */}
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="text-center">
                      {/* <td className="border p-2">{user._id}</td> */}
                      <td className="border p-2">{user.fullName}</td>
                      <td className="border p-2">{user.phone}</td>
                      <td className="border p-2">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {view === "barbers" && (
            <div className="p-4 bg-white rounded shadow-md">
              <h2 className="text-lg font-bold mb-3">Barbers</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    {/* <th className="border p-2">ID</th> */}
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Phone</th>
                    <th className="border p-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {barbers.map((barber) => (
                    <tr key={barber.id} className="text-center">
                      {/* <td className="border p-2">{barber._id}</td> */}
                      <td className="border p-2">{barber.fullName}</td>
                      <td className="border p-2">{barber.phone}</td>
                      <td className="border p-2">{barber.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
