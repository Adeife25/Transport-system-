import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../components/TicketCard";
import { Link } from "react-router-dom";

function TicketsPage() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:4000/api/tickets")
      .then(response => setTickets(response.data))
      .catch(error => console.error("Error fetching tickets:", error));
  }, []);

  return (
    <div className="page-container">
      <h1>All Tickets</h1>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map(ticket => (
          <div key={ticket.ticket_id}>
           <TicketCard ticket={ticket} />
<Link to={`/ticket/${ticket.ticket_number}`} className="view-details">
  View Details
</Link>
</div>

        ))
      )}
    </div>
  );
}

export default TicketsPage;
