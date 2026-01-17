const SqlObject = {

  // Routes
  getRouteById: `
    SELECT *
    FROM routes
    WHERE route_id = ?
  `,

  // Create Ticket
  createTicket: `
    INSERT INTO tickets
    (
      route_id,
      passenger_name,
      passenger_email,
      final_price,
      weather_condition,
      seat_no,
      travel_date,
      ticket_number,
      pdf_filename
    )
    VALUES (?, ?, ?, ?, ?, ?, ?,?, ?)
  `,

  // Fetch Tickets
  getAllTickets: `
    SELECT
      t.*,
      r.origin_country,
      r.destination_country,
      r.destination_city
    FROM tickets t
    JOIN routes r ON t.route_id = r.route_id
    ORDER BY booking_date DESC
  `,

  
  // NEW: Route queries
  createRoute: `INSERT INTO routes 
    (origin_country, destination_country, destination_city, base_price, distance_km)
    VALUES (?, ?, ?, ?, ?)`,
  getAllRoutes: "SELECT * FROM routes"


};
module.exports = {SqlObject};