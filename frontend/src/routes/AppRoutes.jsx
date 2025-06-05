import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EventList from '../pages/EventList';
import MyEvents from '../pages/MyEvents';
import ConfirmedEvents from '../pages/ConfirmedEvents';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/meus-eventos" element={<MyEvents />} />
        <Route path="/eventos-confirmados" element={<ConfirmedEvents />} />
        <Route path="/perfil" element={<Profile />} /> {/* Rota adicionada */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}