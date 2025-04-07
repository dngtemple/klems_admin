import './App.css';
import { useState, useEffect } from "react";
import { Routes,BrowserRouter,Route } from 'react-router-dom';

import { Suspense,lazy } from 'react';



function App() {

  const Dashboard=lazy(() => import('./dashboard'));
  const Revenue=lazy(() => import('./revenue'));
  const Barbers=lazy(() => import('./barbers'));
  const Clients=lazy(() => import('./clients'));
  const All= lazy(() => import('./all'));
  const Today= lazy(() => import('./today'));
 

  return (
    <BrowserRouter>
    <Suspense fallback={<div className='flex items-center gap-2 justify-center h-screen'>
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span>
      <span className="loading loading-bars loading-xl"></span>
    </div>}>
        <Routes>
          <Route path="/" element={<Dashboard/>}>
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/barbers" element={<Barbers />} />
            <Route path="/users" element={<Clients />} />
            <Route path="/today" element={<Today />} />
            <Route path="/all" element={<All />} />
          </Route>
          
        </Routes>
      </Suspense>
    </BrowserRouter>

    
  );
}

export default App;
