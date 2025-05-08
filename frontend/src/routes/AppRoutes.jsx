import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Adicionado Navigate
import Login from '../pages/Login';
import Register from '../pages/Register';
import EventList from '../components/Events/EventList';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}