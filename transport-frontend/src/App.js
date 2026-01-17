import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RoutesPage from "./pages/RoutesPage";
import BookingPage from "./pages/BookingPage";
import TicketsPage from "./pages/TicketsPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <div className="nav-left">
          <Link to="/routes">Routes</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/tickets">Tickets</Link>
        </div>
        <div className="nav-center">
          <span className="brand">Victory Transports</span>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<RoutesPage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/ticket/:ticket_number" element={<TicketDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
