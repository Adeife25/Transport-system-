const path = require("path");

const { 
  getRouteById, 
  createTicket, 
  getAllTickets, 
  isSeatTaken, 
  getTicketByNumber
} = require("../models/ticketModel");

const { getWeather } = require("../services/weatherService");
const { getUniqueTicketNumber } = require("../utils/ticketNumber");
const { generateTicketPDFandQR } = require("./pdfController");

async function generateTicket(req, res) {
  try {
    const { route_id, passenger_name, passenger_email, seat_no, travel_date } = req.body;

    // ✅ Check route exists
    const route = await getRouteById(route_id);
    if (!route) return res.status(404).json({ message: "Route not found" });

    let final_price = parseFloat(route.base_price);

    // ✅ Get weather
    const weather = await getWeather(route.destination_city);
    const weather_condition = weather.condition;

    // ✅ Adjust price based on weather
    if (
      weather_condition.includes("Rain") ||
      weather_condition.includes("Storm") ||
      weather_condition.includes("Mist") ||
      weather_condition.includes("Fog")
    ) {
      final_price += 500;
    }

    if (weather_condition.includes("Heat") || weather.temp > 35) {
      final_price += 300;
    }

    // ✅ Check seat availability
    const seatTaken = await isSeatTaken(route_id, seat_no, travel_date);
    if (seatTaken) {
      return res.status(400).json({ message: `Seat ${seat_no} is already booked.` });
    }

    // ✅ Generate ticket number
    const ticket_number = await getUniqueTicketNumber();

    // ✅ Generate PDF + QR first
    const pdfFile = await generateTicketPDFandQR({
      passenger_name,
      passenger_email,
      origin_country: route.origin_country,
      destination_city: route.destination_city,
      travel_date,
      weather_condition,
      final_price,
      seat_no,
      ticket_number
    });

    // ✅ Save ticket with pdf_filename
    const ticketId = await createTicket({
      route_id,
      passenger_name,
      passenger_email,
      final_price,
      weather_condition,
      seat_no,
      travel_date,
      ticket_number,
      pdf_filename: pdfFile
    });

    // ✅ Respond with success
    return res.status(201).json({
      message: "Ticket generated successfully",
      ticketId,
      ticket_number,
      final_price,
      weather_condition,
      pdf_url: `http://127.0.0.1:4000/api/download-ticket/${ticket_number}`
    });

  } catch (err) {
    console.error("GenerateTicket error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function listTickets(req, res) {
  try {
    const tickets = await getAllTickets();
    return res.status(200).json(tickets);
  } catch (err) {
    console.error("ListTickets error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function downloadTicket(req, res) {
  try {
    const { ticket_number } = req.params;
    const ticket = await getTicketByNumber(ticket_number);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const filePath = path.join(__dirname, "../tickets", ticket.pdf_filename);
    res.download(filePath);
  } catch (err) {
    console.error("DownloadTicket error:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

async function ticketDetails(req, res) {
  try {
    const { ticket_number } = req.params;
    const ticket = await getTicketByNumber(ticket_number);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    console.error("TicketDetails error:", err);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { generateTicket, listTickets, downloadTicket, ticketDetails };
 