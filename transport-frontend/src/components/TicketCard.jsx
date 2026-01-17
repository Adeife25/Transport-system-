import React from "react";
function TicketCard({ ticket }) {
  return (
    <div className="card">
      <h3 style={{ color: "#28a745" }}>{ticket.passenger_name}</h3>
      <p><strong>Seat:</strong> {ticket.seat_no}</p>
      <p><strong>Route:</strong> {ticket.origin_country} → {ticket.destination_city}</p>
      <p><strong>Price:</strong> ₦{ticket.final_price}</p>
      <p><strong>Weather:</strong> {ticket.weather_condition}</p>
      <p><strong>Ticket Number:</strong> {ticket.ticket_number}</p>
      <a
        href={`http://127.0.0.1:4000/api/download-ticket/${ticket.ticket_number}`}
        target="_blank"
        rel="noopener noreferrer"
      className="pdf-download"
      >
        Download PDF
      </a>
    </div>
  );
}

export default TicketCard;
