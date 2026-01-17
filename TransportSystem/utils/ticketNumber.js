// utils/ticketNumber.js
const newConPool = require('../connect'); // your database connection

// 1. Generate a random ticket number
function generateTicketNumber() {
  const prefix = "TKR"; // fixed prefix
  const part1 = Math.floor(100 + Math.random() * 900);   // 3-digit number
  const part2 = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return `${prefix}${part1}-${part2}`;
}

// 2. Generate a unique ticket number by checking the DB
async function getUniqueTicketNumber() {
  let ticket_number;
  let exists = true;

  while (exists) {
    ticket_number = generateTicketNumber();
    const [rows] = await newConPool.conPool.query(
      'SELECT * FROM tickets WHERE ticket_number = ?',
      [ticket_number]
    );
    exists = rows.length > 0; // repeat if ticket_number already exists
  }

  return ticket_number;
}

module.exports = { generateTicketNumber, getUniqueTicketNumber };
