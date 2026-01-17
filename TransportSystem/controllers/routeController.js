const { createRoute, getAllRoutes } = require('../models/routeModel'); // assuming your model has DB functions

// --------------------------
// Create Route
// --------------------------
async function generateRoute(req, res) {
  try {
    const { origin_country, destination_country, destination_city, base_price, distance_km } = req.body;

    if (!origin_country || !destination_country || !destination_city || !base_price || !distance_km) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const routeId = await createRoute({
      origin_country,
      destination_country,
      destination_city,
      base_price,
      distance_km
    });

    return res.status(201).json({
      message: "Route created successfully",
      route_id: routeId
    });

  } catch (err) {
    console.error("Error creating route:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
}

// --------------------------
// List Routes
// --------------------------
async function listRoutes(req, res) {
  try {
    const routes = await getAllRoutes();
    return res.status(200).json(routes);
  } catch (err) {
    console.error("Error fetching routes:", err.message);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { generateRoute, listRoutes };
