const { getRouteById, createTicket, getAllTickets } = require('../models/ticketModel');
const { getWeather } = require('../services/weatherService');


// --------------------------
// Generate Ticket
// --------------------------
async function generateTicket(req, res) {
  try {

    const {
      route_id,
      passenger_name,
      passenger_email,
      seat_no,
      travel_date
    } = req.body;

    // 1. Get route info
    const route = await getRouteById(route_id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    let final_price = parseFloat(route.base_price);

    // 2. Call Weather API
    const weather = await getWeather(route.destination_city);
    const weather_condition = weather.condition;

    // 3. Apply price rules
    if (
      weather_condition.includes("Rain") ||
      weather_condition.includes("Storm") ||
      weather_condition.includes("Mist")
    ) {
      final_price += 50;
    }

    if (
      weather_condition.includes("Heat") ||
      weather.temp > 35
    ) {
      final_price += 30;
    }

    // 4. Save ticket
    const ticketId = await createTicket({
      route_id,
      passenger_name,
      passenger_email,
      final_price,
      weather_condition,
      seat_no,
      travel_date
    });

    return res.status(201).json({
      message: "Ticket generated successfully",
      ticketId,
      final_price,
      weather_condition
    });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
}

// --------------------------
// List Tickets
// --------------------------
async function listTickets(req, res) {
  try {
    const tickets = await getAllTickets();
    return res.status(200).json(tickets);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  generateTicket,
  listTickets
};
