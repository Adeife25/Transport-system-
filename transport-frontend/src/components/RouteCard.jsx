// src/components/RouteCard.jsx
import React from "react";

function RouteCard({ route }) {
  return (
    <div className="card">
      <h3 style={{ color: "#007bff" }}>
        {route.origin_country} → {route.destination_country}
      </h3>
      <p><strong>Route ID:</strong> {route.route_id}</p>
      <p><strong>City:</strong> {route.destination_city}</p>
      <p><strong>Price:</strong> ₦{route.base_price}</p>
      <p><strong>Distance:</strong> {route.distance_km} km</p>
    </div>
  );
}


export default RouteCard;
