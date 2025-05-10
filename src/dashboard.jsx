import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, Scissors, CalendarDays, DollarSign, Home } from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard Home', path: '/', icon: <Home size={18} /> },
    { name: 'Barbers', path: '/barbers', icon: <Scissors size={18} /> },
    { name: 'Customers', path: '/users', icon: <Users size={18} /> },
    { name: 'Today Appointments', path: '/today', icon: <CalendarDays size={18} /> },
    { name: 'All Appointments', path: '/all', icon: <CalendarDays size={18} /> },
    { name: 'Revenue', path: '/revenue', icon: <DollarSign size={18} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-emerald-700 text-white shadow-lg w-64 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center py-6">
            {/* <img src="https://img.daisyui.com/icons/emoji/emoji_1f4bb.svg" alt="Logo" className="w-14 h-14" /> */}
          </div>
          <nav className="flex flex-col gap-1 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600 transition ${
                  location.pathname === item.path ? 'bg-emerald-800' : ''
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 text-center text-xs text-gray-200">
          &copy; 2025 Klems Admin
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
          <h1 className="text-lg font-semibold text-gray-700 capitalize">
            {location.pathname.replace('/', '').replace('-', ' ') || 'Dashboard Home'}
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Hello, Admin</div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring-2 ring-emerald-600">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-40 text-gray-700"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
