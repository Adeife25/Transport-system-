import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TicketDetailPage() {
  const { ticket_number } = useParams(); // get ticket number from URL
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/ticket/${ticket_number}`)
      .then(response => setTicket(response.data))
      .catch(error => console.error("Error fetching ticket:", error));
  }, [ticket_number]);

  if (!ticket) {
    return <p>Loading ticket details...</p>;
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", margin: "20px" }}>
      <h1>Ticket Details</h1>
      <p><strong>Passenger:</strong> {ticket.passenger_name}</p>
      <p><strong>Email:</strong> {ticket.passenger_email}</p>
      <p><strong>Seat:</strong> {ticket.seat_no}</p>
      <p><strong>Route:</strong> {ticket.origin_country} → {ticket.destination_city}</p>
      <p><strong>Travel Date:</strong> {ticket.travel_date}</p>
      <p><strong>Price:</strong> {ticket.final_price}</p>
      <p><strong>Weather:</strong> {ticket.weather_condition}</p>
      <p><strong>Ticket Number:</strong> {ticket.ticket_number}</p>
      <a
  href={`http://127.0.0.1:4000/api/download-ticket/${ticket.ticket_number}`}
  target="_blank"
  rel="noopener noreferrer"
>
  Download PDF
</a>

    </div>
  );
}

export default TicketDetailPage;
