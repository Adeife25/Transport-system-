// src/pages/RoutesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import RouteCard from "../components/RouteCard";

function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({
    origin_country: "",
    destination_country: "",
    destination_city: "",
    base_price: "",
    distance_km: ""
  });

  // Fetch routes
  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = () => {
    axios.get("http://127.0.0.1:4000/api/routes")
      .then(response => setRoutes(response.data))
      .catch(error => console.error("Error fetching routes:", error));
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:4000/api/routes", formData)
      .then(() => {
        alert("Route created successfully!");
        setFormData({
          origin_country: "",
          destination_country: "",
          destination_city: "",
          base_price: "",
          distance_km: ""
        });
        fetchRoutes(); // refresh list
      })
      .catch(error => {
        console.error("Error creating route:", error);
        alert("Failed to create route.");
      });
  };

  return (
    <div className="page-container">
      <h1>Available Routes</h1>

      {/* ✅ Create Route Form */}
      <form onSubmit={handleSubmit} className="route-form">
        <input
          type="text"
          name="origin_country"
          placeholder="Origin Country"
          value={formData.origin_country}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination_country"
          placeholder="Destination Country"
          value={formData.destination_country}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination_city"
          placeholder="Destination City"
          value={formData.destination_city}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="base_price"
          placeholder="Base Price"
          value={formData.base_price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="distance_km"
          placeholder="Distance (km)"
          value={formData.distance_km}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Route</button>
      </form>

      {/* ✅ Show routes */}
      {routes.length === 0 ? (
        <p>No routes available. Please create one.</p>
      ) : (
        routes.map(route => <RouteCard key={route.route_id} route={route} />)
      )}
    </div>
  );
}

export default RoutesPage;
