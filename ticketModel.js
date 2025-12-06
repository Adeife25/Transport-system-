// const axios = require('axios');
const newConPool = require('../connect');
const { SqlObject } = require('./sql');


// ---------------------------
// Get Route
// ---------------------------
async function getRouteById(route_id) {
  const [rows] = await newConPool.conPool.query(
    SqlObject.getRouteById,
    [route_id]
  );

  return rows[0];
}
// ---------------------------
// Create Ticket
// ---------------------------
async function createTicket(data) {

  const {
    route_id,
    passenger_name,
    passenger_email,
    final_price,
    weather_condition,
    seat_no,
    travel_date
  } = data;

  const [result] = await newConPool.conPool.query(
    SqlObject.createTicket,
    [
      route_id,
      passenger_name,
      passenger_email,
      final_price,
      weather_condition,
      seat_no,
      travel_date
    ]
  );

  return result.insertId;
}

// ---------------------------
// Fetch all tickets
// ---------------------------
async function getAllTickets() {
  const [rows] = await newConPool.conPool.query(
    SqlObject.getAllTickets
  );

  return rows;
}

// async function asignPassengersToBus() {
//     let totalNumberOfseats = 40;
//     let countTickets = 0;
// }

// total 40 40tckets 

module.exports = {
  getRouteById,
  createTicket,
  getAllTickets
};
 