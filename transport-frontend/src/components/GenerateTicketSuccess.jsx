// src/components/GenerateTicketSuccess.jsx
import React from 'react';

export default function GenerateTicketSuccess({ ticket }) {
  if (!ticket) return null;

  return (
    <div>
      <h3>Ticket generated</h3>
      <p><strong>Ticket number:</strong> {ticket.ticket_number}</p>
      <p><strong>Final price:</strong> ₦{ticket.final_price}</p>

      <a
        href={ticket.pdf_url} // e.g. http://127.0.0.1:4000/api/download-ticket/TKR772-2601
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Ticket
      </a>
    </div>
  );
}
