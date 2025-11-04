import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';

import Login from './pages/Login';
import Register from './pages/Register'; 
import Home from './pages/Home';
import Reservation from './pages/ReservationTurns';

import AdminLogin from './pages/AdminLogin';
import ControlPanel from './pages/ControlPanel';
import LocationPage from './pages/Location';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Ruta principal o lo primero que ve el usuario*/}
        <Route path="/" element={<App />} />
        
        {/* Rutas independientes */}
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/ubicacion" element={<LocationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        
        <Route path='/login/admin' element={<AdminLogin />} />
        <Route path='/panel' element={<PrivateRoute> <ControlPanel /> </PrivateRoute>} />  

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);