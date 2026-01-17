// const routeForm = document.getElementById('routeForm');
// const ticketForm = document.getElementById('ticketForm');
// const routeSelect = document.getElementById('routeSelect');
// const ticketsTable = document.getElementById('ticketsTable').querySelector('tbody');
// const loadTicketsBtn = document.getElementById('loadTickets');

// const API_BASE = "http://127.0.0.1:4000/api";


// // Create Route
// routeForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const data = Object.fromEntries(new FormData(routeForm).entries());
//   try {
//     const res = await fetch(`${API_BASE}/routes`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     const json = await res.json();
//     alert(`Route created! ID: ${json.route_id}`);
//     loadRoutes(); // update route dropdown
//     routeForm.reset();
//   } catch(err) { console.error(err); alert("Error creating route"); }
// });

// // Load Routes for dropdown
// async function loadRoutes() {
//   try {
//     const res = await fetch(`${API_BASE}/routes`);
//     const routes = await res.json();
//     routeSelect.innerHTML = '<option value="">Select Route</option>';
//     routes.forEach(r => {
//       routeSelect.innerHTML += `<option value="${r.route_id}">${r.origin_country} → ${r.destination_city} (${r.base_price})</option>`;
//     });
//   } catch(err) { console.error(err); }
// }
// loadRoutes();

// // Create Ticket
// ticketForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const data = Object.fromEntries(new FormData(ticketForm).entries());
//   try {
//     const res = await fetch(`${API_BASE}/tickets/generate`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     });
//     const json = await res.json();
//     alert(`Ticket generated! ID: ${json.ticketId}, Final Price: ${json.final_price}`);
//     ticketForm.reset();
//   } catch(err) { console.error(err); alert("Error generating ticket"); }
// });

// // Load Tickets
// loadTicketsBtn.addEventListener('click', async () => {
//   try {
//     const res = await fetch(`${API_BASE}/tickets`);
//     const tickets = await res.json();
//     ticketsTable.innerHTML = '';
//     tickets.forEach(t => {
//       ticketsTable.innerHTML += `<tr>
//         <td>${t.ticket_id}</td>
//         <td>${t.route_id}</td>
//         <td>${t.passenger_name}</td>
//         <td>${t.passenger_email}</td>
//         <td>${t.seat_no}</td>
//         <td>${t.travel_date}</td>
//         <td>${t.final_price}</td>
//         <td>${t.weather_condition}</td>
//       </tr>`;
//     });
//   } catch(err) { console.error(err); alert("Error loading tickets"); }
// });
