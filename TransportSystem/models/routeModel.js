const newConPool = require('../connect');
const { SqlObject } = require('./sql');     // your existing DB pool

// ---------------------------
// Create a route
// ---------------------------
async function createRoute({ origin_country, destination_country, destination_city, base_price, distance_km }) {
  const [result] = await newConPool.conPool.query(
    SqlObject.createRoute,
    [origin_country, destination_country, destination_city, base_price, distance_km]
  );
  return result.insertId; // returns route_id
}

// ---------------------------
// Get all routes
// ---------------------------
async function getAllRoutes() {
  const [rows] = await newConPool.conPool.query(
    SqlObject.getAllRoutes
);

  return rows;
}


// ---------------------------
// Get a single route by ID
// ---------------------------
async function getRouteById(route_id) {
  const [rows] = await newConPool.conPool.query(
   SqlObject.getRouteById,
    [route_id]
  );
  return rows[0];
}

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById
};
