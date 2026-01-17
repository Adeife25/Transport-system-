require('dotenv').config();
const { newconPool } = require('../connect'); // adjust path to your db connection
const { generateTicketNumber } = require('../utils/ticketNumber');

async function fixTickets() {
  try {
    // 1. Get all tickets without a ticket_number
    const [tickets] = await newconPool.query(
      "SELECT * FROM tickets WHERE ticket_number IS NULL OR ticket_number = ''"
    );

    console.log(`Found ${tickets.length} tickets to fix.`);

    for (let ticket of tickets) {
      let uniqueNumber;
      let exists = true;

      // 2. Ensure uniqueness
      while (exists) {
        uniqueNumber = generateTicketNumber();
        const [rows] = await conPool.query(
          "SELECT ticket_id FROM tickets WHERE ticket_number = ?",
          [uniqueNumber]
        );
        if (rows.length === 0) exists = false; // number is unique
      }

      // 3. Update ticket
      await newconPool.query(
        "UPDATE tickets SET ticket_number = ? WHERE ticket_id = ?",
        [uniqueNumber, ticket.ticket_id]
      );

      console.log(`Updated ticket ${ticket.ticket_id} -> ${uniqueNumber}`);
    }

    console.log("All tickets fixed!");
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixTickets();
