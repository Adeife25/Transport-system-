require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();


const { ticketDetails } = require('./controllers/ticketController');
const ticketRoutes = require('./routes/ticketRoutes');
const routeRoutes = require('./routes/routeRoutes');


// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],   // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true                  // allow cookies/auth headers if needed
}));


app.get("/ticket/:ticket_number", ticketDetails);



// routes
app.use('/api', routeRoutes);
app.use('/api', ticketRoutes);


// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
