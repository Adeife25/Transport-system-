import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";   // ✅ go up one folder to reach src/App.css


function BookingPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    route_id: "",
    passenger_name: "",
    passenger_email: "",
    seat_no: "",
    travel_date: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);

    axios.post("http://127.0.0.1:4000/api/tickets/generate", formData)
      .then(() => {
        alert("Ticket created successfully!");
        setFormData({
          route_id: "",
          passenger_name: "",
          passenger_email: "",
          seat_no: "",
          travel_date: ""
        });
        navigate("/tickets"); // redirect to tickets page after success
      })
      .catch(error => {
        console.error("Error creating ticket:", error);
        alert("Failed to create ticket. Check backend logs.");
      });
  };

  return (
    <div className="page-container">
      <h1>Book a Ticket</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="route_id"
          placeholder="Route ID"
          value={formData.route_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="passenger_name"
          placeholder="Passenger Name"
          value={formData.passenger_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="passenger_email"
          placeholder="Passenger Email"
          value={formData.passenger_email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="seat_no"
          placeholder="Seat Number"
          value={formData.seat_no}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="travel_date"
          value={formData.travel_date}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Ticket</button>
      </form>
    </div>
  );
}

export default BookingPage;
