import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Dashboard() {
  

  return (
    <div className="flex h-screen bg-gray-100">
     
      <div className={` bg-emerald-600 shadow-md transition-all duration-300 w-64 p-6 `}>
        <div className="flex items-center justify-between mb-8">
          {/* <h2 className={`text-xl font-semibold `}>Klems Administrator </h2> */}

          <img src="https://img.daisyui.com/icons/emoji/emoji_1f4bb.svg" alt="Logo" className="w-12 h-12" />
          
        </div>
        <nav className="flex flex-col gap-4 ">
          <Link to="/barbers" className="text-left btn text-gray-700 hover:text-black transition-colors">
            <button>Barbers</button>
          </Link>
          
          <Link to="/users" className="text-left btn text-gray-700 hover:text-black transition-colors">
            <button>Customers</button>
          </Link>
         <button className="text-left btn text-gray-700 hover:text-black transition-colors">Today appointments</button>
         <button className="text-left btn text-gray-700 hover:text-black transition-colors">All appointments</button>

         <Link to="/revenue" className="text-left btn text-gray-700 hover:text-black transition-colors">
         <button>Revenue</button>
         </Link>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
      <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl"></a>
  </div>
  <div className="flex-none">
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
  </div>
</div>
        <Outlet />
      </div>
    </div>
  );
}
